> Esta parte vale para **qualquer** entregável de documentação. Ela descreve o produto real, tela por tela,
> serviço por serviço e tabela por tabela. Se você é um chat novo do Arena e não tem acesso ao repositório,
> use esta seção como a fonte de verdade do que existe no site; se tiver acesso, confirme os detalhes em
> `app/`, `components/`, `services/`, `lib/`, `app/api/` e `supabase/migrations/`.

### 3.1 O produto

**CoreMotiom** (grafia do repositório: `CoreMotiom` / remote `BIRFeuFeu/-CoreMotion`) é uma plataforma e
marketplace esportivo de alta performance. A proposta combina três ofertas no mesmo app:

| Oferta | Como funciona |
| --- | --- |
| **B2C — Lojas oficiais** | Marcas e lojas parceiras criam loja (`CreateStoreModal`), pedem o **selo de loja verificada** (CNPJ) e vendem catálogo novo pelo painel da loja. |
| **C2C — Atletas** | Atleta anuncia equipamento seminovo/usado (`SellC2CView`), com condição, preço, fotos e localização. |
| **Serviços & comunidade** | Feed social por categoria (5 categorias), curtidas/comentários e assessoria esportiva com treinadores (agendamento por modal). |

Diferenciais declarados na interface: **compra com custódia** (escrow), **PIX com 5% de desconto**,
**homologação de lojas por auditoria** e **painel administrativo executivo** com GMV e taxa de custódia de 4,5%.

- Tagline: `Plataforma & marketplace esportivo de alta performance`
- Stack de produto: `Next.js 15 · React 19 · TypeScript · Supabase / PostgreSQL · Tailwind CSS v4`
- Repositório: `BIRFeuFeu/-CoreMotion` · gerado em {{DATA_GERACAO}}

### 3.2 Stack, build e dependências

| Camada | O que é usado |
| --- | --- |
| Framework | **Next.js 15.4** (App Router) + **React 19.2** + TypeScript 5.9 |
| Estilo | **Tailwind CSS v4** (`@tailwindcss/postcss`, `tw-animate-css`, `@tailwindcss/typography`), tema escuro próprio em `app/globals.css` |
| UI | Radix UI (`dialog`, `label`, `separator`, `slot`, `tabs`), `lucide-react` (ícones), `motion` (animações), `class-variance-authority` + `clsx` + `tailwind-merge` (helpers de classe) |
| Formulários/validação | `react-hook-form` + `@hookform/resolvers` + **zod 4** (schemas em `lib/schemas/`) |
| Dados/Auth | `@supabase/supabase-js` (Auth + Postgres + RLS) e `pg` (scripts de seed/migração fora do app) |
| IA | `@google/genai` (Gemini) — usado pelo componente órfão `SmartScanView` |
| Scripts | `npm run dev · build · start · lint · type-check · ci` e os geradores de documentação (`flow`, `flow:html`, `flow:pdf`, `flow:uc`, `mestres`) |

Deploy/infra: variáveis de ambiente definidas em `.env.example` (ver §3.12). O app **funciona sem Supabase
configurado**: nesse caso, o estado vive no `localStorage` e nos dados iniciais de `lib/initial-data.ts`.

### 3.3 Papéis, sessão e regras de acesso

`UserRole = 'visitor' | 'user' | 'seller' | 'admin'` (`lib/types.ts`).

| Papel | Como é obtido | O que pode |
| --- | --- | --- |
| **Visitante** (`visitor`, sem conta) | Estado inicial quando não há sessão | Navegar Home, Marketplace, Lojas, Treinadores e Feed; busca ⌘K e filtros; curtir post; **comprar sem login** (pedido criado como `guest-user`) e usar o acesso rápido de demonstração |
| **Atleta / Usuário** (`user`) | Cadastro “Atleta C2C” ou login | Tudo do visitante + favoritar, publicar/comentar no feed, agendar treinador, anunciar C2C e criar loja (vira `seller`) |
| **Lojista** (`seller`) | Cadastro “Lojista B2C”, criação de loja ou promoção pelo admin | Tudo do atleta + loja oficial, catálogo B2C e solicitação do selo verificado |
| **Super Admin** (`admin`) | E-mail na lista master | Tudo + o item “Painel Admin” na sidebar e os 8 módulos executivos; demais perfis veem “Acesso Restrito” |

