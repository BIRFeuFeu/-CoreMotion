# Auditoria de backend, banco e segurança (transversal)

> **Insumo compartilhado entre as frentes.** Não é tarefa de uma pessoa: os achados estão
> distribuídos por domínio. A frente 1 (identidade, acesso e administração) responde por
> B-01 a B-08, B-14 e B-15; a frente 2 (catálogo, negócio e comunidade) responde pelos mesmos
> controles nas rotas do seu domínio e por B-09 a B-13 e B-16 no próprio escopo.

**Projeto:** CoreMotion
**Etapa:** 5
**Data:** 19/10/2026
**Branch:** `arena/92deaf3d-coremotion`
**Commit auditado:** `4f2c1d8`
**Modo:** somente leitura; nenhuma migração, seed ou alteração de banco foi executada
**Autor da rodada:** Arena (assistente integrador) — revisão humana obrigatória

**Status dos achados:** `CONFIRMADO POR LEITURA` = código/configuração verificados;
`VERIFICADO EM EXECUÇÃO` = comportamento observado no ambiente; `NÃO VERIFICADO` = depende do
banco real, de credenciais ou de exploração controlada.

> Leia junto com `incidente-credenciais-expostas.md` (P0) e `matriz-permissoes.md` (proposta).

---

## 1. Escopo e método

Auditados:

- `app/api/**` (rotas HTTP), `app/actions/**` (Server Actions);
- `services/**` (Auth, produtos, lojas, pedidos, comunidade);
- `lib/db.ts`, `lib/db-queries.ts`, `lib/supabase.ts`, `lib/types.ts`, `lib/schemas/**`;
- `supabase/migrations/**` e `scripts/*.mjs` relevantes;
- `middleware.ts`, `.env.example`, `next.config.ts`;
- comportamento em build e em execução local.

Limitações: o sandbox não alcança o Supabase. As rotas `/api/*` responderam **500**
(`ECONNRESET` / `Connection terminated unexpectedly`). Portanto **não houve teste de
exploração contra banco real**; os problemas abaixo foram confirmados no código e no SQL.

---

## 2. Sumário executivo

O sistema **não possui uma fronteira de autorização no servidor**. A autenticação é feita no
navegador (Supabase Auth + `localStorage`), mas as rotas HTTP e Server Actions aceitam
identificadores e papéis enviados pelo cliente. Além disso, existe um caminho de login que
ignora a falha do Supabase Auth, um administrador definido por e-mail/prefixo e políticas RLS
que permitem autopromoção. O banco usado pelas APIs (`public.users`) **não pode ser criado pelos
scripts do repositório**. Por fim, uma credencial de banco está exposta em repositório público
e no bundle do navegador.

**Nenhum critério de conclusão da frente de identidade e segurança está atendido hoje.**

---

## 3. Achados

### B-01 — Credencial PostgreSQL exposta (P0)

- **Evidência:** `lib/db.ts:8-9` (fallback com usuário/senha), `components/SupabaseConfigModal.tsx:29`
  (template `.env` em componente `'use client'`); 2 ocorrências no bundle cliente.
- **Impacto:** acesso direto ao banco como `postgres`, fora de Auth/RLS; vazamento de dados
  pessoais e possibilidade de alteração/exclusão.
- **Status:** CONFIRMADO POR LEITURA + VERIFICADO NO BUILD (string no bundle).
- **Ação:** ver `incidente-credenciais-expostas.md`.

### B-02 — Rotas administrativas sem autenticação nem autorização (P0)

| Rota / método | O que permite hoje | Evidência |
|---|---|---|
| `GET /api/users` | Lista todos os usuários e e-mails | `app/api/users/route.ts:15-38` |
| `GET /api/users?include_internal=true` | Inclui contas internas/master | idem, linhas 18-25 |
| `PATCH /api/users` | `updateRole`, `ban`, `unban`, `updateProfile` de qualquer usuário | linhas 40-113 |
| `DELETE /api/users` | Exclui usuário de `public.users` e de `auth.users`/`auth.identities` | linhas 115-133; `lib/db-queries.ts:212-241` |
| `POST /api/products` | Cria produto com `seller_id` do corpo | `app/api/products/route.ts:47-58` |
| `DELETE /api/products?id=` | Apaga qualquer produto | linhas 60-76 |
| `POST/PATCH /api/stores` | Cria loja e aprova/rejeita verificação | `app/api/stores/route.ts:33-83` |
| `POST/DELETE /api/listings` | Cria/apaga anúncio C2C | `app/api/listings/route.ts:44-66` |
| `POST /api/auth/sync` | Cria/atualiza usuário por `supabaseId`, `email` e `role` arbitrários | `app/api/auth/sync/route.ts:8-28` |

