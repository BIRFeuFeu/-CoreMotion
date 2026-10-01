# MESTRE — Fluxograma do Usuário (CoreMotiom)

<!-- GERADO AUTOMATICAMENTE por scripts/generate-master-docs.mjs — não edite à mão.
     Fonte de verdade: scripts/lib/flowchart-core.mjs (dados + layout + SVG).
     Para regenerar: npm run mestres -->

**Documento mestre autocontido.** Ele contém tudo o que um chat novo do Arena precisa para **recriar o
fluxograma do usuário** do CoreMotiom — inclusive sem acesso ao repositório: o dossiê completo do site (§3), os
dados autoritativos de cada nó e aresta (§4), as regras de layout/renderização (§5), a especificação dos dois
entregáveis (§2) e o **código-fonte de referência completo** (Apêndice B).

- Produto documentado: **CoreMotiom** — `Next.js 15 · React 19 · TypeScript · Supabase / PostgreSQL · Tailwind CSS v4`
- Repositório de origem: `BIRFeuFeu/-CoreMotion`
- Gerado em: `1 de outubro de 2026`
- Artefatos de referência: `Fluxograma/Diagrama C. De Uso/fluxograma-usuario.html` (navegável) e `Fluxograma/Diagrama C. De Uso/fluxograma-usuario.pdf` (A4, 18 páginas)
- Documento irmão: `Fluxograma/Diagrama C. De Uso/mestre-casos-de-uso.md` (diagrama e catálogo dos 48 casos de uso)

### Como usar este arquivo em um chat novo

1. Anexe **este arquivo** (e, se quiser o pacote completo, também `Fluxograma/Diagrama C. De Uso/mestre-casos-de-uso.md`).
2. Cole o prompt abaixo. Ele é autossuficiente: manda o chat ler os dados do §4, seguir o §5 e validar pelo §8.

```text
Você vai recriar a documentação visual do CoreMotiom descrita no arquivo MESTRE — Fluxograma do Usuário.
Regras:
1. Leia o §3 (dossiê do site) para entender o produto e o §4 (dados autoritativos) para os nós/arestas de cada fluxo.
2. Produza DOIS entregáveis: (a) um HTML autocontido, sem CDN, com 7 diagramas SVG inline + tabelas de apoio;
   (b) um PDF A4 com capa, sumário numerado e os mesmos 7 diagramas embutidos em alta resolução.
3. Siga exatamente a especificação de seções do §2, as regras de modelagem do §5 e a paleta/tipografia do §4.1.
4. Se tiver o código-fonte (Apêndice B), use-o como referência de layout e roteamento — não invente outra linguagem visual.
5. Ao final, rode a checklist do §8 e informe: nº de páginas, nº de diagramas, nº de nós, e divergências encontradas.
Não resuma o conteúdo: o entregável é a documentação completa, não um resumo dela.
```

### Índice

| § | Conteúdo |
| --- | --- |
| 1 | Missão, entregáveis e critérios de aceitação |
| 2 | Especificação do HTML e do PDF (seção por seção, página por página) |
| 3 | Dossiê do site (tudo que o CoreMotiom tem hoje) |
| 4 | Dados autoritativos dos diagramas (JSON completo) |
| 5 | Regras de modelagem, layout e renderização |
| 6 | Pipeline de geração e kit de reprodução |
| 7 | Catálogo dos 7 fluxos (visão rápida) |
| 8 | Validação e critérios de aceitação |
| 9 | Manutenção |
| A | Datasheet dos diagramas (nós e arestas por fluxo) |
| B | Código-fonte de referência (completo) |

---

## 1. Missão, entregáveis e critérios de aceitação

**Missão.** Documentar *todas* as jornadas do usuário do CoreMotiom em um fluxograma legível, fiel ao código e
reproduzível por script — do primeiro carregamento da SPA até a gravação de cada ação no banco, passando pelos
papéis (visitante, atleta, lojista, admin) e pelas lacunas conhecidas.

| Entregável | Formato | Conteúdo obrigatório |
| --- | --- | --- |
| **A. Documento navegável** | HTML único, autocontido, sem CDN | 14 seções (§2.1), 7 diagramas SVG inline, tabelas de permissões/estados/lacunas/arquivos, sumário com âncoras |
| **B. Documento imprimível** | PDF A4 (retrato e paisagem), 18 páginas | Capa, sumário numerado, mapa dos diagramas, 7 figuras em página própria, seções de apoio, rodapé com paginação |

**Critérios de aceitação** (detalhados no §8):

1. Nenhum conteúdo inventado: cada nó, aresta, tabela e lacuna deve ter origem no §3/§4 ou no código do Apêndice B.
2. Os 7 fluxos com os mesmos IDs (`visao-geral`, `autenticacao`, `compra`, `venda`, `engajamento`, `admin`, `dados`)
   e a mesma numeração 1–7.
3. HTML sem dependências externas (zero `<script src="http…">`, zero webfont remota) e com todos os SVGs embutidos.
4. PDF sem páginas em branco, com sumário apontando para a página certa e cada figura legível na orientação escolhida.
5. Lacunas marcadas com `(!)` no PDF e `⚠` no HTML, coerentes com a tabela do §3.11.

---

## 2. Especificação dos entregáveis

### 2.1 HTML — `Fluxograma/Diagrama C. De Uso/fluxograma-usuario.html`

Documento único, tema escuro, largura máxima de leitura, `nav` fixa com âncoras. Seções, na ordem:

| # | Seção | Conteúdo |
| --- | --- | --- |
| 0 | Hero / cabeçalho | marca, título “Fluxograma completo do usuário”, selo de versão, contadores (7 diagramas · 48 casos de uso · 14 lacunas) e sumário clicável |
| 1 | Visão geral — do primeiro acesso às jornadas por papel | diagrama 1 |
| 2 | Autenticação, papéis e ciclo de sessão | diagrama 2 |
| 3 | Jornada de compra — descoberta, carrinho, pagamento e custódia | diagrama 3 |
| 4 | Jornada de venda — C2C, loja oficial e selo verificado | diagrama 4 |
| 5 | Engajamento — comunidade, treinadores e favoritos | diagrama 5 |
| 6 | Painel administrativo — 8 módulos executivos | diagrama 6 |
| 7 | Dados, serviços e persistência — onde cada ação é gravada | diagrama 7 |
| 8 | Diagrama de casos de uso — tudo que a plataforma oferece | UML (ver `Fluxograma/Diagrama C. De Uso/mestre-casos-de-uso.md`) |
| 9 | Catálogo completo de casos de uso | 48 linhas agrupadas por módulo |
| 10 | Papéis e permissões por tela | matriz 13 × 5 (Capacidade × 4 papéis) |
| 11 | Máquina de estados do domínio | tabela de 6 entidades com status e quem altera |
| 12 | Lacunas e riscos encontrados no fluxo | 14 cards com tag, título e descrição |
| 13 | Arquivos-chave por fluxo | tabela Fluxo × Ponto de entrada × Regras e dados |
| 14 | Como ler este fluxograma | legenda de formas, cores e tipos de aresta |

Cada bloco de diagrama traz: número, título, descrição, legenda de atores (pílulas coloridas), o SVG em
`figure` com `viewBox` próprio e, quando útil, uma tabela de leitura (“o que observar”).

### 2.2 PDF — `Fluxograma/Diagrama C. De Uso/fluxograma-usuario.pdf`

| Página | Conteúdo |
| --- | --- |
| 1 | **Capa** escura: marca “CM”, título, tagline, stack, 4 cartões de números (7 diagramas · 1 diagrama UML · 48 casos de uso · 14 lacunas) e data de geração |
| 2 | **Sumário** com 16 entradas numeradas (2 passagens para acertar os números) |
| 3–4 | **Visão geral e mapa dos diagramas**: pílulas de contagem, “como ler”, tabela dos 7 diagramas, nota sobre o HTML |
| 5–11 | **Figuras 1–7**, uma por página, na ordem do §2.1, com título, descrição, legenda e a imagem rasterizada do SVG |
| 12 | **8. Diagrama de casos de uso** (paisagem/retrato conforme proporção) |
| 13–15 | **9. Catálogo completo de casos de uso** (agrupado por módulo, com arquivo de origem e flag `(!)`) |
| 16 | **10. Papéis e permissões por tela** + **11. Máquina de estados** |
| 17 | **12. Lacunas e riscos** (cards) |
| 18 | **13. Arquivos-chave por fluxo** + **14. Manutenção** |

Regras de composição do PDF:

- A4 retrato `595,28 × 841,89 pt` e paisagem `841,89 × 595,28 pt`, margem `52 pt`.
- **Orientação escolhida por diagrama**: calcula-se a maior escala possível em retrato e em paisagem
  (`min((largura-104)/aspecto, (altura-104-cabecalho))`) e adota-se paisagem quando ela é ≥ 5% maior.
- **Sumário em duas passagens**: a primeira monta o documento medindo as páginas; a segunda reconstrói com os números.
- **Rodapé** em todas as páginas: `CoreMotiom · Fluxograma do usuário & casos de uso` + `página / total`.
- Nenhuma página em branco: só se cria página nova quando a atual já recebeu conteúdo.
- Fontes padrão do PDF (WinAnsi) com transliteração de segurança: `⚠ → (!)`, `— → -`, `→ → ->`, `“ ” → "`.

---

## 3. Dossiê do site (fonte de verdade do conteúdo)

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
- Repositório: `BIRFeuFeu/-CoreMotion` · gerado em 1 de outubro de 2026

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

| Arquivo | Linhas | Papel |
| --- | ---: | --- |
| `shared/Footer.tsx` | 3 | — |
| `shared/Header.tsx` | 3 | — |
| `auth/AuthModal.tsx` | 3 | — |
| `stores/StoresView.tsx` | 3 | — |
| `shared/EmptyState.tsx` | 41 | — |
| `admin/AdminDashboard.tsx` | 3 | — |
| `shared/SkeletonLoader.tsx` | 35 | — |
| `marketplace/ProductCard.tsx` | 3 | — |
| `stores/CreateStoreModal.tsx` | 3 | — |
| `Footer.tsx` | 151 | Rodapé institucional |
| `marketplace/MarketplaceView.tsx` | 3 | — |
| `marketplace/ProductDetailModal.tsx` | 3 | — |
| `Header.tsx` | 8 | Busca global ⌘K, carrinho e avatar |
| `CommunityView.tsx` | 315 | Feed social: post, curtir e comentar |
| `components/auth/index.ts` | 2 | Reexporta os componentes da pasta |
| `StoresView.tsx` | 453 | Lista de lojas oficiais e filtro por selo |
| `components/admin/index.ts` | 2 | Reexporta os componentes da pasta |
| `components/shared/index.ts` | 6 | Reexporta os componentes da pasta |
| `components/stores/index.ts` | 3 | Reexporta os componentes da pasta |
| `CreateStoreModal.tsx` | 238 | Criação da loja oficial (vira seller) |
| `HomeHeroAndHighlights.tsx` | 595 | Hero, destaques e vitrines da Home |
| `ProductCard.tsx` | 203 | Cartão de produto usado nos grids e vitrines |
| `SellC2CView.tsx` | 478 | Anúncio C2C do atleta e lista “Meus anúncios” |
| `components/marketplace/index.ts` | 4 | Reexporta os componentes da pasta |
| `CoachesView.tsx` | 322 | Treinadores: cards, especialidades e agendamento |
| `MarketplaceView.tsx` | 522 | Grid do catálogo com busca, filtros e ordenação |
| `Sidebar.tsx` | 587 | Navegação lateral, item “Painel Admin” e troca de papel (demo) |
| `CheckoutModal.tsx` | 570 | Endereço, frete, pagamento (PIX/cartão/boleto) e criação do pedido |
| `ProductDetailModal.tsx` | 476 | Ficha do produto, galeria, frete por CEP, favoritar e carrinho |
| `SupabaseConfigModal.tsx` | 144 | Diagnóstico de configuração e sincronização manual do Supabase |
| `AuthModal.tsx` | 394 | Login, cadastro, Google OAuth, “esqueci a senha” e switch de papel (4 modos) |
| `AdminDashboard.tsx` | 1260 | Painel executivo com 8 módulos (GMV, custódia 4,5%, homologação, usuários, pedidos…) |
| `SmartScanView.tsx` | 357 | Análise de desgaste/pace com IA — **órfão**, não é importado por nenhuma view (lacuna nº 3) |

> Além destes, há **11 componentes de UI** em `components/ui/` (badge, button, card, dialog, form, input, label, separator, skeleton, tabs, textarea) — primitivos Radix/Tailwind sem regra de negócio.

> Atenção: `AuthModal`, `MarketplaceView`, `ProductCard`, `ProductDetailModal`, `StoresView`,
> `CreateStoreModal`, `Footer` e `AdminDashboard` existem na **raiz de `components/`** e também em subpastas
> (`components/auth/…` etc.) que apenas reexportam. Editar o arquivo errado é uma armadilha real (lacuna nº 4).

### 3.6 Camada de serviços, API e ações de servidor

**Services de domínio** (`services/`), todos delegando para Supabase quando configurado:

| Arquivo | Tipo | API principal |
| --- | --- | --- |
| `services/auth.ts` | **AuthService** | MASTER_ADMIN_EMAIL · OPERACAO_ADMIN_EMAIL · isMasterAdmin · syncSessionWithDb · loginWithEmail() · signUpWithEmail() · getProfileOrCreate() · updateProfile() · signInWithGoogle() · signOut() · getAllUsers() |
| `services/authService.ts` | **AuthService** | MASTER_ADMIN_EMAIL · MASTER_ADMIN_EMAILS · isMasterAdmin · loginWithEmail() · signUpWithEmail() · signInWithGoogle() · resetPassword() · signOut() · getProfileOrCreate() · updateProfile() |
| `services/communityService.ts` | **CommunityService** | getPosts() · createPost() · likePost() · addComment() · mapDbPostToModel() |
| `services/listings.ts` | **ListingsService** | getListings · createListing · deleteListing · getListings() · createListing() · deleteListing() · applyLocalFilters() |
| `services/orderService.ts` | **OrderService** | createOrder() · getUserOrders() · getAllOrdersAdmin() · confirmPaymentSandbox() · mapDbOrderToModel() |
| `services/productService.ts` | **ProductService** | getProducts() · getProductById() · createProduct() · updateProduct() · deleteProduct() · mapDbProductToModel() · applyLocalFilters() |
| `services/products.ts` | **ProductService** | getProducts · getProductById · createProduct · deleteProduct · getProducts() · getProductById() · createProduct() · updateProduct() · deleteProduct() · applyLocalFilters() |
| `services/storeService.ts` | **StoreService** | getStores() · getStoreBySlug() · createStore() · requestVerification() · adminReviewStore() · mapDbStoreToModel() |
| `services/stores.ts` | **StoreService** | getStores · getStoreBySlug · createStore · requestStoreVerification · adminVerifyStore · getStores() · getStoreBySlug() · createStore() · requestVerification() · adminVerifyStore() · adminReviewStore() |
| `services/supabaseClient.ts` | funções | isSupabaseConfigured · getSupabaseClient · testSupabaseConnection |

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

| # | Tag | Lacuna | O que acontece |
| ---: | --- | --- | --- |
| 1 | Navegação | **View “profile” não existe** | A sidebar leva para activeView = "profile" em “Meus Favoritos” e no avatar mobile, mas app/page.tsx não renderiza esse bloco — a tela fica vazia, sem lista de favoritos, dados do perfil ou pedidos do usuário. |
| 2 | Navegação | **View “news” declarada e sem tela** | ActiveView inclui "news" e o store carrega INITIAL_NEWS, mas nenhum componente consome essas notícias. |
| 3 | Funcionalidade | **SmartScanView órfão** | components/SmartScanView.tsx (análise de desgaste/pace com IA) tem 356 linhas e não é importado por nenhuma view do app. |
| 4 | Manutenção | **Componentes duplicados** | AuthModal, MarketplaceView, ProductCard, ProductDetailModal, StoresView, CreateStoreModal, Footer e AdminDashboard existem na raiz de components/ e também em subpastas que apenas reexportam — risco real de editar o arquivo errado. |
| 5 | Checkout | **Checkout não coleta bairro/número** | O formulário pede apenas endereço, cidade e UF, mas grava "Bela Vista" e número "1000" fixos; o shippingMethod é sempre "pac". O checkoutSchema do zod exige neighborhood e number — o server action de checkout rejeitaria esses dados. |
| 6 | Arquitetura | **Server actions sem uso** | serverLogin, serverSignUp, serverProcessCheckout, serverCreateProduct e serverCreateStore nunca são chamadas: os componentes falam direto com Supabase/services. Duas trilhas concorrentes de escrita, com validações diferentes. |
| 7 | Regra de negócio | **Visitante finaliza compra** | O carrinho e o CheckoutModal não exigem login; createOrder usa user?.id || "guest-user". Pedidos de visitante não têm dono para consulta posterior. |
| 8 | Comunidade | **Moderação de posts inacessível** | reportCommunityPost e adminDeleteCommunityPost existem no store, mas nenhum componente expõe botão de denúncia ou exclusão — os campos is_reported/report_reason nunca são acionados pela UI. |
| 9 | Autenticação | **Recuperação de senha inoperante** | O modal de “Esqueci a senha” só exibe uma mensagem informativa; AuthService.resetPassword existe e não é chamado, e não há rota /auth/reset-password. |
| 10 | Dados | **Status de pedido e produto só em memória** | adminUpdateOrderStatus e adminToggleProductStatus alteram apenas o estado do React. Não há função de ordens em lib/db-queries.ts — pedidos vivem em localStorage/Supabase, sem trilha administrativa persistida. |
| 11 | Segurança | **Credenciais no código** | lib/db.ts traz DEFAULT_DATABASE_URL com usuário e senha do PostgreSQL em texto puro como fallback. Essas credenciais devem sair do repositório e virar variável de ambiente (com rotação). |
| 12 | Segurança | **Middleware não protege rotas** | middleware.ts apenas adiciona o header de plataforma; /admin e APIs internas não têm verificação de sessão no servidor — a regra de admin é só client-side (isUserAdmin por e-mail). |
| 13 | Dados | **Favoritos, carrinho e pedidos sem tabela** | A migração SQL cobre profiles, stores, products, orders e community_posts; carrinho e favoritos existem apenas no localStorage e não sincronizam entre dispositivos. |
| 14 | Funcionalidade | **Agendamento de treinador não persiste** | handleConfirmBooking só dispara toast e fecha o modal após 2,5s: não há tabela, serviço ou registro de agendamento. |

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

| Fluxo | Ponto de entrada | Regras e dados |
| --- | --- | --- |
| Shell e navegação | app/layout.tsx · app/page.tsx · components/Sidebar.tsx | lib/store.tsx (ActiveView, modais globais, toasts) |
| Autenticação | components/AuthModal.tsx · app/auth/callback/page.tsx | services/authService.ts · app/api/auth/sync/route.ts · lib/db-queries.ts |
| Compra | components/HomeHeroAndHighlights.tsx · MarketplaceView · ProductDetailModal · CheckoutModal | services/orderService.ts · lib/schemas/order.schema.ts |
| Venda C2C | components/SellC2CView.tsx · ProductCard.tsx | services/productService.ts · app/api/listings/route.ts · lib/schemas/product.schema.ts |
| Lojas e selo | components/StoresView.tsx · CreateStoreModal.tsx · AdminDashboard.tsx | services/storeService.ts · app/api/stores/route.ts · lib/schemas/store.schema.ts |
| Comunidade | components/CommunityView.tsx | services/communityService.ts · lib/initial-data.ts |
| Treinadores | components/CoachesView.tsx | INITIAL_COACHES (lib/initial-data.ts) |
| Administração | components/AdminDashboard.tsx | lib/store.tsx (ações admin) · app/api/users/route.ts · app/api/products/route.ts |
| Banco e infraestrutura | lib/db.ts · lib/db-queries.ts · middleware.ts | supabase/migrations/20250101000000_coremotiom_initial_schema.sql |

### 3.14 Resumo de arquivos

- **Rotas/telas renderizadas:** 7 views: home, marketplace, stores, sell, coaches, community, admin
- **Modais globais:** AuthModal · SupabaseConfigModal · CheckoutModal · CreateStoreModal · ProductDetailModal
- **Tabelas PostgreSQL:** profiles · stores · products · orders · community_posts
- **Rotas de API:** /api/products · /api/stores · /api/listings · /api/users · /api/auth/sync
- **Services de domínio:** AuthService · ProductService · StoreService · OrderService · CommunityService


---

## 4. Dados autoritativos dos diagramas

Todo o conteúdo visual vem das estruturas abaixo. Elas são **completas e normativas**: reproduza os IDs, os
textos, as colunas/linhas, os tipos de nó e os rótulos de aresta exatamente como estão.

### 4.1 Metadados, paleta, tipos e geometria

```json
{
  "meta": {
    "product": "CoreMotiom",
    "tagline": "Plataforma & marketplace esportivo de alta performance",
    "stack": "Next.js 15 · React 19 · TypeScript · Supabase / PostgreSQL · Tailwind CSS v4",
    "repo": "BIRFeuFeu/-CoreMotion",
    "doc": "Fluxograma completo do usuário e diagrama de casos de uso"
  },
  "canvasBg": "#0B0C10",
  "actors": {
    "visitante": {
      "label": "Visitante (sem conta)",
      "fill": "#181C25",
      "stroke": "#8B93A7",
      "text": "#E5E7EB",
      "sub": "#A8AFBF"
    },
    "atleta": {
      "label": "Atleta / Usuário (role: user)",
      "fill": "#0E2A22",
      "stroke": "#34D399",
      "text": "#ECFDF5",
      "sub": "#8FD9C0"
    },
    "lojista": {
      "label": "Lojista (role: seller)",
      "fill": "#0D2337",
      "stroke": "#38BDF8",
      "text": "#EFF6FF",
      "sub": "#9CCBEC"
    },
    "admin": {
      "label": "Super Admin (e-mails master)",
      "fill": "#2E1219",
      "stroke": "#F87171",
      "text": "#FEF2F2",
      "sub": "#EBA8A8"
    },
    "sistema": {
      "label": "Sistema / Dados",
      "fill": "#1C1633",
      "stroke": "#A78BFA",
      "text": "#F5F3FF",
      "sub": "#BDB0EE"
    },
    "atencao": {
      "label": "Alerta / Lacuna / Erro",
      "fill": "#2B2107",
      "stroke": "#FBBF24",
      "text": "#FFFBEB",
      "sub": "#E3C87F"
    },
    "sucesso": {
      "label": "Confirmação / Sucesso",
      "fill": "#0E2A22",
      "stroke": "#22C55E",
      "text": "#F0FDF4",
      "sub": "#93DBA8"
    }
  },
  "edgeKinds": {
    "flow": {
      "stroke": "#8B93A7",
      "label": "#C7CDDA"
    },
    "auth": {
      "stroke": "#A78BFA",
      "label": "#D6CCF5"
    },
    "success": {
      "stroke": "#34D399",
      "label": "#A7E9CE"
    },
    "error": {
      "stroke": "#F87171",
      "label": "#F0B0B0"
    },
    "admin": {
      "stroke": "#FBBF24",
      "label": "#E7CD8C"
    },
    "data": {
      "stroke": "#38BDF8",
      "label": "#A9D8F2"
    }
  },
  "geo": {
    "colW": 276,
    "x0": 62,
    "y0": 26,
    "vGap": 46,
    "padX": 13,
    "widths": {
      "start": 188,
      "end": 188,
      "process": 214,
      "decision": 236,
      "data": 224,
      "note": 220
    },
    "titleSize": 12.6,
    "subSize": 10.4,
    "titleLH": 15.5,
    "subLH": 13.2
  },
  "totalDiagramas": 7
}
```

### 4.2 Os 7 diagramas (nós e arestas)

Campos por nó: `id`, `t` (título), `s` (subtítulo/descrição), `type` (`start|process|decision|data|note|end`),
`actor` (chave de `ACTORS`), `col` (0–4, coluna horizontal), `row` (linha vertical).
Campos por aresta: `from`, `to`, `label`, `kind` (`flow|auth|success|error|admin|data`), `fromSide`/`toSide`
(`left|right|top|bottom`), `labelOffset` `[dx,dy]`, `dstOffsetX` (deslocamento do ponto de chegada).