- **E-mails master** (`lib/store.tsx → ADMIN_EMAILS` e `services/authService.ts → MASTER_ADMIN_EMAILS`):
  `mattheusxmljz@gmail.com`, `professorchines2026@gmail.com`, `operacaoamd@gmail.com`, `admin@coremotiom.com`.
- `isMasterAdmin(email)` aceita a lista **ou** prefixos `mattheusxmljz` e `professorchines` (tolerância a alias de e-mail).
- **Guarda de acesso:** só client-side (`isUserAdmin`) + `AdminDashboard` renderizando “Acesso Restrito”. O `middleware.ts` **não** protege `/admin` nem as APIs — ver §3.13.
- **Acesso rápido de demonstração** (`switchRole()` / `loginAsMasterAdmin()`): 3 atalhos (Super Admin, Lojista Pro, Atleta) usados em testes e demonstrações.

### 3.4 Telas, navegação e modais globais

`ActiveView` (`lib/store.tsx`) e a sidebar (`components/Sidebar.tsx`) definem a navegação:

| View | Componente | O que tem |
| --- | --- | --- |
| `home` | `HomeHeroAndHighlights` | Hero, destaques, vitrines de produtos e lojas, atalhos |
| `marketplace` | `MarketplaceView` + `ProductCard` | Grid com busca, filtros (categoria, modalidade, condição, selo) e ordenação |
| `stores` | `StoresView` | Lojas oficiais, filtro por selo verificado, abertura da loja |
| `sell` | `SellC2CView` | Formulário de anúncio C2C (título, descrição, preço, condição, fotos) e “Meus anúncios” |
| `coaches` | `CoachesView` | Perfis de treinadores, especialidades e modal de agendamento |
| `community` | `CommunityView` | Feed com criação de post, 5 categorias, curtir e comentar |
| `admin` | `AdminDashboard` | Painel executivo com 8 módulos (ver §10) |
| `profile` | — | **Declarada e sem tela**: “Meus Favoritos”/avatar levam para uma view vazia (lacuna nº 1) |
| `news` | — | **Declarada e sem tela**: `INITIAL_NEWS` é carregado e nenhum componente consome (lacuna nº 2) |

**Modais globais** (montados no shell, abertos por qualquer view):

| Modal | Responsabilidade |
| --- | --- |
| `AuthModal` | 4 modos: `login`, `register`, `forgot`, `switch`; validação zod, login social, cadastro com tipo de conta |
| `CheckoutModal` | Endereço, frete, pagamento (PIX/cartão/boleto), resumo e criação do pedido com custódia |
| `ProductDetailModal` | Ficha do produto, galeria, vendedor, selo, frete por CEP e adicionar ao carrinho |
| `CreateStoreModal` | Criação da loja oficial (nome, slug, categoria, contato) |
| `SupabaseConfigModal` | Diagnóstico de configuração do Supabase e sincronização manual (`adminSyncSupabase`) |

Também existem `Header` (busca ⌘K, carrinho, avatar) e `Footer` compartilhados, e as telas de sistema
`app/error.tsx`, `app/not-found.tsx` e `app/auth/callback/page.tsx` (retorno do OAuth).

### 3.5 Componentes do app (inventário)

{{INVENTARIO_COMPONENTES}}

> Atenção: `AuthModal`, `MarketplaceView`, `ProductCard`, `ProductDetailModal`, `StoresView`,
> `CreateStoreModal`, `Footer` e `AdminDashboard` existem na **raiz de `components/`** e também em subpastas
> (`components/auth/…` etc.) que apenas reexportam. Editar o arquivo errado é uma armadilha real (lacuna nº 4).

### 3.6 Camada de serviços, API e ações de servidor

**Services de domínio** (`services/`), todos delegando para Supabase quando configurado:

{{INVENTARIO_SERVICES}}

**Rotas de API** (App Router, JSON):

