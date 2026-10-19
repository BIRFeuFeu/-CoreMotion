# Diagnóstico de frontend (transversal)

> **Insumo compartilhado entre as frentes.** As correções de interface se distribuem pelo
> mapa de propriedade: a frente 1 cuida de autenticação, sessão, menu por papel e painel
> administrativo; a frente 2 cuida das telas de catálogo, lojas, anúncio, checkout, comunidade
> e treinadores. Nenhuma das duas espera a outra: os contratos estão em
> `docs/etapa-5/contratos/`.

**Projeto:** CoreMotion — Etapa 5
**Data:** 19/10/2026
**Branch:** `arena/92deaf3d-coremotion`
**Commit:** `4f2c1d8`
**Modo:** auditoria somente leitura; nenhum componente foi alterado
**Autor da rodada:** Arena (assistente integrador) — revisão humana obrigatória

> Este diagnóstico segue o Prompt 1A: mapear telas, navegação, formulários e componentes
> realmente importados; registrar problema, evidência, impacto, prioridade e critério de aceite.
> **Não há capturas de tela**: não foi usada ferramenta de navegador. A revisão visual está
> pendente e deve ser feita pela equipe com evidências reais.

---

## 1. Inventário do que existe

### 1.1 Telas realmente renderizadas

`app/page.tsx` é uma SPA client-side controlada por `activeView` em `lib/store.tsx`.

| Tela / view | Componente real | Dados | Observação |
|---|---|---|---|
| Início | `components/HomeHeroAndHighlights.tsx` (594 linhas) | `products` do store + `INITIAL_*` | Destaques e vitrine |
| Marketplace | `components/MarketplaceView.tsx` | store local + `/api/products` | Filtros, ordenação e “carregar mais” |
| Lojas | `components/StoresView.tsx` | store + `/api/stores` | Lista, detalhe, verificação, modal de criação |
| Vender C2C | `components/SellC2CView.tsx` | `createProduct` | Visitante vê bloqueio de login |
| Treinadores | `components/CoachesView.tsx` | apenas `INITIAL_COACHES` | **Sem backend** |
| Comunidade | `components/CommunityView.tsx` | Supabase/fallback | Post, like, comentário, denúncia local |
| Painel Admin | `components/AdminDashboard.tsx` (1259 linhas) | store + APIs `/api/users`, `/api/stores` | 6 seções, várias ações locais |
| Detalhe do produto | `components/ProductDetailModal.tsx` | store | Modal |
| Carrinho/checkout | `components/CheckoutModal.tsx` (569 linhas) | store + `OrderService` | PIX simulado |
| Autenticação | `components/AuthModal.tsx` | `AuthService` | Inclui acesso rápido de 1 clique |
| Criar loja | `components/CreateStoreModal.tsx` | `createStore` | — |
| Config. Supabase | `components/SupabaseConfigModal.tsx` | `lib/supabase.ts` | Expõe template com credencial (P0) |

### 1.2 Navegação e views declaradas

- Menu lateral: `home`, `marketplace`, `stores`, `sell`, `coaches`, `community` e `admin`
  (este último só aparece se o e-mail for considerado admin — `Sidebar.tsx:82-140`).
- `ActiveView` também declara `profile` e `news` (`lib/store.tsx:55-64`), mas:
  - **`profile` não tem renderização em `app/page.tsx`**; o botão de favoritos chama
    `setActiveView('profile')` (`Sidebar.tsx:336-343`) e leva a **conteúdo vazio**.
  - **`news` não é usado em nenhum lugar**.
- `app/error.tsx`, `app/not-found.tsx` e `/auth/callback` existem e são tratados.

### 1.3 Componentes duplicados / reexportações

O projeto tem implementações na raiz de `components/` e subpastas com arquivos de 2 linhas que
apenas reexportam (`components/admin`, `auth`, `marketplace`, `stores`, `shared/Header|Footer`).
A documentação antiga já alertava sobre isso; é preciso conferir sempre o arquivo real.

**Órfão confirmado:** `components/SmartScanView.tsx` (356 linhas) não é importado por nenhuma
view; o próprio gerador de documentação registra a lacuna (`scripts/generate-master-docs.mjs:94`,
`scripts/lib/flowchart-core.mjs:716-717`). Também não há uso real de `@google/genai`/Gemini no
fluxo atual, apesar de `GEMINI_API_KEY` estar no `.env.example`.

---

## 2. Achados