```json
[
  {
    "id": "visao-geral",
    "num": 1,
    "title": "Visão geral — do primeiro acesso às jornadas por papel",
    "desc": "Mapa macro de tudo que o app entrega hoje: bootstrap da SPA, detecção de sessão, papéis (visitante, atleta, lojista, admin), as seis jornadas de uso e a camada de persistência.",
    "legend": [
      "visitante",
      "atleta",
      "lojista",
      "admin",
      "sistema"
    ],
    "nodes": [
      {
        "id": "g1",
        "t": "App carrega em “/”",
        "s": "Next.js 15 + layout + CoreMotiomProvider",
        "type": "start",
        "actor": "sistema",
        "col": 2,
        "row": 0
      },
      {
        "id": "g2",
        "t": "Bootstrap do estado",
        "s": "testSupabaseConnection + produtos, lojas e posts ao vivo",
        "type": "process",
        "actor": "sistema",
        "col": 2,
        "row": 1
      },
      {
        "id": "g3",
        "t": "Sessão válida?",
        "s": "Supabase getSession + localStorage (coremotiom_state_v1)",
        "type": "decision",
        "actor": "sistema",
        "col": 2,
        "row": 2
      },
      {
        "id": "g4",
        "t": "VISITANTE",
        "s": "Explora marketplace, lojas, treinadores e feed (leitura)",
        "type": "process",
        "actor": "visitante",
        "col": 0,
        "row": 3
      },
      {
        "id": "g5",
        "t": "ATLETA / LOJISTA",
        "s": "role = user | seller · perfil sincronizado",
        "type": "process",
        "actor": "atleta",
        "col": 2,
        "row": 3
      },
      {
        "id": "g6",
        "t": "ADMIN MASTER",
        "s": "E-mail na lista de administradores credenciados",
        "type": "process",
        "actor": "admin",
        "col": 4,
        "row": 3
      },
      {
        "id": "g7",
        "t": "Ação exige conta?",
        "s": "Favoritar, anunciar, postar, comentar, agendar, criar loja",
        "type": "decision",
        "actor": "atencao",
        "col": 0,
        "row": 4
      },
      {
        "id": "g8",
        "t": "JORNADAS DE COMPRA E USO",
        "s": "Marketplace → carrinho → checkout → pedido em custódia",
        "type": "process",
        "actor": "atleta",
        "col": 2,
        "row": 4
      },
      {
        "id": "g9",
        "t": "PODERES DE ADMINISTRAÇÃO",
        "s": "8 módulos executivos do painel master",
        "type": "process",
        "actor": "admin",
        "col": 4,
        "row": 4
      },
      {
        "id": "g10",
        "t": "AuthModal",
        "s": "login · cadastro · Google · esqueci a senha",
        "type": "process",
        "actor": "atleta",
        "col": 0,
        "row": 5
      },
      {
        "id": "g11",
        "t": "Vender C2C",
        "s": "Anúncio de equipamento seminovo",
        "type": "process",
        "actor": "atleta",
        "col": 1,
        "row": 6
      },
      {
        "id": "g12",
        "t": "Loja oficial + selo",
        "s": "CNPJ, auditoria e homologação",
        "type": "process",
        "actor": "lojista",
        "col": 2,
        "row": 6
      },
      {
        "id": "g13",
        "t": "Comunidade & Treinadores",
        "s": "Feed de atletas e assessoria esportiva",
        "type": "process",
        "actor": "sistema",
        "col": 3,
        "row": 4
      },
      {
        "id": "g14",
        "t": "Persistência",
        "s": "localStorage + Supabase + PostgreSQL (RLS) via API Routes",
        "type": "data",
        "actor": "sistema",
        "col": 2,
        "row": 7
      },
      {
        "id": "g15",
        "t": "Toasts, estados e logout",
        "s": "Feedback global em todas as ações",
        "type": "end",
        "actor": "sucesso",
        "col": 2,
        "row": 8
      }
    ],
    "edges": [
      {
        "from": "g1",
        "to": "g2"
      },
      {
        "from": "g2",
        "to": "g3"
      },
      {
        "from": "g3",
        "to": "g4",
        "label": "Não"
      },
      {
        "from": "g3",
        "to": "g5",
        "label": "Sim",
        "labelOffset": [
          -30,
          -9
        ]
      },
      {
        "from": "g3",
        "to": "g6",
        "label": "e-mail master",
        "kind": "admin",
        "labelOffset": [
          -46,
          -8
        ]
      },
      {
        "from": "g4",
        "to": "g7"
      },
      {
        "from": "g7",
        "to": "g10",
        "label": "Sim"
      },
      {
        "from": "g7",
        "to": "g8",
        "label": "Não",
        "kind": "success",
        "labelOffset": [
          40,
          -9
        ]
      },
      {
        "from": "g5",
        "to": "g8",
        "label": "compra",
        "kind": "success",
        "labelOffset": [
          -52,
          -8
        ]
      },
      {
        "from": "g5",
        "to": "g13",
        "label": "engaja",
        "kind": "success",
        "labelOffset": [
          -34,
          -8
        ]
      },
      {
        "from": "g6",
        "to": "g9",
        "label": "acesso total",
        "kind": "admin"
      },
      {
        "from": "g10",
        "to": "g11",
        "label": "após login",
        "kind": "auth",
        "labelOffset": [
          34,
          -9
        ]
      },
      {
        "from": "g8",
        "to": "g11",
        "label": "vende",
        "kind": "success",
        "labelOffset": [
          30,
          -9
        ]
      },
      {
        "from": "g9",
        "to": "g12",
        "label": "homologa",
        "kind": "admin",
        "labelOffset": [
          -4,
          -9
        ]
      },
      {
        "from": "g11",
        "to": "g14",
        "label": "C2C grava",
        "kind": "data",
        "toSide": "left",
        "labelOffset": [
          30,
          -6
        ]
      },
      {
        "from": "g12",
        "to": "g14",
        "label": "loja grava",
        "kind": "data",
        "dstOffsetX": -52,
        "labelOffset": [
          -46,
          -6
        ]
      },
      {
        "from": "g13",
        "to": "g14",
        "label": "feed grava",
        "kind": "data",
        "fromSide": "left",
        "labelOffset": [
          -6,
          -8
        ]
      },
      {
        "from": "g14",
        "to": "g15"
      }
    ]
  },
  {
    "id": "autenticacao",
    "num": 2,
    "title": "Autenticação, papéis e ciclo de sessão",
    "desc": "AuthModal (4 modos), acesso rápido de demonstração, login por e-mail/senha, cadastro com tipo de conta, Google OAuth via popup + /auth/callback, guarda de admin e logout.",
    "legend": [
      "atleta",
      "lojista",
      "admin",
      "atencao",
      "sistema",
      "sucesso"
    ],
    "nodes": [
      {
        "id": "a1",
        "t": "Usuário aciona “Entrar”, “Cadastrar” ou uma ação protegida",
        "type": "start",
        "actor": "visitante",
        "col": 2,
        "row": 0
      },
      {
        "id": "a2",
        "t": "AuthModal abre",
        "s": "modo: login | register | forgot | switch",
        "type": "process",
        "actor": "sistema",
        "col": 2,
        "row": 1
      },
      {
        "id": "a3",
        "t": "Acesso rápido de 1 clique",
        "s": "Super Admin · Lojista Pro · Atleta — switchRole() / loginAsMasterAdmin()",
        "type": "process",
        "actor": "atencao",
        "col": 0,
        "row": 2
      },
      {
        "id": "a4",
        "t": "Qual método?",
        "type": "decision",
        "actor": "sistema",
        "col": 2,
        "row": 2
      },
      {
        "id": "a5",
        "t": "Google OAuth",
        "s": "Supabase popup → /auth/callback → postMessage OAUTH_AUTH_SUCCESS",
        "type": "process",
        "actor": "sistema",
        "col": 4,
        "row": 2
      },
      {
        "id": "a6",
        "t": "Login e-mail + senha",
        "s": "zod → AuthService.loginWithEmail → Supabase Auth",
        "type": "process",
        "actor": "atleta",
        "col": 1,
        "row": 3
      },
      {
        "id": "a7",
        "t": "Criar conta",
        "s": "nome, e-mail, senha e tipo: Atleta C2C ou Lojista B2C",
        "type": "process",
        "actor": "lojista",
        "col": 3,
        "row": 3
      },
      {
        "id": "a8",
        "t": "Credenciais válidas?",
        "type": "decision",
        "actor": "atencao",
        "col": 1,
        "row": 4
      },
      {
        "id": "a9",
        "t": "Confirmação de e-mail pendente?",
        "s": "signUp sem sessão → aviso para confirmar",
        "type": "decision",
        "actor": "sistema",
        "col": 3,
        "row": 4
      },
      {
        "id": "a10",
        "t": "Erro exibido no modal",
        "s": "credenciais inválidas · Supabase não configurado · OAuth desativado",
        "type": "process",
        "actor": "atencao",
        "col": 0,
        "row": 5
      },
      {
        "id": "a11",
        "t": "getProfileOrCreate → setUser + allUsers",
        "s": "toast de boas-vindas e fechamento do modal",
        "type": "process",
        "actor": "sucesso",
        "col": 2,
        "row": 5
      },
      {
        "id": "a12",
        "t": "Esqueci a senha",
        "s": "Modal só exibe aviso: resetPassword() existe no service e não é chamado ⚠",
        "type": "note",
        "actor": "atencao",
        "col": 0,
        "row": 6
      },
      {
        "id": "a13",
        "t": "Sessão monitorada",
        "s": "getSession + onAuthStateChange → setUser / SIGNED_OUT limpa usuário",
        "type": "process",
        "actor": "sistema",
        "col": 2,
        "row": 6
      },
      {
        "id": "a14",
        "t": "Papéis derivados",
        "s": "role · isVisitor · isAuthenticated · isUserAdmin(email)",
        "type": "process",
        "actor": "sistema",
        "col": 4,
        "row": 6
      },
      {
        "id": "a15",
        "t": "E-mail na lista master?",
        "s": "mattheusxmljz · professorchines2026 · operacaoamd · admin@coremotiom",
        "type": "decision",
        "actor": "admin",
        "col": 2,
        "row": 7
      },
      {
        "id": "a16",
        "t": "Atleta / Lojista",
        "s": "compra, anuncia, cria loja e publica no feed",
        "type": "process",
        "actor": "atleta",
        "col": 0,
        "row": 8
      },
      {
        "id": "a17",
        "t": "Admin master",
        "s": "Painel liberado; demais perfis veem “Acesso Restrito”",
        "type": "process",
        "actor": "admin",
        "col": 4,
        "row": 8
      },
      {
        "id": "a18",
        "t": "Logout",
        "s": "AuthService.signOut → limpa usuário → volta para a Home",
        "type": "end",
        "actor": "sucesso",
        "col": 2,
        "row": 9
      }
    ],
    "edges": [
      {
        "from": "a1",
        "to": "a2"
      },
      {
        "from": "a2",
        "to": "a4"
      },
      {
        "from": "a2",
        "to": "a3",
        "label": "atalho de teste",
        "kind": "admin",
        "labelOffset": [
          -4,
          -8
        ]
      },
      {
        "from": "a4",
        "to": "a6",
        "label": "e-mail"
      },
      {
        "from": "a4",
        "to": "a7",
        "label": "cadastro"
      },
      {
        "from": "a4",
        "to": "a5",
        "label": "Google",
        "kind": "auth"
      },
      {
        "from": "a6",
        "to": "a8"
      },
      {
        "from": "a8",
        "to": "a10",
        "label": "Não",
        "kind": "error"
      },
      {
        "from": "a8",
        "to": "a11",
        "label": "Sim",
        "kind": "success",
        "dstOffsetX": -50,
        "labelOffset": [
          -20,
          -9
        ]
      },
      {
        "from": "a7",
        "to": "a9"
      },
      {
        "from": "a9",
        "to": "a11",
        "label": "aguarda e-mail",
        "kind": "error",
        "dstOffsetX": 52,
        "bend": 26,
        "labelOffset": [
          -4,
          -20
        ]
      },
      {
        "from": "a5",
        "to": "a11",
        "label": "perfil Google",
        "kind": "auth",
        "dstOffsetX": 0,
        "labelOffset": [
          -42,
          -8
        ]
      },
      {
        "from": "a11",
        "to": "a13"
      },
      {
        "from": "a13",
        "to": "a12",
        "label": "recuperação de senha",
        "kind": "error",
        "labelOffset": [
          -6,
          -9
        ]
      },
      {
        "from": "a13",
        "to": "a14"
      },
      {
        "from": "a14",
        "to": "a15"
      },
      {
        "from": "a15",
        "to": "a16",
        "label": "Não"
      },
      {
        "from": "a15",
        "to": "a17",
        "label": "Sim",
        "kind": "admin"
      },
      {
        "from": "a16",
        "to": "a18",
        "label": "sair",
        "dstOffsetX": -50
      },
      {
        "from": "a17",
        "to": "a18",
        "label": "sair",
        "dstOffsetX": 50
      }
    ]
  },
  {
    "id": "compra",
    "num": 3,
    "title": "Jornada de compra — descoberta, carrinho, pagamento e custódia",
    "desc": "Fluxo completo de compra: Home e busca global, filtros do marketplace, ficha do produto, carrinho, entrega, três meios de pagamento, criação do pedido e ciclo de status até a entrega.",
    "legend": [
      "visitante",
      "atleta",
      "atencao",
      "sucesso",
      "sistema",
      "admin"
    ],
    "nodes": [
      {
        "id": "c1",
        "t": "Home — carrossel de destaques",
        "s": "Vitrine Bento, filtros por modalidade e abas B2C / C2C",
        "type": "start",
        "actor": "visitante",
        "col": 1,
        "row": 0
      },
      {
        "id": "c2",
        "t": "Descoberta do produto",
        "s": "Barra lateral com busca instantânea (⌘K) ou “Explorar Catálogo”",
        "type": "process",
        "actor": "visitante",
        "col": 1,
        "row": 1
      },
      {
        "id": "c3",
        "t": "Marketplace",
        "s": "Filtros: tipo (B2C/C2C), categoria, modalidade, condição, selo verificado, ordenação e paginação",
        "type": "process",
        "actor": "visitante",
        "col": 1,
        "row": 2
      },
      {
        "id": "c4",
        "t": "Seleciona o produto",
        "s": "ProductDetailModal: galeria, numeração, frete por CEP, descrição, loja e vendedor",
        "type": "process",
        "actor": "visitante",
        "col": 1,
        "row": 3
      },
      {
        "id": "c5",
        "t": "Qual ação?",
        "type": "decision",
        "actor": "sistema",
        "col": 1,
        "row": 4
      },
      {
        "id": "c6",
        "t": "Favoritar / curtir",
        "s": "Salva na lista de desejos (localStorage) · visitante → AuthModal ⚠",
        "type": "process",
        "actor": "atleta",
        "col": 3,
        "row": 4
      },
      {
        "id": "c7",
        "t": "Comprar agora / Adicionar ao carrinho",
        "s": "addToCart com tamanho selecionado",
        "type": "process",
        "actor": "atleta",
        "col": 1,
        "row": 5
      },
      {
        "id": "c8",
        "t": "Passo 1 — Carrinho",
        "s": "Alterar quantidade, remover itens, subtotal + frete com seguro",
        "type": "process",
        "actor": "atleta",
        "col": 1,
        "row": 6
      },
      {
        "id": "c9",
        "t": "Passo 2 — Entrega",
        "s": "Destinatário, CEP, telefone, endereço, cidade/UF · envio fixado em “pac” ⚠",
        "type": "process",
        "actor": "atleta",
        "col": 1,
        "row": 7
      },
      {
        "id": "c10",
        "t": "Passo 3 — Pagamento",
        "s": "PIX (−5% + QR + copia-e-cola) · Cartão (1–12x) · Boleto",
        "type": "process",
        "actor": "atleta",
        "col": 1,
        "row": 8
      },
      {
        "id": "c11",
        "t": "createOrder",
        "s": "OrderService grava no Supabase/PostgreSQL · se falhar, gera pedido local com PIX e rastreio",
        "type": "process",
        "actor": "sistema",
        "col": 1,
        "row": 9
      },
      {
        "id": "c12",
        "t": "Forma de pagamento?",
        "type": "decision",
        "actor": "sistema",
        "col": 1,
        "row": 10
      },
      {
        "id": "c13",
        "t": "PIX / Boleto",
        "s": "payment_status = pending · order_status = pending_payment",
        "type": "process",
        "actor": "atencao",
        "col": 0,
        "row": 11
      },
      {
        "id": "c14",
        "t": "Cartão de crédito",
        "s": "payment_status = completed · order_status = preparing",
        "type": "process",
        "actor": "sucesso",
        "col": 2,
        "row": 11
      },
      {
        "id": "c15",
        "t": "Passo 4 — Pedido confirmado",
        "s": "Nº do pedido, valor retido em custódia, prazo de 2 a 4 dias e código de rastreio",
        "type": "end",
        "actor": "sucesso",
        "col": 1,
        "row": 12
      },
      {
        "id": "c16",
        "t": "Retaguarda do pedido",
        "s": "Admin confirma pagamento (sandbox) e muda status: paid → shipped → delivered",
        "type": "process",
        "actor": "admin",
        "col": 3,
        "row": 12
      },
      {
        "id": "c17",
        "t": "Compra como visitante ⚠",
        "s": "Carrinho e checkout não exigem login · createOrder usa “guest-user”, sem dono para consultar depois",
        "type": "note",
        "actor": "atencao",
        "col": 3,
        "row": 6
      },
      {
        "id": "c18",
        "t": "Caminho com login",
        "s": "Favoritar, publicar, comentar, agendar e vender continuam exigindo conta (ir para o fluxo 2)",
        "type": "note",
        "actor": "sistema",
        "col": 3,
        "row": 8
      }
    ],
    "edges": [
      {
        "from": "c1",
        "to": "c2"
      },
      {
        "from": "c2",
        "to": "c3"
      },
      {
        "from": "c3",
        "to": "c4"
      },
      {
        "from": "c4",
        "to": "c5"
      },
      {
        "from": "c5",
        "to": "c7",
        "label": "comprar",
        "kind": "success"
      },
      {
        "from": "c5",
        "to": "c6",
        "label": "salvar"
      },
      {
        "from": "c7",
        "to": "c8"
      },
      {
        "from": "c8",
        "to": "c9"
      },
      {
        "from": "c8",
        "to": "c17",
        "label": "sem exigir conta",
        "kind": "error",
        "fromSide": "right",
        "labelOffset": [
          -40,
          -8
        ]
      },
      {
        "from": "c9",
        "to": "c10"
      },
      {
        "from": "c9",
        "to": "c18",
        "label": "atalho p/ login",
        "kind": "auth",
        "fromSide": "right",
        "labelOffset": [
          -36,
          10
        ]
      },
      {
        "from": "c10",
        "to": "c11"
      },
      {
        "from": "c11",
        "to": "c12"
      },
      {
        "from": "c12",
        "to": "c13",
        "label": "PIX / boleto"
      },
      {
        "from": "c12",
        "to": "c14",
        "label": "cartão",
        "kind": "success"
      },
      {
        "from": "c13",
        "to": "c15",
        "label": "aguardando",
        "kind": "error"
      },
      {
        "from": "c14",
        "to": "c15",
        "kind": "success"
      },
      {
        "from": "c15",
        "to": "c16",
        "label": "acompanhamento",
        "kind": "admin",
        "labelOffset": [
          0,
          -9
        ]
      }
    ]
  },
  {
    "id": "venda",
    "num": 4,
    "title": "Jornada de venda — C2C, loja oficial e selo verificado",
    "desc": "Dois caminhos de oferta: atleta anunciando equipamento seminovo (C2C com custódia) e lojista abrindo/enviando loja para auditoria de CNPJ, com a homologação feita pelo admin.",
    "legend": [
      "visitante",
      "atleta",
      "lojista",
      "admin",
      "atencao",
      "sucesso"
    ],
    "nodes": [
      {
        "id": "v1",
        "t": "Menu “Vender C2C”",
        "type": "start",
        "actor": "atleta",
        "col": 0,
        "row": 0
      },
      {
        "id": "v2",
        "t": "É visitante?",
        "type": "decision",
        "actor": "atencao",
        "col": 0,
        "row": 1
      },
      {
        "id": "v3",
        "t": "Bloqueio + AuthModal",
        "s": "Tela “Acesso Restrito para Atletas Cadastrados”",
        "type": "process",
        "actor": "atencao",
        "col": 1,
        "row": 2
      },
      {
        "id": "v4",
        "t": "Central de Vendas C2C",
        "s": "Abas: Criar anúncio · Meus anúncios · Vendas em custódia · Rascunhos",
        "type": "process",
        "actor": "atleta",
        "col": 0,
        "row": 3
      },
      {
        "id": "v5",
        "t": "Formulário do anúncio",
        "s": "Título, categoria, modalidade, condição, preço, preço original, descrição, fotos por URL, local e frete",
        "type": "process",
        "actor": "atleta",
        "col": 0,
        "row": 4
      },
      {
        "id": "v6",
        "t": "Título e preço preenchidos?",
        "type": "decision",
        "actor": "atencao",
        "col": 0,
        "row": 5
      },
      {
        "id": "v7",
        "t": "Toast “Campos obrigatórios”",
        "type": "note",
        "actor": "atencao",
        "col": 1,
        "row": 6
      },
      {
        "id": "v8",
        "t": "createProduct",
        "s": "product_type = c2c · stock 1 · status active → POST /api/listings",
        "type": "process",
        "actor": "sistema",
        "col": 0,
        "row": 6
      },
      {
        "id": "v9",
        "t": "Anúncio publicado",
        "s": "Aparece no marketplace e em “Meus anúncios” (com exclusão)",
        "type": "process",
        "actor": "sucesso",
        "col": 0,
        "row": 7
      },
      {
        "id": "v10",
        "t": "Venda em custódia",
        "s": "Valor retido e liberado após confirmação/inspeção do comprador",
        "type": "end",
        "actor": "sucesso",
        "col": 0,
        "row": 8
      },
      {
        "id": "w1",
        "t": "Quero ser lojista",
        "s": "Cadastro com tipo de conta “Lojista B2C” ou botão “Criar loja”",
        "type": "start",
        "actor": "lojista",
        "col": 3,
        "row": 0
      },
      {
        "id": "w2",
        "t": "CreateStoreModal",
        "s": "Nome, categoria, descrição, contatos, logo e banner",
        "type": "process",
        "actor": "lojista",
        "col": 3,
        "row": 1
      },
      {
        "id": "w3",
        "t": "createStore",
        "s": "Loja criada e usuário promovido a seller com store_id",
        "type": "process",
        "actor": "sistema",
        "col": 3,
        "row": 2
      },
      {
        "id": "w4",
        "t": "Solicitar verificação",
        "s": "CNPJ, razão social e site → verification_status = pending (promessa de 24h)",
        "type": "process",
        "actor": "lojista",
        "col": 3,
        "row": 3
      },
      {
        "id": "w5",
        "t": "Admin audita em “Auditoria de Lojas”",
        "s": "Lojas pendentes listadas no painel master",
        "type": "process",
        "actor": "admin",
        "col": 3,
        "row": 4
      },
      {
        "id": "w6",
        "t": "Aprovar?",
        "type": "decision",
        "actor": "admin",
        "col": 3,
        "row": 5
      },
      {
        "id": "w7",
        "t": "Selo “Loja Verificada”",
        "s": "is_verified = true · produtos ganham is_verified_store",
        "type": "process",
        "actor": "sucesso",
        "col": 2,
        "row": 6
      },
      {
        "id": "w8",
        "t": "Verificação recusada",
        "s": "verification_status = rejected com observações",
        "type": "process",
        "actor": "atencao",
        "col": 4,
        "row": 6
      },
      {
        "id": "w9",
        "t": "Loja visível com filtro “somente verificadas”",
        "type": "end",
        "actor": "lojista",
        "col": 3,
        "row": 7
      }
    ],
    "edges": [
      {
        "from": "v1",
        "to": "v2"
      },
      {
        "from": "v2",
        "to": "v3",
        "label": "Sim",
        "kind": "error"
      },
      {
        "from": "v2",
        "to": "v4",
        "label": "Não",
        "kind": "success"
      },
      {
        "from": "v3",
        "to": "v4",
        "label": "após login",
        "kind": "auth",
        "labelOffset": [
          40,
          -9
        ]
      },
      {
        "from": "v4",
        "to": "v5"
      },
      {
        "from": "v5",
        "to": "v6"
      },
      {
        "from": "v6",
        "to": "v7",
        "label": "Não",
        "kind": "error",
        "labelOffset": [
          -7,
          -9
        ]
      },
      {
        "from": "v6",
        "to": "v8",
        "label": "Sim",
        "kind": "success",
        "labelOffset": [
          -38,
          -8
        ]
      },
      {
        "from": "v7",
        "to": "v5",
        "label": "corrige",
        "kind": "error",
        "labelOffset": [
          -4,
          -9
        ]
      },
      {
        "from": "v8",
        "to": "v9"
      },
      {
        "from": "v9",
        "to": "v10"
      },
      {
        "from": "w1",
        "to": "w2"
      },
      {
        "from": "w2",
        "to": "w3"
      },
      {
        "from": "w3",
        "to": "w4"
      },
      {
        "from": "w4",
        "to": "w5",
        "label": "fila de análise",
        "kind": "admin"
      },
      {
        "from": "w5",
        "to": "w6"
      },
      {
        "from": "w6",
        "to": "w7",
        "label": "Sim",
        "kind": "success"
      },
      {
        "from": "w6",
        "to": "w8",
        "label": "Não",
        "kind": "error"
      },
      {
        "from": "w7",
        "to": "w9"
      }
    ]
  },
  {
    "id": "engajamento",
    "num": 5,
    "title": "Engajamento — comunidade, treinadores e favoritos",
    "desc": "Fluxos sociais e de serviço: feed com 5 categorias, publicação, curtidas e comentários; agendamento de assessoria esportiva com CREF; e a lista de desejos.",
    "legend": [
      "visitante",
      "atleta",
      "sistema",
      "atencao",
      "sucesso"
    ],
    "nodes": [
      {
        "id": "e1",
        "t": "Comunidade — Feed de Atletas",
        "s": "Filtro por categoria: equipamentos, treino, eventos, dúvidas e conquistas",
        "type": "start",
        "actor": "sistema",
        "col": 0,
        "row": 0
      },
      {
        "id": "e2",
        "t": "Qual interação?",
        "type": "decision",
        "actor": "sistema",
        "col": 0,
        "row": 1
      },
      {
        "id": "e3",
        "t": "Publicar post",
        "s": "Título, conteúdo e categoria · badge “Admin / Loja Oficial / Atleta”",
        "type": "process",
        "actor": "atleta",
        "col": 0,
        "row": 2
      },
      {
        "id": "e4",
        "t": "Curtir",
        "s": "likeCommunityPost → likes_count +1",
        "type": "process",
        "actor": "atleta",
        "col": 1,
        "row": 2
      },
      {
        "id": "e5",
        "t": "Comentar",
        "s": "Comentário com avatar e data",
        "type": "process",
        "actor": "atleta",
        "col": 2,
        "row": 2
      },
      {
        "id": "e6",
        "t": "É visitante?",
        "type": "decision",
        "actor": "atencao",
        "col": 0,
        "row": 3
      },
      {
        "id": "e7",
        "t": "AuthModal",
        "s": "Curtir é livre; publicar e comentar exigem conta",
        "type": "process",
        "actor": "atencao",
        "col": 0,
        "row": 4
      },
      {
        "id": "e8",
        "t": "Post/comentário no feed",
        "s": "CommunityService grava em community_posts",
        "type": "process",
        "actor": "sucesso",
        "col": 1,
        "row": 4
      },
      {
        "id": "e9",
        "t": "Moderação",
        "s": "reportCommunityPost() e adminDeleteCommunityPost() existem no store, mas nenhuma tela oferece os botões ⚠",
        "type": "note",
        "actor": "atencao",
        "col": 2,
        "row": 4
      },
      {
        "id": "t1",
        "t": "Treinadores Especializados",
        "s": "Cards com CREF validado, avaliação, modalidade e valor/hora",
        "type": "start",
        "actor": "sistema",
        "col": 3,
        "row": 0
      },
      {
        "id": "t2",
        "t": "Filtro por modalidade",
        "s": "Corrida · Maratona · Triatlo · Ciclismo · Trail Running",
        "type": "process",
        "actor": "atleta",
        "col": 3,
        "row": 1
      },
      {
        "id": "t3",
        "t": "Escolhe plano",
        "s": "Mensal · Consultoria pontual · Temporada",
        "type": "process",
        "actor": "atleta",
        "col": 3,
        "row": 2
      },
      {
        "id": "t4",
        "t": "Confirmar agendamento",
        "s": "Visitante → AuthModal ⚠ (modal fecha sozinho após ~2,5s, sem persistir)",
        "type": "process",
        "actor": "atencao",
        "col": 3,
        "row": 4
      },
      {
        "id": "t5",
        "t": "Toast de solicitação enviada",
        "type": "end",
        "actor": "sucesso",
        "col": 3,
        "row": 5
      },
      {
        "id": "f1",
        "t": "Favoritar produto",
        "s": "Coração no card do marketplace e na ficha do produto",
        "type": "start",
        "actor": "atleta",
        "col": 4,
        "row": 0
      },
      {
        "id": "f2",
        "t": "Visitante?",
        "type": "decision",
        "actor": "atencao",
        "col": 4,
        "row": 1
      },
      {
        "id": "f6",
        "t": "AuthModal",
        "s": "Login necessário para salvar",
        "type": "process",
        "actor": "atencao",
        "col": 4,
        "row": 3
      },
      {
        "id": "f4",
        "t": "toggleFavorite → localStorage",
        "s": "Lista de favoritos salva por navegador",
        "type": "process",
        "actor": "sistema",
        "col": 4,
        "row": 2
      },
      {
        "id": "f5",
        "t": "“Meus Favoritos” na sidebar",
        "s": "Abre a view “profile”, que não é renderizada em app/page.tsx ⚠ — lista sem tela",
        "type": "note",
        "actor": "atencao",
        "col": 4,
        "row": 5
      }
    ],
    "edges": [
      {
        "from": "e1",
        "to": "e2"
      },
      {
        "from": "e2",
        "to": "e3"
      },
      {
        "from": "e2",
        "to": "e4"
      },
      {
        "from": "e2",
        "to": "e5"
      },
      {
        "from": "e3",
        "to": "e6"
      },
      {
        "from": "e5",
        "to": "e6",
        "label": "exige conta",
        "kind": "error",
        "labelOffset": [
          0,
          34
        ]
      },
      {
        "from": "e6",
        "to": "e7",
        "label": "Sim",
        "kind": "error"
      },
      {
        "from": "e6",
        "to": "e8",
        "label": "Não",
        "kind": "success",
        "labelOffset": [
          26,
          -9
        ]
      },
      {
        "from": "e7",
        "to": "e8",
        "kind": "auth"
      },
      {
        "from": "e8",
        "to": "e9",
        "kind": "error",
        "dashed": true
      },
      {
        "from": "t1",
        "to": "t2"
      },
      {
        "from": "t2",
        "to": "t3"
      },
      {
        "from": "t3",
        "to": "t4",
        "label": "agendar"
      },
      {
        "from": "t4",
        "to": "t5"
      },
      {
        "from": "f1",
        "to": "f2"
      },
      {
        "from": "f2",
        "to": "f6",
        "label": "Sim",
        "kind": "error",
        "dashed": true,
        "fromSide": "left",
        "labelOffset": [
          10,
          -6
        ]
      },
      {
        "from": "f2",
        "to": "f4",
        "label": "Não"
      },
      {
        "from": "f6",
        "to": "f4",
        "label": "após login",
        "kind": "auth",
        "labelOffset": [
          12,
          0
        ]
      },
      {
        "from": "f4",
        "to": "f5",
        "label": "abrir lista",
        "kind": "error",
        "fromSide": "left",
        "labelOffset": [
          46,
          -6
        ]
      }
    ]
  },
  {
    "id": "admin",
    "num": 6,
    "title": "Painel administrativo — 8 módulos executivos",
    "desc": "Guarda de acesso por e-mail master, barra de ações rápidas e os módulos: métricas, auditoria de lojas, catálogo, usuários, pedidos/custódia, lojas e banco de dados.",
    "legend": [
      "admin",
      "atencao",
      "sistema",
      "sucesso"
    ],
    "nodes": [
      {
        "id": "d1",
        "t": "Acesso ao Painel Admin",
        "s": "Item de menu só aparece para admin ou e-mail master",
        "type": "start",
        "actor": "admin",
        "col": 1,
        "row": 0
      },
      {
        "id": "d2",
        "t": "isUserAdmin(email)?",
        "type": "decision",
        "actor": "atencao",
        "col": 1,
        "row": 1
      },
      {
        "id": "d3",
        "t": "Tela “Acesso Restrito”",
        "s": "Botão “Entrar como Super Admin Master” e atalho para o marketplace",
        "type": "process",
        "actor": "atencao",
        "col": 3,
        "row": 2
      },
      {
        "id": "d4",
        "t": "Barra master",
        "s": "Sincronizar Supabase · + Novo Usuário · Console SQL",
        "type": "process",
        "actor": "admin",
        "col": 1,
        "row": 2
      },
      {
        "id": "d5",
        "t": "1. Métricas & Ecossistema",
        "s": "GMV, receita estimada de custódia (4,5%), lojas verificadas, B2C x C2C",
        "type": "process",
        "actor": "admin",
        "col": 0,
        "row": 3
      },
      {
        "id": "d6",
        "t": "2. Auditoria de Lojas",
        "s": "Aprovar ou recusar selo · notas de compliance",
        "type": "process",
        "actor": "admin",
        "col": 1,
        "row": 3
      },
      {
        "id": "d7",
        "t": "3. Moderar Catálogo",
        "s": "Status active/draft/sold/suspended, filtro e exclusão de anúncios",
        "type": "process",
        "actor": "admin",
        "col": 2,
        "row": 3
      },
      {
        "id": "d8",
        "t": "4. Usuários & Atletas",
        "s": "Criar, excluir, banir/desbanir e trocar papel · conta master protegida",
        "type": "process",
        "actor": "admin",
        "col": 3,
        "row": 3
      },
      {
        "id": "d9",
        "t": "5. Pedidos & Custódia",
        "s": "Status do pedido e do pagamento · confirmar pagamento em sandbox",
        "type": "process",
        "actor": "admin",
        "col": 0,
        "row": 5
      },
      {
        "id": "d10",
        "t": "6. Lojas Oficiais",
        "s": "Lista consolidada com selo, dono e catálogo",
        "type": "process",
        "actor": "admin",
        "col": 1,
        "row": 5
      },
      {
        "id": "d11",
        "t": "7. Banco Supabase",
        "s": "Contagens por tabela, host PostgreSQL, RLS e console SQL",
        "type": "process",
        "actor": "sistema",
        "col": 2,
        "row": 5
      },
      {
        "id": "d12",
        "t": "Ações de API",
        "s": "Papel, banimento e exclusão de usuário chamam /api/users · lojas usam /api/stores",
        "type": "process",
        "actor": "sistema",
        "col": 3,
        "row": 5
      },
      {
        "id": "d13",
        "t": "Somente estado local",
        "s": "adminUpdateOrderStatus e adminToggleProductStatus alteram só a memória (sem gravar no banco) ⚠",
        "type": "note",
        "actor": "atencao",
        "col": 1,
        "row": 7
      },
      {
        "id": "d14",
        "t": "Sync Supabase",
        "s": "Recarrega produtos, lojas e posts no estado · toast de resultado",
        "type": "end",
        "actor": "sucesso",
        "col": 3,
        "row": 7
      }
    ],
    "edges": [
      {
        "from": "d1",
        "to": "d2"
      },
      {
        "from": "d2",
        "to": "d3",
        "label": "Não",
        "kind": "error"
      },
      {
        "from": "d2",
        "to": "d4",
        "label": "Sim",
        "kind": "admin",
        "labelOffset": [
          -30,
          -2
        ]
      },
      {
        "from": "d3",
        "to": "d4",
        "label": "após login master",
        "kind": "auth",
        "labelOffset": [
          10,
          -9
        ]
      },
      {
        "from": "d4",
        "to": "d5",
        "label": "módulos",
        "labelOffset": [
          -52,
          -8
        ]
      },
      {
        "from": "d4",
        "to": "d6"
      },
      {
        "from": "d4",
        "to": "d7"
      },
      {
        "from": "d4",
        "to": "d8",
        "bend": 14
      },
      {
        "from": "d5",
        "to": "d9"
      },
      {
        "from": "d6",
        "to": "d10"
      },
      {
        "from": "d7",
        "to": "d11"
      },
      {
        "from": "d8",
        "to": "d12"
      },
      {
        "from": "d9",
        "to": "d13",
        "label": "status",
        "kind": "data",
        "fromSide": "right",
        "labelOffset": [
          46,
          -8
        ]
      },
      {
        "from": "d11",
        "to": "d14",
        "label": "contagens",
        "kind": "data",
        "toSide": "left",
        "labelOffset": [
          40,
          -8
        ]
      },
      {
        "from": "d12",
        "to": "d14",
        "label": "grava",
        "kind": "data",
        "labelOffset": [
          -34,
          -8
        ]
      }
    ]
  },
  {
    "id": "dados",
    "num": 7,
    "title": "Dados, serviços e persistência — onde cada ação é gravada",
    "desc": "Camadas do sistema: estado global no cliente, services que falam com o Supabase e com as API Routes, pool PostgreSQL com RLS, server actions validadas por zod (hoje sem uso) e o fallback offline.",
    "legend": [
      "sistema",
      "atencao",
      "sucesso",
      "admin"
    ],
    "bands": [
      {
        "ids": [
          "s1",
          "s2",
          "s3"
        ],
        "label": "CLIENTE (BROWSER)",
        "fill": "rgba(167,139,250,0.05)",
        "stroke": "#3A3159"
      },
      {
        "ids": [
          "s4",
          "s5",
          "s10"
        ],
        "label": "SERVIDOR NEXT.JS",
        "fill": "rgba(56,189,248,0.05)",
        "stroke": "#27455C"
      },
      {
        "ids": [
          "s6",
          "s7",
          "s8"
        ],
        "label": "DADOS PERSISTENTES",
        "fill": "rgba(52,211,153,0.04)",
        "stroke": "#26493D"
      }
    ],
    "nodes": [
      {
        "id": "s1",
        "t": "Estado global",
        "s": "CoreMotiomProvider: produtos, lojas, pedidos, carrinho, favoritos, posts, toasts",
        "type": "process",
        "actor": "sistema",
        "col": 0,
        "row": 0
      },
      {
        "id": "s2",
        "t": "localStorage",
        "s": "coremotiom_state_v1: user, cart, orders, favorites, posts",
        "type": "data",
        "actor": "sistema",
        "col": 0,
        "row": 1
      },
      {
        "id": "s3",
        "t": "Services do cliente",
        "s": "AuthService · ProductService · StoreService · OrderService · CommunityService",
        "type": "process",
        "actor": "sistema",
        "col": 1,
        "row": 1
      },
      {
        "id": "s9",
        "t": "Fallback offline",
        "s": "Sem Supabase: INITIAL_PRODUCTS, INITIAL_STORES e dados de demonstração seguem operando",
        "type": "note",
        "actor": "atencao",
        "col": 2,
        "row": 1
      },
      {
        "id": "s4",
        "t": "API Routes",
        "s": "/api/products · /api/stores · /api/listings · /api/users · /api/auth/sync",
        "type": "process",
        "actor": "sistema",
        "col": 0,
        "row": 2
      },
      {
        "id": "s5",
        "t": "Server Actions (zod)",
        "s": "auth · products · stores · orders — nenhuma é chamada pelo cliente hoje ⚠",
        "type": "note",
        "actor": "atencao",
        "col": 1,
        "row": 2
      },
      {
        "id": "s10",
        "t": "Middleware",
        "s": "Apenas injeta o header x-coremotiom-platform — não protege rotas ⚠",
        "type": "note",
        "actor": "atencao",
        "col": 2,
        "row": 2
      },
      {
        "id": "s6",
        "t": "PostgreSQL (Supabase)",
        "s": "profiles · stores · products · orders · community_posts (migração SQL + RLS)",
        "type": "data",
        "actor": "sucesso",
        "col": 0,
        "row": 3
      },
      {
        "id": "s7",
        "t": "Supabase Auth",
        "s": "E-mail/senha, OAuth Google e callback em /auth/callback",
        "type": "process",
        "actor": "admin",
        "col": 1,
        "row": 3
      },
      {
        "id": "s8",
        "t": "Imagens do catálogo",
        "s": "Arquivos em /public/products e URLs externas nos anúncios",
        "type": "data",
        "actor": "sistema",
        "col": 2,
        "row": 3
      }
    ],
    "edges": [
      {
        "from": "s1",
        "to": "s3",
        "label": "ações",
        "kind": "flow",
        "dstOffsetX": 40
      },
      {
        "from": "s1",
        "to": "s2",
        "label": "saveState()",
        "kind": "data",
        "srcOffsetX": -60,
        "dstOffsetX": -60
      },
      {
        "from": "s3",
        "to": "s4",
        "label": "fetch",
        "dstOffsetX": -50
      },
      {
        "from": "s4",
        "to": "s6",
        "label": "pg Pool",
        "kind": "data"
      },
      {
        "from": "s3",
        "to": "s5",
        "label": "sem chamadas",
        "kind": "error",
        "labelOffset": [
          58,
          -8
        ]
      },
      {
        "from": "s3",
        "to": "s7",
        "label": "auth",
        "kind": "admin",
        "fromSide": "right",
        "labelOffset": [
          0,
          -6
        ]
      },
      {
        "from": "s3",
        "to": "s8",
        "label": "mídia",
        "fromSide": "right",
        "gutter": 12,
        "labelOffset": [
          6,
          -70
        ]
      },
      {
        "from": "s9",
        "to": "s1",
        "label": "hidrata (seed)",
        "kind": "error",
        "fromSide": "left",
        "labelOffset": [
          -30,
          -6
        ]
      }
    ]
  }
]
```