| Rota | Métodos | Papel |
| --- | --- | --- |
| `/api/products` | `GET · POST · DELETE` | Listar/criar/remover produtos (catálogo B2C e C2C) |
| `/api/stores` | `GET · POST · PATCH` | Listar/criar lojas e revisar verificação (admin) |
| `/api/listings` | `GET · POST · DELETE` | Anúncios C2C do atleta |
| `/api/users` | `GET · PATCH · DELETE` | Perfis, papéis e banimento (admin) |
| `/api/auth/sync` | `GET · POST` | Sincroniza a sessão do Supabase Auth com `profiles` |

Há também **variantes funcionais** fora de classe (`services/products.ts`, `stores.ts`, `listings.ts`,
`auth.ts`) usadas por telas específicas, e **server actions** em `app/actions/{auth,orders,products,stores}.ts`
(`serverLogin`, `serverSignUp`, `serverProcessCheckout`, `serverCreateProduct`, `serverCreateStore`) que
**não são chamadas por nenhum componente** — os componentes falam direto com services/Supabase (lacuna nº 6).

### 3.7 Banco de dados (PostgreSQL + RLS)

Migração única: `supabase/migrations/20250101000000_coremotiom_initial_schema.sql` (5 tabelas, 20 políticas
RLS, 8 índices, extensões `uuid-ossp`/`pgcrypto`, função `public.is_admin()`).

| Tabela | Colunas principais |
| --- | --- |
| `profiles` | `id UUID PK → auth.users`, `email UNIQUE`, `name`, `avatar_url`, `phone`, `role CHECK (admin·merchant·seller·user) DEFAULT 'user'`, `city DEFAULT 'São Paulo'`, `state DEFAULT 'SP'`, `sport_interests TEXT[] DEFAULT {Corrida, Alta Performance}`, `store_id`, timestamps |
| `stores` | `id`, `owner_id → profiles`, `name`, `slug UNIQUE`, `description`, `logo_url`, `banner_url`, `category`, `is_verified`, `verification_status CHECK (none·pending·verified·rejected)`, `verification_requested_at`, `verification_docs JSONB`, `cnpj`, `business_type DEFAULT 'store'`, `contact_email`, `contact_phone`, `location`, `rating`, `sales_count`, `products_count`, timestamps |
| `products` | `id`, `title`, `description`, `price`, `original_price`, `category`, `sport`, `condition DEFAULT 'novo'`, `product_type CHECK (b2c·c2c)`, `images TEXT[]`, `seller_id → profiles`, `seller_name`, `seller_avatar`, `store_id → stores`, `store_name`, `is_verified_store`, `stock`, `views`, `likes_count`, `location`, `shipping_available`, `status CHECK (active·draft·sold·suspended)`, `brand`, `tags TEXT[]`, timestamps |
| `orders` | `id`, `user_id → profiles`, `user_email`, `items JSONB`, `subtotal`, `shipping_fee`, `discount`, `total`, `payment_method`, `payment_status CHECK (pending·approved·paid·cancelled·refunded)`, `pix_code`, `pix_qr_base64`, `shipping_address JSONB`, `shipping_method DEFAULT 'pac'`, `order_status CHECK (pending_payment·escrow_locked·preparing·shipped·delivered·completed·cancelled)`, `tracking_code`, timestamps |
| `community_posts` | `id`, `author_id → profiles`, `author_name`, `author_avatar`, `author_badge`, `category`, `title`, `content`, `image_url`, `likes_count`, `comments_count`, `comments JSONB`, `is_reported`, `report_reason`, `created_at` |

- **`is_admin()`** libera o admin de verdade no banco: e-mail `mattheusxmljz@gmail.com` **ou** `profiles.role = 'admin'`.
- **RLS**: 4 políticas por tabela (select/insert/update/delete). Escrita é amarrada a `auth.uid()`; o admin passa por `is_admin()`.
- **Índices**: `products(category·sport·status·product_type)`, `stores(verification_status)`, `orders(user_id·order_status)`, `community_posts(category)`.
- **Divergências documentadas** entre migração e app (importantes ao reproduzir telas):
  1. `profiles.role` no banco aceita `admin·merchant·seller·user`; o app usa `visitor·user·seller·admin` — `visitor` não existe no banco (é estado de sessão).
  2. `orders.order_status` no banco tem `escrow_locked` e `completed`; o TypeScript (`lib/types.ts`) tipa `pending_payment·paid·preparing·shipped·delivered·cancelled` — o status `paid` do app não existe no CHECK do banco.
  3. `orders.payment_status` no banco aceita `approved`; o app trabalha com `pending·completed·failed·refunded`.
  4. **Carrinho e favoritos não têm tabela**: vivem só no `localStorage` e não sincronizam entre dispositivos (lacuna nº 13).