- **Impacto:** qualquer pessoa na internet pode promover-se a admin, banir/excluir contas, criar
  ou apagar produtos/lojas. Não é necessário estar logado.
- **Status:** CONFIRMADO POR LEITURA. A execução não pôde ser testada por falta de banco no sandbox.
- **Observação:** não existe helper de sessão em nenhuma rota (`grep` por `getUser`, `auth.getUser`,
  `cookies` em `app/api` não encontra verificação).

### B-03 — Login aceita senha inválida (P0)

- **Evidência:** `services/auth.ts:88-134`. Se `signInWithPassword` retorna erro, o código apenas
  registra `console.warn` (linhas 112-115) e segue para `syncSessionWithDb` (linha 123), retornando
  `{ success: true }` na linha 129.
- **Agravante:** `syncSessionWithDb` usa `supabaseId` gerado (`usr_<timestamp>`) e, ao encontrar o
  e-mail já cadastrado, **associa esse ID arbitrário ao registro existente**
  (`lib/db-queries.ts:143-157`). Com o banco acessível, o fluxo permite entrar em qualquer conta
  apenas informando o e-mail, sem senha válida.
- **Impacto:** tomada de conta e bypass total do Supabase Auth.
- **Status:** CONFIRMADO POR LEITURA; exploração NÃO VERIFICADA.
- **Correção:** falhar imediatamente quando o Auth falhar; nunca sincronizar perfil sem sessão
  verificada; `syncSessionWithDb` deve receber o `id` do usuário autenticado no servidor.

### B-04 — Autopromoção no cadastro via metadado (P0)

- **Evidência:** `supabase/migrations/20250101000000_coremotiom_initial_schema.sql:159-165`
  (trigger `handle_new_user`): se `raw_user_meta_data->>'role'` estiver em
  `('admin','merchant','seller','user')`, esse papel é gravado.
- **Como explorar:** a anon key é pública; qualquer pessoa pode chamar `supabase.auth.signUp`
  diretamente com `options.data.role = 'admin'` e receber `profiles.role = 'admin'`.
- **Agravante no app:** `services/auth.ts:139-147` aceita `requestedRole` do chamador e o envia
  ao Supabase; o tipo `UserRole` inclui `admin`.
- **Status:** CONFIRMADO POR LEITURA (SQL + código).
- **Correção:** papel **nunca** vem do cliente; trigger deve sempre gravar `user`; promoção apenas
  por operação administrativa autenticada, com auditoria.

### B-05 — Administrador definido por e-mail e prefixo (P0)

- **Evidência:**
  - `supabase/migrations/...:30-41` — `is_admin()` compara `auth.jwt()->>'email'` com um e-mail
    pessoal e consulta `profiles` por esse e-mail ou `role = 'admin'`.
  - `...:159` e `:204` — trigger promove qualquer e-mail `LIKE 'mattheusxmljz%'`.
  - `services/auth.ts:10-20`, `services/authService.ts:15-22`, `lib/db-queries.ts:11-18` —
    `startsWith('mattheusxmljz')` e `startsWith('professorchines')`; quatro e-mails fixos.
  - `lib/store.tsx:32-38` — a mesma lista é exposta ao cliente.
- **Impacto:** privilégio baseado em dado que o usuário controla no cadastro (parte local do e-mail),
  além de acoplamento a uma pessoa. Uma conta `mattheusxmljz...@outro-dominio` recebe admin.
- **Status:** CONFIRMADO POR LEITURA.
- **Correção:** remover regra por e-mail/prefixo; criar bootstrap administrativo único, fora do
  fluxo público, documentado e auditado.

### B-06 — RLS permite autopromoção de papel (P1)

- **Evidência:** `supabase/migrations/...:234-236`
  `profiles_update_policy ... FOR UPDATE USING (auth.uid() = id OR public.is_admin())`
  sem `WITH CHECK` sobre colunas e com a coluna `role` liberada.