### 4.3 Tabelas de apoio

```json
{
  "permissions": {
    "head": [
      "Capacidade",
      "Visitante",
      "Atleta (user)",
      "Lojista (seller)",
      "Admin master"
    ],
    "rows": [
      [
        "Navegar Home, Marketplace, Lojas, Treinadores e Feed",
        "sim",
        "sim",
        "sim",
        "sim"
      ],
      [
        "Busca global (⌘K) e filtros do marketplace",
        "sim",
        "sim",
        "sim",
        "sim"
      ],
      [
        "Curtir post da comunidade",
        "sim",
        "sim",
        "sim",
        "sim"
      ],
      [
        "Favoritar produto",
        "não → AuthModal",
        "sim",
        "sim",
        "sim"
      ],
      [
        "Adicionar ao carrinho e finalizar compra",
        "sim (pedido guest)",
        "sim",
        "sim",
        "sim"
      ],
      [
        "Publicar post e comentar",
        "não → AuthModal",
        "sim",
        "sim",
        "sim"
      ],
      [
        "Agendar treinador",
        "não → AuthModal",
        "sim",
        "sim",
        "sim"
      ],
      [
        "Anunciar equipamento C2C (SellC2CView)",
        "não → AuthModal",
        "sim",
        "sim",
        "sim"
      ],
      [
        "Criar loja oficial (CreateStoreModal)",
        "não",
        "sim (vira seller)",
        "sim",
        "sim"
      ],
      [
        "Solicitar selo de loja verificada",
        "não",
        "não",
        "sim (dono)",
        "sim"
      ],
      [
        "Ver o item “Painel Admin” na sidebar",
        "não",
        "não",
        "não",
        "sim"
      ],
      [
        "Aprovar lojas, moderar catálogo e usuários",
        "não",
        "não",
        "não",
        "sim"
      ],
      [
        "Acesso rápido de demonstração (switchRole)",
        "sim",
        "sim",
        "sim",
        "sim"
      ]
    ]
  },
  "status": {
    "head": [
      "Entidade",
      "Status possíveis",
      "Quem altera"
    ],
    "rows": [
      [
        "Order.order_status",
        "pending_payment → paid → preparing → shipped → delivered · cancelled",
        "Checkout (criação) e Admin (confirmar pagamento / alterar status)"
      ],
      [
        "Order.payment_status",
        "pending · completed · failed · refunded",
        "Checkout e Admin (sandbox)"
      ],
      [
        "Store.verification_status",
        "none → pending → verified / rejected",
        "Lojista solicita; Admin homologa"
      ],
      [
        "Product.status",
        "active · draft · sold · suspended",
        "Lojista (criação) e Admin (moderação)"
      ],
      [
        "UserProfile.role",
        "visitor · user · seller · admin",
        "Cadastro e Admin (updateUserRole)"
      ],
      [
        "UserProfile.is_banned",
        "false → true (ban_reason)",
        "Admin (banir / desbanir)"
      ]
    ]
  },
  "gaps": [
    {
      "t": "View “profile” não existe",
      "d": "A sidebar leva para activeView = \"profile\" em “Meus Favoritos” e no avatar mobile, mas app/page.tsx não renderiza esse bloco — a tela fica vazia, sem lista de favoritos, dados do perfil ou pedidos do usuário.",
      "tag": "Navegação"
    },
    {
      "t": "View “news” declarada e sem tela",
      "d": "ActiveView inclui \"news\" e o store carrega INITIAL_NEWS, mas nenhum componente consome essas notícias.",
      "tag": "Navegação"
    },
    {
      "t": "SmartScanView órfão",
      "d": "components/SmartScanView.tsx (análise de desgaste/pace com IA) tem 356 linhas e não é importado por nenhuma view do app.",
      "tag": "Funcionalidade"
    },
    {
      "t": "Componentes duplicados",
      "d": "AuthModal, MarketplaceView, ProductCard, ProductDetailModal, StoresView, CreateStoreModal, Footer e AdminDashboard existem na raiz de components/ e também em subpastas que apenas reexportam — risco real de editar o arquivo errado.",
      "tag": "Manutenção"
    },
    {
      "t": "Checkout não coleta bairro/número",
      "d": "O formulário pede apenas endereço, cidade e UF, mas grava \"Bela Vista\" e número \"1000\" fixos; o shippingMethod é sempre \"pac\". O checkoutSchema do zod exige neighborhood e number — o server action de checkout rejeitaria esses dados.",
      "tag": "Checkout"
    },
    {
      "t": "Server actions sem uso",
      "d": "serverLogin, serverSignUp, serverProcessCheckout, serverCreateProduct e serverCreateStore nunca são chamadas: os componentes falam direto com Supabase/services. Duas trilhas concorrentes de escrita, com validações diferentes.",
      "tag": "Arquitetura"
    },
    {
      "t": "Visitante finaliza compra",
      "d": "O carrinho e o CheckoutModal não exigem login; createOrder usa user?.id || \"guest-user\". Pedidos de visitante não têm dono para consulta posterior.",
      "tag": "Regra de negócio"
    },
    {
      "t": "Moderação de posts inacessível",
      "d": "reportCommunityPost e adminDeleteCommunityPost existem no store, mas nenhum componente expõe botão de denúncia ou exclusão — os campos is_reported/report_reason nunca são acionados pela UI.",
      "tag": "Comunidade"
    },
    {
      "t": "Recuperação de senha inoperante",
      "d": "O modal de “Esqueci a senha” só exibe uma mensagem informativa; AuthService.resetPassword existe e não é chamado, e não há rota /auth/reset-password.",
      "tag": "Autenticação"
    },
    {
      "t": "Status de pedido e produto só em memória",
      "d": "adminUpdateOrderStatus e adminToggleProductStatus alteram apenas o estado do React. Não há função de ordens em lib/db-queries.ts — pedidos vivem em localStorage/Supabase, sem trilha administrativa persistida.",
      "tag": "Dados"
    },
    {
      "t": "Credenciais no código",
      "d": "lib/db.ts traz DEFAULT_DATABASE_URL com usuário e senha do PostgreSQL em texto puro como fallback. Essas credenciais devem sair do repositório e virar variável de ambiente (com rotação).",
      "tag": "Segurança"
    },
    {
      "t": "Middleware não protege rotas",
      "d": "middleware.ts apenas adiciona o header de plataforma; /admin e APIs internas não têm verificação de sessão no servidor — a regra de admin é só client-side (isUserAdmin por e-mail).",
      "tag": "Segurança"
    },
    {
      "t": "Favoritos, carrinho e pedidos sem tabela",
      "d": "A migração SQL cobre profiles, stores, products, orders e community_posts; carrinho e favoritos existem apenas no localStorage e não sincronizam entre dispositivos.",
      "tag": "Dados"
    },
    {
      "t": "Agendamento de treinador não persiste",
      "d": "handleConfirmBooking só dispara toast e fecha o modal após 2,5s: não há tabela, serviço ou registro de agendamento.",
      "tag": "Funcionalidade"
    }
  ],
  "fileMap": {
    "head": [
      "Fluxo",
      "Ponto de entrada",
      "Regras e dados"
    ],
    "rows": [
      [
        "Shell e navegação",
        "app/layout.tsx · app/page.tsx · components/Sidebar.tsx",
        "lib/store.tsx (ActiveView, modais globais, toasts)"
      ],
      [
        "Autenticação",
        "components/AuthModal.tsx · app/auth/callback/page.tsx",
        "services/authService.ts · app/api/auth/sync/route.ts · lib/db-queries.ts"
      ],
      [
        "Compra",
        "components/HomeHeroAndHighlights.tsx · MarketplaceView · ProductDetailModal · CheckoutModal",
        "services/orderService.ts · lib/schemas/order.schema.ts"
      ],
      [
        "Venda C2C",
        "components/SellC2CView.tsx · ProductCard.tsx",
        "services/productService.ts · app/api/listings/route.ts · lib/schemas/product.schema.ts"
      ],
      [
        "Lojas e selo",
        "components/StoresView.tsx · CreateStoreModal.tsx · AdminDashboard.tsx",
        "services/storeService.ts · app/api/stores/route.ts · lib/schemas/store.schema.ts"
      ],
      [
        "Comunidade",
        "components/CommunityView.tsx",
        "services/communityService.ts · lib/initial-data.ts"
      ],
      [
        "Treinadores",
        "components/CoachesView.tsx",
        "INITIAL_COACHES (lib/initial-data.ts)"
      ],
      [
        "Administração",
        "components/AdminDashboard.tsx",
        "lib/store.tsx (ações admin) · app/api/users/route.ts · app/api/products/route.ts"
      ],
      [
        "Banco e infraestrutura",
        "lib/db.ts · lib/db-queries.ts · middleware.ts",
        "supabase/migrations/20250101000000_coremotiom_initial_schema.sql"
      ]
    ]
  },
  "filesSummary": [
    [
      "Rotas/telas renderizadas",
      "7 views: home, marketplace, stores, sell, coaches, community, admin"
    ],
    [
      "Modais globais",
      "AuthModal · SupabaseConfigModal · CheckoutModal · CreateStoreModal · ProductDetailModal"
    ],
    [
      "Tabelas PostgreSQL",
      "profiles · stores · products · orders · community_posts"
    ],
    [
      "Rotas de API",
      "/api/products · /api/stores · /api/listings · /api/users · /api/auth/sync"
    ],
    [
      "Services de domínio",
      "AuthService · ProductService · StoreService · OrderService · CommunityService"
    ]
  ]
}
```

**Como interpretar as chaves de `ACTORS`:** `visitante` = sem conta · `atleta` = `role: user` · `lojista` =
`role: seller` · `admin` = e-mails master · `sistema` = dados/infra · `atencao` = lacuna/erro (âmbar) ·
`sucesso` = confirmação (verde).

---

## 5. Regras de modelagem, layout e renderização

### 5.1 Tipos de nó

| `type` | Forma | Uso |
| --- | --- | --- |
| `start` | pílula arredondada | entrada do fluxo (tela, ação do usuário) |
| `end` | pílula arredondada | saída do fluxo (estado final, logout, feedback) |
| `process` | retângulo arredondado | etapa executada pelo app ou pelo usuário |
| `decision` | hexágono | pergunta com 2+ saídas rotuladas (“Sim”, “Não”, “e-mail master”) |
| `data` | paralelogramo | leitura/gravação em banco, localStorage ou API |
| `note` | retângulo com borda tracejada | avisos e lacunas (usar `actor: atencao`) |

Larguras por tipo (px): `start/end 188` · `process 214` · `decision 236` · `data 224` · `note 220`.

### 5.2 Atores e arestas

- A cor do nó e do seu texto vem de `ACTORS[actor]` (`fill`/`stroke`/`text`/`sub`); a legenda usa `label`.
- A aresta usa `EDGE_KINDS[kind]`; sem `kind`, assume `flow` (cinza). Convenção de significado:
  `flow` caminho normal · `auth` login/sessão (roxo) · `success` caminho feliz/engajamento (verde) ·
  `error` falha (vermelho) · `admin` poder administrativo (âmbar) · `data` gravação (azul).
- `labelOffset` existe para tirar o rótulo de cima da linha; `fromSide`/`toSide` forçam a saída/entrada lateral.

### 5.3 Layout (grade de 5 colunas)

1. Cada nó tem `col ∈ [0,4]` e `row ∈ ℕ`; a posição X base é `x0 + col * colW`, com `x0 = 62`, `colW = 276`;
   o nó é centralizado na coluna.
2. As linhas são empilhadas na ordem crescente de `row`, com `y0 = 26` e `vGap = 46`. A altura da linha é a
   altura do nó mais alto dela.
3. Altura do nó = `22 + linhas_do_título * 15,5 + (subtítulo ? 6 + linhas_do_subtítulo * 13,2 : 0)`, mínimo 54
   (46 em `start`/`end`). Texto é quebrado por `wrapText`, que estima `largura do caractere = fontSize × 0,578`
   (regular) ou `× 0,62` (negrito), com no mínimo 6 caracteres por linha.
4. **Nós podem se sobrepor em X** quando colunas vizinhas têm linhas diferentes — é isso que produz o visual
   “escada” do diagrama 3; mantenha os `col`/`row` do §4.2.

### 5.4 Roteamento ortogonal das arestas

1. A aresta sai do lado do nó de origem mais próximo do destino (`left`/`right`/`top`/`bottom`), com um degrau
   fixo de saída.
2. Quando origem e destino estão em **colunas diferentes**, o caminho desce até um **corredor horizontal**
   (faixa de 14 px entre linhas) e só então anda na horizontal, voltando a descer — nunca cruza a caixa de um nó.
3. Quando estão na **mesma coluna**, o caminho é vertical direto (com pequeno desvio se houver nó no meio).
4. As pontas recebem **seta** (marker próprio) e podem receber `label` posicionado no ponto médio do trecho
   horizontal, deslocado por `labelOffset`.
5. Linhas de dados (`kind: data`) usam traço mais fino e cor azul; linhas de admin usam âmbar.

### 5.5 SVG gerado

- `viewBox` calculado a partir da caixa de todos os nós + padding; sem `width`/`height` fixos (o CSS dimensiona).
- Fundo `CANVAS_BG` (`#0B0C10`) com grade sutil; moldura arredondada.
- Nó: `<rect>`/`<polygon>`/pílula + título em negrito + subtítulo em cor `sub`, ambos centralizados.
- Arestas antes dos nós (para ficarem atrás), rótulos por último (para ficarem legíveis).
- Texto sempre escapado (`&`, `<`, `>`, `"`).

---

## 6. Pipeline de geração e kit de reprodução

```bash
# 1. dependências (Node 20+; o gerador de PDF precisa das duas)
npm i -D pdf-lib @resvg/resvg-js

# 2. gerar o HTML + manifesto de dados
npm run flow:html          # Fluxograma/Diagrama C. De Uso/fluxograma-usuario.html   (+ Fluxograma/Diagrama C. De Uso/.flowchart-data.json, ignorado no git)

# 3. gerar o PDF (rasteriza os SVGs do manifesto com resvg e monta o A4 com pdf-lib)
npm run flow:pdf           # Fluxograma/Diagrama C. De Uso/fluxograma-usuario.pdf (+ Fluxograma/Diagrama C. De Uso/casos-de-uso.pdf)

# atalhos úteis
npm run flow               # HTML + os dois PDFs
npm run mestres            # regenera este documento mestre
FLOW_EMIT_SVG=/tmp/svgs npm run flow:html   # despeja os SVGs 01–08 para inspeção
FLOW_EMIT_JSON=/tmp/flow.json npm run flow:html
FLOW_MANIFEST=... FLOW_PNG_DIR=... PDF_DEBUG=1 npm run flow:pdf   # modo offline/depuração
```

- **Manifesto** (`Fluxograma/Diagrama C. De Uso/.flowchart-data.json`): metadados, os 7 diagramas (com `width`/`height`), os 48 casos de
  uso, permissões, estados, lacunas e arquivos. É o contrato entre o gerador de HTML e o de PDF; se estiver
  velho, o gerador de PDF o reexecuta sozinho.
- **Rasterização**: `@resvg/resvg-js` renderiza cada SVG em PNG com `zoom 2`; fontes DejaVu empacotadas quando
  disponíveis, fontes do sistema como fallback. `FLOW_PNG_DIR` permite apontar PNGs prontos (uso offline).
- **PDF**: `pdf-lib` via mini-kit próprio (`scripts/lib/pdf-kit.mjs`) — texto, títulos, pílulas, tabelas,
  cards, imagens e rodapé numerado. `embedPng` é assíncrono: **sempre** `await` (erro clássico: `options.x must
  be of type number… NaN` no `placeImage`).
- **Autoverificação do HTML**: o gerador valida arestas órfãs, nós fora da área e rótulos sobrepostos e
  imprime avisos no terminal.

---

## 7. Catálogo dos 7 fluxos

| # | Fluxo (`id`) | O que documenta | Atores envolvidos | Nós · Arestas |
| ---: | --- | --- | --- | ---: |
| 1 | Visão geral — do primeiro acesso às jornadas por papel (`visao-geral`) | Mapa macro de tudo que o app entrega hoje: bootstrap da SPA, detecção de sessão, papéis (visitante, atleta, lojista, admin), as seis jornadas de uso e a camada de persistência. | Sistema / Dados, Visitante (sem conta), Atleta / Usuário (role: user), Super Admin (e-mails master), Alerta / Lacuna / Erro, Lojista (role: seller), Confirmação / Sucesso | 15 · 18 |
| 2 | Autenticação, papéis e ciclo de sessão (`autenticacao`) | AuthModal (4 modos), acesso rápido de demonstração, login por e-mail/senha, cadastro com tipo de conta, Google OAuth via popup + /auth/callback, guarda de admin e logout. | Visitante (sem conta), Sistema / Dados, Alerta / Lacuna / Erro, Atleta / Usuário (role: user), Lojista (role: seller), Confirmação / Sucesso, Super Admin (e-mails master) | 18 · 20 |
| 3 | Jornada de compra — descoberta, carrinho, pagamento e custódia (`compra`) | Fluxo completo de compra: Home e busca global, filtros do marketplace, ficha do produto, carrinho, entrega, três meios de pagamento, criação do pedido e ciclo de status até a entrega. | Visitante (sem conta), Sistema / Dados, Atleta / Usuário (role: user), Alerta / Lacuna / Erro, Confirmação / Sucesso, Super Admin (e-mails master) | 18 · 18 |
| 4 | Jornada de venda — C2C, loja oficial e selo verificado (`venda`) | Dois caminhos de oferta: atleta anunciando equipamento seminovo (C2C com custódia) e lojista abrindo/enviando loja para auditoria de CNPJ, com a homologação feita pelo admin. | Atleta / Usuário (role: user), Alerta / Lacuna / Erro, Sistema / Dados, Confirmação / Sucesso, Lojista (role: seller), Super Admin (e-mails master) | 19 · 19 |
| 5 | Engajamento — comunidade, treinadores e favoritos (`engajamento`) | Fluxos sociais e de serviço: feed com 5 categorias, publicação, curtidas e comentários; agendamento de assessoria esportiva com CREF; e a lista de desejos. | Sistema / Dados, Atleta / Usuário (role: user), Alerta / Lacuna / Erro, Confirmação / Sucesso | 19 · 19 |
| 6 | Painel administrativo — 8 módulos executivos (`admin`) | Guarda de acesso por e-mail master, barra de ações rápidas e os módulos: métricas, auditoria de lojas, catálogo, usuários, pedidos/custódia, lojas e banco de dados. | Super Admin (e-mails master), Alerta / Lacuna / Erro, Sistema / Dados, Confirmação / Sucesso | 14 · 15 |
| 7 | Dados, serviços e persistência — onde cada ação é gravada (`dados`) | Camadas do sistema: estado global no cliente, services que falam com o Supabase e com as API Routes, pool PostgreSQL com RLS, server actions validadas por zod (hoje sem uso) e o fallback offline. | Sistema / Dados, Alerta / Lacuna / Erro, Confirmação / Sucesso, Super Admin (e-mails master) | 10 · 8 |

---

## 8. Validação e critérios de aceitação

**HTML**

- [ ] 14 seções, 7 SVGs de fluxo (+1 UML), nenhum recurso externo, todos os SVGs com `viewBox`.
- [ ] Aninhamento sem erros (parser HTML), âncoras do sumário resolvendo para os `id`s das seções.
- [ ] Contadores do hero coerentes com o conteúdo (7 diagramas · 48 casos de uso · 14 lacunas).

**PDF**

- [ ] Contagem de páginas = 18 e **nenhuma página em branco**.
- [ ] Sumário com 16 entradas e números conferindo com a página real de cada seção.
- [ ] As 7 figuras presentes, legíveis, na orientação escolhida pelo cálculo de área.
- [ ] Rodapé em todas as páginas com paginação `n / total`.
- [ ] Transliteração aplicada (sem caracteres fora do WinAnsi).

**Como validar sem abrir o arquivo à mão** (funciona em ambiente sem `pdftotext`/`gs`):