### F-01 — Login de 1 clique como Super Admin (P0)

- **Evidência:**
  - `components/AuthModal.tsx:51-65` — `handleQuickLogin('admin')` chama `loginAsMasterAdmin()`.
  - `components/AuthModal.tsx:150-200` — três botões “Acesso Rápido Imediato (1 Clique)”,
    incluindo “👑 Super Admin”.
  - `lib/store.tsx:634-642` — `loginAsMasterAdmin` usa `INITIAL_USERS[0]`, que é uma conta admin
    fictícia (`lib/initial-data.ts:3-14`).
  - `components/AdminDashboard.tsx:78-107` — a própria tela de “Acesso Restrito” oferece o botão
    “Entrar como Super Admin Master”.
- **Impacto:** qualquer visitante obtém a interface administrativa sem credencial. Combinado com
  as APIs sem autorização (B-02), não é apenas demonstração: é acesso administrativo real.
- **Status:** CONFIRMADO POR LEITURA.
- **Aceite:** nenhum caminho de UI cria sessão admin sem login válido; demo, se existir, fica em
  rota/flag separada, sem dados reais e com banner de simulação.

### F-02 — Sessão e papel vêm do `localStorage` (P0)

- **Evidência:** `lib/store.tsx:250` restaura `parsed.user`; `:351` salva `user`, `allUsers`,
  `products`, `stores`, `orders`, `cart`, `favorites` e `communityPosts` em
  `localStorage['coremotiom_state_v1']`; `:362` deriva `role` de `user.role`;
  `components/AdminDashboard.tsx:78` decide acesso por `isUserAdmin(user?.email)`.
- **Impacto:** editar o `localStorage` (ou usar o seletor “Modo” da sidebar,
  `Sidebar.tsx:455-485`) altera o papel exibido e libera o painel. A interface trata isso como
  sessão. Não há validação no servidor.
- **Status:** CONFIRMADO POR LEITURA.
- **Aceite:** sessão e papel vêm do servidor; `localStorage` só guarda preferências não sensíveis;
  recarregar a página não mantém identidade forjada.

### F-03 — Navegação sem destino: `profile` (P1)

- **Evidência:** `Sidebar.tsx:336-343` define `setActiveView('profile')`; `app/page.tsx` não tem
  bloco para `activeView === 'profile'`. `ActiveView` inclui `profile` e `news`
  (`lib/store.tsx:55-64`), e `news` não é usada.
- **Impacto:** usuário logado clica em “favoritos” e vê área principal vazia, sem mensagem.
- **Status:** CONFIRMADO POR LEITURA.
- **Aceite:** toda entrada de menu tem tela; se não houver, o botão é removido; view inexistente
  não permanece no tipo.

### F-04 — Ações administrativas que só alteram o navegador (P1)

| Ação | Evidência | O que realmente acontece |
|---|---|---|
| Criar usuário | `lib/store.tsx:447-472` | Cria objeto local; **nenhuma chamada HTTP**; toast “registrada com sucesso” |
| Alterar status de pedido | `lib/store.tsx:574-594` | Altera `orders` local; toast de sucesso |
| Alterar status de produto | `lib/store.tsx:596-608` | Altera `products` local; toast de sucesso |
| Excluir post da comunidade | `lib/store.tsx:1025-1032` | Remove do estado local |
| Denunciar post | `lib/store.tsx:1018-1023` | Marca `is_reported` localmente |
| Aprovar PIX | `lib/store.tsx:822-836` + `AdminDashboard.tsx:987-992` | Chama Supabase (quando disponível), mas sem PSP nem verificação de dono |
| Sincronizar Supabase | `lib/store.tsx:610-632` | Essa é real (consulta serviços) |

- **Impacto:** o painel parece funcional, mas várias operações somem ao recarregar ou em outro
  navegador. Isso viola a regra de não apresentar simulação como sistema real.
- **Aceite:** cada botão tem efeito persistente comprovado ou é rotulado como demonstração;
  toast de sucesso só depois de resposta 2xx.

### F-05 — Solicitação de verificação de loja grava “rejected” (P1)

- **Evidência:** `services/stores.ts:87-100` envia `PATCH /api/stores` com
  `{ storeId, approve: false, docs }`; `lib/db-queries.ts:568-585` converte `approve: false` em
  `verification_status = 'rejected'`; `lib/store.tsx:892-910` exibe “pending” e “Solicitação Enviada”.