- **Como explorar:** com a anon key e sessão autenticada, `PATCH /rest/v1/profiles?id=eq.<uid>`
  com `{"role":"admin"}`. `is_admin()` passa a retornar verdadeiro (lê `profiles.role`).
- **Status:** CONFIRMADO POR LEITURA (política definida no repositório); **a política estar
  aplicada no banco real é NÃO VERIFICADO**.
- **Correção:** trigger que bloqueia alteração de `role`, `email`, `store_id` por não-admin;
  `WITH CHECK` explícito; separar atualização de perfil de administração.

### B-07 — Políticas de INSERT amplas e `GRANT ALL` (P1)

- **Evidência:** `...:249`, `:266`, `:283`, `:300` — `OR auth.role() = 'authenticated'` permite
  inserir loja/produto/pedido/post com `owner_id`/`seller_id`/`user_id`/`author_id` de outra pessoa.
- `...:312-314` — `GRANT ALL` em tabelas, sequências e rotinas para `anon` e `authenticated`.
- **Impacto:** falsificação de anúncios/pedidos em nome de terceiros; superfície excessiva.
- **Status:** CONFIRMADO POR LEITURA; aplicação no banco NÃO VERIFICADA.
- **Correção:** remover o `OR authenticated`; exigir `auth.uid() = <coluna de dono>`; conceder
  apenas privilégios necessários (`SELECT/INSERT/UPDATE` específicos).

### B-08 — Modelo de dados incompatível e banco não recriável (P1)

- As APIs usam `public.users` (`lib/db-queries.ts:84-200`), com colunas `id` numérico, `handle`,
  `password_hash`, `banned`, `supabase_id`, `is_demo`.
- **Nenhuma migração ou script cria `public.users`**: a migração cria `profiles`, `stores`,
  `products`, `orders`, `community_posts`
  (`supabase/migrations/20250101000000_coremotiom_initial_schema.sql:12-140`).
  `scripts/organize-database.mjs:58-75` faz `INSERT INTO public.users` sem `CREATE TABLE`.
- Há três definições divergentes de papel:
  - `lib/types.ts:1` — `visitor | user | seller | admin`;
  - migração — `admin | merchant | seller | user` (sem `visitor`, sem `supervisor`);
  - `lib/db-queries.ts:49 e 112` — grava `athlete` como padrão.
- `lib/supabase.ts` contém outro schema (`user_role` com `visitor`) que não é aplicado.
- **Impacto:** um ambiente limpo não sobe; migrações não representam o banco usado; papéis
  inconsistentes quebram RLS e permissões.
- **Status:** CONFIRMADO POR LEITURA.
- **Correção:** decidir um único modelo (proposta na matriz), criar migração incremental que
  reconcilie `users`/`profiles`, com validação de dados e plano de reversão. Não editar migração
  já aplicada.

### B-09 — E-mails de todos os usuários expostos a qualquer visitante (P1)

- **Evidência:** `lib/store.tsx:268` chama `fetch('/api/users?include_internal=true')` no
  carregamento da aplicação, para qualquer visitante, e guarda tudo em `allUsers`.
  `app/api/users/route.ts:18-25` devolve inclusive contas internas.
- **Impacto:** vazamento de dados pessoais (LGPD) e de contas administrativas; também alimenta
  ataques de engenharia social.
- **Status:** CONFIRMADO POR LEITURA; resposta real bloqueada no sandbox.
- **Correção:** endpoint administrativo autenticado, campos mínimos, paginação e justificativa;
  nunca carregar lista global no cliente público.

### B-10 — Pagamento e custódia simulados apresentados como reais (P1)

- **Evidência:**
  - `services/orderService.ts:7-20` — PIX montado com `Math.random()`, sem PSP.
  - `components/CheckoutModal.tsx:70` — outro PIX gerado no navegador; QR via `api.qrserver.com`.
  - `components/CheckoutModal.tsx:125` — “Transação criptografada com custódia segura”.
  - `lib/store.tsx:822-836` — `confirmPaymentSandbox` grava `payment_status = 'completed'` e
    toast “custódia garantida”.
  - `services/orderService.ts:130-156` — `UPDATE orders` pelo cliente Supabase, sem checar dono
    no código (a RLS é a única barreira; ver B-06/B-07).
- **Impacto:** usuário pode acreditar que pagou; pedido é marcado como pago sem transação;
  risco reputacional e jurídico; viola a regra da Etapa 5 de não afirmar integração financeira.
