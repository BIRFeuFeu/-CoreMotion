# Contrato de interface — identidade ↔ catálogo (rascunho)

**Projeto:** CoreMotion — Etapa 5
**Data:** 19/10/2026
**Status:** RASCUNHO. Depende das decisões D-01 a D-10 registradas em `matriz-permissoes.md`.
**Objetivo:** especificar o comportamento das operações para que as frentes 1 e 2 implementem
contra a mesma referência, cada uma no seu escopo, sem esperar a implementação da outra.
O contrato é um artefato versionado: vale pela versão publicada, não por acordo verbal.

> Os contratos abaixo descrevem o **alvo**. A coluna “Hoje” mostra o que existe no código
> auditado. Nada foi implementado nesta rodada.

---

## 1. Convenções propostas

- **Sessão:** cookie httpOnly gerenciado pelo servidor (Supabase SSR). O cliente nunca envia
  `userId`, `role`, `seller_id`, `owner_id` ou preço como fonte de verdade.
- **Formato de resposta:** JSON `{ success: boolean, data?: T, error?: { code, message } }`.
- **Códigos HTTP:** 200 sucesso · 201 criado · 400 validação · 401 sem sessão · 403 sem permissão ·
  404 não encontrado · 409 conflito · 429 limite · 500 erro interno (mensagem genérica).
- **Erros exibíveis:** mensagem curta em português; detalhe técnico só no log do servidor.
- **Estados de interface:** `loading`, `empty`, `success`, `error`, `denied` (401/403) sempre
  implementados; o frontend não inventa sucesso quando a API falha.
- **Ownership:** toda operação sobre recurso privado valida dono; erro de permissão não revela
  se o recurso existe.

---

## 2. Autenticação

| Operação | Quem | Entrada | Saída | Hoje |
|---|---|---|---|---|
| `signUp` | Visitante | nome, e-mail, senha | perfil com `role=user`; nunca aceita papel | Aceita `requestedRole` e metadado `role` (B-04) |
| `login` | Visitante | e-mail, senha | sessão + perfil; falha se Auth falhar | Ignora erro do Auth e entra (B-03) |
| `logout` | Autenticado | — | sessão encerrada | Supabase client; sem server session |
| `getSession` | Autenticado | — | perfil atual lido do servidor | Deriva de `localStorage` (F-02) |
| `requestPasswordReset` | Visitante | e-mail | mensagem neutra | Server Action apenas simula (`app/actions/auth.ts:34-46`) |

**Regras:** papel inicial sempre `user`; conta banida não autentica; promoção só por admin
autenticado e auditada; sem admin por e-mail/prefixo.

---

## 3. Produtos e anúncios

| Operação | Quem | Entrada | Saída | Hoje |
|---|---|---|---|---|
| `listProducts` | Público | filtros: categoria, esporte, condição, tipo, preço, busca | lista paginada | `GET /api/products` e `/api/listings`, sem paginação; fallback local |
| `getProduct` | Público | `id` | produto ativo ou 404 | via lista no cliente |
| `createListing` | Usuário | dados do produto (sem `seller_id`) | produto criado com dono da sessão | Aceita `seller_id` do corpo |
| `updateListing` | Dono | `id` + campos permitidos | produto atualizado | Server Action sem sessão |
| `deleteListing` | Dono ou Admin | `id` | 204/200 | `DELETE` público sem verificação |
| `pauseListing` | Dono ou Supervisor/Admin | `id` + status permitido | produto atualizado | Admin só altera estado local (F-04) |

**Regras:** preço/estoque validados no servidor; `seller_id` vem da sessão; imagens com URL válida;
produto suspenso não aparece no catálogo público.

---

## 4. Lojas

| Operação | Quem | Entrada | Saída | Hoje |
|---|---|---|---|---|
| `listStores` | Público | filtros | lojas ativas | `GET /api/stores`; fallback local |
| `getStoreBySlug` | Público | slug | loja + produtos ativos | idem |
| `createStore` | Usuário | dados da loja (sem `owner_id`) | loja com `owner_id` da sessão, status `pending` | Aceita `owner_id` do corpo |
| `updateOwnStore` | Dono | campos permitidos | loja atualizada | não existe rota dedicada |
| `requestVerification` | Dono | documentos | status `pending` | Envia `approve:false` e grava `rejected` (B-06) |
| `reviewVerification` | Supervisor/Admin | `storeId`, `approve`, `notes` | status `verified`/`rejected` + auditoria | `PATCH /api/stores` público |

**Regras:** verificação nunca é aprovada pelo próprio lojista; documentos não vão para o cliente
de outros usuários; mudança de status registra autor.

---