```js
// npm i -D pdfjs-dist @napi-rs/canvas
import fs from 'node:fs';
import { createCanvas } from '@napi-rs/canvas';
const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
const doc = await pdfjs.getDocument({ data: new Uint8Array(fs.readFileSync('Fluxograma/Diagrama C. De Uso/fluxograma-usuario.pdf')) }).promise;
for (let n = 1; n <= doc.numPages; n++) {
  const page = await doc.getPage(n);
  const vp = page.getViewport({ scale: 1.4 });
  const canvas = createCanvas(vp.width, vp.height);
  await page.render({ canvasContext: canvas.getContext('2d'), viewport: vp, canvas }).promise;
  fs.writeFileSync(`/tmp/p${n}.png`, canvas.encodeSync('png'));   // conferir visualmente
}
// e o texto, para detectar páginas vazias/deslocadas:
const text = (await (await doc.getPage(2)).getTextContent()).items.map(i => i.str).join(' ');
```

---

## 9. Manutenção

1. **Fonte de verdade**: `scripts/lib/flowchart-core.mjs` (dados + layout + SVG). Nunca edite o HTML/PDF gerados.
2. Mudou uma jornada (tela nova, guarda de acesso, status ou gravação)? Atualize `DIAGRAMS` e rode `npm run flow`.
3. Mudou a lista de lacunas? Atualize `GAPS` — ela alimenta a seção 12, o PDF e este mestre automaticamente.
4. Ao criar/remover caso de uso, ajuste `scripts/lib/usecase-core.mjs` (ver `Fluxograma/Diagrama C. De Uso/mestre-casos-de-uso.md`).
5. Rode `npm run mestres` para manter este documento sincronizado com o código.

---

## Apêndice A — Datasheet dos diagramas

### 1. Visão geral — do primeiro acesso às jornadas por papel

- **id:** `visao-geral` · **15 nós** · **18 arestas** · linhas 0–8
- **legenda de atores:** Visitante (sem conta) · Atleta / Usuário (role: user) · Lojista (role: seller) · Super Admin (e-mails master) · Sistema / Dados
- **tipos de nó:** start 1 · process 10 · decision 2 · data 1 · end 1
- **tipos de aresta:** flow 7 · admin 3 · success 4 · auth 1 · data 3
- **rótulos de decisão/aresta:** “Não” · “Sim” · “e-mail master” · “Sim” · “Não” · “compra” · “engaja” · “acesso total” · “após login” · “vende” · “homologa” · “C2C grava” · “loja grava” · “feed grava”
- **sequência por linha:**
  - **linha 0:** `g1` App carrega em “/”
  - **linha 1:** `g2` Bootstrap do estado
  - **linha 2:** `g3` Sessão válida?
  - **linha 3:** `g4` VISITANTE · `g5` ATLETA / LOJISTA · `g6` ADMIN MASTER
  - **linha 4:** `g7` Ação exige conta? · `g8` JORNADAS DE COMPRA E USO · `g9` PODERES DE ADMINISTRAÇÃO · `g13` Comunidade & Treinadores
  - **linha 5:** `g10` AuthModal
  - **linha 6:** `g11` Vender C2C · `g12` Loja oficial + selo
  - **linha 7:** `g14` Persistência
  - **linha 8:** `g15` Toasts, estados e logout

### 2. Autenticação, papéis e ciclo de sessão

- **id:** `autenticacao` · **18 nós** · **20 arestas** · linhas 0–9
- **legenda de atores:** Atleta / Usuário (role: user) · Lojista (role: seller) · Super Admin (e-mails master) · Alerta / Lacuna / Erro · Sistema / Dados · Confirmação / Sucesso
- **tipos de nó:** start 1 · process 11 · decision 4 · note 1 · end 1
- **tipos de aresta:** flow 12 · admin 2 · auth 2 · error 3 · success 1
- **rótulos de decisão/aresta:** “atalho de teste” · “e-mail” · “cadastro” · “Google” · “Não” · “Sim” · “aguarda e-mail” · “perfil Google” · “recuperação de senha” · “Não” · “Sim” · “sair” · “sair”
- **sequência por linha:**
  - **linha 0:** `a1` Usuário aciona “Entrar”, “Cadastrar” ou uma ação protegida
  - **linha 1:** `a2` AuthModal abre
  - **linha 2:** `a3` Acesso rápido de 1 clique · `a4` Qual método? · `a5` Google OAuth
  - **linha 3:** `a6` Login e-mail + senha · `a7` Criar conta
  - **linha 4:** `a8` Credenciais válidas? · `a9` Confirmação de e-mail pendente?
  - **linha 5:** `a10` Erro exibido no modal · `a11` getProfileOrCreate → setUser + allUsers
  - **linha 6:** `a12` Esqueci a senha · `a13` Sessão monitorada · `a14` Papéis derivados
  - **linha 7:** `a15` E-mail na lista master?
  - **linha 8:** `a16` Atleta / Lojista · `a17` Admin master
  - **linha 9:** `a18` Logout

### 3. Jornada de compra — descoberta, carrinho, pagamento e custódia

- **id:** `compra` · **18 nós** · **18 arestas** · linhas 0–12
- **legenda de atores:** Visitante (sem conta) · Atleta / Usuário (role: user) · Alerta / Lacuna / Erro · Confirmação / Sucesso · Sistema / Dados · Super Admin (e-mails master)
- **tipos de nó:** start 1 · process 12 · decision 2 · end 1 · note 2
- **tipos de aresta:** flow 11 · success 3 · error 2 · auth 1 · admin 1
- **rótulos de decisão/aresta:** “comprar” · “salvar” · “sem exigir conta” · “atalho p/ login” · “PIX / boleto” · “cartão” · “aguardando” · “acompanhamento”
- **sequência por linha:**
  - **linha 0:** `c1` Home — carrossel de destaques
  - **linha 1:** `c2` Descoberta do produto
  - **linha 2:** `c3` Marketplace
  - **linha 3:** `c4` Seleciona o produto
  - **linha 4:** `c5` Qual ação? · `c6` Favoritar / curtir
  - **linha 5:** `c7` Comprar agora / Adicionar ao carrinho
  - **linha 6:** `c8` Passo 1 — Carrinho · `c17` Compra como visitante ⚠
  - **linha 7:** `c9` Passo 2 — Entrega
  - **linha 8:** `c10` Passo 3 — Pagamento · `c18` Caminho com login
  - **linha 9:** `c11` createOrder
  - **linha 10:** `c12` Forma de pagamento?
  - **linha 11:** `c13` PIX / Boleto · `c14` Cartão de crédito
  - **linha 12:** `c15` Passo 4 — Pedido confirmado · `c16` Retaguarda do pedido

### 4. Jornada de venda — C2C, loja oficial e selo verificado

- **id:** `venda` · **19 nós** · **19 arestas** · linhas 0–8
- **legenda de atores:** Visitante (sem conta) · Atleta / Usuário (role: user) · Lojista (role: seller) · Super Admin (e-mails master) · Alerta / Lacuna / Erro · Confirmação / Sucesso
- **tipos de nó:** start 2 · decision 3 · process 11 · note 1 · end 2
- **tipos de aresta:** flow 10 · error 4 · success 3 · auth 1 · admin 1
- **rótulos de decisão/aresta:** “Sim” · “Não” · “após login” · “Não” · “Sim” · “corrige” · “fila de análise” · “Sim” · “Não”
- **sequência por linha:**
  - **linha 0:** `v1` Menu “Vender C2C” · `w1` Quero ser lojista
  - **linha 1:** `v2` É visitante? · `w2` CreateStoreModal
  - **linha 2:** `v3` Bloqueio + AuthModal · `w3` createStore
  - **linha 3:** `v4` Central de Vendas C2C · `w4` Solicitar verificação
  - **linha 4:** `v5` Formulário do anúncio · `w5` Admin audita em “Auditoria de Lojas”
  - **linha 5:** `v6` Título e preço preenchidos? · `w6` Aprovar?
  - **linha 6:** `v7` Toast “Campos obrigatórios” · `v8` createProduct · `w7` Selo “Loja Verificada” · `w8` Verificação recusada
  - **linha 7:** `v9` Anúncio publicado · `w9` Loja visível com filtro “somente verificadas”
  - **linha 8:** `v10` Venda em custódia

### 5. Engajamento — comunidade, treinadores e favoritos

- **id:** `engajamento` · **19 nós** · **19 arestas** · linhas 0–5
- **legenda de atores:** Visitante (sem conta) · Atleta / Usuário (role: user) · Sistema / Dados · Alerta / Lacuna / Erro · Confirmação / Sucesso
- **tipos de nó:** start 3 · decision 3 · process 10 · note 2 · end 1
- **tipos de aresta:** flow 11 · error 5 · success 1 · auth 2
- **rótulos de decisão/aresta:** “exige conta” · “Sim” · “Não” · “agendar” · “Sim” · “Não” · “após login” · “abrir lista”
- **sequência por linha:**
  - **linha 0:** `e1` Comunidade — Feed de Atletas · `t1` Treinadores Especializados · `f1` Favoritar produto
  - **linha 1:** `e2` Qual interação? · `t2` Filtro por modalidade · `f2` Visitante?
  - **linha 2:** `e3` Publicar post · `e4` Curtir · `e5` Comentar · `t3` Escolhe plano · `f4` toggleFavorite → localStorage
  - **linha 3:** `e6` É visitante? · `f6` AuthModal
  - **linha 4:** `e7` AuthModal · `e8` Post/comentário no feed · `e9` Moderação · `t4` Confirmar agendamento
  - **linha 5:** `t5` Toast de solicitação enviada · `f5` “Meus Favoritos” na sidebar

### 6. Painel administrativo — 8 módulos executivos

- **id:** `admin` · **14 nós** · **15 arestas** · linhas 0–7
- **legenda de atores:** Super Admin (e-mails master) · Alerta / Lacuna / Erro · Sistema / Dados · Confirmação / Sucesso
- **tipos de nó:** start 1 · decision 1 · process 10 · note 1 · end 1
- **tipos de aresta:** flow 9 · error 1 · admin 1 · auth 1 · data 3
- **rótulos de decisão/aresta:** “Não” · “Sim” · “após login master” · “módulos” · “status” · “contagens” · “grava”
- **sequência por linha:**
  - **linha 0:** `d1` Acesso ao Painel Admin
  - **linha 1:** `d2` isUserAdmin(email)?
  - **linha 2:** `d3` Tela “Acesso Restrito” · `d4` Barra master
  - **linha 3:** `d5` 1. Métricas & Ecossistema · `d6` 2. Auditoria de Lojas · `d7` 3. Moderar Catálogo · `d8` 4. Usuários & Atletas
  - **linha 5:** `d9` 5. Pedidos & Custódia · `d10` 6. Lojas Oficiais · `d11` 7. Banco Supabase · `d12` Ações de API
  - **linha 7:** `d13` Somente estado local · `d14` Sync Supabase

### 7. Dados, serviços e persistência — onde cada ação é gravada

- **id:** `dados` · **10 nós** · **8 arestas** · linhas 0–3
- **legenda de atores:** Sistema / Dados · Alerta / Lacuna / Erro · Confirmação / Sucesso · Super Admin (e-mails master)
- **tipos de nó:** process 4 · data 3 · note 3
- **tipos de aresta:** flow 3 · data 2 · error 2 · admin 1
- **rótulos de decisão/aresta:** “ações” · “saveState()” · “fetch” · “pg Pool” · “sem chamadas” · “auth” · “mídia” · “hidrata (seed)”
- **sequência por linha:**
  - **linha 0:** `s1` Estado global
  - **linha 1:** `s2` localStorage · `s3` Services do cliente · `s9` Fallback offline
  - **linha 2:** `s4` API Routes · `s5` Server Actions (zod) · `s10` Middleware
  - **linha 3:** `s6` PostgreSQL (Supabase) · `s7` Supabase Auth · `s8` Imagens do catálogo

## Apêndice B — Código-fonte de referência (completo)

> Estes são os arquivos que geram os entregáveis. Copie-os como estão para reproduzir exatamente o mesmo
> resultado (ou use-os como referência fina de layout/roteamento se estiver reimplementando).

### B.1 `scripts/lib/flowchart-core.mjs` — dados + layout + renderizador SVG

```js
/**
 * CoreMotiom — Núcleo do fluxograma do usuário.
 * -------------------------------------------------
 * Fonte única de verdade: dados dos diagramas, motor de layout/roteamento e
 * renderizador SVG. É consumido por:
 *   - scripts/generate-user-flowchart.mjs      (documento HTML)
 *   - scripts/generate-user-flowchart-pdf.mjs  (documento PDF vetorial)
 *
 * Para alterar um fluxo, edite as estruturas DIAGRAMS / USE_CASES / tabelas aqui
 * e rode os dois geradores (ver CONTRIBUTING.md, seção 5).
 */

/**
 * CoreMotiom — Gerador do Fluxograma Completo do Usuário
 * ------------------------------------------------------
 * Lê o mapeamento de telas/fluxos do app (app/page.tsx, lib/store.tsx, components/*,
 * services/*, app/api/*, supabase/migrations) e gera:
 *
 *   Fluxograma/Diagrama C. De Uso/fluxograma-usuario.html → documento autocontido (SVGs inline, sem CDN)
 *
 * Uso:
 *   node scripts/generate-user-flowchart.mjs
 *   FLOW_EMIT_SVG=/tmp/svgs node scripts/generate-user-flowchart.mjs   # p/ inspeção dos SVGs
 *
 * Gerado automaticamente — edite os dados em DIAGRAMS e rode novamente.
 */



/* ------------------------------------------------------------------ *
 * 1. Tema / paleta                                                    *
 * ------------------------------------------------------------------ */

const CANVAS_BG = '#0B0C10';

const ACTORS = {
  visitante: { label: 'Visitante (sem conta)', fill: '#181C25', stroke: '#8B93A7', text: '#E5E7EB', sub: '#A8AFBF' },
  atleta: { label: 'Atleta / Usuário (role: user)', fill: '#0E2A22', stroke: '#34D399', text: '#ECFDF5', sub: '#8FD9C0' },
  lojista: { label: 'Lojista (role: seller)', fill: '#0D2337', stroke: '#38BDF8', text: '#EFF6FF', sub: '#9CCBEC' },
  admin: { label: 'Super Admin (e-mails master)', fill: '#2E1219', stroke: '#F87171', text: '#FEF2F2', sub: '#EBA8A8' },
  sistema: { label: 'Sistema / Dados', fill: '#1C1633', stroke: '#A78BFA', text: '#F5F3FF', sub: '#BDB0EE' },
  atencao: { label: 'Alerta / Lacuna / Erro', fill: '#2B2107', stroke: '#FBBF24', text: '#FFFBEB', sub: '#E3C87F' },
  sucesso: { label: 'Confirmação / Sucesso', fill: '#0E2A22', stroke: '#22C55E', text: '#F0FDF4', sub: '#93DBA8' },
};

const EDGE_KINDS = {
  flow: { stroke: '#8B93A7', label: '#C7CDDA' },
  auth: { stroke: '#A78BFA', label: '#D6CCF5' },
  success: { stroke: '#34D399', label: '#A7E9CE' },
  error: { stroke: '#F87171', label: '#F0B0B0' },
  admin: { stroke: '#FBBF24', label: '#E7CD8C' },
  data: { stroke: '#38BDF8', label: '#A9D8F2' },
};

/* ------------------------------------------------------------------ *
 * 2. Geometria                                                        *
 * ------------------------------------------------------------------ */

const GEO = {
  colW: 276,
  x0: 62,
  y0: 26,
  vGap: 46,
  padX: 13,
  widths: { start: 188, end: 188, process: 214, decision: 236, data: 224, note: 220 },
  titleSize: 12.6,
  subSize: 10.4,
  titleLH: 15.5,
  subLH: 13.2,
};

const escapeXml = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function wrapText(text, maxWidth, fontSize, bold) {
  const charW = fontSize * (bold ? 0.62 : 0.578);
  const maxChars = Math.max(6, Math.floor(maxWidth / charW));
  const out = [];
  for (const rawLine of String(text).split('\n')) {
    const words = rawLine.split(/\s+/).filter(Boolean);
    let line = '';
    for (const word of words) {
      if (!line) line = word;
      else if ((line + ' ' + word).length <= maxChars) line += ' ' + word;
      else {
        out.push(line);
        line = word;
      }
    }
    if (line) out.push(line);
  }
  return out.length ? out : [''];
}

/** Layout: atribui caixa (x,y,w,h) a cada nó do diagrama. */
function layout(diagram) {
  const nodes = new Map();
  for (const node of diagram.nodes) {
    const w = GEO.widths[node.type] || GEO.widths.process;
    const innerW = node.type === 'decision' ? w - 62 : w - GEO.padX * 2;
    const titleLines = wrapText(node.t, innerW, GEO.titleSize, true);
    const subLines = node.s ? wrapText(node.s, innerW, GEO.subSize, false) : [];
    const h =
      node.type === 'start' || node.type === 'end'
        ? Math.max(46, 22 + titleLines.length * GEO.titleLH + (subLines.length ? 4 + subLines.length * GEO.subLH : 0))
        : Math.max(
            54,
            22 + titleLines.length * GEO.titleLH + (subLines.length ? 6 + subLines.length * GEO.subLH : 0)
          );
    nodes.set(node.id, { ...node, w, h, titleLines, subLines, innerW });
  }

  const rows = [...new Set([...nodes.values()].map((n) => n.row))].sort((a, b) => a - b);
  const rowY = new Map();
  let cursor = GEO.y0;
  for (const row of rows) {
    rowY.set(row, cursor);
    const maxH = Math.max(...[...nodes.values()].filter((n) => n.row === row).map((n) => n.h));
    cursor += maxH + GEO.vGap;
  }

  const cols = Math.max(...[...nodes.values()].map((n) => n.col)) + 1;
  const width = GEO.x0 * 2 + cols * GEO.colW;
  const height = cursor - GEO.vGap + GEO.y0 + 18;

  for (const n of nodes.values()) {
    n.y = rowY.get(n.row);
    n.x = GEO.x0 + n.col * GEO.colW + (GEO.colW - n.w) / 2;
    n.cx = n.x + n.w / 2;
    n.cy = n.y + n.h / 2;
    n.bottom = n.y + n.h;
    n.right = n.x + n.w;
  }

  return { nodes, width, height, rows, cols };
}

/** Roteamento ortogonal das setas. */
function routeEdge(src, dst, edge = {}) {
  const pts = [];

  // Saída lateral: contorna pelo corredor vazio entre colunas
  if (edge.fromSide === 'right' || edge.fromSide === 'left') {
    const dir = edge.fromSide === 'right' ? 1 : -1;
    const sx = edge.fromSide === 'right' ? src.right : src.x;
    const gx = sx + dir * (26 + (edge.gutter || 0));
    let ex;
    if (gx < dst.x) ex = dst.x;
    else if (gx > dst.right) ex = dst.right;
    else ex = dst.cx;
    pts.push([sx, src.cy], [gx, src.cy], [gx, dst.cy], [ex, dst.cy]);
    return pts;
  }

  // Entrada lateral em convergências (fan-in de várias origens)
  if (edge.toSide === 'left') {
    pts.push([src.cx, src.bottom], [src.cx, dst.cy], [dst.x, dst.cy]);
    return pts;
  }
  if (edge.toSide === 'right') {
    pts.push([src.cx, src.bottom], [src.cx, dst.cy], [dst.right, dst.cy]);
    return pts;
  }

  const sx = src.cx + (edge.srcOffsetX || 0);
  const dx = dst.cx + (edge.dstOffsetX || 0);

  if (dst.row > src.row) {
    if (Math.abs(sx - dx) < 4) {
      pts.push([sx, src.bottom], [dx, dst.y]);
    } else {
      const midY =
        src.bottom + Math.max(14, Math.min(26, (dst.y - src.bottom) / 2)) + (edge.bend || 0);
      pts.push([sx, src.bottom], [sx, midY], [dx, midY], [dx, dst.y]);
    }
  } else if (dst.row === src.row) {
    if (dst.cx > src.cx) pts.push([src.right, src.cy], [dst.x, dst.cy]);
    else pts.push([src.x, src.cy], [dst.right, dst.cy]);
  } else {
    // aresta de retorno (volta para uma linha acima)
    if (dst.cx < src.cx) {
      const ch = src.right + 26;
      pts.push([src.right, src.cy], [ch, src.cy], [ch, dst.cy], [dst.right, dst.cy]);
    } else {
      const ch = src.x - 26;
      pts.push([src.x, src.cy], [ch, src.cy], [ch, dst.cy], [dst.x, dst.cy]);
    }
  }
  return pts;
}

function polylinePath(points) {
  return points.map((p, i) => `${i === 0 ? 'M' : 'L'}${round(p[0])},${round(p[1])}`).join(' ');
}

const round = (n) => Math.round(n * 100) / 100;

function labelAnchor(points, edge) {
  let best = { len: -1, i: 0 };
  for (let i = 0; i < points.length - 1; i++) {
    const dx = points[i + 1][0] - points[i][0];
    const dy = points[i + 1][1] - points[i][1];
    const len = Math.hypot(dx, dy);
    if (len > best.len) best = { len, i, horizontal: Math.abs(dx) > Math.abs(dy) };
  }
  const [ax, ay] = points[best.i];
  const [bx, by] = points[best.i + 1];
  const mx = (ax + bx) / 2;
  const my = (ay + by) / 2;
  if (edge.labelOffset) return { x: mx + edge.labelOffset[0], y: my + edge.labelOffset[1], horizontal: best.horizontal };
  return best.horizontal ? { x: mx, y: my - 7, horizontal: true } : { x: mx + 8, y: my + 3, horizontal: false };
}

/* ------------------------------------------------------------------ *
 * 3. Render do SVG                                                    *
 * ------------------------------------------------------------------ */

function renderNodeSvg(n, defs) {
  const a = ACTORS[n.actor] || ACTORS.sistema;
  const dash = n.type === 'note' ? ' stroke-dasharray="6 5"' : '';
  const strokeW = n.type === 'note' ? 1.3 : 1.5;
  let shape = '';
  if (n.type === 'decision') {
    const i = 26;
    shape = `<polygon points="${round(n.x + i)},${round(n.y)} ${round(n.right - i)},${round(n.y)} ${round(
      n.right
    )},${round(n.cy)} ${round(n.right - i)},${round(n.bottom)} ${round(n.x + i)},${round(n.bottom)} ${round(
      n.x
    )},${round(n.cy)}" fill="${a.fill}" stroke="${a.stroke}" stroke-width="${strokeW}"${dash} />`;
  } else if (n.type === 'data') {
    const i = 15;
    shape = `<polygon points="${round(n.x + i)},${round(n.y)} ${round(n.right)},${round(n.y)} ${round(
      n.right - i
    )},${round(n.bottom)} ${round(n.x)},${round(n.bottom)}" fill="${a.fill}" stroke="${a.stroke}" stroke-width="${strokeW}"${dash} />`;
  } else {
    const rx = n.type === 'start' || n.type === 'end' ? n.h / 2 : 13;
    shape = `<rect x="${round(n.x)}" y="${round(n.y)}" width="${round(n.w)}" height="${round(n.h)}" rx="${round(
      rx
    )}" fill="${a.fill}" stroke="${a.stroke}" stroke-width="${strokeW}"${dash} />`;
  }

  let text = '';
  const totalTextH = n.titleLines.length * GEO.titleLH + (n.subLines.length ? 6 + n.subLines.length * GEO.subLH : 0);
  let ty = n.cy - totalTextH / 2 + GEO.titleLH - 3.4;
  for (const line of n.titleLines) {
    text += `<text x="${round(n.cx)}" y="${round(ty)}" text-anchor="middle" font-family="inherit" font-size="${
      GEO.titleSize
    }" font-weight="700" fill="${a.text}">${escapeXml(line)}</text>`;
    ty += GEO.titleLH;
  }
  if (n.subLines.length) {
    ty += 6 - GEO.titleLH + GEO.subLH - 3;
    for (const line of n.subLines) {
      text += `<text x="${round(n.cx)}" y="${round(ty)}" text-anchor="middle" font-family="inherit" font-size="${
        GEO.subSize
      }" fill="${a.sub}">${escapeXml(line)}</text>`;
      ty += GEO.subLH;
    }
  }
  return { shape, text };
}