### 3.8 Estado global, persistência e dados iniciais

- **`lib/store.tsx`** é o coração do cliente: contexto `CoreMotiomProvider` com `activeView`, `selectedProduct`,
  `selectedStore`, `user`, `allUsers`, `products`, `stores`, `orders`, `communityPosts`, `favorites`, `cart`,
  `toasts` e as flags dos modais (`isAuthModalOpen`, `authModalMode`, `isCheckoutOpen`, `isCreateStoreModalOpen`,
  `isSupabaseConfigOpen`).
- **Ações expostas** (nomes reais, usados nos diagramas): `setActiveView`, `addToCart`, `removeFromCart`,
  `clearCart`, `toggleFavorite`, `createOrder`, `confirmPaymentSandbox`, `createProduct`, `deleteProduct`,
  `createStore`, `requestStoreVerification`, `createCommunityPost`, `likeCommunityPost`, `addCommunityComment`,
  `reportCommunityPost`, `adminDeleteCommunityPost`, `adminUpdateOrderStatus`, `adminToggleProductStatus`,
  `adminVerifyStore`, `adminBanUser`, `adminUnbanUser`, `adminDeleteUser`, `adminCreateUser`, `adminSyncSupabase`,
  `updateUserProfile`, `switchRole`, `loginAsMasterAdmin`, `loginWithEmail`, `logout`, `addToast`, `removeToast`.
- **Persistência em duas camadas**: Supabase quando `NEXT_PUBLIC_SUPABASE_URL`/`ANON_KEY` existem; caso
  contrário, `localStorage` sob a chave **`coremotiom_state_v1`** (produtos, lojas, pedidos, posts, usuários,
  carrinho e favoritos).
- **Dados iniciais** (`lib/initial-data.ts`): `INITIAL_USERS`, `INITIAL_STORES`, `INITIAL_PRODUCTS`,
  `INITIAL_COACHES`, `INITIAL_ATHLETES`, `INITIAL_COMMUNITY_POSTS`, `INITIAL_NEWS` — é o “catálogo demo” que
  popula o app sem banco.
- **Scripts de seed/migração** fora do app (`scripts/`): `migrate-supabase.mjs`, `organize-database.mjs`,
  `inspect-db.mjs`, `seed-data.mjs`, `seed-catalog.mjs`, `seed-rich-catalog.mjs`, `seed-extended-catalog.mjs`,
  `seed-50-stores.mjs`, `seed-all-products.mjs`, `update-product-images.mjs` (usam `pg` + `DATABASE_URL`).

### 3.9 Autenticação e ciclo de sessão

1. `AuthModal` abre em `login` | `register` | `forgot` | `switch`.
2. **Acesso rápido de demonstração**: 1 clique entra como Super Admin, Lojista Pro ou Atleta.
3. **E-mail + senha**: zod valida → `AuthService.loginWithEmail` → Supabase Auth → `getProfileOrCreate` → `setUser` + toast.
4. **Cadastro**: nome, e-mail, senha e **tipo de conta** (Atleta C2C ou Lojista B2C); `signUpWithEmail` pode exigir confirmação de e-mail (aviso no modal).
5. **Google OAuth**: `signInWithGoogle` → popup Supabase → `/auth/callback` → `postMessage({ type: 'OAUTH_AUTH_SUCCESS' })` → o app fecha o popup e sincroniza a sessão.
6. **Sessão monitorada**: `getSession` + `onAuthStateChange` (`SIGNED_OUT` limpa o usuário).
7. **Papéis derivados**: `role`, `isVisitor`, `isAuthenticated`, `isUserAdmin(email)`.
8. **Logout**: `AuthService.signOut()` → limpa usuário → volta para a Home.
9. **Esqueci a senha**: o modal apenas exibe aviso; `AuthService.resetPassword` existe, não é chamado e não há rota `/auth/reset-password` (lacuna nº 9).

### 3.10 Jornadas implementadas