## 5. Usuários e administração

| Operação | Quem | Entrada | Saída | Hoje |
|---|---|---|---|---|
| `getMyProfile` | Autenticado | — | perfil próprio | `localStorage`/Supabase |
| `updateMyProfile` | Autenticado | nome, avatar, cidade, esporte (nunca `role`) | perfil atualizado | `updateProfile` envia `role` ao sync (`services/auth.ts:203-224`) |
| `listUsers` | Admin | busca, página, campos mínimos | lista sem dados desnecessários | `GET /api/users` público, inclusive internos |
| `updateUserRole` | Admin | `userId`, `newRole` válido, motivo | 200 + auditoria | `PATCH /api/users` público |
| `banUser` / `unbanUser` | Admin | `userId`, motivo | 200 + auditoria | `PATCH` público |
| `deleteUser` | Admin | `userId`, motivo | exclusão lógica/anonimização | `DELETE` público, apaga `auth.users` |
| `moderateContent` | Supervisor/Admin | `postId`/`commentId`, ação | conteúdo moderado | só estado local no cliente |

**Regras:** admin não altera o próprio papel; último admin protegido; supervisor não promove;
e-mails só quando indispensável; toda ação sensível auditada.

---

## 6. Pedidos e pagamento

| Operação | Quem | Entrada | Saída | Hoje |
|---|---|---|---|---|
| `createOrder` | Usuário | itens (`productId`, `quantity`), endereço, frete, forma de pagamento | pedido com total calculado no servidor | Preços vêm do cliente; PIX local |
| `listMyOrders` | Usuário | — | pedidos próprios | Supabase client |
| `getOrder` | Dono ou Admin | `id` | pedido | RLS como única barreira |
| `updateOrderStatus` | Admin/Sistema | `id`, transição permitida | pedido atualizado + auditoria | Admin só altera estado local; sandbox grava direto |
| `confirmPayment` | Gateway (servidor) | referência do PSP | status real | Não existe; `confirmPaymentSandbox` finge |

**Regras:** total, frete e desconto recalculados no servidor; estoque validado; nenhum texto de
“custódia” ou “pagamento seguro” enquanto não houver PSP real; simulação sempre rotulada.

---

## 7. Comunidade

| Operação | Quem | Entrada | Saída | Hoje |
|---|---|---|---|---|
| `listPosts` | Público | filtros/paginação | posts | fallback local |
| `createPost` | Autenticado | título, conteúdo, categoria, imagem | post com autor da sessão | Supabase client |
| `comment` / `like` | Autenticado | `postId`, conteúdo | contadores atualizados | Supabase client; RLS pode bloquear |
| `reportPost` | Autenticado | `postId`, motivo | denúncia registrada | só estado local |
| `moderatePost` | Supervisor/Admin | `postId`, ação | conteúdo removido/oculto | só estado local/admin |

---

## 8. Estados de interface exigidos

| Situação | UI esperada |
|---|---|
| Carregando consulta | Skeleton/spinner, sem dados fictícios |
| Lista vazia | Estado vazio com ação (ex.: “anunciar”) |
| Sucesso de escrita | Toast só após resposta 2xx do servidor |
| Erro de rede/500 | Mensagem genérica + opção de tentar de novo |
| 401 | Abrir login, preservar intenção |
| 403 | Tela “acesso negado”, sem esconder apenas o botão |
| 404 | Estado “não encontrado” |
| Modo demo | Banner explícito “SIMULAÇÃO — NÃO É REGISTRO REAL” |

---

## 9. Dependências e arquivos compartilhados

- `lib/types.ts` — papéis e modelos (mudança coordenada).
- `lib/store.tsx` — estado global; hoje persiste `user` em `localStorage` e deve ser substituído
  por sessão do servidor.
- `services/auth.ts` e `services/authService.ts` — unificar.
- `lib/schemas/**` — validação compartilhada entre cliente e servidor.
- `components/admin/**`, `components/AuthModal.tsx`, `components/Sidebar.tsx` — dependem da matriz.
- `supabase/migrations/**` e `lib/db-queries.ts` — dependem da decisão D-01 e do lote B3.

**Nenhuma alteração nesses arquivos deve ocorrer em duas frentes ao mesmo tempo.**

---

## 10. Critério de aceite do contrato

- [ ] Matriz aprovada e contratos congelados para o lote de implementação.
- [ ] Toda operação tem papel exigido, validação e erros definidos.
- [ ] Nenhum identificador de dono ou papel vem do cliente.
- [ ] A frente de catálogo consegue implementar os estados de UI sem inventar API.
- [ ] A frente de verificação consegue escrever casos positivos e negativos a partir deste contrato.