function renderDiagram(diagram) {
  const { nodes, width, height } = layout(diagram);
  const body = [];
  const defs = [];

  // Sombras / realces de linha (agrupamento por faixa opcional)
  for (const band of diagram.bands || []) {
    const bandNodes = [...nodes.values()].filter((n) => band.ids.includes(n.id));
    if (!bandNodes.length) continue;
    const x = Math.min(...bandNodes.map((n) => n.x)) - 18;
    const y = Math.min(...bandNodes.map((n) => n.y)) - 32;
    const w = Math.max(...bandNodes.map((n) => n.right)) - x + 18;
    const h = Math.max(...bandNodes.map((n) => n.bottom)) - y + 20;
    body.push(
      `<rect x="${round(x)}" y="${round(y)}" width="${round(w)}" height="${round(
        h
      )}" rx="22" fill="${band.fill || 'rgba(255,255,255,0.017)'}" stroke="${band.stroke || '#1E2330'}" stroke-width="1.2" />`,
      `<text x="${round(x + w - 16)}" y="${round(y + 18)}" text-anchor="end" font-size="10.5" font-weight="700" letter-spacing="0.9" fill="${
        band.text || '#6B7280'
      }">${escapeXml(band.label)}</text>`
    );
  }

  for (const edge of diagram.edges) {
    const src = nodes.get(edge.from);
    const dst = nodes.get(edge.to);
    if (!src || !dst) throw new Error(`Aresta inválida em ${diagram.id}: ${edge.from} → ${edge.to}`);
    const points = routeEdge(src, dst, edge);
    const kind = EDGE_KINDS[edge.kind || 'flow'];
    const dashed = edge.kind === 'error' || edge.dashed ? ' stroke-dasharray="5 4"' : '';
    body.push(
      `<path d="${polylinePath(points)}" fill="none" stroke="${kind.stroke}" stroke-width="${
        edge.thick ? 2 : 1.6
      }" stroke-linecap="round" stroke-linejoin="round"${dashed} marker-end="url(#arrow-${edge.kind || 'flow'})" />`
    );
    if (edge.label) {
      const pos = labelAnchor(points, edge);
      const w = edge.label.length * 6.05 + 12;
      body.push(
        `<rect x="${round(pos.x - w / 2)}" y="${round(pos.y - 11)}" width="${round(w)}" height="15" rx="7" fill="${
          CANVAS_BG
        }" opacity="0.94" />`,
        `<text x="${round(pos.x)}" y="${round(pos.y)}" text-anchor="middle" font-size="10.3" font-weight="600" fill="${
          kind.label
        }">${escapeXml(edge.label)}</text>`
      );
    }
  }

  const nodeMarkup = [...nodes.values()]
    .map((n) => {
      const { shape, text } = renderNodeSvg(n, defs);
      return `${shape}${text}`;
    })
    .join('\n');

  for (const key of Object.keys(EDGE_KINDS)) {
    defs.push(
      `<marker id="arrow-${key}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${EDGE_KINDS[key].stroke}" /></marker>`
    );
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${round(width)} ${round(
    height
  )}" width="${round(width)}" height="${round(height)}" role="img" aria-label="${escapeXml(
    diagram.title
  )}" class="flow-svg">
<defs>${defs.join('')}</defs>
<rect x="0" y="0" width="${round(width)}" height="${round(height)}" fill="${CANVAS_BG}" />
${body.join('\n')}
${nodeMarkup}
</svg>`;
}

/* ------------------------------------------------------------------ *
 * 4. Conteúdo dos diagramas                                           *
 * ------------------------------------------------------------------ */

const DIAGRAMS = [
  /* ---------------------------------------------------------------- */
  {
    id: 'visao-geral',
    num: 1,
    title: 'Visão geral — do primeiro acesso às jornadas por papel',
    desc: 'Mapa macro de tudo que o app entrega hoje: bootstrap da SPA, detecção de sessão, papéis (visitante, atleta, lojista, admin), as seis jornadas de uso e a camada de persistência.',
    legend: ['visitante', 'atleta', 'lojista', 'admin', 'sistema'],
    nodes: [
      { id: 'g1', t: 'App carrega em “/”', s: 'Next.js 15 + layout + CoreMotiomProvider', type: 'start', actor: 'sistema', col: 2, row: 0 },
      { id: 'g2', t: 'Bootstrap do estado', s: 'testSupabaseConnection + produtos, lojas e posts ao vivo', type: 'process', actor: 'sistema', col: 2, row: 1 },
      { id: 'g3', t: 'Sessão válida?', s: 'Supabase getSession + localStorage (coremotiom_state_v1)', type: 'decision', actor: 'sistema', col: 2, row: 2 },
      { id: 'g4', t: 'VISITANTE', s: 'Explora marketplace, lojas, treinadores e feed (leitura)', type: 'process', actor: 'visitante', col: 0, row: 3 },
      { id: 'g5', t: 'ATLETA / LOJISTA', s: 'role = user | seller · perfil sincronizado', type: 'process', actor: 'atleta', col: 2, row: 3 },
      { id: 'g6', t: 'ADMIN MASTER', s: 'E-mail na lista de administradores credenciados', type: 'process', actor: 'admin', col: 4, row: 3 },
      { id: 'g7', t: 'Ação exige conta?', s: 'Favoritar, anunciar, postar, comentar, agendar, criar loja', type: 'decision', actor: 'atencao', col: 0, row: 4 },
      { id: 'g8', t: 'JORNADAS DE COMPRA E USO', s: 'Marketplace → carrinho → checkout → pedido em custódia', type: 'process', actor: 'atleta', col: 2, row: 4 },
      { id: 'g9', t: 'PODERES DE ADMINISTRAÇÃO', s: '8 módulos executivos do painel master', type: 'process', actor: 'admin', col: 4, row: 4 },
      { id: 'g10', t: 'AuthModal', s: 'login · cadastro · Google · esqueci a senha', type: 'process', actor: 'atleta', col: 0, row: 5 },
      { id: 'g11', t: 'Vender C2C', s: 'Anúncio de equipamento seminovo', type: 'process', actor: 'atleta', col: 1, row: 6 },
      { id: 'g12', t: 'Loja oficial + selo', s: 'CNPJ, auditoria e homologação', type: 'process', actor: 'lojista', col: 2, row: 6 },
      { id: 'g13', t: 'Comunidade & Treinadores', s: 'Feed de atletas e assessoria esportiva', type: 'process', actor: 'sistema', col: 3, row: 4 },
      { id: 'g14', t: 'Persistência', s: 'localStorage + Supabase + PostgreSQL (RLS) via API Routes', type: 'data', actor: 'sistema', col: 2, row: 7 },
      { id: 'g15', t: 'Toasts, estados e logout', s: 'Feedback global em todas as ações', type: 'end', actor: 'sucesso', col: 2, row: 8 },
    ],
    edges: [
      { from: 'g1', to: 'g2' },
      { from: 'g2', to: 'g3' },
      { from: 'g3', to: 'g4', label: 'Não' },
      { from: 'g3', to: 'g5', label: 'Sim', labelOffset: [-30, -9] },
      { from: 'g3', to: 'g6', label: 'e-mail master', kind: 'admin', labelOffset: [-46, -8] },
      { from: 'g4', to: 'g7' },
      { from: 'g7', to: 'g10', label: 'Sim' },
      { from: 'g7', to: 'g8', label: 'Não', kind: 'success', labelOffset: [40, -9] },
      { from: 'g5', to: 'g8', label: 'compra', kind: 'success', labelOffset: [-52, -8] },
      { from: 'g5', to: 'g13', label: 'engaja', kind: 'success', labelOffset: [-34, -8] },
      { from: 'g6', to: 'g9', label: 'acesso total', kind: 'admin' },
      { from: 'g10', to: 'g11', label: 'após login', kind: 'auth', labelOffset: [34, -9] },
      { from: 'g8', to: 'g11', label: 'vende', kind: 'success', labelOffset: [30, -9] },
      { from: 'g9', to: 'g12', label: 'homologa', kind: 'admin', labelOffset: [-4, -9] },
      { from: 'g11', to: 'g14', label: 'C2C grava', kind: 'data', toSide: 'left', labelOffset: [30, -6] },
      { from: 'g12', to: 'g14', label: 'loja grava', kind: 'data', dstOffsetX: -52, labelOffset: [-46, -6] },
      { from: 'g13', to: 'g14', label: 'feed grava', kind: 'data', fromSide: 'left', labelOffset: [-6, -8] },
      { from: 'g14', to: 'g15' },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'autenticacao',
    num: 2,
    title: 'Autenticação, papéis e ciclo de sessão',
    desc: 'AuthModal (4 modos), acesso rápido de demonstração, login por e-mail/senha, cadastro com tipo de conta, Google OAuth via popup + /auth/callback, guarda de admin e logout.',
    legend: ['atleta', 'lojista', 'admin', 'atencao', 'sistema', 'sucesso'],
    nodes: [
      { id: 'a1', t: 'Usuário aciona “Entrar”, “Cadastrar” ou uma ação protegida', type: 'start', actor: 'visitante', col: 2, row: 0 },
      { id: 'a2', t: 'AuthModal abre', s: 'modo: login | register | forgot | switch', type: 'process', actor: 'sistema', col: 2, row: 1 },
      { id: 'a3', t: 'Acesso rápido de 1 clique', s: 'Super Admin · Lojista Pro · Atleta — switchRole() / loginAsMasterAdmin()', type: 'process', actor: 'atencao', col: 0, row: 2 },
      { id: 'a4', t: 'Qual método?', type: 'decision', actor: 'sistema', col: 2, row: 2 },
      { id: 'a5', t: 'Google OAuth', s: 'Supabase popup → /auth/callback → postMessage OAUTH_AUTH_SUCCESS', type: 'process', actor: 'sistema', col: 4, row: 2 },
      { id: 'a6', t: 'Login e-mail + senha', s: 'zod → AuthService.loginWithEmail → Supabase Auth', type: 'process', actor: 'atleta', col: 1, row: 3 },
      { id: 'a7', t: 'Criar conta', s: 'nome, e-mail, senha e tipo: Atleta C2C ou Lojista B2C', type: 'process', actor: 'lojista', col: 3, row: 3 },
      { id: 'a8', t: 'Credenciais válidas?', type: 'decision', actor: 'atencao', col: 1, row: 4 },
      { id: 'a9', t: 'Confirmação de e-mail pendente?', s: 'signUp sem sessão → aviso para confirmar', type: 'decision', actor: 'sistema', col: 3, row: 4 },
      { id: 'a10', t: 'Erro exibido no modal', s: 'credenciais inválidas · Supabase não configurado · OAuth desativado', type: 'process', actor: 'atencao', col: 0, row: 5 },
      { id: 'a11', t: 'getProfileOrCreate → setUser + allUsers', s: 'toast de boas-vindas e fechamento do modal', type: 'process', actor: 'sucesso', col: 2, row: 5 },
      { id: 'a12', t: 'Esqueci a senha', s: 'Modal só exibe aviso: resetPassword() existe no service e não é chamado ⚠', type: 'note', actor: 'atencao', col: 0, row: 6 },
      { id: 'a13', t: 'Sessão monitorada', s: 'getSession + onAuthStateChange → setUser / SIGNED_OUT limpa usuário', type: 'process', actor: 'sistema', col: 2, row: 6 },
      { id: 'a14', t: 'Papéis derivados', s: 'role · isVisitor · isAuthenticated · isUserAdmin(email)', type: 'process', actor: 'sistema', col: 4, row: 6 },
      { id: 'a15', t: 'E-mail na lista master?', s: 'mattheusxmljz · professorchines2026 · operacaoamd · admin@coremotiom', type: 'decision', actor: 'admin', col: 2, row: 7 },
      { id: 'a16', t: 'Atleta / Lojista', s: 'compra, anuncia, cria loja e publica no feed', type: 'process', actor: 'atleta', col: 0, row: 8 },
      { id: 'a17', t: 'Admin master', s: 'Painel liberado; demais perfis veem “Acesso Restrito”', type: 'process', actor: 'admin', col: 4, row: 8 },
      { id: 'a18', t: 'Logout', s: 'AuthService.signOut → limpa usuário → volta para a Home', type: 'end', actor: 'sucesso', col: 2, row: 9 },
    ],
    edges: [
      { from: 'a1', to: 'a2' },
      { from: 'a2', to: 'a4' },
      { from: 'a2', to: 'a3', label: 'atalho de teste', kind: 'admin', labelOffset: [-4, -8] },
      { from: 'a4', to: 'a6', label: 'e-mail' },
      { from: 'a4', to: 'a7', label: 'cadastro' },
      { from: 'a4', to: 'a5', label: 'Google', kind: 'auth' },
      { from: 'a6', to: 'a8' },
      { from: 'a8', to: 'a10', label: 'Não', kind: 'error' },
      { from: 'a8', to: 'a11', label: 'Sim', kind: 'success', dstOffsetX: -50, labelOffset: [-20, -9] },
      { from: 'a7', to: 'a9' },
      { from: 'a9', to: 'a11', label: 'aguarda e-mail', kind: 'error', dstOffsetX: 52, bend: 26, labelOffset: [-4, -20] },
      { from: 'a5', to: 'a11', label: 'perfil Google', kind: 'auth', dstOffsetX: 0, labelOffset: [-42, -8] },
      { from: 'a11', to: 'a13' },
      { from: 'a13', to: 'a12', label: 'recuperação de senha', kind: 'error', labelOffset: [-6, -9] },
      { from: 'a13', to: 'a14' },
      { from: 'a14', to: 'a15' },
      { from: 'a15', to: 'a16', label: 'Não' },
      { from: 'a15', to: 'a17', label: 'Sim', kind: 'admin' },
      { from: 'a16', to: 'a18', label: 'sair', dstOffsetX: -50 },
      { from: 'a17', to: 'a18', label: 'sair', dstOffsetX: 50 },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'compra',
    num: 3,
    title: 'Jornada de compra — descoberta, carrinho, pagamento e custódia',
    desc: 'Fluxo completo de compra: Home e busca global, filtros do marketplace, ficha do produto, carrinho, entrega, três meios de pagamento, criação do pedido e ciclo de status até a entrega.',
    legend: ['visitante', 'atleta', 'atencao', 'sucesso', 'sistema', 'admin'],
    nodes: [
      { id: 'c1', t: 'Home — carrossel de destaques', s: 'Vitrine Bento, filtros por modalidade e abas B2C / C2C', type: 'start', actor: 'visitante', col: 1, row: 0 },
      { id: 'c2', t: 'Descoberta do produto', s: 'Barra lateral com busca instantânea (⌘K) ou “Explorar Catálogo”', type: 'process', actor: 'visitante', col: 1, row: 1 },
      { id: 'c3', t: 'Marketplace', s: 'Filtros: tipo (B2C/C2C), categoria, modalidade, condição, selo verificado, ordenação e paginação', type: 'process', actor: 'visitante', col: 1, row: 2 },
      { id: 'c4', t: 'Seleciona o produto', s: 'ProductDetailModal: galeria, numeração, frete por CEP, descrição, loja e vendedor', type: 'process', actor: 'visitante', col: 1, row: 3 },
      { id: 'c5', t: 'Qual ação?', type: 'decision', actor: 'sistema', col: 1, row: 4 },
      { id: 'c6', t: 'Favoritar / curtir', s: 'Salva na lista de desejos (localStorage) · visitante → AuthModal ⚠', type: 'process', actor: 'atleta', col: 3, row: 4 },
      { id: 'c7', t: 'Comprar agora / Adicionar ao carrinho', s: 'addToCart com tamanho selecionado', type: 'process', actor: 'atleta', col: 1, row: 5 },
      { id: 'c8', t: 'Passo 1 — Carrinho', s: 'Alterar quantidade, remover itens, subtotal + frete com seguro', type: 'process', actor: 'atleta', col: 1, row: 6 },
      { id: 'c9', t: 'Passo 2 — Entrega', s: 'Destinatário, CEP, telefone, endereço, cidade/UF · envio fixado em “pac” ⚠', type: 'process', actor: 'atleta', col: 1, row: 7 },
      { id: 'c10', t: 'Passo 3 — Pagamento', s: 'PIX (−5% + QR + copia-e-cola) · Cartão (1–12x) · Boleto', type: 'process', actor: 'atleta', col: 1, row: 8 },
      { id: 'c11', t: 'createOrder', s: 'OrderService grava no Supabase/PostgreSQL · se falhar, gera pedido local com PIX e rastreio', type: 'process', actor: 'sistema', col: 1, row: 9 },
      { id: 'c12', t: 'Forma de pagamento?', type: 'decision', actor: 'sistema', col: 1, row: 10 },
      { id: 'c13', t: 'PIX / Boleto', s: 'payment_status = pending · order_status = pending_payment', type: 'process', actor: 'atencao', col: 0, row: 11 },
      { id: 'c14', t: 'Cartão de crédito', s: 'payment_status = completed · order_status = preparing', type: 'process', actor: 'sucesso', col: 2, row: 11 },
      { id: 'c15', t: 'Passo 4 — Pedido confirmado', s: 'Nº do pedido, valor retido em custódia, prazo de 2 a 4 dias e código de rastreio', type: 'end', actor: 'sucesso', col: 1, row: 12 },
      { id: 'c16', t: 'Retaguarda do pedido', s: 'Admin confirma pagamento (sandbox) e muda status: paid → shipped → delivered', type: 'process', actor: 'admin', col: 3, row: 12 },
      { id: 'c17', t: 'Compra como visitante ⚠', s: 'Carrinho e checkout não exigem login · createOrder usa “guest-user”, sem dono para consultar depois', type: 'note', actor: 'atencao', col: 3, row: 6 },
      { id: 'c18', t: 'Caminho com login', s: 'Favoritar, publicar, comentar, agendar e vender continuam exigindo conta (ir para o fluxo 2)', type: 'note', actor: 'sistema', col: 3, row: 8 },
    ],
    edges: [
      { from: 'c1', to: 'c2' },
      { from: 'c2', to: 'c3' },
      { from: 'c3', to: 'c4' },
      { from: 'c4', to: 'c5' },
      { from: 'c5', to: 'c7', label: 'comprar', kind: 'success' },
      { from: 'c5', to: 'c6', label: 'salvar' },
      { from: 'c7', to: 'c8' },
      { from: 'c8', to: 'c9' },
      { from: 'c8', to: 'c17', label: 'sem exigir conta', kind: 'error', fromSide: 'right', labelOffset: [-40, -8] },
      { from: 'c9', to: 'c10' },
      { from: 'c9', to: 'c18', label: 'atalho p/ login', kind: 'auth', fromSide: 'right', labelOffset: [-36, 10] },
      { from: 'c10', to: 'c11' },
      { from: 'c11', to: 'c12' },
      { from: 'c12', to: 'c13', label: 'PIX / boleto' },
      { from: 'c12', to: 'c14', label: 'cartão', kind: 'success' },
      { from: 'c13', to: 'c15', label: 'aguardando', kind: 'error' },
      { from: 'c14', to: 'c15', kind: 'success' },
      { from: 'c15', to: 'c16', label: 'acompanhamento', kind: 'admin', labelOffset: [0, -9] },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'venda',
    num: 4,
    title: 'Jornada de venda — C2C, loja oficial e selo verificado',
    desc: 'Dois caminhos de oferta: atleta anunciando equipamento seminovo (C2C com custódia) e lojista abrindo/enviando loja para auditoria de CNPJ, com a homologação feita pelo admin.',
    legend: ['visitante', 'atleta', 'lojista', 'admin', 'atencao', 'sucesso'],
    nodes: [
      { id: 'v1', t: 'Menu “Vender C2C”', type: 'start', actor: 'atleta', col: 0, row: 0 },
      { id: 'v2', t: 'É visitante?', type: 'decision', actor: 'atencao', col: 0, row: 1 },
      { id: 'v3', t: 'Bloqueio + AuthModal', s: 'Tela “Acesso Restrito para Atletas Cadastrados”', type: 'process', actor: 'atencao', col: 1, row: 2 },
      { id: 'v4', t: 'Central de Vendas C2C', s: 'Abas: Criar anúncio · Meus anúncios · Vendas em custódia · Rascunhos', type: 'process', actor: 'atleta', col: 0, row: 3 },
      { id: 'v5', t: 'Formulário do anúncio', s: 'Título, categoria, modalidade, condição, preço, preço original, descrição, fotos por URL, local e frete', type: 'process', actor: 'atleta', col: 0, row: 4 },
      { id: 'v6', t: 'Título e preço preenchidos?', type: 'decision', actor: 'atencao', col: 0, row: 5 },
      { id: 'v7', t: 'Toast “Campos obrigatórios”', type: 'note', actor: 'atencao', col: 1, row: 6 },
      { id: 'v8', t: 'createProduct', s: 'product_type = c2c · stock 1 · status active → POST /api/listings', type: 'process', actor: 'sistema', col: 0, row: 6 },
      { id: 'v9', t: 'Anúncio publicado', s: 'Aparece no marketplace e em “Meus anúncios” (com exclusão)', type: 'process', actor: 'sucesso', col: 0, row: 7 },
      { id: 'v10', t: 'Venda em custódia', s: 'Valor retido e liberado após confirmação/inspeção do comprador', type: 'end', actor: 'sucesso', col: 0, row: 8 },
      { id: 'w1', t: 'Quero ser lojista', s: 'Cadastro com tipo de conta “Lojista B2C” ou botão “Criar loja”', type: 'start', actor: 'lojista', col: 3, row: 0 },
      { id: 'w2', t: 'CreateStoreModal', s: 'Nome, categoria, descrição, contatos, logo e banner', type: 'process', actor: 'lojista', col: 3, row: 1 },
      { id: 'w3', t: 'createStore', s: 'Loja criada e usuário promovido a seller com store_id', type: 'process', actor: 'sistema', col: 3, row: 2 },
      { id: 'w4', t: 'Solicitar verificação', s: 'CNPJ, razão social e site → verification_status = pending (promessa de 24h)', type: 'process', actor: 'lojista', col: 3, row: 3 },
      { id: 'w5', t: 'Admin audita em “Auditoria de Lojas”', s: 'Lojas pendentes listadas no painel master', type: 'process', actor: 'admin', col: 3, row: 4 },
      { id: 'w6', t: 'Aprovar?', type: 'decision', actor: 'admin', col: 3, row: 5 },
      { id: 'w7', t: 'Selo “Loja Verificada”', s: 'is_verified = true · produtos ganham is_verified_store', type: 'process', actor: 'sucesso', col: 2, row: 6 },
      { id: 'w8', t: 'Verificação recusada', s: 'verification_status = rejected com observações', type: 'process', actor: 'atencao', col: 4, row: 6 },
      { id: 'w9', t: 'Loja visível com filtro “somente verificadas”', type: 'end', actor: 'lojista', col: 3, row: 7 },
    ],
    edges: [
      { from: 'v1', to: 'v2' },
      { from: 'v2', to: 'v3', label: 'Sim', kind: 'error' },
      { from: 'v2', to: 'v4', label: 'Não', kind: 'success' },
      { from: 'v3', to: 'v4', label: 'após login', kind: 'auth', labelOffset: [40, -9] },
      { from: 'v4', to: 'v5' },
      { from: 'v5', to: 'v6' },
      { from: 'v6', to: 'v7', label: 'Não', kind: 'error', labelOffset: [-7, -9] },
      { from: 'v6', to: 'v8', label: 'Sim', kind: 'success', labelOffset: [-38, -8] },
      { from: 'v7', to: 'v5', label: 'corrige', kind: 'error', labelOffset: [-4, -9] },
      { from: 'v8', to: 'v9' },
      { from: 'v9', to: 'v10' },
      { from: 'w1', to: 'w2' },
      { from: 'w2', to: 'w3' },
      { from: 'w3', to: 'w4' },
      { from: 'w4', to: 'w5', label: 'fila de análise', kind: 'admin' },
      { from: 'w5', to: 'w6' },
      { from: 'w6', to: 'w7', label: 'Sim', kind: 'success' },
      { from: 'w6', to: 'w8', label: 'Não', kind: 'error' },
      { from: 'w7', to: 'w9' },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'engajamento',
    num: 5,
    title: 'Engajamento — comunidade, treinadores e favoritos',
    desc: 'Fluxos sociais e de serviço: feed com 5 categorias, publicação, curtidas e comentários; agendamento de assessoria esportiva com CREF; e a lista de desejos.',
    legend: ['visitante', 'atleta', 'sistema', 'atencao', 'sucesso'],
    nodes: [
      { id: 'e1', t: 'Comunidade — Feed de Atletas', s: 'Filtro por categoria: equipamentos, treino, eventos, dúvidas e conquistas', type: 'start', actor: 'sistema', col: 0, row: 0 },
      { id: 'e2', t: 'Qual interação?', type: 'decision', actor: 'sistema', col: 0, row: 1 },
      { id: 'e3', t: 'Publicar post', s: 'Título, conteúdo e categoria · badge “Admin / Loja Oficial / Atleta”', type: 'process', actor: 'atleta', col: 0, row: 2 },
      { id: 'e4', t: 'Curtir', s: 'likeCommunityPost → likes_count +1', type: 'process', actor: 'atleta', col: 1, row: 2 },
      { id: 'e5', t: 'Comentar', s: 'Comentário com avatar e data', type: 'process', actor: 'atleta', col: 2, row: 2 },
      { id: 'e6', t: 'É visitante?', type: 'decision', actor: 'atencao', col: 0, row: 3 },
      { id: 'e7', t: 'AuthModal', s: 'Curtir é livre; publicar e comentar exigem conta', type: 'process', actor: 'atencao', col: 0, row: 4 },
      { id: 'e8', t: 'Post/comentário no feed', s: 'CommunityService grava em community_posts', type: 'process', actor: 'sucesso', col: 1, row: 4 },
      { id: 'e9', t: 'Moderação', s: 'reportCommunityPost() e adminDeleteCommunityPost() existem no store, mas nenhuma tela oferece os botões ⚠', type: 'note', actor: 'atencao', col: 2, row: 4 },
      { id: 't1', t: 'Treinadores Especializados', s: 'Cards com CREF validado, avaliação, modalidade e valor/hora', type: 'start', actor: 'sistema', col: 3, row: 0 },
      { id: 't2', t: 'Filtro por modalidade', s: 'Corrida · Maratona · Triatlo · Ciclismo · Trail Running', type: 'process', actor: 'atleta', col: 3, row: 1 },
      { id: 't3', t: 'Escolhe plano', s: 'Mensal · Consultoria pontual · Temporada', type: 'process', actor: 'atleta', col: 3, row: 2 },
      { id: 't4', t: 'Confirmar agendamento', s: 'Visitante → AuthModal ⚠ (modal fecha sozinho após ~2,5s, sem persistir)', type: 'process', actor: 'atencao', col: 3, row: 4 },
      { id: 't5', t: 'Toast de solicitação enviada', type: 'end', actor: 'sucesso', col: 3, row: 5 },
      { id: 'f1', t: 'Favoritar produto', s: 'Coração no card do marketplace e na ficha do produto', type: 'start', actor: 'atleta', col: 4, row: 0 },
      { id: 'f2', t: 'Visitante?', type: 'decision', actor: 'atencao', col: 4, row: 1 },
      { id: 'f6', t: 'AuthModal', s: 'Login necessário para salvar', type: 'process', actor: 'atencao', col: 4, row: 3 },
      { id: 'f4', t: 'toggleFavorite → localStorage', s: 'Lista de favoritos salva por navegador', type: 'process', actor: 'sistema', col: 4, row: 2 },
      { id: 'f5', t: '“Meus Favoritos” na sidebar', s: 'Abre a view “profile”, que não é renderizada em app/page.tsx ⚠ — lista sem tela', type: 'note', actor: 'atencao', col: 4, row: 5 },
    ],
    edges: [
      { from: 'e1', to: 'e2' },
      { from: 'e2', to: 'e3' },
      { from: 'e2', to: 'e4' },
      { from: 'e2', to: 'e5' },
      { from: 'e3', to: 'e6' },
      { from: 'e5', to: 'e6', label: 'exige conta', kind: 'error', labelOffset: [0, 34] },
      { from: 'e6', to: 'e7', label: 'Sim', kind: 'error' },
      { from: 'e6', to: 'e8', label: 'Não', kind: 'success', labelOffset: [26, -9] },
      { from: 'e7', to: 'e8', kind: 'auth' },
      { from: 'e8', to: 'e9', kind: 'error', dashed: true },
      { from: 't1', to: 't2' },
      { from: 't2', to: 't3' },
      { from: 't3', to: 't4', label: 'agendar' },
      { from: 't4', to: 't5' },
      { from: 'f1', to: 'f2' },
      { from: 'f2', to: 'f6', label: 'Sim', kind: 'error', dashed: true, fromSide: 'left', labelOffset: [10, -6] },
      { from: 'f2', to: 'f4', label: 'Não' },
      { from: 'f6', to: 'f4', label: 'após login', kind: 'auth', labelOffset: [12, 0] },
      { from: 'f4', to: 'f5', label: 'abrir lista', kind: 'error', fromSide: 'left', labelOffset: [46, -6] },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'admin',
    num: 6,
    title: 'Painel administrativo — 8 módulos executivos',
    desc: 'Guarda de acesso por e-mail master, barra de ações rápidas e os módulos: métricas, auditoria de lojas, catálogo, usuários, pedidos/custódia, lojas e banco de dados.',
    legend: ['admin', 'atencao', 'sistema', 'sucesso'],
    nodes: [
      { id: 'd1', t: 'Acesso ao Painel Admin', s: 'Item de menu só aparece para admin ou e-mail master', type: 'start', actor: 'admin', col: 1, row: 0 },
      { id: 'd2', t: 'isUserAdmin(email)?', type: 'decision', actor: 'atencao', col: 1, row: 1 },
      { id: 'd3', t: 'Tela “Acesso Restrito”', s: 'Botão “Entrar como Super Admin Master” e atalho para o marketplace', type: 'process', actor: 'atencao', col: 3, row: 2 },
      { id: 'd4', t: 'Barra master', s: 'Sincronizar Supabase · + Novo Usuário · Console SQL', type: 'process', actor: 'admin', col: 1, row: 2 },
      { id: 'd5', t: '1. Métricas & Ecossistema', s: 'GMV, receita estimada de custódia (4,5%), lojas verificadas, B2C x C2C', type: 'process', actor: 'admin', col: 0, row: 3 },
      { id: 'd6', t: '2. Auditoria de Lojas', s: 'Aprovar ou recusar selo · notas de compliance', type: 'process', actor: 'admin', col: 1, row: 3 },
      { id: 'd7', t: '3. Moderar Catálogo', s: 'Status active/draft/sold/suspended, filtro e exclusão de anúncios', type: 'process', actor: 'admin', col: 2, row: 3 },
      { id: 'd8', t: '4. Usuários & Atletas', s: 'Criar, excluir, banir/desbanir e trocar papel · conta master protegida', type: 'process', actor: 'admin', col: 3, row: 3 },
      { id: 'd9', t: '5. Pedidos & Custódia', s: 'Status do pedido e do pagamento · confirmar pagamento em sandbox', type: 'process', actor: 'admin', col: 0, row: 5 },
      { id: 'd10', t: '6. Lojas Oficiais', s: 'Lista consolidada com selo, dono e catálogo', type: 'process', actor: 'admin', col: 1, row: 5 },
      { id: 'd11', t: '7. Banco Supabase', s: 'Contagens por tabela, host PostgreSQL, RLS e console SQL', type: 'process', actor: 'sistema', col: 2, row: 5 },
      { id: 'd12', t: 'Ações de API', s: 'Papel, banimento e exclusão de usuário chamam /api/users · lojas usam /api/stores', type: 'process', actor: 'sistema', col: 3, row: 5 },
      { id: 'd13', t: 'Somente estado local', s: 'adminUpdateOrderStatus e adminToggleProductStatus alteram só a memória (sem gravar no banco) ⚠', type: 'note', actor: 'atencao', col: 1, row: 7 },
      { id: 'd14', t: 'Sync Supabase', s: 'Recarrega produtos, lojas e posts no estado · toast de resultado', type: 'end', actor: 'sucesso', col: 3, row: 7 },
    ],
    edges: [
      { from: 'd1', to: 'd2' },
      { from: 'd2', to: 'd3', label: 'Não', kind: 'error' },
      { from: 'd2', to: 'd4', label: 'Sim', kind: 'admin', labelOffset: [-30, -2] },
      { from: 'd3', to: 'd4', label: 'após login master', kind: 'auth', labelOffset: [10, -9] },
      { from: 'd4', to: 'd5', label: 'módulos', labelOffset: [-52, -8] },
      { from: 'd4', to: 'd6' },
      { from: 'd4', to: 'd7' },
      { from: 'd4', to: 'd8', bend: 14 },
      { from: 'd5', to: 'd9' },
      { from: 'd6', to: 'd10' },
      { from: 'd7', to: 'd11' },
      { from: 'd8', to: 'd12' },
      { from: 'd9', to: 'd13', label: 'status', kind: 'data', fromSide: 'right', labelOffset: [46, -8] },
      { from: 'd11', to: 'd14', label: 'contagens', kind: 'data', toSide: 'left', labelOffset: [40, -8] },
      { from: 'd12', to: 'd14', label: 'grava', kind: 'data', labelOffset: [-34, -8] },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'dados',
    num: 7,
    title: 'Dados, serviços e persistência — onde cada ação é gravada',
    desc: 'Camadas do sistema: estado global no cliente, services que falam com o Supabase e com as API Routes, pool PostgreSQL com RLS, server actions validadas por zod (hoje sem uso) e o fallback offline.',
    legend: ['sistema', 'atencao', 'sucesso', 'admin'],
    bands: [
      { ids: ['s1', 's2', 's3'], label: 'CLIENTE (BROWSER)', fill: 'rgba(167,139,250,0.05)', stroke: '#3A3159' },
      { ids: ['s4', 's5', 's10'], label: 'SERVIDOR NEXT.JS', fill: 'rgba(56,189,248,0.05)', stroke: '#27455C' },
      { ids: ['s6', 's7', 's8'], label: 'DADOS PERSISTENTES', fill: 'rgba(52,211,153,0.04)', stroke: '#26493D' },
    ],
    nodes: [
      { id: 's1', t: 'Estado global', s: 'CoreMotiomProvider: produtos, lojas, pedidos, carrinho, favoritos, posts, toasts', type: 'process', actor: 'sistema', col: 0, row: 0 },
      { id: 's2', t: 'localStorage', s: 'coremotiom_state_v1: user, cart, orders, favorites, posts', type: 'data', actor: 'sistema', col: 0, row: 1 },
      { id: 's3', t: 'Services do cliente', s: 'AuthService · ProductService · StoreService · OrderService · CommunityService', type: 'process', actor: 'sistema', col: 1, row: 1 },
      { id: 's9', t: 'Fallback offline', s: 'Sem Supabase: INITIAL_PRODUCTS, INITIAL_STORES e dados de demonstração seguem operando', type: 'note', actor: 'atencao', col: 2, row: 1 },
      { id: 's4', t: 'API Routes', s: '/api/products · /api/stores · /api/listings · /api/users · /api/auth/sync', type: 'process', actor: 'sistema', col: 0, row: 2 },
      { id: 's5', t: 'Server Actions (zod)', s: 'auth · products · stores · orders — nenhuma é chamada pelo cliente hoje ⚠', type: 'note', actor: 'atencao', col: 1, row: 2 },
      { id: 's10', t: 'Middleware', s: 'Apenas injeta o header x-coremotiom-platform — não protege rotas ⚠', type: 'note', actor: 'atencao', col: 2, row: 2 },
      { id: 's6', t: 'PostgreSQL (Supabase)', s: 'profiles · stores · products · orders · community_posts (migração SQL + RLS)', type: 'data', actor: 'sucesso', col: 0, row: 3 },
      { id: 's7', t: 'Supabase Auth', s: 'E-mail/senha, OAuth Google e callback em /auth/callback', type: 'process', actor: 'admin', col: 1, row: 3 },
      { id: 's8', t: 'Imagens do catálogo', s: 'Arquivos em /public/products e URLs externas nos anúncios', type: 'data', actor: 'sistema', col: 2, row: 3 },
    ],
    edges: [
      { from: 's1', to: 's3', label: 'ações', kind: 'flow', dstOffsetX: 40 },
      { from: 's1', to: 's2', label: 'saveState()', kind: 'data', srcOffsetX: -60, dstOffsetX: -60 },
      { from: 's3', to: 's4', label: 'fetch', dstOffsetX: -50 },
      { from: 's4', to: 's6', label: 'pg Pool', kind: 'data' },
      { from: 's3', to: 's5', label: 'sem chamadas', kind: 'error', labelOffset: [58, -8] },
      { from: 's3', to: 's7', label: 'auth', kind: 'admin', fromSide: 'right', labelOffset: [0, -6] },
      { from: 's3', to: 's8', label: 'mídia', fromSide: 'right', gutter: 12, labelOffset: [6, -70] },
      { from: 's9', to: 's1', label: 'hidrata (seed)', kind: 'error', fromSide: 'left', labelOffset: [-30, -6] },
    ],
  },
];

/* ------------------------------------------------------------------ *
 * 5. Conteúdo textual (tabelas, lacunas, arquivos)                    *
 * ------------------------------------------------------------------ */

const PERMISSIONS = {
  head: ['Capacidade', 'Visitante', 'Atleta (user)', 'Lojista (seller)', 'Admin master'],
  rows: [
    ['Navegar Home, Marketplace, Lojas, Treinadores e Feed', 'sim', 'sim', 'sim', 'sim'],
    ['Busca global (⌘K) e filtros do marketplace', 'sim', 'sim', 'sim', 'sim'],
    ['Curtir post da comunidade', 'sim', 'sim', 'sim', 'sim'],
    ['Favoritar produto', 'não → AuthModal', 'sim', 'sim', 'sim'],
    ['Adicionar ao carrinho e finalizar compra', 'sim (pedido guest)', 'sim', 'sim', 'sim'],
    ['Publicar post e comentar', 'não → AuthModal', 'sim', 'sim', 'sim'],
    ['Agendar treinador', 'não → AuthModal', 'sim', 'sim', 'sim'],
    ['Anunciar equipamento C2C (SellC2CView)', 'não → AuthModal', 'sim', 'sim', 'sim'],
    ['Criar loja oficial (CreateStoreModal)', 'não', 'sim (vira seller)', 'sim', 'sim'],
    ['Solicitar selo de loja verificada', 'não', 'não', 'sim (dono)', 'sim'],
    ['Ver o item “Painel Admin” na sidebar', 'não', 'não', 'não', 'sim'],
    ['Aprovar lojas, moderar catálogo e usuários', 'não', 'não', 'não', 'sim'],
    ['Acesso rápido de demonstração (switchRole)', 'sim', 'sim', 'sim', 'sim'],
  ],
};

const STATUS_TABLE = {
  head: ['Entidade', 'Status possíveis', 'Quem altera'],
  rows: [
    ['Order.order_status', 'pending_payment → paid → preparing → shipped → delivered · cancelled', 'Checkout (criação) e Admin (confirmar pagamento / alterar status)'],
    ['Order.payment_status', 'pending · completed · failed · refunded', 'Checkout e Admin (sandbox)'],
    ['Store.verification_status', 'none → pending → verified / rejected', 'Lojista solicita; Admin homologa'],
    ['Product.status', 'active · draft · sold · suspended', 'Lojista (criação) e Admin (moderação)'],
    ['UserProfile.role', 'visitor · user · seller · admin', 'Cadastro e Admin (updateUserRole)'],
    ['UserProfile.is_banned', 'false → true (ban_reason)', 'Admin (banir / desbanir)'],
  ],
};

const GAPS = [
  {
    t: 'View “profile” não existe',
    d: 'A sidebar leva para activeView = "profile" em “Meus Favoritos” e no avatar mobile, mas app/page.tsx não renderiza esse bloco — a tela fica vazia, sem lista de favoritos, dados do perfil ou pedidos do usuário.',
    tag: 'Navegação',
  },
  {
    t: 'View “news” declarada e sem tela',
    d: 'ActiveView inclui "news" e o store carrega INITIAL_NEWS, mas nenhum componente consome essas notícias.',
    tag: 'Navegação',
  },
  {
    t: 'SmartScanView órfão',
    d: 'components/SmartScanView.tsx (análise de desgaste/pace com IA) tem 356 linhas e não é importado por nenhuma view do app.',
    tag: 'Funcionalidade',
  },
  {
    t: 'Componentes duplicados',
    d: 'AuthModal, MarketplaceView, ProductCard, ProductDetailModal, StoresView, CreateStoreModal, Footer e AdminDashboard existem na raiz de components/ e também em subpastas que apenas reexportam — risco real de editar o arquivo errado.',
    tag: 'Manutenção',
  },
  {
    t: 'Checkout não coleta bairro/número',
    d: 'O formulário pede apenas endereço, cidade e UF, mas grava "Bela Vista" e número "1000" fixos; o shippingMethod é sempre "pac". O checkoutSchema do zod exige neighborhood e number — o server action de checkout rejeitaria esses dados.',
    tag: 'Checkout',
  },
  {
    t: 'Server actions sem uso',
    d: 'serverLogin, serverSignUp, serverProcessCheckout, serverCreateProduct e serverCreateStore nunca são chamadas: os componentes falam direto com Supabase/services. Duas trilhas concorrentes de escrita, com validações diferentes.',
    tag: 'Arquitetura',
  },
  {
    t: 'Visitante finaliza compra',
    d: 'O carrinho e o CheckoutModal não exigem login; createOrder usa user?.id || "guest-user". Pedidos de visitante não têm dono para consulta posterior.',
    tag: 'Regra de negócio',
  },
  {
    t: 'Moderação de posts inacessível',
    d: 'reportCommunityPost e adminDeleteCommunityPost existem no store, mas nenhum componente expõe botão de denúncia ou exclusão — os campos is_reported/report_reason nunca são acionados pela UI.',
    tag: 'Comunidade',
  },
  {
    t: 'Recuperação de senha inoperante',
    d: 'O modal de “Esqueci a senha” só exibe uma mensagem informativa; AuthService.resetPassword existe e não é chamado, e não há rota /auth/reset-password.',
    tag: 'Autenticação',
  },
  {
    t: 'Status de pedido e produto só em memória',
    d: 'adminUpdateOrderStatus e adminToggleProductStatus alteram apenas o estado do React. Não há função de ordens em lib/db-queries.ts — pedidos vivem em localStorage/Supabase, sem trilha administrativa persistida.',
    tag: 'Dados',
  },
  {
    t: 'Credenciais no código',
    d: 'lib/db.ts traz DEFAULT_DATABASE_URL com usuário e senha do PostgreSQL em texto puro como fallback. Essas credenciais devem sair do repositório e virar variável de ambiente (com rotação).',
    tag: 'Segurança',
  },
  {
    t: 'Middleware não protege rotas',
    d: 'middleware.ts apenas adiciona o header de plataforma; /admin e APIs internas não têm verificação de sessão no servidor — a regra de admin é só client-side (isUserAdmin por e-mail).',
    tag: 'Segurança',
  },
  {
    t: 'Favoritos, carrinho e pedidos sem tabela',
    d: 'A migração SQL cobre profiles, stores, products, orders e community_posts; carrinho e favoritos existem apenas no localStorage e não sincronizam entre dispositivos.',
    tag: 'Dados',
  },
  {
    t: 'Agendamento de treinador não persiste',
    d: 'handleConfirmBooking só dispara toast e fecha o modal após 2,5s: não há tabela, serviço ou registro de agendamento.',
    tag: 'Funcionalidade',
  },
];

const FILE_MAP = {
  head: ['Fluxo', 'Ponto de entrada', 'Regras e dados'],
  rows: [
    ['Shell e navegação', 'app/layout.tsx · app/page.tsx · components/Sidebar.tsx', 'lib/store.tsx (ActiveView, modais globais, toasts)'],
    ['Autenticação', 'components/AuthModal.tsx · app/auth/callback/page.tsx', 'services/authService.ts · app/api/auth/sync/route.ts · lib/db-queries.ts'],
    ['Compra', 'components/HomeHeroAndHighlights.tsx · MarketplaceView · ProductDetailModal · CheckoutModal', 'services/orderService.ts · lib/schemas/order.schema.ts'],
    ['Venda C2C', 'components/SellC2CView.tsx · ProductCard.tsx', 'services/productService.ts · app/api/listings/route.ts · lib/schemas/product.schema.ts'],
    ['Lojas e selo', 'components/StoresView.tsx · CreateStoreModal.tsx · AdminDashboard.tsx', 'services/storeService.ts · app/api/stores/route.ts · lib/schemas/store.schema.ts'],
    ['Comunidade', 'components/CommunityView.tsx', 'services/communityService.ts · lib/initial-data.ts'],
    ['Treinadores', 'components/CoachesView.tsx', 'INITIAL_COACHES (lib/initial-data.ts)'],
    ['Administração', 'components/AdminDashboard.tsx', 'lib/store.tsx (ações admin) · app/api/users/route.ts · app/api/products/route.ts'],
    ['Banco e infraestrutura', 'lib/db.ts · lib/db-queries.ts · middleware.ts', 'supabase/migrations/20250101000000_coremotiom_initial_schema.sql'],
  ],
};

const FILES_SUMMARY = [
  ['Rotas/telas renderizadas', '7 views: home, marketplace, stores, sell, coaches, community, admin'],
  ['Modais globais', 'AuthModal · SupabaseConfigModal · CheckoutModal · CreateStoreModal · ProductDetailModal'],
  ['Tabelas PostgreSQL', 'profiles · stores · products · orders · community_posts'],
  ['Rotas de API', '/api/products · /api/stores · /api/listings · /api/users · /api/auth/sync'],
  ['Services de domínio', 'AuthService · ProductService · StoreService · OrderService · CommunityService'],
];

/* ------------------------------------------------------------------ *
 * 5b. Metadados do produto                                            *
 * ------------------------------------------------------------------ */

const META = {
  product: 'CoreMotiom',
  tagline: 'Plataforma & marketplace esportivo de alta performance',
  stack: 'Next.js 15 · React 19 · TypeScript · Supabase / PostgreSQL · Tailwind CSS v4',
  repo: 'BIRFeuFeu/-CoreMotion',
  doc: 'Fluxograma completo do usuário e diagrama de casos de uso',
};

export {
  CANVAS_BG,
  ACTORS,
  EDGE_KINDS,
  GEO,
  escapeXml,
  round,
  wrapText,
  layout,
  routeEdge,
  labelAnchor,
  polylinePath,
  renderDiagram,
  DIAGRAMS,
  PERMISSIONS,
  STATUS_TABLE,
  GAPS,
  FILE_MAP,
  FILES_SUMMARY,
  META,
};
```

### B.2 `scripts/lib/pdf-kit.mjs` — mini-kit A4 sobre pdf-lib

```js
/**
 * Mini-kit de PDF para os documentos do CoreMotiom (pdf-lib).
 * Suporta texto com quebra automática, títulos, tabelas, imagens e rodapé
 * com numeração — tudo em coordenadas pt (A4 = 595 x 842).
 *
 * Uso interno dos scripts generate-user-flowchart*.mjs.
 */

/* pdf-lib é dependência de desenvolvimento (documentos). Resolvida de forma
 * tolerante: node_modules local, pasta de ferramentas do sandbox ou PDF_LIB_PATH. */
const PDF_LIB_CANDIDATES = [
  process.env.PDF_LIB_PATH,                                   // override explícito
  'pdf-lib',                                                  // node_modules do projeto
  '/home/user/node_modules/pdf-lib/es/index.js',              // fallbacks de sandbox
  '/home/user/tools/node_modules/pdf-lib/es/index.js',
  '/home/user/tools/node_modules/pdf-lib/cjs/index.js',
].filter(Boolean);

async function loadPdfLib() {
  for (const candidate of PDF_LIB_CANDIDATES) {
    try {
      const mod = await import(candidate);
      const lib = mod.PDFDocument ? mod : mod.default;
      if (lib?.PDFDocument) return lib;
    } catch {
      /* tenta o próximo */
    }
  }
  throw new Error(
    'pdf-lib não encontrado. Instale com "npm i -D pdf-lib @resvg/resvg-js" ' +
      'ou defina PDF_LIB_PATH apontando para o módulo.'
  );
}

const { PDFDocument, StandardFonts, rgb } = await loadPdfLib();

export const PALETTE = {
  ink: rgb(0.07, 0.09, 0.13),
  muted: rgb(0.42, 0.46, 0.53),
  faint: rgb(0.62, 0.65, 0.7),
  line: rgb(0.85, 0.87, 0.9),
  accent: rgb(0.76, 0.15, 0.18),
  accentSoft: rgb(0.98, 0.92, 0.92),
  panel: rgb(0.96, 0.97, 0.98),
  dark: rgb(0.043, 0.047, 0.063),
  darkSoft: rgb(0.11, 0.12, 0.15),
  white: rgb(1, 1, 1),
  ok: rgb(0.06, 0.5, 0.35),
  warn: rgb(0.72, 0.45, 0.02),
  amber: rgb(0.98, 0.75, 0.14),
};

/** pdf-lib usa WinAnsi: substitui caracteres fora do escopo. */
export function pdfSafe(text) {
  return String(text)
    .replace(/⚠/g, '(!)')
    .replace(/→/g, '->')
    .replace(/←/g, '<-')
    .replace(/—/g, '-')
    .replace(/–/g, '-')
    .replace(/⌘/g, 'Cmd')
    .replace(/•/g, '-')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\u00a0/g, ' ')
    .replace(/[^\u0000-\u00ff]/g, '');
}

export class PdfDoc {
  constructor(doc, fonts, opts = {}) {
    this.doc = doc;
    this.fonts = fonts;
    this.width = opts.width || 595.28;
    this.height = opts.height || 841.89;
    this.margin = opts.margin ?? 52;
    this.footerLabel = opts.footerLabel || '';
    this.pages = [];
    this.pageRecords = [];
    this.newPage();
    this.fresh = true;          // página recém-criada e ainda sem conteúdo
  }

  static async create(opts = {}) {
    const doc = await PDFDocument.create();
    doc.setTitle(pdfSafe(opts.title || 'Documento'));
    doc.setAuthor('CoreMotiom');
    doc.setSubject(pdfSafe(opts.subject || ''));
    doc.setCreator('scripts/generate-user-flowchart-pdf.mjs');
    const fonts = {
      regular: await doc.embedFont(StandardFonts.Helvetica),
      bold: await doc.embedFont(StandardFonts.HelveticaBold),
      mono: await doc.embedFont(StandardFonts.Courier),
      monoBold: await doc.embedFont(StandardFonts.CourierBold),
    };
    return new PdfDoc(doc, fonts, opts);
  }

  /* ---------------- páginas ---------------- */

  /** Marca a página atual como "usada" (evita páginas em branco). */
  markUsed() {
    this.fresh = false;
  }

  /** Só cria página nova se a atual já tiver conteúdo. */
  newPageIfFresh(size) {
    if (!this.fresh) this.newPage(size);
    return this.page;
  }

  newPage(size) {
    if (size) {
      this.width = size.width || this.width;
      this.height = size.height || this.height;
    }
    const page = this.doc.addPage([this.width, this.height]);
    this.page = page;
    this.pages.push(page);
    this.pageIndex = this.pages.length - 1;
    this.y = this.height - this.margin;
    this.records = [];
    this.pageRecords.push(this.records);
    this.fresh = true;
    return page;
  }

  ensure(h) {
    if (this.y - h < this.margin + 26) this.newPage();
  }

  spacer(h = 10) {
    this.y -= h;
  }

  /* ---------------- medidas ---------------- */

  wrap(text, size, maxWidth, font = this.fonts.regular) {
    const words = pdfSafe(text).split(/\s+/).filter(Boolean);
    const lines = [];
    let line = '';
    for (const w of words) {
      const test = line ? `${line} ${w}` : w;
      if (font.widthOfTextAtSize(test, size) <= maxWidth) line = test;
      else {
        if (line) lines.push(line);
        line = w;
      }
    }
    if (line) lines.push(line);
    return lines.length ? lines : [''];
  }

  /* ---------------- blocos de texto ---------------- */

  text(str, opts = {}) {
    this.markUsed();
    const size = opts.size ?? 9.6;
    const font = opts.bold ? this.fonts.bold : opts.mono ? this.fonts.mono : this.fonts.regular;
    const color = opts.color || PALETTE.ink;
    const x = opts.x ?? this.margin;
    const maxWidth = opts.maxWidth ?? this.width - this.margin * 2;
    const lineHeight = opts.lineHeight ?? size * 1.42;
    const lines = opts.noWrap ? [pdfSafe(str)] : this.wrap(str, size, maxWidth, font);
    for (const line of lines) {
      this.ensure(lineHeight);
      this.page.drawText(line, { x, y: this.y - size, size, font, color });
      if (opts.underline) {
        const w = font.widthOfTextAtSize(line, size);
        this.page.drawLine({
          start: { x, y: this.y - size - 2 },
          end: { x: x + w, y: this.y - size - 2 },
          thickness: 0.5,
          color: PALETTE.line,
        });
      }
      this.y -= lineHeight;
    }
    return this;
  }

  heading(str, opts = {}) {
    const level = opts.level ?? 1;
    const size = level === 1 ? 17 : level === 2 ? 12.6 : 10.6;
    const gapTop = level === 1 ? 16 : level === 2 ? 14 : 10;
    this.ensure(size * 2.6 + gapTop);
    this.spacer(gapTop);
    if (level === 1) {
      this.page.drawRectangle({
        x: this.margin,
        y: this.y - 19,
        width: 3,
        height: 19,
        color: PALETTE.accent,
      });
      this.text(str, { size, bold: true, x: this.margin + 11 });
      this.spacer(6);
      this.page.drawLine({
        start: { x: this.margin, y: this.y },
        end: { x: this.width - this.margin, y: this.y },
        thickness: 0.7,
        color: PALETTE.line,
      });
      this.spacer(10);
    } else {
      this.text(str, { size, bold: true, color: level === 2 ? PALETTE.ink : PALETTE.muted });
      this.spacer(level === 2 ? 4 : 2);
    }
    return this;
  }

  paragraph(str, opts = {}) {
    this.text(str, { size: opts.size ?? 9.8, color: opts.color || PALETTE.ink, lineHeight: 14.2 });
    this.spacer(opts.after ?? 6);
    return this;
  }

  bullets(items, opts = {}) {
    for (const it of items) {
      this.ensure(14);
      const x = (opts.x ?? this.margin) + 8;
      this.page.drawCircle({ x: x - 3, y: this.y - 4, size: 1.5, color: PALETTE.accent });
      this.text(it, { size: opts.size ?? 9.6, x, maxWidth: this.width - this.margin * 2 - 12 });
      this.spacer(2);
    }
    this.spacer(opts.after ?? 4);
    return this;
  }

  /* ---------------- componentes ---------------- */

  pills(items, opts = {}) {
    this.markUsed();
    const size = 8.6;
    let x = opts.x ?? this.margin;
    const y = this.y;
    for (const [label, value] of items) {
      const text = pdfSafe(`${label}: ${value}`);
      const w = this.fonts.bold.widthOfTextAtSize(text, size) + 16;
      if (x + w > this.width - this.margin) {
        x = this.margin;
        this.y -= 22;
      }
      this.page.drawRectangle({
        x,
        y: this.y - 16,
        width: w,
        height: 16,
        color: PALETTE.panel,
        borderColor: PALETTE.line,
        borderWidth: 0.6,
      });
      this.page.drawText(text, { x: x + 8, y: this.y - 11.5, size, font: this.fonts.bold, color: PALETTE.muted });
      x += w + 6;
    }
    this.y -= 24;
    if (this.y === y) this.y -= 4;
    return this;
  }

  table(head, rows, colWidths, opts = {}) {
    this.markUsed();
    const size = opts.size ?? 8.7;
    const pad = 6;
    const total = colWidths.reduce((a, b) => a + b, 0);
    const scale = (this.width - this.margin * 2) / total;
    const widths = colWidths.map((w) => w * scale);
    const x0 = this.margin;

    const drawRow = (cells, { header = false, group = false, wrapText = true } = {}) => {
      const font = header || group ? this.fonts.bold : this.fonts.regular;
      const lines = cells.map((c, i) =>
        wrapText ? this.wrap(c, size, widths[i] - pad * 2, font) : [pdfSafe(c)]
      );
      const h = Math.max(...lines.map((l) => l.length)) * (size * 1.35) + pad * 1.5;
      if (this.y - h < this.margin + 26) {
        this.newPage();
        if (!header) drawRow(head, { header: true });
      }
      const rowY = this.y - h;
      if (header) {
        this.page.drawRectangle({ x: x0, y: rowY, width: this.width - this.margin * 2, height: h, color: PALETTE.darkSoft });
      } else if (group) {
        this.page.drawRectangle({
          x: x0,
          y: rowY,
          width: this.width - this.margin * 2,
          height: h,
          color: PALETTE.accentSoft,
        });
      } else {
        this.page.drawLine({
          start: { x: x0, y: rowY },
          end: { x: this.width - this.margin, y: rowY },
          thickness: 0.4,
          color: PALETTE.line,
        });
      }
      let cx = x0;
      const cellsCount = cells.length;
      lines.forEach((linesOfCell, i) => {
        const color = header ? PALETTE.white : group ? PALETTE.accent : i === 0 ? PALETTE.ink : PALETTE.muted;
        linesOfCell.forEach((line, li) => {
          this.page.drawText(line, {
            x: cx + pad,
            y: rowY + h - pad * 0.75 - size * 1.2 - li * size * 1.35,
            size,
            font: header ? this.fonts.bold : group ? this.fonts.bold : i === 0 && opts.boldFirst ? this.fonts.bold : font,
            color,
          });
        });
        cx += widths[i];
      });
      this.y = rowY;
    };

    drawRow(head, { header: true });
    for (const row of rows) {
      if (row.group) drawRow([row.group, ...new Array(head.length - 1).fill('')], { group: true, wrapText: false });
      else drawRow(row.cells || row, { wrapText: opts.wrap !== false });
    }
    this.spacer(10);
    return this;
  }

  async image(bytes, opts = {}) {
    const isPng = bytes[0] === 0x89 && bytes[1] === 0x50;
    this.__imgCache = this.__imgCache || new Map();
    const key = opts.cacheKey || `${isPng ? 'png' : 'jpg'}:${bytes.length}:${bytes[0]}`;
    let img = this.__imgCache.get(key);
    if (!img) {
      img = isPng ? await this.doc.embedPng(bytes) : await this.doc.embedJpg(bytes);
      this.__imgCache.set(key, img);
    }
    const maxW = opts.maxWidth ?? this.width - this.margin * 2;
    const maxH = opts.maxHeight ?? this.height - this.margin * 2 - 40;
    const scale = Math.min(maxW / img.width, maxH / img.height);
    const w = img.width * scale;
    const h = img.height * scale;
    return { img, w, h, maxW, maxH };
  }

  async placeImage(bytes, opts = {}) {
    this.markUsed();
    const { img, w, h } = await this.image(bytes, opts);

    this.ensure(h + 8);
    const x = opts.center === false ? this.margin : (this.width - w) / 2;
    this.page.drawRectangle({
      x: x - 1,
      y: this.y - h - 1,
      width: w + 2,
      height: h + 2,
      color: PALETTE.dark,
    });
    this.page.drawImage(img, { x, y: this.y - h, width: w, height: h });
    this.y -= h + (opts.after ?? 8);
    return { w, h };
  }

  card(title, body, opts = {}) {
    this.markUsed();
    const size = 9.4;
    const padX = 11;
    const padY = 9;
    const maxW = this.width - this.margin * 2 - padX * 2;
    const titleLines = this.wrap(title, size + 0.6, maxW, this.fonts.bold);
    const bodyLines = this.wrap(body, size - 0.6, maxW);
    const h = padY * 2 + titleLines.length * 13 + 3 + bodyLines.length * 12.4;
    this.ensure(h + 8);
    const y = this.y - h;
    this.page.drawRectangle({
      x: this.margin,
      y,
      width: this.width - this.margin * 2,
      height: h,
      color: PALETTE.panel,
      borderColor: PALETTE.line,
      borderWidth: 0.6,
    });
    this.page.drawRectangle({ x: this.margin, y, width: 2.4, height: h, color: opts.accent || PALETTE.accent });
    let ty = this.y - padY;
    titleLines.forEach((l) => {
      this.page.drawText(l, { x: this.margin + padX, y: ty - size, size: size + 0.6, font: this.fonts.bold, color: PALETTE.ink });
      ty -= 13;
    });
    ty -= 3;
    bodyLines.forEach((l) => {
      this.page.drawText(l, { x: this.margin + padX, y: ty - size + 0.4, size: size - 0.6, font: this.fonts.regular, color: PALETTE.muted });
      ty -= 12.4;
    });
    this.y = y - 9;
    return this;
  }

  /* ---------------- finalização ---------------- */

  stampFooters({ label, cover = true } = {}) {
    this.pages.forEach((page, i) => {
      if (cover && i === 0) return;
      page.drawLine({
        start: { x: this.margin, y: this.margin - 12 },
        end: { x: this.width - this.margin, y: this.margin - 12 },
        thickness: 0.5,
        color: PALETTE.line,
      });
      page.drawText(pdfSafe(label || this.footerLabel), {
        x: this.margin,
        y: this.margin - 22,
        size: 7.6,
        font: this.fonts.regular,
        color: PALETTE.faint,
      });
      const num = `${i + 1} / ${this.pages.length}`;
      const w = this.fonts.bold.widthOfTextAtSize(num, 7.8);
      page.drawText(num, {
        x: this.width - this.margin - w,
        y: this.margin - 22,
        size: 7.8,
        font: this.fonts.bold,
        color: PALETTE.faint,
      });
    });
  }

  async save() {
    return this.doc.save();
  }
}
```

### B.3 `scripts/generate-user-flowchart.mjs` — gerador do HTML + manifesto

```js
/**
 * CoreMotiom — Gerador do documento HTML do fluxograma do usuário.
 *   node scripts/generate-user-flowchart.mjs
 *   FLOW_EMIT_SVG=/tmp/svgs node scripts/generate-user-flowchart.mjs   # SVGs individuais
 *
 * O núcleo (dados + layout + SVG) fica em scripts/lib/flowchart-core.mjs.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  USE_CASE_DIAGRAM,
  USE_CASE_CATALOG,
  USE_CASE_MODULES,
  USE_CASE_STATS,
  UC_ACTORS,
  UC_EXTERNALS,
  renderUseCaseSvg,
} from './lib/usecase-core.mjs';
import {
  CANVAS_BG,
  ACTORS,
  EDGE_KINDS,
  escapeXml,
  layout,
  renderDiagram,
  DIAGRAMS,
  PERMISSIONS,
  STATUS_TABLE,
  GAPS,
  FILE_MAP,
  FILES_SUMMARY,
  META,
} from './lib/flowchart-core.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DOCS_DIR = path.join(ROOT, 'Fluxograma', 'Diagrama C. De Uso');
const OUT_HTML = path.join(DOCS_DIR, 'fluxograma-usuario.html');
const SVG_DUMP_DIR = process.env.FLOW_EMIT_SVG || '';
const EMIT_JSON = process.env.FLOW_EMIT_JSON || '';

/* ------------------------------------------------------------------ *
 * 6. Template HTML                                                    *
 * ------------------------------------------------------------------ */

function shapeSample(type, actor, label) {
  const a = ACTORS[actor];
  const w = 168;
  const h = 42;
  const dash = type === 'note' ? ' stroke-dasharray="6 5"' : '';
  let shape;
  if (type === 'decision') {
    const i = 18;
    shape = `<polygon points="${i},0 ${w - i},0 ${w},${h / 2} ${w - i},${h} ${i},${h} 0,${h / 2}" fill="${a.fill}" stroke="${a.stroke}" stroke-width="1.5"${dash} />`;
  } else if (type === 'data') {
    const i = 12;
    shape = `<polygon points="${i},0 ${w},0 ${w - i},${h} 0,${h}" fill="${a.fill}" stroke="${a.stroke}" stroke-width="1.5"${dash} />`;
  } else {
    const rx = type === 'start' || type === 'end' ? h / 2 : 12;
    shape = `<rect x="0" y="0" width="${w}" height="${h}" rx="${rx}" fill="${a.fill}" stroke="${a.stroke}" stroke-width="1.5"${dash} />`;
  }
  return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" class="sample">${shape}<text x="${
    w / 2
  }" y="${h / 2 + 4}" text-anchor="middle" font-size="11.5" font-weight="700" fill="${a.text}">${escapeXml(
    label
  )}</text></svg>`;
}

function buildHtml() {
  const diagramsHtml = DIAGRAMS.map((d) => {
    const svg = renderDiagram(d);
    if (SVG_DUMP_DIR) {
      fs.mkdirSync(SVG_DUMP_DIR, { recursive: true });
      fs.writeFileSync(path.join(SVG_DUMP_DIR, `${String(d.num).padStart(2, '0')}-${d.id}.svg`), svg);
    }
    const legend = (d.legend || [])
      .map((k) => `<span class="chip" style="--c:${ACTORS[k].stroke}">${escapeXml(ACTORS[k].label)}</span>`)
      .join('');
    return `      <section class="card" id="${d.id}">
        <div class="card-head">
          <span class="num">${d.num}</span>
          <div>
            <h2>${escapeXml(d.title)}</h2>
            <p class="desc">${escapeXml(d.desc)}</p>
          </div>
        </div>
        <div class="legend">${legend}</div>
        <div class="canvas" role="group" aria-label="${escapeXml(d.title)}">
${svg}
        </div>
        <p class="hint">Dica: use a rolagem horizontal para ver o diagrama inteiro em telas pequenas.</p>
      </section>`;
  }).join('\n\n');

  const uc = USE_CASE_DIAGRAM;
  if (SVG_DUMP_DIR) {
    fs.mkdirSync(SVG_DUMP_DIR, { recursive: true });
    fs.writeFileSync(path.join(SVG_DUMP_DIR, `08-${uc.id}.svg`), renderUseCaseSvg(uc));
  }
  const useCaseHtml = `      <section class="card" id="${uc.id}">
        <div class="card-head">
          <span class="num">${uc.num}</span>
          <div>
            <h2>${escapeXml(uc.title)}</h2>
            <p class="desc">${escapeXml(uc.desc)}</p>
          </div>
        </div>
        <div class="legend">
          ${Object.values(UC_ACTORS)
            .map((a) => `<span class="chip" style="--c:${ACTORS[a.actor].stroke}">${escapeXml(a.label)}</span>`)
            .join('')}
          ${Object.values(UC_EXTERNALS)
            .map((e) => `<span class="chip" style="--c:#38BDF8">${escapeXml(e.label)}</span>`)
            .join('')}
        </div>
        <div class="canvas" role="group" aria-label="${escapeXml(uc.title)}">
${renderUseCaseSvg(uc)}
        </div>
        <p class="hint">Cada pílula é um caso de uso (UC). Relações «include» aparecem tracejadas em roxo; integrações com sistemas externos, em azul; o ponto âmbar marca casos com lacuna conhecida.</p>
      </section>`;

  const catalogRows = USE_CASE_MODULES.map(
    (m) => `
        <tr class="group"><td colspan="6">${escapeXml(m.title)}</td></tr>
        ${m.uc
          .map(
            (u) => `<tr>
            <td class="mono">${escapeXml(u.id)}</td>
            <td class="k">${escapeXml(u.name)}${u.flag ? ` <span class="flag" title="${escapeXml(u.flag)}">⚠ ${escapeXml(u.flag)}</span>` : ''}</td>
            <td class="actors">${[
              ...u.actors.map((a) => `<i style="--c:${ACTORS[a].stroke}" title="${escapeXml(UC_ACTORS[a].label)}"></i>`),
              ...(u.ext ? [`<i style="--c:#38BDF8" title="${escapeXml(UC_EXTERNALS[u.ext].label)}"></i>`] : []),
            ].join('')}</td>
            <td class="mono small">${escapeXml(u.src)}</td>
          </tr>`
          )
          .join('')}`
  ).join('');

  const useCaseCatalogHtml = `      <section class="card" id="catalogo-uc">
        <h2 class="section-title">9. Catálogo completo de casos de uso</h2>
        <p class="sub">Os ${USE_CASE_STATS.total} casos de uso da plataforma, com atores envolvidos, arquivo responsável e lacunas conhecidas.</p>
        <div class="load-stats">
          <div class="mini"><span>Casos de uso</span><strong>${USE_CASE_STATS.total}</strong></div>
          <div class="mini"><span>Módulos funcionais</span><strong>${USE_CASE_STATS.modules}</strong></div>
          <div class="mini"><span>Atores primários</span><strong>${USE_CASE_STATS.atores}</strong></div>
          <div class="mini"><span>Sistemas externos</span><strong>${USE_CASE_STATS.externos}</strong></div>
          <div class="mini"><span>Com lacuna parcial</span><strong>${USE_CASE_STATS.parciais}</strong></div>
        </div>
        <div class="tbl-wrap"><table class="uc-table">
          <thead><tr><th>ID</th><th>Caso de uso</th><th>Atores</th><th>Onde está no código</th></tr></thead>
          <tbody>${catalogRows}</tbody>
        </table></div>
      </section>`;

  const legendShapes = [
    ['start', 'sistema', 'Início'],
    ['process', 'atleta', 'Ação / tela'],
    ['decision', 'atencao', 'Decisão / guarda'],
    ['data', 'sistema', 'Dado / persistência'],
    ['note', 'atencao', 'Observação / lacuna'],
    ['end', 'sucesso', 'Fim de fluxo'],
  ]
    .map(
      ([type, actor, label]) =>
        `<div class="legend-item">${shapeSample(type, actor, label)}<span>${label}</span></div>`
    )
    .join('');

  const actorLegend = Object.entries(ACTORS)
    .map(([, a]) => `<span class="chip big" style="--c:${a.stroke}">${escapeXml(a.label)}</span>`)
    .join('');

  const edgeLegend = Object.entries({
    flow: 'Fluxo padrão',
    auth: 'Autenticação / sessão',
    success: 'Caminho de sucesso',
    error: 'Erro, bloqueio ou lacuna',
    admin: 'Ação administrativa',
    data: 'Gravação / leitura de dados',
  })
    .map(([k, label]) => `<span class="edge-key"><i style="--c:${EDGE_KINDS[k].stroke};--d:${
    k === 'error' ? '5 4' : 'none'
  }"></i>${label}</span>`)
    .join('');

  const table = (t) =>
    `<table><thead><tr>${t.head.map((h) => `<th>${escapeXml(h)}</th>`).join('')}</tr></thead><tbody>${t.rows
      .map(
        (r) =>
          `<tr>${r
            .map((c, i) => {
              const v = String(c);
              const cls = /^não/.test(v)
                ? ' class="no"'
                : /^sim/.test(v)
                ? ' class="yes"'
                : i === 0
                ? ' class="k"'
                : '';
              return `<td${cls}>${escapeXml(v)}</td>`;
            })
            .join('')}</tr>`
      )
      .join('')}</tbody></table>`;

  const gapsHtml = GAPS.map(
    (g) => `        <article class="gap">
          <span class="tag">${escapeXml(g.tag)}</span>
          <h3>${escapeXml(g.t)}</h3>
          <p>${escapeXml(g.d)}</p>
        </article>`
  ).join('\n');

  const filesHtml = table(FILE_MAP);
  const permsHtml = table(PERMISSIONS);
  const statusHtml = table(STATUS_TABLE);
  const summaryHtml = FILES_SUMMARY.map(
    ([k, v]) => `<div class="mini"><span>${escapeXml(k)}</span><strong>${escapeXml(v)}</strong></div>`
  ).join('');

  const nav = DIAGRAMS.map(
    (d) => `<a href="#${d.id}"><b>${d.num}</b><span>${escapeXml(d.title.split('—')[0].trim())}</span></a>`
  ).join('');

  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>CoreMotiom — Fluxograma Completo do Usuário</title>
<meta name="description" content="Fluxograma completo das jornadas do usuário na plataforma CoreMotiom: autenticação, compra, venda C2C, lojas verificadas, comunidade, treinadores e painel admin." />
<style>
  :root {
    --bg: #08090c;
    --panel: #101217;
    --panel-2: #14171e;
    --line: #22262f;
    --text: #f3f5f9;
    --muted: #98a0b1;
    --red: #e11d2e;
    --red-soft: #f87171;
  }
  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body {
    margin: 0;
    background:
      radial-gradient(1200px 600px at 15% -10%, rgba(225, 29, 46, 0.16), transparent 60%),
      radial-gradient(900px 500px at 100% 0%, rgba(167, 139, 250, 0.08), transparent 55%),
      var(--bg);
    color: var(--text);
    font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    line-height: 1.55;
    -webkit-font-smoothing: antialiased;
  }
  .wrap { max-width: 1360px; margin: 0 auto; padding: 32px 20px 80px; }
  header.hero {
    border: 1px solid var(--line);
    background: linear-gradient(160deg, rgba(24, 26, 33, 0.96), rgba(12, 13, 17, 0.96));
    border-radius: 26px;
    padding: 30px clamp(20px, 4vw, 40px);
    position: relative;
    overflow: hidden;
  }
  header.hero::after {
    content: "";
    position: absolute; inset: 0 0 auto 0; height: 3px;
    background: linear-gradient(90deg, #7f1d1d, var(--red), #f97316);
  }
  .brandline { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; flex-wrap: wrap; }
  .logo {
    width: 42px; height: 42px; border-radius: 13px; display: grid; place-items: center;
    background: linear-gradient(135deg, #b91c1c, var(--red));
    font-weight: 900; letter-spacing: -0.5px; box-shadow: 0 10px 30px rgba(225, 29, 46, 0.35);
  }
  .brandline h1 { font-size: clamp(20px, 3vw, 30px); margin: 0; letter-spacing: -0.5px; }
  .pill {
    font-size: 10px; font-weight: 800; letter-spacing: 1.2px; text-transform: uppercase;
    padding: 4px 10px; border-radius: 999px; border: 1px solid rgba(248, 113, 113, 0.4);
    background: rgba(225, 29, 46, 0.14); color: #fca5a5;
  }
  header.hero p.lead { color: var(--muted); font-size: 14px; max-width: 96ch; margin: 0 0 18px; }
  header.hero code { background: #171a21; border: 1px solid var(--line); border-radius: 6px; padding: 1px 5px; font-size: 12.5px; }
  .mini-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 10px; }
  .mini {
    border: 1px solid var(--line); background: rgba(20, 23, 30, 0.7); border-radius: 14px; padding: 10px 13px;
  }
  .mini span { display: block; font-size: 10px; text-transform: uppercase; letter-spacing: 0.8px; color: #7b8496; font-weight: 700; }
  .mini strong { font-size: 12.5px; font-weight: 600; color: #dfe3ec; }
  nav.toc {
    position: sticky; top: 0; z-index: 20; margin: 20px 0 26px; padding: 10px;
    display: flex; gap: 8px; overflow-x: auto; scrollbar-width: none;
    background: rgba(8, 9, 12, 0.92); backdrop-filter: blur(10px);
    border: 1px solid var(--line); border-radius: 18px;
  }
  nav.toc::-webkit-scrollbar { display: none; }
  nav.toc a {
    display: inline-flex; align-items: center; gap: 8px; white-space: nowrap;
    color: #b9c0ce; text-decoration: none; font-size: 12px; font-weight: 600;
    padding: 7px 12px; border-radius: 999px; border: 1px solid transparent; transition: all 0.15s ease;
  }
  nav.toc a:hover { background: var(--panel-2); border-color: var(--line); color: #fff; }
  nav.toc a b {
    display: grid; place-items: center; width: 19px; height: 19px; border-radius: 6px;
    background: rgba(225, 29, 46, 0.18); color: #fca5a5; font-size: 10.5px;
  }
  section.card {
    border: 1px solid var(--line); background: var(--panel); border-radius: 24px;
    padding: 22px clamp(16px, 2.4vw, 26px) 18px; margin-bottom: 26px; scroll-margin-top: 84px;
  }
  .card-head { display: flex; gap: 14px; align-items: flex-start; }
  .num {
    flex: 0 0 auto; width: 34px; height: 34px; border-radius: 11px; display: grid; place-items: center;
    background: rgba(225, 29, 46, 0.14); border: 1px solid rgba(248, 113, 113, 0.32);
    color: #fca5a5; font-weight: 800; font-size: 14px;
  }
  .card h2 { margin: 2px 0 6px; font-size: clamp(17px, 2.2vw, 22px); letter-spacing: -0.4px; }
  .desc { color: var(--muted); font-size: 13px; margin: 0; max-width: 110ch; }
  .legend { display: flex; flex-wrap: wrap; gap: 7px; margin: 16px 0 12px; }
  .chip {
    font-size: 10.5px; font-weight: 600; color: #cdd3de; border: 1px solid var(--line);
    background: rgba(20, 23, 30, 0.75); border-radius: 999px; padding: 4px 10px 4px 8px;
    display: inline-flex; align-items: center; gap: 7px;
  }
  .chip::before { content: ""; width: 8px; height: 8px; border-radius: 3px; background: var(--c); }
  .chip.big { font-size: 11.5px; padding: 6px 13px 6px 10px; }
  .canvas {
    border: 1px solid var(--line); border-radius: 18px; overflow-x: auto; overflow-y: hidden;
    background: #0b0c10; padding: 4px;
  }
  .canvas .flow-svg { display: block; width: 100%; height: auto; min-width: 880px; font-family: inherit; }
  .hint { color: #6f7889; font-size: 11.5px; margin: 10px 2px 0; }
  .split { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; }
  .legend-item { display: flex; flex-direction: column; gap: 6px; align-items: flex-start; font-size: 11.5px; color: var(--muted); }
  .sample { display: block; }
  table { width: 100%; border-collapse: collapse; font-size: 12.5px; }
  thead th {
    text-align: left; font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.9px;
    color: #8d95a6; background: var(--panel-2); padding: 10px 12px; border-bottom: 1px solid var(--line);
  }
  tbody td { padding: 9px 12px; border-bottom: 1px solid #191d25; color: #cbd2de; vertical-align: top; }
  tbody tr:last-child td { border-bottom: none; }
  tbody td.k { color: #fff; font-weight: 600; }
  tbody td.yes { color: #6ee7b7; font-weight: 600; }
  tbody td.no { color: #fca5a5; font-weight: 600; }
  .tbl-wrap { border: 1px solid var(--line); border-radius: 16px; overflow: hidden; }
  table.uc-table td.mono { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 11.5px; color: #9aa3b2; }
  table.uc-table td.mono.small { font-size: 11px; }
  table.uc-table tr.group td {
    background: #171a22; color: #e5e9f0; font-weight: 700; font-size: 11px;
    letter-spacing: 0.9px; text-transform: uppercase; padding: 8px 12px;
  }
  table.uc-table td.actors { white-space: nowrap; }
  table.uc-table td.actors i { display: inline-block; width: 9px; height: 9px; border-radius: 3px; background: var(--c); margin-right: 5px; }
  .flag {
    font-size: 10px; font-weight: 700; color: #fcd34d; background: rgba(251, 191, 36, 0.12);
    border: 1px solid rgba(251, 191, 36, 0.3); border-radius: 999px; padding: 1px 7px; margin-left: 6px;
    white-space: nowrap;
  }
  .load-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; margin-bottom: 16px; }
  .load-stats .mini strong { font-size: 18px; color: #fff; display: block; }
  .gap-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 14px; }
  .gap {
    border: 1px solid var(--line); background: var(--panel-2); border-radius: 18px; padding: 16px;
    border-left: 3px solid var(--red-soft);
  }
  .gap .tag {
    font-size: 10px; font-weight: 800; letter-spacing: 0.9px; text-transform: uppercase;
    color: #fcd34d; background: rgba(251, 191, 36, 0.12); border: 1px solid rgba(251, 191, 36, 0.28);
    padding: 3px 9px; border-radius: 999px;
  }
  .gap h3 { font-size: 14px; margin: 10px 0 6px; }
  .gap p { font-size: 12.5px; color: var(--muted); margin: 0; }
  .edge-keys { display: flex; flex-wrap: wrap; gap: 14px; font-size: 12px; color: var(--muted); }
  .edge-key { display: inline-flex; align-items: center; gap: 8px; }
  .edge-key i { width: 34px; height: 0; border-top: 2px solid var(--c); border-top-style: var(--d); display: inline-block; }
  h2.section-title { font-size: clamp(18px, 2.3vw, 23px); letter-spacing: -0.4px; margin: 0 0 6px; }
  .sub { color: var(--muted); font-size: 13px; margin: 0 0 18px; max-width: 110ch; }
  footer.foot { color: #6b7385; font-size: 11.5px; text-align: center; margin-top: 34px; }
  footer.foot code { background: var(--panel-2); border: 1px solid var(--line); border-radius: 6px; padding: 2px 6px; }
  @media print {
    body { background: #fff; color: #111; }
    nav.toc { display: none; }
    section.card, header.hero, .gap, .mini { break-inside: avoid; border-color: #ccc; background: #fff; }
    .canvas { overflow: visible; }
  }
</style>
</head>
<body>
<div class="wrap">

  <header class="hero">
    <div class="brandline">
      <div class="logo">CM</div>
      <div>
        <h1>CoreMotiom — Fluxograma Completo do Usuário</h1>
        <div style="display:flex;gap:8px;align-items:center;margin-top:6px;flex-wrap:wrap">
          <span class="pill">Marketplace esportivo + C2C</span>
          <span class="pill">Next.js 15 · React 19 · Supabase</span>
          <span class="pill">7 fluxos + casos de uso</span>
        </div>
      </div>
    </div>
    <p class="lead">
      Documento único com todas as jornadas de usuário implementadas no projeto: do primeiro acesso como visitante
      até as operações executivas do painel master. Cada diagrama foi montado a partir da leitura do código-fonte
      (<code>app/</code>, <code>components/</code>, <code>lib/store.tsx</code>, <code>services/</code>, <code>app/api/</code> e a migração SQL),
      incluindo decisões, guardas de acesso, gravações no banco e lacunas encontradas.
    </p>
    <div class="mini-grid">${summaryHtml}</div>
  </header>

  <nav class="toc">
    ${nav}
    <a href="#casos-de-uso"><b>8</b><span>Casos de uso</span></a>
    <a href="#catalogo-uc"><b>9</b><span>Catálogo UC</span></a>
    <a href="#papeis"><b>10</b><span>Permissões</span></a>
    <a href="#status"><b>11</b><span>Status</span></a>
    <a href="#lacunas"><b>12</b><span>Lacunas &amp; riscos</span></a>
    <a href="#arquivos"><b>13</b><span>Arquivos-chave</span></a>
    <a href="#leitura"><b>14</b><span>Como ler</span></a>
  </nav>

${diagramsHtml}

${useCaseHtml}

${useCaseCatalogHtml}

  <section class="card" id="papeis">
    <h2 class="section-title">10. Papéis e permissões por tela</h2>
    <p class="sub">Como o app decide o que cada perfil vê e faz (lib/store.tsx + guardas em cada componente).</p>
    <div class="tbl-wrap">${permsHtml}</div>
  </section>

  <section class="card" id="status">
    <h2 class="section-title">11. Máquina de estados do domínio</h2>
    <p class="sub">Todos os estados previstos nos tipos do projeto e quem os movimenta.</p>
    <div class="tbl-wrap">${statusHtml}</div>
  </section>

  <section class="card" id="lacunas">
    <h2 class="section-title">12. Lacunas e riscos encontrados no fluxo</h2>
    <p class="sub">Pontos em que o caminho do usuário termina em tela vazia, em ação sem persistência ou em risco operacional. Cada item traz o impacto direto na jornada.</p>
    <div class="gap-grid">
${gapsHtml}
    </div>
  </section>

  <section class="card" id="arquivos">
    <h2 class="section-title">13. Arquivos-chave por fluxo</h2>
    <p class="sub">Onde mexer para evoluir cada jornada.</p>
    <div class="tbl-wrap">${filesHtml}</div>
  </section>

  <section class="card" id="leitura">
    <h2 class="section-title">14. Como ler este fluxograma</h2>
    <div class="split">
      <div>
        <h3 style="font-size:13px;margin:0 0 12px;color:#cfd5e0">Formatos dos nós</h3>
        <div class="split">${legendShapes}</div>
      </div>
      <div>
        <h3 style="font-size:13px;margin:0 0 12px;color:#cfd5e0">Cores por perfil</h3>
        <div class="legend">${actorLegend}</div>
        <h3 style="font-size:13px;margin:18px 0 12px;color:#cfd5e0">Tipos de seta</h3>
        <div class="edge-keys">${edgeLegend}</div>
        <p style="font-size:12px;color:#79818f;margin-top:18px">
          Nós com traço tracejado e cor âmbar marcam lacunas ou comportamentos apenas parciais no código atual.
        </p>
      </div>
    </div>
  </section>

  <footer class="foot">
    Gerado por <code>scripts/generate-user-flowchart.mjs</code> a partir do estado do repositório ·
    CoreMotiom (BIRFeuFeu/-CoreMotion) · documento autocontido, sem dependências externas.
  </footer>
</div>
</body>
</html>
`;
}

/* ------------------------------------------------------------------ *
 * Execução                                                            *
 * ------------------------------------------------------------------ */

const data = {
  meta: META,
  diagrams: DIAGRAMS.map((d) => {
    const { width, height } = layout(d);
    return { ...d, width, height };
  }),
  useCases: {
    diagram: USE_CASE_DIAGRAM,
    modules: USE_CASE_MODULES,
    stats: USE_CASE_STATS,
    actors: UC_ACTORS,
    externals: UC_EXTERNALS,
  },
  permissions: PERMISSIONS,
  status: STATUS_TABLE,
  gaps: GAPS,
  files: FILE_MAP,
  summary: FILES_SUMMARY,
};

if (EMIT_JSON) {
  fs.writeFileSync(EMIT_JSON, JSON.stringify(data, null, 1), 'utf8');
  console.log(`✓ manifesto JSON em ${EMIT_JSON}`);
}

fs.mkdirSync(path.dirname(OUT_HTML), { recursive: true });
fs.writeFileSync(OUT_HTML, buildHtml(), 'utf8');
console.log(
  `✓ Fluxograma/Diagrama C. De Uso/fluxograma-usuario.html gerado (${DIAGRAMS.length} diagramas, ${(
    fs.statSync(OUT_HTML).size / 1024
  ).toFixed(1)} KB)`
);
```

### B.4 `scripts/generate-user-flowchart-pdf.mjs` — gerador dos PDFs

```js
/**
 * CoreMotiom — Gerador do PDF do fluxograma do usuário + casos de uso.
 *
 *   node scripts/generate-user-flowchart-pdf.mjs
 *   FLOW_PNG_DIR=/caminho/com/pngs node scripts/generate-user-flowchart-pdf.mjs
 *
 * Pipeline:
 *   1. Garante o manifesto JSON gerado por `node scripts/generate-user-flowchart.mjs`
 *      (roda o gerador automaticamente se o manifesto estiver ausente/desatualizado).
 *   2. Rasteriza cada diagrama SVG (núcleo em scripts/lib/) em PNG com @resvg/resvg-js.
 *      Sem a dependência, usa os PNGs numerados de FLOW_PNG_DIR.
 *   3. Monta o PDF A4 — capa, sumário numerado, os 7 fluxos, o diagrama de casos de
 *      uso, o catálogo de UC, permissões, máquina de estados, lacunas e arquivos.
 *
 * Saída: Fluxograma/Diagrama C. De Uso/fluxograma-usuario.pdf (+ casos-de-uso.pdf)
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

import { DIAGRAMS, renderDiagram, layout, ACTORS } from './lib/flowchart-core.mjs';
import {
  renderUseCaseSvg,
  USE_CASE_DIAGRAM,
  USE_CASE_MODULES,
  USE_CASE_STATS,
  UC_ACTOR_INFO,
  UC_EXTERNAL_INFO,
} from './lib/usecase-core.mjs';
import { PdfDoc, PALETTE, pdfSafe } from './lib/pdf-kit.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DOCS_REL = 'Fluxograma/Diagrama C. De Uso';
const DOCS_DIR = path.join(ROOT, 'Fluxograma', 'Diagrama C. De Uso');
const OUT_PDF = path.join(DOCS_DIR, 'fluxograma-usuario.pdf');
const OUT_PDF_UC = path.join(DOCS_DIR, 'casos-de-uso.pdf');
/** FLOW_PDF_ONLY=fluxos|casos limita a geração a um dos documentos. */
const ONLY = (process.env.FLOW_PDF_ONLY || '').toLowerCase();
const MANIFEST = process.env.FLOW_MANIFEST || path.join(DOCS_DIR, '.flowchart-data.json');
const PNG_DIR = process.env.FLOW_PNG_DIR || '';
const HTML_SCRIPT = path.join(ROOT, 'scripts', 'generate-user-flowchart.mjs');
const CORE_FILES = [
  path.join(ROOT, 'scripts', 'lib', 'flowchart-core.mjs'),
  path.join(ROOT, 'scripts', 'lib', 'usecase-core.mjs'),
];

const A4 = { portrait: { width: 595.28, height: 841.89 }, landscape: { width: 841.89, height: 595.28 } };
const TOC_ENTRIES = [];
const SHORT_ACTORS = { visitante: 'Visitante', atleta: 'Atleta', lojista: 'Lojista', admin: 'Super Admin' };

const shortActor = (a) => SHORT_ACTORS[a] || a;

/* ------------------------------------------------------------------ *
 * 1. Manifesto                                                        *
 * ------------------------------------------------------------------ */

function ensureManifest() {
  const targets = [HTML_SCRIPT, ...CORE_FILES];
  const stale =
    !fs.existsSync(MANIFEST) ||
    targets.some((f) => fs.existsSync(f) && fs.statSync(f).mtimeMs > fs.statSync(MANIFEST).mtimeMs + 1);

  if (stale) {
    process.stdout.write('• atualizando manifesto de dados… ');
    const res = spawnSync(process.execPath, [HTML_SCRIPT], {
      cwd: ROOT,
      env: { ...process.env, FLOW_EMIT_JSON: MANIFEST },
      encoding: 'utf8',
    });
    if (res.status !== 0) {
      console.error('\n' + (res.stderr || res.stdout));
      throw new Error('falha ao gerar o manifesto (scripts/generate-user-flowchart.mjs)');
    }
    console.log('ok');
  }
  return JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
}

/* ------------------------------------------------------------------ *
 * 2. Rasterização                                                     *
 * ------------------------------------------------------------------ */

const RESVG_CANDIDATES = () =>
  [
    '@resvg/resvg-js',
    '/home/user/tools/node_modules/@resvg/resvg-js/index.js',
    path.join(ROOT, 'node_modules/@resvg/resvg-js/index.js'),
  ].filter(Boolean);

async function loadResvg() {
  for (const candidate of RESVG_CANDIDATES()) {
    try {
      const mod = await import(candidate);
      const Resvg = mod.Resvg || mod.default?.Resvg;
      if (Resvg) return Resvg;
    } catch {
      /* tenta o próximo */
    }
  }
  return null;
}

const FONT_CANDIDATES = [
  '/home/user/tools/node_modules/dejavu-fonts-ttf/ttf/DejaVuSans.ttf',
  '/home/user/tools/node_modules/dejavu-fonts-ttf/ttf/DejaVuSans-Bold.ttf',
];

function pngFromSvg(Resvg, svg, scale) {
  // Fontes: usa as empacotadas quando existirem; caso contrário, as do sistema.
  const fontFiles = FONT_CANDIDATES.filter((f) => fs.existsSync(f));
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'zoom', value: scale },
    font: fontFiles.length
      ? { loadSystemFonts: false, fontFiles, defaultFontFamily: 'DejaVu Sans' }
      : { loadSystemFonts: true },
  });
  return Buffer.from(resvg.render().asPng());
}

async function renderFigures(manifest) {
  const Resvg = await loadResvg();
  const figures = [];

  for (const d of manifest.diagrams) {
    const { width, height } = layout(d);
    figures.push({
      key: `flow-${d.id}`,
      kind: 'flow',
      num: d.num,
      title: d.title,
      desc: d.desc,
      legend: (d.legend || []).map((k) => ACTORS[k].label),
      svg: renderDiagram(d),
      aspect: width / height,
      png: null,
    });
  }

  const uc = manifest.useCases;
  if (uc?.diagram) {
    const svg = renderUseCaseSvg(uc.diagram);
    const viewBox = svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
    figures.push({
      key: 'usecase',
      kind: 'usecase',
      num: uc.diagram.num,
      title: uc.diagram.title,
      desc: uc.diagram.desc,
      legend: [
        'Atores primários nos corredores laterais',
        'Sistemas externos (azul tracejado)',
        '«include» (roxo tracejado)',
        'Ponto âmbar = lacuna conhecida',
      ],
      svg,
      aspect: viewBox ? Number(viewBox[1]) / Number(viewBox[2]) : 1,
      png: null,
    });
  }

  for (const f of figures) {
    if (Resvg) f.png = pngFromSvg(Resvg, f.svg, 2);
    else if (PNG_DIR) {
      const prefix = String(f.num).padStart(2, '0');
      const name = fs.readdirSync(PNG_DIR).find((file) => file.endsWith('.png') && file.startsWith(prefix));
      if (name) f.png = fs.readFileSync(path.join(PNG_DIR, name));
    }
    if (!f.png) {
      throw new Error(
        `não foi possível gerar a imagem do diagrama ${f.key}. ` +
          'Instale o rasterizador com "npm i -D @resvg/resvg-js" ou aponte FLOW_PNG_DIR para os PNGs numerados.'
      );
    }
  }

  if (!Resvg) console.warn('• aviso: @resvg/resvg-js ausente — usando PNGs de FLOW_PNG_DIR');
  return figures;
}

/* ------------------------------------------------------------------ *
 * 3. Blocos de documento                                              *
 * ------------------------------------------------------------------ */

function cover(doc, manifest, figures) {
  const { width: W, height: H } = A4.portrait;
  doc.newPageIfFresh(A4.portrait);
  doc.page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: PALETTE.dark });
  doc.page.drawRectangle({ x: 0, y: H - 6, width: W, height: 6, color: PALETTE.accent });

  doc.page.drawRectangle({ x: 52, y: H - 138, width: 46, height: 46, color: PALETTE.accent });
  doc.page.drawText('CM', { x: 60, y: H - 121, size: 20, font: doc.fonts.bold, color: PALETTE.white });

  doc.page.drawText('CoreMotiom', { x: 52, y: H - 204, size: 34, font: doc.fonts.bold, color: PALETTE.white });
  doc.page.drawText(pdfSafe('Fluxograma completo do usuário'), {
    x: 52, y: H - 230, size: 15.5, font: doc.fonts.regular, color: PALETTE.amber,
  });
  doc.page.drawText(pdfSafe('e catálogo de casos de uso'), {
    x: 52, y: H - 250, size: 15.5, font: doc.fonts.regular, color: PALETTE.amber,
  });
  doc.page.drawText(pdfSafe(manifest.meta.tagline), {
    x: 52, y: H - 288, size: 11, font: doc.fonts.regular, color: PALETTE.faint,
  });
  doc.page.drawText(pdfSafe(manifest.meta.stack), {
    x: 52, y: H - 306, size: 9.4, font: doc.fonts.regular, color: PALETTE.faint,
  });

  const stats = [
    [String(figures.filter((f) => f.kind === 'flow').length), 'diagramas de fluxo'],
    ['1', 'diagrama UML de casos de uso'],
    [String(manifest.useCases?.stats?.total ?? 48), 'casos de uso catalogados'],
    [String(manifest.gaps.length), 'lacunas e riscos mapeados'],
  ];
  stats.forEach(([value, label], i) => {
    const x = 52 + i * 122;
    const y = H - 404;
    doc.page.drawRectangle({ x, y, width: 108, height: 66, color: PALETTE.darkSoft, borderColor: PALETTE.accent, borderWidth: 0.7 });
    doc.page.drawText(value, { x: x + 12, y: y + 34, size: 21, font: doc.fonts.bold, color: PALETTE.white });
    doc.page.drawText(pdfSafe(label), { x: x + 12, y: y + 18, size: 7.4, font: doc.fonts.regular, color: PALETTE.faint });
  });

  const stamp = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(new Date());
  doc.page.drawText(pdfSafe(`Gerado em ${stamp} a partir do código-fonte de ${manifest.meta.repo}`), {
    x: 52, y: 80, size: 8.4, font: doc.fonts.regular, color: PALETTE.faint,
  });
  doc.page.drawText(
    pdfSafe('7 fluxos de usuário · 1 diagrama UML de casos de uso · permissões por papel · máquina de estados · lacunas e riscos.'),
    { x: 52, y: 64, size: 8.4, font: doc.fonts.regular, color: PALETTE.faint }
  );
}

function tableOfContents(doc, entries, pageMap) {
  doc.newPage(A4.portrait);
  doc.heading('Sumário', { level: 1 });
  doc.paragraph(
    'A numeração abaixo segue a ordem de leitura do PDF. Cada diagrama ocupa uma página própria, com legenda de atores e de tipos de seta.'
  );
  doc.spacer(4);
  doc.table(
    ['Seção', 'Página'],
    entries.map((e) => [e.level === 1 ? e.title : `     ${e.title}`, pageMap[e.id] ? String(pageMap[e.id]) : '—']),
    [86, 14],
    { size: 9.4, boldFirst: false, wrap: false }
  );
}

function sectionHeader(doc, section) {
  doc.heading(section.title, { level: 1 });
  if (section.desc) doc.paragraph(section.desc);
}

/** Escolhe a orientação que permite desenhar o diagrama no maior tamanho. */
function bestOrientation(aspect, headerSpace) {
  const fits = (size) => {
    const maxW = size.width - 104;
    const maxH = size.height - 104 - headerSpace;
    return Math.min(maxW / aspect, maxH); // altura máxima alcançável
  };
  const portrait = fits(A4.portrait);
  const landscape = fits(A4.landscape);
  return landscape > portrait * 1.05 ? A4.landscape : A4.portrait;
}

async function figurePage(doc, figure, record) {
  const headerSpace = 64 + (figure.desc ? 20 : 0) + (figure.legend?.length ? 14 : 0);
  doc.newPage(bestOrientation(figure.aspect, headerSpace));
  if (record) record(`fig-${figure.num}`);
  doc.page.drawRectangle({ x: doc.margin, y: doc.height - doc.margin - 4, width: 3, height: 16, color: PALETTE.accent });
  doc.page.drawText(pdfSafe(`${figure.num}. ${figure.title}`), {
    x: doc.margin + 10, y: doc.height - doc.margin + 2, size: 12.6, font: doc.fonts.bold, color: PALETTE.ink,
  });
  doc.y = doc.height - doc.margin - 16;
  if (figure.desc) doc.paragraph(figure.desc, { size: 8.8, color: PALETTE.muted, after: 4 });
  if (figure.legend?.length) doc.paragraph(`Legenda: ${figure.legend.join(' · ')}`, { size: 8, color: PALETTE.faint, after: 4 });
  // 44pt de folga: evita que o placeImage abra uma página nova (e deixe a anterior vazia)
  await doc.placeImage(figure.png, {
    maxHeight: doc.y - doc.margin - 44,
    cacheKey: `fig-${figure.num}`,
  });
}

/* ------------------------------------------------------------------ *
 * 4. Conteúdo                                                         *
 * ------------------------------------------------------------------ */

const SELECTION = [
  'Cada diagrama é uma seção numerada; os identificadores UC01… do diagrama de casos de uso correspondem ao catálogo da seção 9.',
  'Cores identificam o perfil do ator: cinza (visitante), verde (atleta), azul (lojista) e vermelho (admin master).',
  'As setas têm semântica: fluxo padrão, autenticação/sessão, sucesso, erro/bloqueio, ação administrativa e gravação de dados.',
  'Nós âmbar tracejados, marcados com (!), documentam lacunas ou comportamentos parciais no código atual.',
];

async function renderStructure(doc, manifest, figures, record) {
  const flowFigures = figures.filter((f) => f.kind === 'flow');
  const ucFigure = figures.find((f) => f.kind === 'usecase');

  /* --- 1. visão geral --- */
  doc.newPage(A4.portrait);
  record('sec-mapa');
  sectionHeader(doc, {
    title: '1. Visão geral e mapa dos diagramas',
    desc:
      'Este documento reúne o mapa completo das jornadas de usuário da plataforma CoreMotiom e o catálogo de casos de uso, ' +
      'extraídos diretamente do código-fonte: telas renderizadas, modais globais, guardas de acesso, serviços, rotas de API e a migração SQL.',
  });
  doc.pills(manifest.summary.map(([k, v]) => [k, v]));
  doc.spacer(2);
  doc.heading('Como ler os diagramas', { level: 2 });
  doc.bullets(SELECTION);
  doc.spacer(2);
  doc.heading('Mapa dos diagramas', { level: 2 });
  doc.table(
    ['#', 'Diagrama', 'O que cobre'],
    manifest.diagrams.map((d) => [`${d.num}`, d.title, d.desc]),
    [6, 34, 60],
    { boldFirst: true }
  );
  doc.paragraph(
    'Para leitura com zoom, os mesmos diagramas estão disponíveis em fluxograma-usuario.html (nesta mesma pasta), gerado a partir deste mesmo núcleo de dados.',
    { size: 8.4, color: PALETTE.faint }
  );

  /* --- fluxos --- */
  for (const f of flowFigures) {
    await figurePage(doc, f, record);
  }

  /* --- casos de uso --- */
  doc.newPage(A4.portrait);
  record('sec-uc');
  sectionHeader(doc, { title: `${ucFigure.num}. Diagrama de casos de uso`, desc: ucFigure.desc });
  await doc.placeImage(ucFigure.png, { maxHeight: doc.y - doc.margin - 30, cacheKey: 'usecase' });
  doc.paragraph(
    'Atores primários ocupam os corredores laterais (visitante, atleta e lojista à esquerda; super admin à direita). ' +
      'Sistemas externos aparecem em azul tracejado, as relações «include» em roxo e os pontos âmbar marcam casos com lacuna conhecida.',
    { size: 8.4, color: PALETTE.faint }
  );

  /* --- catálogo --- */
  doc.newPage(A4.portrait);
  record('sec-catalogo');
  doc.heading('9. Catálogo completo de casos de uso', { level: 1 });
  const stats = manifest.useCases.stats;
  doc.pills([
    ['Casos de uso', String(stats.total)],
    ['Módulos', String(stats.modules)],
    ['Atores', String(stats.atores)],
    ['Sistemas externos', String(stats.externos)],
    ['Com lacuna', String(stats.parciais)],
  ]);
  const ucRows = [];
  for (const m of manifest.useCases.modules) {
    ucRows.push({ group: m.title });
    for (const u of m.uc) {
      ucRows.push({
        cells: [
          u.id,
          u.flag ? `${u.name}   (!) ${u.flag}` : u.name,
          u.actors.map(shortActor).join(', ') + (u.ext ? ` + ${u.ext}` : ''),
          u.src,
        ],
      });
    }
  }
  doc.table(['ID', 'Caso de uso', 'Atores', 'Onde está no código'], ucRows, [7, 42, 18, 33]);

  /* --- permissões --- */
  doc.newPage(A4.portrait);
  record('sec-permissoes');
  doc.heading('10. Papéis e permissões por tela', { level: 1 });
  doc.paragraph('Como o app decide o que cada perfil vê e faz (lib/store.tsx + guardas em cada componente).');
  doc.table(manifest.permissions.head, manifest.permissions.rows, [40, 15, 15, 15, 15], { boldFirst: true });

  /* --- estados --- */
  record('sec-status');
  doc.heading('11. Máquina de estados do domínio', { level: 1 });
  doc.paragraph('Todos os estados previstos nos tipos do projeto e quem os movimenta.');
  doc.table(manifest.status.head, manifest.status.rows, [24, 42, 34], { boldFirst: true });

  /* --- lacunas --- */
  doc.newPage(A4.portrait);
  record('sec-lacunas');
  doc.heading('12. Lacunas e riscos encontrados no fluxo', { level: 1 });
  doc.paragraph('Pontos em que o caminho do usuário termina em tela vazia, em ação sem persistência ou em risco operacional.');
  for (const g of manifest.gaps) doc.card(`${g.t}  ·  ${g.tag}`, g.d, { accent: PALETTE.amber });

  /* --- arquivos --- */
  record('sec-arquivos');
  doc.heading('13. Arquivos-chave por fluxo', { level: 1 });
  doc.paragraph('Onde mexer para evoluir cada jornada.');
  doc.table(manifest.files.head, manifest.files.rows, [22, 40, 38], { boldFirst: true });

  /* --- manutenção --- */
  record('sec-manutencao');
  doc.heading('14. Manutenção deste documento', { level: 1 });
  doc.paragraph(
    'O PDF é gerado por script a partir do mesmo núcleo que produz o HTML — não edite os arquivos à mão. ' +
      'Ao mudar uma jornada, atualize scripts/lib/flowchart-core.mjs (fluxos) ou scripts/lib/usecase-core.mjs (casos de uso) e rode os geradores.'
  );
  doc.bullets([
    'node scripts/generate-user-flowchart.mjs ......... regenera fluxograma-usuario.html',
    'node scripts/generate-user-flowchart-pdf.mjs ..... regenera os dois PDFs desta pasta',
    'npm i -D @resvg/resvg-js ......................... rasterizador usado para embutir os diagramas',
  ]);
}

/* ------------------------------------------------------------------ *
 * 5. Execução (duas passagens para numerar o sumário)                 *
 * ------------------------------------------------------------------ */

/* ---------------- documento "Casos de uso" ---------------- */

function coverUseCases(doc, manifest, figures) {
  const { width: W, height: H } = A4.portrait;
  doc.newPageIfFresh(A4.portrait);
  doc.page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: PALETTE.dark });
  doc.page.drawRectangle({ x: 0, y: H - 6, width: W, height: 6, color: PALETTE.accent });

  doc.page.drawRectangle({ x: 52, y: H - 138, width: 46, height: 46, color: PALETTE.accent });
  doc.page.drawText('CM', { x: 60, y: H - 121, size: 20, font: doc.fonts.bold, color: PALETTE.white });

  doc.page.drawText('CoreMotiom', { x: 52, y: H - 204, size: 34, font: doc.fonts.bold, color: PALETTE.white });
  doc.page.drawText(pdfSafe('Diagrama e catálogo de'), {
    x: 52, y: H - 230, size: 15.5, font: doc.fonts.regular, color: PALETTE.amber,
  });
  doc.page.drawText(pdfSafe('casos de uso'), {
    x: 52, y: H - 250, size: 15.5, font: doc.fonts.regular, color: PALETTE.amber,
  });
  doc.page.drawText(pdfSafe('Tudo que a plataforma oferece: 48 casos de uso em 6 módulos funcionais.'), {
    x: 52, y: H - 288, size: 10.4, font: doc.fonts.regular, color: PALETTE.faint,
  });
  doc.page.drawText(pdfSafe(manifest.meta.stack), {
    x: 52, y: H - 306, size: 9.4, font: doc.fonts.regular, color: PALETTE.faint,
  });

  const st = manifest.useCases.stats;
  const stats = [
    [String(st.total), 'casos de uso'],
    [String(st.modules), 'módulos funcionais'],
    [String(st.atores), 'atores primários'],
    [String(st.externos), 'sistemas externos'],
  ];
  stats.forEach(([value, label], i) => {
    const x = 52 + i * 122;
    const y = H - 404;
    doc.page.drawRectangle({ x, y, width: 108, height: 66, color: PALETTE.darkSoft, borderColor: PALETTE.accent, borderWidth: 0.7 });
    doc.page.drawText(value, { x: x + 12, y: y + 34, size: 21, font: doc.fonts.bold, color: PALETTE.white });
    doc.page.drawText(pdfSafe(label), { x: x + 12, y: y + 18, size: 7.6, font: doc.fonts.regular, color: PALETTE.faint });
  });

  const stamp = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(new Date());
  doc.page.drawText(pdfSafe(`Gerado em ${stamp} a partir do código-fonte de ${manifest.meta.repo}`), {
    x: 52, y: 80, size: 8.4, font: doc.fonts.regular, color: PALETTE.faint,
  });
  doc.page.drawText(
    pdfSafe('Documento complementar a fluxograma-usuario.pdf, que detalha as jornadas passo a passo.'),
    { x: 52, y: 64, size: 8.4, font: doc.fonts.regular, color: PALETTE.faint }
  );
}

function tocEntriesUseCases() {
  return [
    { id: 'uc-atores', title: '1. Atores e sistemas externos', level: 1 },
    { id: 'uc-diagrama', title: '2. Diagrama de casos de uso', level: 1 },
    { id: 'uc-catalogo', title: '3. Catálogo completo (48 casos de uso)', level: 2 },
    { id: 'uc-resumo', title: '4. Resumo por módulo', level: 1 },
    { id: 'uc-lacunas', title: '5. Casos de uso com lacuna conhecida', level: 2 },
    { id: 'uc-manutencao', title: '6. Manutenção deste documento', level: 2 },
  ];
}

async function renderUseCaseStructure(doc, manifest, figures, record) {
  const uc = manifest.useCases;
  const figure = figures.find((f) => f.kind === 'usecase');
  const catalog = uc.modules.flatMap((m) => m.uc.map((u) => ({ ...u, module: m.title })));

  /* --- 1. atores e sistemas externos --- */
  doc.newPage(A4.portrait);
  record('uc-atores');
  sectionHeader(doc, {
    title: '1. Atores e sistemas externos',
    desc:
      'Atores primários são pessoas com papel definido no sistema; os sistemas externos participam de casos de uso específicos e aparecem tracejados em azul no diagrama.',
  });
  doc.heading('Atores primários', { level: 2 });
  doc.table(
    ['Ator', 'Papel no sistema', 'O que faz'],
    Object.entries(uc.actors).map(([key, a]) => [SHORT_ACTORS[key] || a.label, String(key), UC_ACTOR_INFO[key] || '']),
    [16, 12, 72],
    { boldFirst: true }
  );
  doc.heading('Sistemas externos', { level: 2 });
  doc.table(
    ['Sistema', 'Participação'],
    Object.entries(uc.externals).map(([key, e]) => [e.label, UC_EXTERNAL_INFO[key] || '']),
    [22, 78],
    { boldFirst: true }
  );

  /* --- 2. diagrama --- */
  record('uc-diagrama');
  doc.newPage(bestOrientation(figure.aspect, 92));
  doc.page.drawRectangle({ x: doc.margin, y: doc.height - doc.margin - 4, width: 3, height: 16, color: PALETTE.accent });
  doc.page.drawText(pdfSafe('2. Diagrama de casos de uso'), {
    x: doc.margin + 10, y: doc.height - doc.margin + 2, size: 12.6, font: doc.fonts.bold, color: PALETTE.ink,
  });
  doc.y = doc.height - doc.margin - 16;
  doc.paragraph(figure.desc, { size: 8.8, color: PALETTE.muted, after: 4 });
  doc.paragraph(
    'Legenda: atores primários nos corredores laterais · sistemas externos em azul tracejado · relações «include» em roxo · ponto âmbar = lacuna conhecida.',
    { size: 8, color: PALETTE.faint, after: 4 }
  );
  await doc.placeImage(figure.png, { maxHeight: doc.y - doc.margin - 44, cacheKey: 'usecase-doc' });

  /* --- 3. catálogo --- */
  doc.newPage(A4.portrait);
  record('uc-catalogo');
  doc.heading('3. Catálogo completo de casos de uso', { level: 1 });
  doc.pills([
    ['Casos de uso', String(uc.stats.total)],
    ['Módulos', String(uc.stats.modules)],
    ['Com lacuna', String(uc.stats.parciais)],
  ]);
  const rows = [];
  for (const m of uc.modules) {
    rows.push({ group: m.title });
    for (const u of m.uc) {
      rows.push({
        cells: [
          u.id,
          u.flag ? `${u.name}   (!) ${u.flag}` : u.name,
          u.actors.map(shortActor).join(', ') + (u.ext ? ` + ${u.ext}` : ''),
          u.src,
        ],
      });
    }
  }
  doc.table(['ID', 'Caso de uso', 'Atores', 'Onde está no código'], rows, [7, 42, 18, 33]);

  /* --- 4. resumo por módulo --- */
  doc.newPage(A4.portrait);
  record('uc-resumo');
  doc.heading('4. Resumo por módulo', { level: 1 });
  doc.paragraph('Distribuição dos casos de uso, atores envolvidos e lacunas conhecidas por módulo funcional.');
  doc.table(
    ['Módulo', 'UCs', 'Atores', 'Lacunas'],
    uc.modules.map((m) => [
      m.title,
      String(m.uc.length),
      m.actors.map((a) => SHORT_ACTORS[a] || a).join(', ') || 'Sistema',
      m.uc.filter((u) => u.flag).length ? `${m.uc.filter((u) => u.flag).length} (${m.uc.filter((u) => u.flag).map((u) => u.id).join(', ')})` : '—',
    ]),
    [30, 6, 24, 40],
    { boldFirst: true }
  );

  /* --- 5. lacunas --- */
  record('uc-lacunas');
  doc.heading('5. Casos de uso com lacuna conhecida', { level: 1 });
  doc.paragraph(
    'Comportamentos parciais ou inoperantes no código atual — os mesmos pontos marcados com (!) no catálogo e com ponto âmbar no diagrama.'
  );
  const flagged = catalog.filter((u) => u.flag);
  doc.table(
    ['ID', 'Caso de uso', 'Módulo', 'Lacuna'],
    flagged.map((u) => [u.id, u.name, u.module, u.flag]),
    [6, 30, 22, 42],
    { boldFirst: true }
  );

  /* --- 6. manutenção --- */
  record('uc-manutencao');
  doc.heading('6. Manutenção deste documento', { level: 1 });
  doc.paragraph(
    'Diagrama, estatísticas e catálogo são derivados de scripts/lib/usecase-core.mjs. Ao criar ou remover um caso de uso, ' +
      'edite a lista do módulo correspondente e rode os geradores — as contagens da capa, do catálogo e o diagrama se ajustam sozinhos.'
  );
  doc.bullets([
    'npm run flow .......................... regenera HTML, o PDF do fluxograma e este PDF de casos de uso',
    'FLOW_PDF_ONLY=casos npm run flow:pdf ... regenera apenas casos-de-uso.pdf',
  ]);
}

async function buildUseCaseDoc(manifest, figures, pageMap) {
  const doc = await PdfDoc.create({
    title: 'CoreMotiom — Casos de uso',
    subject: 'Diagrama e catálogo de casos de uso da plataforma CoreMotiom',
    footerLabel: `${manifest.meta.product} · Casos de uso`,
  });
  coverUseCases(doc, manifest, figures);
  tableOfContents(doc, TOC_ENTRIES, pageMap || {});
  await renderUseCaseStructure(doc, manifest, figures, (id) => {
    if (pageMap) pageMap[id] = doc.pages.length;
  });
  return doc;
}

function tocEntries(figures) {
  const ucNum = figures.find((f) => f.kind === 'usecase')?.num ?? 8;
  const entries = [{ id: 'sec-mapa', title: '1. Visão geral e mapa dos diagramas', level: 1 }];
  for (const f of figures.filter((x) => x.kind === 'flow')) {
    entries.push({ id: `fig-${f.num}`, title: `${f.num}. ${f.title}`, level: 2 });
  }
  entries.push({ id: 'sec-uc', title: `${ucNum}. Diagrama de casos de uso`, level: 1 });
  entries.push({ id: 'sec-catalogo', title: '9. Catálogo completo de casos de uso', level: 2 });
  entries.push({ id: 'sec-permissoes', title: '10. Papéis e permissões por tela', level: 1 });
  entries.push({ id: 'sec-status', title: '11. Máquina de estados do domínio', level: 2 });
  entries.push({ id: 'sec-lacunas', title: '12. Lacunas e riscos encontrados no fluxo', level: 1 });
  entries.push({ id: 'sec-arquivos', title: '13. Arquivos-chave por fluxo', level: 1 });
  entries.push({ id: 'sec-manutencao', title: '14. Manutenção deste documento', level: 2 });
  return entries;
}

async function build(manifest, figures, pageMap) {
  const doc = await PdfDoc.create({
    title: 'CoreMotiom — Fluxograma completo do usuário',
    subject: manifest.meta.doc,
    footerLabel: `${manifest.meta.product} · Fluxograma do usuário & casos de uso`,
  });
  cover(doc, manifest, figures);
  tableOfContents(doc, TOC_ENTRIES, pageMap || {});
  await renderStructure(doc, manifest, figures, (id) => {
    if (pageMap) pageMap[id] = doc.pages.length;
  });
  return doc;
}

async function main() {
  const manifest = ensureManifest();
  console.log('• rasterizando diagramas…');
  const figures = await renderFigures(manifest);
  fs.mkdirSync(path.dirname(OUT_PDF), { recursive: true });

  const pageCounts = {};

  if (ONLY !== 'casos') {
    TOC_ENTRIES.length = 0;
    TOC_ENTRIES.push(...tocEntries(figures));
    const pageMap = {};
    await build(manifest, figures, pageMap);            // passagem 1: mede as páginas
    const doc = await build(manifest, figures, pageMap); // passagem 2: sumário numerado
    await doc.stampFooters({ label: `${manifest.meta.product} · Fluxograma do usuário & casos de uso` });
    const bytes = await doc.save();
    fs.writeFileSync(OUT_PDF, bytes);
    pageCounts.main = doc.pages.length;
    console.log(
      `✓ Fluxograma/Diagrama C. De Uso/fluxograma-usuario.pdf gerado (${doc.pages.length} páginas, ${(bytes.length / 1024).toFixed(0)} KB)`
    );
  }

  if (ONLY !== 'fluxos') {
    TOC_ENTRIES.length = 0;
    TOC_ENTRIES.push(...tocEntriesUseCases());
    const ucPageMap = {};
    await buildUseCaseDoc(manifest, figures, ucPageMap);
    const doc = await buildUseCaseDoc(manifest, figures, ucPageMap);
    await doc.stampFooters({ label: `${manifest.meta.product} · Casos de uso` });
    const bytes = await doc.save();
    fs.writeFileSync(OUT_PDF_UC, bytes);
    pageCounts.uc = doc.pages.length;
    console.log(
      `✓ Fluxograma/Diagrama C. De Uso/casos-de-uso.pdf gerado (${doc.pages.length} páginas, ${(bytes.length / 1024).toFixed(0)} KB)`
    );
    console.log(`  sumário: ${Object.entries(ucPageMap).map(([k, v]) => `${k}=p${v}`).join(' · ')}`);
  }

  // sidecar usado pelos geradores de documentação mestre (não versionado)
  const sidecar = path.join(DOCS_DIR, '.flowchart-pages.json');
  const previous = fs.existsSync(sidecar) ? JSON.parse(fs.readFileSync(sidecar, 'utf8')) : {};
  fs.writeFileSync(sidecar, JSON.stringify({ ...previous, ...pageCounts, generatedAt: new Date().toISOString() }, null, 2));
}

main().catch((err) => {
  console.error('\n✗ ' + (process.env.PDF_DEBUG ? err.stack : err.message));
  process.exit(1);
});
```