- **Status:** CONFIRMADO POR LEITURA.
- **Correção:** rotular como SIMULAÇÃO em todos os pontos, remover promessas de custódia e
  implementar pagamento real somente se estiver no escopo aprovado.

### B-11 — Server Actions confiam em identidade e preço do cliente (P1)

- **Evidência:**
  - `app/actions/products.ts:7-31` — `serverCreateProduct(inputData, userId?)` grava
    `seller_id: userId || 'anon'`; não lê sessão.
  - `app/actions/stores.ts:7-30` — `serverCreateStore(formData, userId?)` idem para `owner_id`.
  - `app/actions/orders.ts:7-46` — recebe `cartItems`, `userId`, `userEmail`; calcula total a
    partir de preços enviados pelo cliente; não relê produto nem valida estoque.
  - `app/actions/orders.ts:38` — usa `address.phone` como `userEmail` quando ausente.
- **Impacto:** criação de registros em nome de terceiros e manipulação de valores.
- **Status:** CONFIRMADO POR LEITURA.
- **Correção:** Server Action lê sessão no servidor; preços e estoque vêm do banco; total calculado
  no servidor; validar propriedade e estados.

### B-12 — Duas implementações concorrentes de Auth/Produtos/Lojas (P2)

- `services/index.ts:1-7` exporta `./auth` e `./products`/`./stores` (via `/api`), mas **não**
  exporta `authService.ts`, `productService.ts` nem `storeService.ts`.
- O frontend usa `services/auth.ts` + `/api/*`; as Server Actions usam `services/authService.ts`,
  `productService.ts`, `storeService.ts` (Supabase direto).
- **Impacto:** regras diferentes conforme o caminho, fallbacks distintos, difícil de testar.
- **Status:** CONFIRMADO POR LEITURA.
- **Correção:** escolher uma camada (recomendado: Server Actions/Route Handlers com Supabase
  server-side) e apagar a duplicata.

### B-13 — Ausência de validação nas rotas e erros internos expostos (P2)

- `POST /api/products` e `/api/stores` repassam o corpo direto para o banco, sem Zod.
- `PATCH /api/users` aceita `newRole` como string e converte com `as UserRole`
  (`app/api/users/route.ts:59`), sem validar o enum.
- Todas as rotas devolvem `error.message` do banco ao cliente (ex.: `Connection terminated`,
  `read ECONNRESET`), expondo detalhes de infraestrutura.
- **Status:** CONFIRMADO POR LEITURA/EXECUÇÃO local.
- **Correção:** validar com schemas compartilhados, responder erros genéricos com `requestId` e
  registrar o detalhe no servidor.

### B-14 — Middleware não protege nada (P2)

- `middleware.ts:5-25` apenas adiciona o header `x-coremotiom-platform`; não verifica sessão.
  O matcher ainda exclui `_next/*` e o código retorna cedo para `/api`.
- **Impacto:** falsa sensação de proteção; nenhuma rota é barrada.
- **Status:** CONFIRMADO POR LEITURA.
- **Correção:** middleware/helper de sessão para páginas administrativas; APIs sempre verificam
  sessão no handler (middleware não substitui autorização por recurso).

### B-15 — Exclusão de usuário mexe em `auth.users` e não tem auditoria (P2)

- `lib/db-queries.ts:212-241` — apaga de `public.users`, `auth.identities` e `auth.users` com a
  credencial `postgres`, em melhor esforço, sem transação e sem registro de auditoria.
- **Impacto:** operação irreversível, possível inconsistência entre Auth e perfil.
- **Status:** CONFIRMADO POR LEITURA.
- **Correção:** exclusão lógica/anonimização, transação, registro de quem executou e motivo.
 
### B-16 — SSL relaxado e configuração frágil (P3)

- `lib/db.ts:52-55` usa `ssl: { rejectUnauthorized: false }`.
- `resolveDatabaseUrl` substitui silenciosamente URLs inválidas pela credencial padrão.
- **Status:** CONFIRMADO POR LEITURA.
- **Correção:** validar CA do Supabase ou usar pooler com TLS verificado; falhar explicitamente
  quando a configuração estiver ausente.

---

## 4. Situação atual da hierarquia