**Compra (`home → marketplace → ficha → carrinho → checkout → pedido`)**
- Busca global (⌘K) e filtros por categoria, modalidade, condição e selo.
- Ficha do produto: galeria, vendedor (loja oficial ou atleta), selo, frete por CEP, favoritar, adicionar ao carrinho.
- Checkout: endereço, frete e pagamento `pix | credit_card | boleto`; **PIX dá 5% de desconto**; resumo com subtotal, frete e total.
- Pedido criado com custódia: `order_status` começa em `pending_payment`; o admin confirma o pagamento (`confirmPaymentSandbox`).
- Detalhes a documentar: o frete é sempre `shippingMethod: 'pac'`, o endereço grava `neighborhood: "Bela Vista"` e `number: "1000"` fixos, e visitante compra como `guest-user` — três lacunas conhecidas (nº 5 e nº 7).
- Recibo/`pix_code` + `pix_qr_base64` são gerados no `createOrder`.

**Venda C2C (`sell`)**
- Formulário de anúncio com título, descrição, preço, condição (`novo·como_novo·seminovo·usado_excelente·usado_bom`), categoria, modalidade, imagens e localização.
- Publica como `product_type: 'c2c'` com `seller_id` do usuário; “Meus anúncios” lista e permite excluir.
- Itens de UI ainda sem persistência: acompanhar vendas em custódia e salvar rascunho (lacunas nº 11 e nº 12).

**Loja oficial e selo verificado (`stores` + `CreateStoreModal` + admin)**
- Atleta cria loja → vira `seller`; loja nasce `verification_status: 'none'`.
- Lojista solicita o selo (`requestVerification`, CNPJ + documentos em `verification_docs`) → `pending`.
- Admin homologa (`adminReviewStore`) → `verified` ou `rejected`; `is_verified` controla o selo exibido no produto.

**Comunidade (`community`)**
- Feed com 5 categorias, criação de post, curtir e comentar (`comments JSONB`, `comments_count`, `likes_count`).
- `reportCommunityPost`/`adminDeleteCommunityPost` existem no store, mas **nenhum botão da UI os chama** (lacuna nº 8).

**Treinadores (`coaches`)**
- Cards com especialidade e modal de agendamento; `handleConfirmBooking` só mostra toast e fecha após 2,5 s — **não persiste** (lacuna nº 14).

**Painel administrativo (`admin`, 8 módulos)**
1. Visão geral com GMV em custódia, taxa de custódia de **4,5%**, usuários e lojas auditadas.
2. Central de homologação e auditoria de lojas B2C (aprovar/rejeitar pedidos de selo).
3. Catálogo de produtos (moderar, ativar/suspender — hoje só em memória).
4. Usuários & atletas (papéis, banir/desbanir, criar/remover).
5. Pedidos & custódia (confirmar pagamento, alterar status — hoje só em memória).
6. Lojas oficiais (lista e indicadores).
7. Auditoria (protocolo de custódia e antifraude).
8. Banco/infraestrutura (`adminSyncSupabase`, diagnóstico do Supabase).

### 3.11 Lacunas e riscos conhecidos (14)

{{TABELA_LACUNAS}}

### 3.12 Ambiente, comandos e variáveis

```bash
npm install          # instala as dependências do app
npm run dev          # Next.js em desenvolvimento
npm run build        # build de produção
npm run ci           # lint + type-check + build
```

| Variável | Para que serve |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` · `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Habilitam Supabase (Auth + dados). Sem elas, o app opera em modo local. |
| `SUPABASE_SERVICE_ROLE_KEY` | Operações administrativas no servidor (opcional). |
| `DATABASE_URL` | Conexão PostgreSQL usada pelos scripts de seed/migração. |
| `GEMINI_API_KEY` | Chamadas Gemini (componente `SmartScanView`). |
| `APP_URL` | URL pública do app (callback OAuth e links). |

> `lib/db.ts` traz `DEFAULT_DATABASE_URL` com usuário e senha em texto puro como fallback — deve sair do
> repositório e virar variável de ambiente com rotação (lacuna nº 11).

### 3.13 Mapa de arquivos por fluxo

{{TABELA_ARQUIVOS}}

### 3.14 Resumo de arquivos

{{RESUMO_ARQUIVOS}}