- **Impacto:** o lojista acredita que está em análise, mas o banco grava recusado; o painel admin
  pode não listar a solicitação como pendente.
- **Status:** CONFIRMADO POR LEITURA.
- **Aceite:** rota própria de solicitação grava `pending`; aprovação/recusa são ações separadas
  de supervisor/admin; frontend reflete o status retornado pelo servidor.

### F-06 — Checkout sem login e com pagamento fictício (P1)

- **Evidência:**
  - `components/CheckoutModal.tsx:56` só verifica `isCheckoutOpen`; não há gate de autenticação.
  - `:69-75` gera um payload PIX local e copia para a área de transferência;
  - `:125` afirma “Transação criptografada com custódia segura”;
  - `services/orderService.ts:7-20` gera PIX com `Math.random()`;
  - `lib/store.tsx:790-830` cria pedido local se a gravação falhar, com QR em `api.qrserver.com`.
- **Impacto:** o usuário pode concluir uma compra sem conta e acreditar que pagou; não há PSP,
  conciliação, estoque nem custódia. Risco de declaração falsa no TCC e perante usuários.
- **Status:** CONFIRMADO POR LEITURA.
- **Aceite:** checkout exige sessão; enquanto não houver PSP, a tela diz claramente “SIMULAÇÃO”;
  nenhum texto promete pagamento/custódia reais; pedido não é marcado como pago.

### F-07 — Lista global de usuários carregada para qualquer visitante (P1)

- **Evidência:** `lib/store.tsx:268` faz `fetch('/api/users?include_internal=true')` na
  inicialização, sem condição de admin, e guarda em `allUsers`; o painel exibe e-mails.
- **Impacto:** dados pessoais e contas internas ficam no navegador de qualquer visitante;
  alimenta a interface administrativa e expõe e-mails.
- **Aceite:** lista só é buscada após confirmação de papel admin no servidor; retorna apenas
  campos necessários; visitante nunca recebe a lista.

### F-08 — Dados de demonstração mascaram falhas reais (P2)

- **Evidência:** estado inicial usa `INITIAL_PRODUCTS`, `INITIAL_STORES`, `INITIAL_USERS`,
  `INITIAL_COMMUNITY_POSTS`, `INITIAL_COACHES` (`lib/store.tsx:181-189`); serviços caem para
  `INITIAL_*` em erro (`services/products.ts:43-50`, `services/stores.ts:26-28`).
- **Impacto:** com o backend fora, a home continua “cheia” e o usuário/testador não percebe que
  nada é persistente. Foi exatamente o que ocorreu no smoke test (API 500, home 200).
- **Aceite:** ambiente real mostra estado de erro/vazio quando a API falha; dados demo só em
  modo demo identificado.

### F-09 — Código órfão e duplicado (P2)

- `components/SmartScanView.tsx` órfão; `components/ui/{badge,card,dialog,form,input,separator,tabs,textarea}.tsx`
  sem importadores; cadeia `Header.tsx` → `shared/Header.tsx` não usada; várias subpastas são
  apenas reexportações.
- **Impacto:** manutenção confusa, risco de editar o arquivo errado, bundle maior.
- **Aceite:** inventário fechado com decisão “usar/remover”; nenhuma tela referencia arquivo morto.

### F-10 — Acessibilidade e responsividade não verificadas (P2)

- 23 avisos de ESLint `@next/next/no-img-element`: imagens sem `next/image`, sem dimensões
  explícitas (risco de CLS/LCP), em 10 componentes.
- Modais são `div` customizadas; **não foi identificado** tratamento explícito de foco/Escape na
  leitura feita — precisa ser conferido em execução.
- **Status:** NÃO VERIFICADO visualmente. Não há capturas nem teste de teclado/leitor de tela.
- **Aceite:** navegação por teclado nos fluxos principais, foco preso no modal, contraste e
  leitura em celular/desktop, com evidências reais.

### F-11 — Grafia do produto inconsistente (P2)

- `metadata.json` e `app/layout.tsx` usam **CoreMotiom**; documentos e repositório usam
  **CoreMotion**; o SQL usa “CORE MOTIOM”.
- **Impacto:** identidade visual e documentação divergentes.
- **Aceite:** grafia oficial aprovada pela equipe e aplicada de forma consistente (sem renomear
  identificadores técnicos sem necessidade).

---

## 3. Contratos de interface necessários