| Papel exigido | Existe? | Onde | Observação |
|---|---|---|---|
| Administrador | Parcial | `admin` em `lib/types.ts`, `profiles.role`, `users.role` | Concedido por e-mail, prefixo, metadado e demo no cliente |
| Supervisor | **Não** | nenhum arquivo | `grep` não encontra ocorrência no código |
| Usuário | Sim | `user` | Compartilha o mesmo modelo com `seller` |
| Lojista (negócio) | Sim | `seller` | Não é Supervisor |
| Visitante | Sim | `visitor` | Só no frontend; não existe no SQL |

**Critérios de conclusão da frente de identidade e segurança: todos PENDENTES ou NÃO VERIFICADOS.**
Não há teste positivo/negativo executável enquanto não existir ambiente de banco isolado.

---

## 5. Evidências de execução (reais)

```
npm run type-check  -> exit 0
npm run lint        -> 0 erros, 23 warnings (no-img-element)
npm run build       -> sucesso, Next.js 15.5.28
GET /               -> 200
GET /api/products   -> 500 {"success":false,"error":"Connection terminated unexpectedly"}
GET /api/stores     -> 500 {"success":false,"error":"read ECONNRESET"}
GET /api/users      -> 500 {"success":false,"error":"read ECONNRESET"}
```

O 500 é consequência do bloqueio de rede do sandbox ao Supabase, **não** de uma falha de build.
Ele confirma que a aplicação não tem fallback de API: sem banco, o catálogo cai para dados locais
(`INITIAL_*`), mas as rotas falham.

---

## 6. Proposta de correção em lotes

### Lote B0 — Segredos (P0) — frente 1 — requer autorização

- Rotacionar credenciais (ação humana); remover fallbacks de `lib/db.ts`, `lib/supabase.ts`,
  `services/supabaseClient.ts` e o template de `SupabaseConfigModal.tsx`.
- **Aceite:** build cliente não contém a string antiga; app falha explicitamente sem env;
  `.env.example` sem valores; histórico tratado após rotação.

### Lote B1 — Sessão e autorização (P0/P1) — frente 1 no núcleo; frente 2 nas rotas do catálogo

- Helper único de sessão server-side (Supabase SSR/cookies), aplicado em todas as rotas e actions.
- Nenhum `userId`, `role`, `seller_id`, `owner_id` ou preço vindo do cliente.
- `/api/users` só para admin; negar 401/403 com mensagem genérica.
- **Aceite:** chamadas anônimas retornam 401; usuário comum recebe 403 em ação administrativa;
  alterar corpo/URL não promove ninguém; testes negativos registrados.

### Lote B2 — Autenticação e papéis (P0/P1) — frente 1

- Uma única implementação de Auth; login falha fechado; remover e-mails/prefixos master;
  trigger grava sempre `user`; bootstrap admin documentado.
- **Aceite:** senha errada nunca cria sessão; cadastro com `role=admin` no metadata não promove;
  conta comum não altera o próprio papel no banco.

### Lote B3 — Banco e RLS (P1) — frente 1, com as políticas do catálogo sob responsabilidade da frente 2

- Migração incremental reconciliando `users`/`profiles`; papel `supervisor`; policies corrigidas
  (sem `OR authenticated`, `WITH CHECK` e proteção de `role`); grants mínimos; scripts de criação
  de ambiente limpo + seed separado e rotulado.
- **Aceite:** banco vazio recriado só com scripts do repositório; RLS testada com três perfis;
  script de reversão documentado.

### Lote B4 — Pagamento e dados (P1/P2) — frente 2; auditoria de operações pela frente 1

- Remover promessas de custódia; rotular sandbox; cálculo de pedido no servidor; minimizar dados
  de usuários; auditoria de operações administrativas.
- **Aceite:** nenhum texto afirma pagamento real; total não manipulável pelo cliente; log de
  quem alterou papel/ban/verificação.

---

## 7. O que não foi verificado

- Se as políticas RLS do repositório estão realmente aplicadas no banco de produção.
- Se o banco contém dados reais de terceiros e qual o volume exposto.
- Se houve acesso indevido usando a credencial vazada (somente logs do Supabase).
- Se o modal `SupabaseConfigModal` é acessível pela interface e se o bundle publicado já foi baixado.
- Testes de autorização em execução (dependem de banco isolado e contas de teste).

**Nenhuma afirmação de "segurança validada" pode ser feita nesta etapa.**