| Contrato necessário | Necessário para | Status hoje |
|---|---|---|
| Sessão real no servidor | Remover login demo e `localStorage` como fonte de verdade | Inexistente |
| Papel retornado pelo servidor | Menus, painel e estados “acesso negado” | Client-side por e-mail |
| `Supervisor` no modelo | Telas/menus do novo nível | Não existe |
| APIs autenticadas e com ownership | `createProduct`, `createStore`, pedidos, admin | Abertas |
| Contrato de erros 401/403/404/409 | Estados de interface | Inexistente |
| Lista de usuários administrativa | Painel admin | Pública |
| Verificação de loja correta | Fluxo do lojista | Grava `rejected` |
| Decisão sobre pagamento | Checkout | Simulação |

**Arquivos de interface:** `lib/store.tsx` e `lib/types.ts` têm guardião declarado no mapa de
propriedade da seção 3.1 do guia. Mudanças de outra frente são aditivas e não exigem aprovação
prévia; o contrato publicado é a referência.

---

## 4. Lotes propostos (aguardam aprovação do responsável da frente)

### Lote F0 — Remover falsa administração (P0) — frente 1

- Remover os botões de acesso rápido admin e o `loginAsMasterAdmin` da UI de produção.
- Remover o seletor “Modo”/simulação de papel do menu.
- Deixar de persistir `user` em `localStorage`; estado de sessão vem do servidor.
- Remover e-mail pessoal/lista de admins do bundle do cliente.
- **Aceite:** visitante não consegue abrir o painel; editar `localStorage` não muda papel;
  login demo não existe em produção; build cliente sem os e-mails master.

### Lote F1 — Navegação e estados (P1) — frente 2

- Implementar a tela de perfil/favoritos **ou** remover o botão; limpar `news`.
- Estados de carregamento, vazio, erro e “acesso negado” em marketplace, lojas, comunidade e admin.
- **Aceite:** nenhum menu leva a área vazia; falha de API visível e tratada.

### Lote F2 — Ligar as telas ao backend real (P1) — frente 1 no painel; frente 2 na verificação de loja

- `adminCreateUser`, status de pedido, status de produto, moderação de posts e denúncia passam a
  chamar endpoints reais.
- Corrigir a solicitação de verificação (`pending`).
- **Aceite:** recarregar a página mantém o efeito; toast só após 2xx; operações auditadas.

### Lote F3 — Checkout e linguagem (P1) — frente 2

- Exigir login; rotular simulação; remover “custódia segura/pagamento seguro” enquanto não houver PSP.
- **Aceite:** pedido sem sessão é bloqueado; nenhum texto promete serviço financeiro inexistente.

### Lote F4 — Acessibilidade, responsividade e limpeza (P2) — cada frente no próprio escopo

- Revisão de teclado/foco/contraste, imagens com dimensões, remoção de órfãos.
- **Aceite:** checklist com capturas reais em celular e desktop; nenhum warning novo.

---

## 5. Cenários de teste (para a frente de verificação)

1. Visitante abre a home, marketplace e lojas; nenhuma lista de usuários é carregada.
2. Visitante tenta abrir `/admin`/painel: recebe acesso negado; não há botão de virar admin.
3. Editar `localStorage` e recarregar: papel não muda.
4. Login com senha errada: falha; nenhuma sessão é criada.
5. Usuário comum tenta chamar API administrativa: 401/403.
6. Lojista solicita verificação: status `pending` no banco e na tela.
7. Supervisor aprova loja; usuário comum não consegue.
8. Admin cria usuário e recarrega: usuário persiste; ação registrada.
9. Checkout sem login: bloqueado; com login: pedido persistido com total do servidor.
10. Falha de API: UI mostra erro, não sucesso nem dados demo.

## 6. Capturas necessárias ao TCC (a produzir pela equipe)

- Home, marketplace com filtros, detalhe de produto, loja, painel admin (com dados fictícios),
  tela de acesso negado, verificação de loja em `pending`, checkout com aviso de simulação.
- Todas com legenda, data, versão e ocultação de dados pessoais. **Nenhuma captura foi gerada
  nesta rodada.**

---

## 7. O que não foi verificado

- Aparência real, responsividade e comportamento em navegador.
- Console do navegador, rede e erros de hidratação.
- Foco de teclado e leitores de tela.
- Persistência real (backend inacessível no sandbox).
- Existência de dados demo em produção.

**Nenhuma conclusão de “frontend pronto” pode ser registrada.**
