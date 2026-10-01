# MESTRE — Diagrama e Catálogo de Casos de Uso (CoreMotiom)

<!-- GERADO AUTOMATICAMENTE por scripts/generate-master-docs.mjs — não edite à mão.
     Fonte de verdade: scripts/lib/usecase-core.mjs (atores, 48 UC, layout UML e SVG).
     Para regenerar: npm run mestres -->

**Documento mestre autocontido.** Contém tudo o que um chat novo do Arena precisa para **recriar o diagrama
UML e o catálogo de casos de uso** do CoreMotiom — mesmo sem acesso ao repositório: o contexto do site (§3),
os 48 casos de uso em formato de dados (§4), as regras do layout UML (§5), a especificação das saídas (§2) e o
**código-fonte de referência completo** (Apêndice A).

- Produto documentado: **CoreMotiom** — `Next.js 15 · React 19 · TypeScript · Supabase / PostgreSQL · Tailwind CSS v4`
- Repositório de origem: `BIRFeuFeu/-CoreMotion`
- Gerado em: `1 de outubro de 2026`
- Artefatos de referência: `Fluxograma/Diagrama C. De Uso/fluxograma-usuario.html` (§8 e §9), `Fluxograma/Diagrama C. De Uso/casos-de-uso.pdf` (7 páginas) e o capítulo equivalente em `Fluxograma/Diagrama C. De Uso/fluxograma-usuario.pdf`
- Documento irmão: `Fluxograma/Diagrama C. De Uso/mestre-fluxograma.md` (os 7 fluxos de usuário + pipeline HTML/PDF compartilhado)

### Como usar este arquivo em um chat novo

1. Anexe **este arquivo** (idealmente junto de `Fluxograma/Diagrama C. De Uso/mestre-fluxograma.md`, que traz o dossiê completo do site
   e o kit de geração de PDF).
2. Cole o prompt abaixo.

```text
Você vai recriar o diagrama UML e o catálogo de casos de uso do CoreMotiom descritos no arquivo
MESTRE — Diagrama e Catálogo de Casos de Uso.
Regras:
1. Leia o §3 (contexto do site) e use os dados do §4 como fonte única: 6 módulos, 48 casos de uso, 4 atores
   primários e 5 sistemas externos. Não invente, não remova e não renumere casos de uso.
2. Produza: (a) um diagrama UML em SVG seguindo as regras de layout do §5 — faixas horizontais por módulo,
   atores em corredores laterais, zero associação cruzando módulo; (b) a seção de catálogo com uma linha por
   caso de uso (ID, nome, atores, arquivo de origem, lacuna); (c) as tabelas de atores/sistemas externos,
   resumo por módulo e lacunas.
3. Marque com ponto âmbar (diagrama) e "(!)" (catálogo) os casos com lacuna conhecida, conforme o §4.
4. Se o repositório estiver disponível, use o código do Apêndice A como referência exata e rode o gerador;
   se não estiver, reproduza o mesmo layout a partir da especificação do §5.
5. Ao final, valide pelo §8 e informe: nº de casos de uso por módulo, nº de lacunas e conflitos encontrados.
```

### Índice

| § | Conteúdo |
| --- | --- |
| 1 | Missão, entregáveis e critérios de aceitação |
| 2 | Especificação das saídas (HTML, PDF e PDF dedicado) |
| 3 | Contexto do site (papéis, módulos, integrações) |
| 4 | Dados autoritativos dos 48 casos de uso (JSON completo) |
| 5 | Regras do layout UML e da renderização |
| 6 | Catálogo completo, resumo por módulo e lacunas |
| 7 | Integração no pipeline (HTML/PDF) e reprodução |
| 8 | Validação |
| 9 | Manutenção |
| A | Código-fonte de referência (`usecase-core.mjs`) |
| B | Trechos de integração nos geradores |

---

## 1. Missão, entregáveis e critérios de aceitação

**Missão.** Modelar **tudo o que a plataforma oferece** como casos de uso UML, agrupados por módulo funcional,
com atores primários e sistemas externos, e expor esse modelo em três formatos: diagrama, catálogo e documento
imprimível. Casos parciais ou inoperantes no código atual são marcados como **lacuna conhecida**.

| Entregável | Onde vive | Conteúdo obrigatório |
| --- | --- | --- |
| **A. Seção do HTML** | `Fluxograma/Diagrama C. De Uso/fluxograma-usuario.html` §8 e §9 | Diagrama UML inline + catálogo com 48 linhas agrupadas por módulo |
| **B. Capítulo do PDF principal** | `Fluxograma/Diagrama C. De Uso/fluxograma-usuario.pdf` (páginas 12–15) | Diagrama em página própria + catálogo paginado |
| **C. PDF dedicado** | `Fluxograma/Diagrama C. De Uso/casos-de-uso.pdf` (7 páginas) | Capa, sumário, atores e sistemas externos, diagrama, catálogo, resumo por módulo, lacunas e manutenção |

**Critérios de aceitação** (validados no §8):

1. Exatamente **48 casos de uso** em **6 módulos**, com os IDs `UC01`–`UC48` preservados.
2. **4 atores primários** (visitante, atleta, lojista, admin) e **5 sistemas
   externos** (Google OAuth, Supabase Auth, PostgreSQL/RLS, Banco/PIX, Transportadora).
3. Cada caso de uso aponta o **arquivo real** onde está implementado (coluna “Onde está no código”).
4. Casos com lacuna: **9** marcados com ponto âmbar no diagrama e `(!)` no catálogo/tabelas.
5. Nenhuma associação de ator cruza uma faixa de módulo — o layout é determinístico e reproduzível.

---

## 2. Especificação das saídas

### 2.1 Seção do HTML (§8 e §9)

```html
<section class="card" id="casos-de-uso">
  <div class="card-head"><span class="num">8</span>
    <div><h2>Diagrama de casos de uso — tudo que a plataforma oferece</h2><p class="desc">Visão UML dos 48 casos de uso implementados, agrupados em 6 módulos funcionais, com atores primários (visitante, atleta, lojista, admin) e sistemas externos (Google OAuth, Supabase, PostgreSQL, banco/PIX e transportadora). Os identificadores UC correspondem ao catálogo completo logo abaixo.</p></div>
  </div>
  <div class="legend"><!-- chips dos 4 atores + 5 sistemas externos --></div>
  <div class="canvas" role="group" aria-label="…"><!-- SVG do diagrama --></div>
  <p class="hint">Cada pílula é um caso de uso (UC). Relações «include» aparecem tracejadas em roxo;
     integrações com sistemas externos, em azul; o ponto âmbar marca casos com lacuna conhecida.</p>
</section>

<section class="card" id="catalogo-uc">
  <h2 class="section-title">9. Catálogo completo de casos de uso</h2>
  <p class="sub">Os 48 casos de uso da plataforma, com atores envolvidos, arquivo responsável e lacunas conhecidas.</p>
  <div class="load-stats"><!-- 5 contadores: casos, módulos, atores, externos, parciais --></div>
  <div class="tbl-wrap"><table class="uc-table">
    <thead><tr><th>ID</th><th>Caso de uso</th><th>Atores</th><th>Onde está no código</th></tr></thead>
    <tbody><!-- linhas de grupo por módulo + 48 linhas --></tbody>
  </table></div>
</section>
```

- Linha de grupo: `<tr class="group"><td colspan="6">Nome do módulo</td></tr>`.
- Atores na tabela são **pontos coloridos** com `title` (nome do ator) + 1 ponto azul quando há sistema externo.
- Lacuna: `<span class="flag" title="motivo">⚠ motivo</span>` ao lado do nome.

### 2.2 Capítulo do PDF principal (gerado por `scripts/generate-user-flowchart-pdf.mjs`)

1. Página do diagrama: título “8. Diagrama de casos de uso”, descrição, legenda, imagem rasterizada do SVG
   (orientação escolhida pela proporção).
2. Catálogo: `pills` de contagem, tabela `ID · Caso de uso · Atores · Onde está no código` com linhas de grupo
   por módulo e flag `(!)` junto ao nome.

### 2.3 PDF dedicado (`Fluxograma/Diagrama C. De Uso/casos-de-uso.pdf`, 7 páginas)

| Página | Conteúdo |
| --- | --- |
| 1 | Capa escura: marca “CM”, título, subtítulo, stack, 4 cartões (48 casos · 6 módulos · 4 atores · 5 externos) e data |
| 2 | Sumário (6 entradas) |
| 3 | **1. Atores e sistemas externos** — duas tabelas: papel no sistema + o que faz; participação de cada integração |
| 4 | **2. Diagrama de casos de uso** — legenda + SVG rasterizado |
| 5–6 | **3. Catálogo completo** — 48 linhas com grupo por módulo, atores, arquivo e flag |
| 7 | **4. Resumo por módulo** · **5. Lacunas conhecidas** · **6. Manutenção deste documento** |

---

## 3. Contexto do site (o que o diagrama precisa representar)

**CoreMotiom** é uma plataforma e marketplace esportivo de alta performance com três ofertas — **B2C** (lojas
oficiais com selo verificado por CNPJ), **C2C** (atletas anunciando equipamentos seminovos) e **serviços &
comunidade** (feed social e assessoria com treinadores) —, além de um **painel administrativo executivo** com
custódia (escrow) e taxa de 4,5%.

> O dossiê completo do site (telas, componentes, services, API, banco, seeds, ambiente, 14 lacunas e mapa de
> arquivos) está no §3 de `Fluxograma/Diagrama C. De Uso/mestre-fluxograma.md`. Abaixo, o recorte necessário para os casos de uso.

### 3.1 Papéis e atores

| Ator (chave) | Papel técnico | O que faz no sistema |
| --- | --- | --- |
| **Visitante** (`visitante`) | sem sessão (`visitor`) | Navega, busca, filtra, curte publicações e **compra sem exigir conta** (pedido criado como `guest-user`) |
| **Atleta** (`atleta`) | `role: user` | Favorita produtos, anuncia equipamentos C2C, publica e comenta no feed, agenda treinadores e compra com custódia |
| **Lojista** (`lojista`) | `role: seller` | Cria e personaliza a loja oficial, mantém o catálogo B2C e solicita o selo de verificação por CNPJ |
| **Super Admin** (`admin`) | e-mails master | Acessa o painel executivo, homologa lojas, modera catálogo, gere usuários, pedidos e o banco |

E-mails master: `mattheusxmljz@gmail.com`, `professorchines2026@gmail.com`, `operacaoamd@gmail.com`,
`admin@coremotiom.com`.

### 3.2 Sistemas externos

| Sistema | Participação |
| --- | --- |
| **Google OAuth** | Login social por popup, com retorno em `/auth/callback` (`postMessage OAUTH_AUTH_SUCCESS`) |
| **Supabase Auth** | Cadastro/login por e-mail e senha, sessões e `onAuthStateChange` |
| **PostgreSQL (RLS)** | Banco com as 5 tabelas do domínio (`profiles`, `stores`, `products`, `orders`, `community_posts`) e 20 políticas RLS |
| **Banco / PIX** | Pagamento instantâneo com QR Code, copia-e-cola e **5% de desconto** no checkout |
| **Transportadora** | Cálculo de prazo e frete (SEDEX/PAC) exibido no checkout e na ficha do produto |

### 3.3 Módulos funcionais → o que existe no código

- **Conta & Acesso** — 8 UC (UC01–UC08) · atores: Visitante, Atleta (usuário)
  Cadastro (Atleta C2C / Lojista B2C), login por e-mail e senha, Google OAuth, acesso rápido de demonstração, troca de papel, perfil e logout.
- **Descoberta & Compra** — 10 UC (UC09–UC18) · atores: Visitante, Atleta (usuário)
  Descoberta no catálogo (busca, filtros, ficha, frete por CEP), favoritos, carrinho, checkout com PIX/cartão/boleto e acompanhamento de pedidos em custódia.
- **Oferta & Lojas** — 8 UC (UC19–UC26) · atores: Atleta (usuário), Lojista (vendedor)
  Publicação e gestão de anúncios C2C, criação da loja oficial e solicitação/obtenção do selo de loja verificada.
- **Comunidade & Serviços** — 7 UC (UC27–UC33) · atores: Atleta (usuário)
  Feed social com criação de post, curtidas e comentários, além do agendamento de treinadores.
- **Administração** — 9 UC (UC34–UC42) · atores: Super Admin
  Painel executivo: homologação de lojas, moderação de catálogo, gestão de usuários, pedidos/status e sincronização do Supabase.
- **Plataforma & Integrações** — 6 UC (UC43–UC48) · atores: Sistema
  Sessão Supabase, persistência em PostgreSQL com RLS, APIs internas, suporte a lojas verificadas e cálculo de frete.

---

## 4. Dados autoritativos dos 48 casos de uso

Formato de cada caso de uso:

| Campo | Significado |
| --- | --- |
| `id` | identificador estável `UC01`–`UC48` (use nos dois sentidos: catálogo ↔ diagrama) |
| `name` | nome do caso de uso (frase de ação, exatamente como exibida) |
| `src` | arquivo (ou arquivo · função) onde está implementado |
| `actors` | atores primários que iniciam/participam (chaves de `UC_ACTORS`); vazio = acionado por sistema ou por outro ator |
| `ext` | chave do sistema externo envolvido (opcional) |
| `flag` | lacuna conhecida (string curta: `sem tela`, `inoperante`, `placeholder`, `só memória`, `não persiste`, `sem UI`) |
| `include` | IDs de outros casos incluídos (relação UML «include») |

```json
{
  "diagram": {
    "id": "casos-de-uso",
    "num": 8,
    "title": "Diagrama de casos de uso — tudo que a plataforma oferece",
    "desc": "Visão UML dos 48 casos de uso implementados, agrupados em 6 módulos funcionais, com atores primários (visitante, atleta, lojista, admin) e sistemas externos (Google OAuth, Supabase, PostgreSQL, banco/PIX e transportadora). Os identificadores UC correspondem ao catálogo completo logo abaixo."
  },
  "stats": {
    "total": 48,
    "modules": 6,
    "atores": 4,
    "externos": 5,
    "parciais": 9
  },
  "actors": {
    "visitante": {
      "label": "Visitante",
      "actor": "visitante",
      "side": "left"
    },
    "atleta": {
      "label": "Atleta (usuário)",
      "actor": "atleta",
      "side": "left"
    },
    "lojista": {
      "label": "Lojista (vendedor)",
      "actor": "lojista",
      "side": "bottom"
    },
    "admin": {
      "label": "Super Admin",
      "actor": "admin",
      "side": "right"
    }
  },
  "externals": {
    "google": {
      "label": "Google OAuth",
      "actor": "sistema"
    },
    "supabaseAuth": {
      "label": "Supabase Auth",
      "actor": "sistema"
    },
    "postgres": {
      "label": "PostgreSQL (RLS)",
      "actor": "sistema"
    },
    "pix": {
      "label": "Banco / PIX",
      "actor": "sistema"
    },
    "correios": {
      "label": "Transportadora",
      "actor": "sistema"
    }
  },
  "modules": [
    {
      "id": "m-conta",
      "title": "Conta & Acesso",
      "col": 0,
      "row": 0,
      "actors": [
        "visitante",
        "atleta"
      ],
      "uc": [
        {
          "id": "UC01",
          "name": "Criar conta (Atleta C2C ou Lojista B2C)",
          "src": "components/AuthModal.tsx",
          "actors": [
            "visitante"
          ]
        },
        {
          "id": "UC02",
          "name": "Entrar com e-mail e senha",
          "src": "services/authService.ts",
          "actors": [
            "visitante"
          ]
        },
        {
          "id": "UC03",
          "name": "Entrar com Google (OAuth)",
          "src": "app/auth/callback/page.tsx",
          "actors": [
            "visitante"
          ],
          "ext": "google"
        },
        {
          "id": "UC04",
          "name": "Usar acesso rápido de demonstração",
          "src": "lib/store.tsx · switchRole()",
          "actors": [
            "visitante",
            "atleta"
          ]
        },
        {
          "id": "UC05",
          "name": "Simular outro papel (visitante/atleta/lojista/admin)",
          "src": "components/Sidebar.tsx",
          "actors": [
            "atleta"
          ]
        },
        {
          "id": "UC06",
          "name": "Editar perfil e interesses esportivos",
          "src": "lib/store.tsx · updateUserProfile()",
          "actors": [
            "atleta"
          ],
          "flag": "sem tela"
        },
        {
          "id": "UC07",
          "name": "Recuperar senha",
          "src": "components/AuthModal.tsx · modo forgot",
          "actors": [
            "visitante"
          ],
          "flag": "inoperante"
        },
        {
          "id": "UC08",
          "name": "Encerrar sessão (logout)",
          "src": "services/authService.ts · signOut()",
          "actors": [
            "atleta",
            "lojista",
            "admin"
          ]
        }
      ]
    },
    {
      "id": "m-compra",
      "title": "Descoberta & Compra",
      "col": 0,
      "row": 1,
      "actors": [
        "visitante",
        "atleta"
      ],
      "uc": [
        {
          "id": "UC09",
          "name": "Navegar pela Home e vitrines de destaque",
          "src": "components/HomeHeroAndHighlights.tsx",
          "actors": [
            "visitante"
          ]
        },
        {
          "id": "UC10",
          "name": "Buscar produtos no catálogo (⌘K)",
          "src": "components/Sidebar.tsx",
          "actors": [
            "visitante"
          ]
        },
        {
          "id": "UC11",
          "name": "Filtrar e ordenar catálogo (tipo, categoria, modalidade, condição, selo)",
          "src": "components/MarketplaceView.tsx",
          "actors": [
            "visitante"
          ]
        },
        {
          "id": "UC12",
          "name": "Ver ficha do produto (galeria, tamanhos, avaliação)",
          "src": "components/ProductDetailModal.tsx",
          "actors": [
            "visitante"
          ]
        },
        {
          "id": "UC13",
          "name": "Calcular frete por CEP",
          "src": "components/ProductDetailModal.tsx",
          "actors": [
            "visitante"
          ]
        },
        {
          "id": "UC14",
          "name": "Salvar produto nos favoritos",
          "src": "lib/store.tsx · toggleFavorite()",
          "actors": [
            "atleta"
          ],
          "flag": "sem tela"
        },
        {
          "id": "UC15",
          "name": "Gerenciar carrinho (quantidade, remover, subtotal)",
          "src": "components/CheckoutModal.tsx",
          "actors": [
            "visitante",
            "atleta"
          ]
        },
        {
          "id": "UC16",
          "name": "Finalizar compra (carrinho → entrega → pagamento)",
          "src": "components/CheckoutModal.tsx",
          "actors": [
            "visitante",
            "atleta"
          ],
          "include": [
            "UC15"
          ]
        },
        {
          "id": "UC17",
          "name": "Pagar com PIX, cartão ou boleto",
          "src": "lib/store.tsx · createOrder()",
          "actors": [
            "visitante",
            "atleta"
          ],
          "ext": "pix"
        },
        {
          "id": "UC18",
          "name": "Acompanhar pedidos e rastreio",
          "src": "lib/store.tsx · orders",
          "actors": [
            "atleta"
          ],
          "flag": "sem tela"
        }
      ]
    },
    {
      "id": "m-oferta",
      "title": "Oferta & Lojas",
      "col": 1,
      "row": 0,
      "actors": [
        "atleta",
        "lojista"
      ],
      "uc": [
        {
          "id": "UC19",
          "name": "Anunciar equipamento seminovo (C2C)",
          "src": "components/SellC2CView.tsx",
          "actors": [
            "atleta"
          ]
        },
        {
          "id": "UC20",
          "name": "Gerenciar meus anúncios (listar e excluir)",
          "src": "components/SellC2CView.tsx",
          "actors": [
            "atleta"
          ]
        },
        {
          "id": "UC21",
          "name": "Acompanhar vendas em custódia",
          "src": "components/SellC2CView.tsx",
          "actors": [
            "atleta"
          ],
          "flag": "placeholder"
        },
        {
          "id": "UC22",
          "name": "Salvar rascunho de anúncio",
          "src": "components/SellC2CView.tsx",
          "actors": [
            "atleta"
          ],
          "flag": "placeholder"
        },
        {
          "id": "UC23",
          "name": "Criar loja oficial (B2C)",
          "src": "components/CreateStoreModal.tsx",
          "actors": [
            "lojista"
          ]
        },
        {
          "id": "UC24",
          "name": "Exibir catálogo e perfil público da loja",
          "src": "components/StoresView.tsx",
          "actors": [
            "lojista",
            "visitante"
          ]
        },
        {
          "id": "UC25",
          "name": "Solicitar selo de loja verificada (CNPJ)",
          "src": "components/StoresView.tsx",
          "actors": [
            "lojista"
          ]
        },
        {
          "id": "UC26",
          "name": "Filtrar lojas verificadas",
          "src": "components/StoresView.tsx",
          "actors": [
            "visitante"
          ]
        }
      ]
    },
    {
      "id": "m-comunidade",
      "title": "Comunidade & Serviços",
      "col": 1,
      "row": 1,
      "actors": [
        "atleta"
      ],
      "uc": [
        {
          "id": "UC27",
          "name": "Publicar no feed da comunidade",
          "src": "components/CommunityView.tsx",
          "actors": [
            "atleta"
          ]
        },
        {
          "id": "UC28",
          "name": "Curtir publicação",
          "src": "services/communityService.ts",
          "actors": [
            "visitante"
          ]
        },
        {
          "id": "UC29",
          "name": "Comentar publicação",
          "src": "components/CommunityView.tsx",
          "actors": [
            "atleta"
          ]
        },
        {
          "id": "UC30",
          "name": "Filtrar feed por categoria",
          "src": "components/CommunityView.tsx",
          "actors": [
            "visitante"
          ]
        },
        {
          "id": "UC31",
          "name": "Denunciar publicação para moderação",
          "src": "lib/store.tsx · reportCommunityPost()",
          "actors": [
            "atleta"
          ],
          "flag": "sem UI"
        },
        {
          "id": "UC32",
          "name": "Buscar treinador por modalidade",
          "src": "components/CoachesView.tsx",
          "actors": [
            "visitante"
          ]
        },
        {
          "id": "UC33",
          "name": "Agendar assessoria esportiva",
          "src": "components/CoachesView.tsx",
          "actors": [
            "atleta"
          ],
          "flag": "não persiste"
        }
      ]
    },
    {
      "id": "m-admin",
      "title": "Administração",
      "col": 2,
      "row": 0,
      "actors": [
        "admin"
      ],
      "uc": [
        {
          "id": "UC34",
          "name": "Acessar painel executivo master",
          "src": "components/AdminDashboard.tsx",
          "actors": [
            "admin"
          ]
        },
        {
          "id": "UC35",
          "name": "Ver métricas (GMV, custódia 4,5%, B2C × C2C)",
          "src": "components/AdminDashboard.tsx",
          "actors": [
            "admin"
          ]
        },
        {
          "id": "UC36",
          "name": "Auditar loja: aprovar ou recusar selo",
          "src": "lib/store.tsx · adminVerifyStore()",
          "actors": [
            "admin"
          ]
        },
        {
          "id": "UC37",
          "name": "Moderar catálogo (status e exclusão)",
          "src": "lib/store.tsx · adminToggleProductStatus()",
          "actors": [
            "admin"
          ]
        },
        {
          "id": "UC38",
          "name": "Gerenciar usuários (criar, papel, banir, excluir)",
          "src": "app/api/users/route.ts",
          "actors": [
            "admin"
          ]
        },
        {
          "id": "UC39",
          "name": "Atualizar status de pedidos e pagamentos",
          "src": "lib/store.tsx · adminUpdateOrderStatus()",
          "actors": [
            "admin"
          ],
          "flag": "só memória"
        },
        {
          "id": "UC40",
          "name": "Confirmar pagamento em sandbox",
          "src": "services/orderService.ts",
          "actors": [
            "admin"
          ]
        },
        {
          "id": "UC41",
          "name": "Sincronizar dados com Supabase",
          "src": "lib/store.tsx · adminSyncSupabase()",
          "actors": [
            "admin"
          ]
        },
        {
          "id": "UC42",
          "name": "Diagnosticar banco e abrir console SQL",
          "src": "components/SupabaseConfigModal.tsx",
          "actors": [
            "admin"
          ]
        }
      ]
    },
    {
      "id": "m-plataforma",
      "title": "Plataforma & Integrações",
      "col": 2,
      "row": 1,
      "actors": [],
      "uc": [
        {
          "id": "UC43",
          "name": "Autenticar contas no Supabase Auth",
          "src": "services/supabaseClient.ts",
          "actors": [],
          "ext": "supabaseAuth"
        },
        {
          "id": "UC44",
          "name": "Persistir dados em PostgreSQL com RLS",
          "src": "lib/db-queries.ts",
          "actors": [],
          "ext": "postgres"
        },
        {
          "id": "UC45",
          "name": "Expor API Routes internas (produtos, lojas, usuários)",
          "src": "app/api/*",
          "actors": []
        },
        {
          "id": "UC46",
          "name": "Servir imagens do catálogo",
          "src": "public/products/*",
          "actors": []
        },
        {
          "id": "UC47",
          "name": "Operar em modo offline com dados iniciais",
          "src": "lib/initial-data.ts",
          "actors": []
        },
        {
          "id": "UC48",
          "name": "Consultar prazo e frete da transportadora",
          "src": "components/ProductDetailModal.tsx",
          "actors": [],
          "ext": "correios"
        }
      ]
    }
  ]
}
```

Listas de apoio (papel por ator e descrição longa das integrações):

```json
{
  "actorInfo": {
    "visitante": "Navega, busca, filtra, curte publicações e compra sem exigir conta (pedido criado como \"guest-user\").",
    "atleta": "Papel \"user\": favorita produtos, anuncia equipamentos C2C, publica e comenta no feed, agenda treinadores e compra com custódia.",
    "lojista": "Papel \"seller\": cria e personaliza a loja oficial, mantém o catálogo B2C e solicita o selo de verificação por CNPJ.",
    "admin": "E-mails master autorizados: acessa o painel executivo, homologa lojas, modera catálogo, gere usuários, pedidos e o banco."
  },
  "externalInfo": {
    "google": "Provedor de identidade do login social (popup + retorno em /auth/callback).",
    "supabaseAuth": "Serviço de autenticação: e-mail/senha, OAuth Google, sessões e callback.",
    "postgres": "Banco relacional com RLS: profiles, stores, products, orders e community_posts.",
    "pix": "Meio de pagamento instantâneo com QR Code, copia-e-cola e desconto de 5%.",
    "correios": "Cálculo de prazo e frete (SEDEX/PAC) apresentado no checkout e na ficha do produto."
  },
  "catalog": [
    {
      "module": "Conta & Acesso",
      "id": "UC01",
      "name": "Criar conta (Atleta C2C ou Lojista B2C)",
      "actors": [
        "visitante"
      ],
      "external": "",
      "src": "components/AuthModal.tsx",
      "flag": "",
      "include": []
    },
    {
      "module": "Conta & Acesso",
      "id": "UC02",
      "name": "Entrar com e-mail e senha",
      "actors": [
        "visitante"
      ],
      "external": "",
      "src": "services/authService.ts",
      "flag": "",
      "include": []
    },
    {
      "module": "Conta & Acesso",
      "id": "UC03",
      "name": "Entrar com Google (OAuth)",
      "actors": [
        "visitante"
      ],
      "external": "Google OAuth",
      "src": "app/auth/callback/page.tsx",
      "flag": "",
      "include": []
    },
    {
      "module": "Conta & Acesso",
      "id": "UC04",
      "name": "Usar acesso rápido de demonstração",
      "actors": [
        "visitante",
        "atleta"
      ],
      "external": "",
      "src": "lib/store.tsx · switchRole()",
      "flag": "",
      "include": []
    },
    {
      "module": "Conta & Acesso",
      "id": "UC05",
      "name": "Simular outro papel (visitante/atleta/lojista/admin)",
      "actors": [
        "atleta"
      ],
      "external": "",
      "src": "components/Sidebar.tsx",
      "flag": "",
      "include": []
    },
    {
      "module": "Conta & Acesso",
      "id": "UC06",
      "name": "Editar perfil e interesses esportivos",
      "actors": [
        "atleta"
      ],
      "external": "",
      "src": "lib/store.tsx · updateUserProfile()",
      "flag": "sem tela",
      "include": []
    },
    {
      "module": "Conta & Acesso",
      "id": "UC07",
      "name": "Recuperar senha",
      "actors": [
        "visitante"
      ],
      "external": "",
      "src": "components/AuthModal.tsx · modo forgot",
      "flag": "inoperante",
      "include": []
    },
    {
      "module": "Conta & Acesso",
      "id": "UC08",
      "name": "Encerrar sessão (logout)",
      "actors": [
        "atleta",
        "lojista",
        "admin"
      ],
      "external": "",
      "src": "services/authService.ts · signOut()",
      "flag": "",
      "include": []
    },
    {
      "module": "Descoberta & Compra",
      "id": "UC09",
      "name": "Navegar pela Home e vitrines de destaque",
      "actors": [
        "visitante"
      ],
      "external": "",
      "src": "components/HomeHeroAndHighlights.tsx",
      "flag": "",
      "include": []
    },
    {
      "module": "Descoberta & Compra",
      "id": "UC10",
      "name": "Buscar produtos no catálogo (⌘K)",
      "actors": [
        "visitante"
      ],
      "external": "",
      "src": "components/Sidebar.tsx",
      "flag": "",
      "include": []
    },
    {
      "module": "Descoberta & Compra",
      "id": "UC11",
      "name": "Filtrar e ordenar catálogo (tipo, categoria, modalidade, condição, selo)",
      "actors": [
        "visitante"
      ],
      "external": "",
      "src": "components/MarketplaceView.tsx",
      "flag": "",
      "include": []
    },
    {
      "module": "Descoberta & Compra",
      "id": "UC12",
      "name": "Ver ficha do produto (galeria, tamanhos, avaliação)",
      "actors": [
        "visitante"
      ],
      "external": "",
      "src": "components/ProductDetailModal.tsx",
      "flag": "",
      "include": []
    },
    {
      "module": "Descoberta & Compra",
      "id": "UC13",
      "name": "Calcular frete por CEP",
      "actors": [
        "visitante"
      ],
      "external": "",
      "src": "components/ProductDetailModal.tsx",
      "flag": "",
      "include": []
    },
    {
      "module": "Descoberta & Compra",
      "id": "UC14",
      "name": "Salvar produto nos favoritos",
      "actors": [
        "atleta"
      ],
      "external": "",
      "src": "lib/store.tsx · toggleFavorite()",
      "flag": "sem tela",
      "include": []
    },
    {
      "module": "Descoberta & Compra",
      "id": "UC15",
      "name": "Gerenciar carrinho (quantidade, remover, subtotal)",
      "actors": [
        "visitante",
        "atleta"
      ],
      "external": "",
      "src": "components/CheckoutModal.tsx",
      "flag": "",
      "include": []
    },
    {
      "module": "Descoberta & Compra",
      "id": "UC16",
      "name": "Finalizar compra (carrinho → entrega → pagamento)",
      "actors": [
        "visitante",
        "atleta"
      ],
      "external": "",
      "src": "components/CheckoutModal.tsx",
      "flag": "",
      "include": [
        "UC15"
      ]
    },
    {
      "module": "Descoberta & Compra",
      "id": "UC17",
      "name": "Pagar com PIX, cartão ou boleto",
      "actors": [
        "visitante",
        "atleta"
      ],
      "external": "Banco / PIX",
      "src": "lib/store.tsx · createOrder()",
      "flag": "",
      "include": []
    },
    {
      "module": "Descoberta & Compra",
      "id": "UC18",
      "name": "Acompanhar pedidos e rastreio",
      "actors": [
        "atleta"
      ],
      "external": "",
      "src": "lib/store.tsx · orders",
      "flag": "sem tela",
      "include": []
    },
    {
      "module": "Oferta & Lojas",
      "id": "UC19",
      "name": "Anunciar equipamento seminovo (C2C)",
      "actors": [
        "atleta"
      ],
      "external": "",
      "src": "components/SellC2CView.tsx",
      "flag": "",
      "include": []
    },
    {
      "module": "Oferta & Lojas",
      "id": "UC20",
      "name": "Gerenciar meus anúncios (listar e excluir)",
      "actors": [
        "atleta"
      ],
      "external": "",
      "src": "components/SellC2CView.tsx",
      "flag": "",
      "include": []
    },
    {
      "module": "Oferta & Lojas",
      "id": "UC21",
      "name": "Acompanhar vendas em custódia",
      "actors": [
        "atleta"
      ],
      "external": "",
      "src": "components/SellC2CView.tsx",
      "flag": "placeholder",
      "include": []
    },
    {
      "module": "Oferta & Lojas",
      "id": "UC22",
      "name": "Salvar rascunho de anúncio",
      "actors": [
        "atleta"
      ],
      "external": "",
      "src": "components/SellC2CView.tsx",
      "flag": "placeholder",
      "include": []
    },
    {
      "module": "Oferta & Lojas",
      "id": "UC23",
      "name": "Criar loja oficial (B2C)",
      "actors": [
        "lojista"
      ],
      "external": "",
      "src": "components/CreateStoreModal.tsx",
      "flag": "",
      "include": []
    },
    {
      "module": "Oferta & Lojas",
      "id": "UC24",
      "name": "Exibir catálogo e perfil público da loja",
      "actors": [
        "lojista",
        "visitante"
      ],
      "external": "",
      "src": "components/StoresView.tsx",
      "flag": "",
      "include": []
    },
    {
      "module": "Oferta & Lojas",
      "id": "UC25",
      "name": "Solicitar selo de loja verificada (CNPJ)",
      "actors": [
        "lojista"
      ],
      "external": "",
      "src": "components/StoresView.tsx",
      "flag": "",
      "include": []
    },
    {
      "module": "Oferta & Lojas",
      "id": "UC26",
      "name": "Filtrar lojas verificadas",
      "actors": [
        "visitante"
      ],
      "external": "",
      "src": "components/StoresView.tsx",
      "flag": "",
      "include": []
    },
    {
      "module": "Comunidade & Serviços",
      "id": "UC27",
      "name": "Publicar no feed da comunidade",
      "actors": [
        "atleta"
      ],
      "external": "",
      "src": "components/CommunityView.tsx",
      "flag": "",
      "include": []
    },
    {
      "module": "Comunidade & Serviços",
      "id": "UC28",
      "name": "Curtir publicação",
      "actors": [
        "visitante"
      ],
      "external": "",
      "src": "services/communityService.ts",
      "flag": "",
      "include": []
    },
    {
      "module": "Comunidade & Serviços",
      "id": "UC29",
      "name": "Comentar publicação",
      "actors": [
        "atleta"
      ],
      "external": "",
      "src": "components/CommunityView.tsx",
      "flag": "",
      "include": []
    },
    {
      "module": "Comunidade & Serviços",
      "id": "UC30",
      "name": "Filtrar feed por categoria",
      "actors": [
        "visitante"
      ],
      "external": "",
      "src": "components/CommunityView.tsx",
      "flag": "",
      "include": []
    },
    {
      "module": "Comunidade & Serviços",
      "id": "UC31",
      "name": "Denunciar publicação para moderação",
      "actors": [
        "atleta"
      ],
      "external": "",
      "src": "lib/store.tsx · reportCommunityPost()",
      "flag": "sem UI",
      "include": []
    },
    {
      "module": "Comunidade & Serviços",
      "id": "UC32",
      "name": "Buscar treinador por modalidade",
      "actors": [
        "visitante"
      ],
      "external": "",
      "src": "components/CoachesView.tsx",
      "flag": "",
      "include": []
    },
    {
      "module": "Comunidade & Serviços",
      "id": "UC33",
      "name": "Agendar assessoria esportiva",
      "actors": [
        "atleta"
      ],
      "external": "",
      "src": "components/CoachesView.tsx",
      "flag": "não persiste",
      "include": []
    },
    {
      "module": "Administração",
      "id": "UC34",
      "name": "Acessar painel executivo master",
      "actors": [
        "admin"
      ],
      "external": "",
      "src": "components/AdminDashboard.tsx",
      "flag": "",
      "include": []
    },
    {
      "module": "Administração",
      "id": "UC35",
      "name": "Ver métricas (GMV, custódia 4,5%, B2C × C2C)",
      "actors": [
        "admin"
      ],
      "external": "",
      "src": "components/AdminDashboard.tsx",
      "flag": "",
      "include": []
    },
    {
      "module": "Administração",
      "id": "UC36",
      "name": "Auditar loja: aprovar ou recusar selo",
      "actors": [
        "admin"
      ],
      "external": "",
      "src": "lib/store.tsx · adminVerifyStore()",
      "flag": "",
      "include": []
    },
    {
      "module": "Administração",
      "id": "UC37",
      "name": "Moderar catálogo (status e exclusão)",
      "actors": [
        "admin"
      ],
      "external": "",
      "src": "lib/store.tsx · adminToggleProductStatus()",
      "flag": "",
      "include": []
    },
    {
      "module": "Administração",
      "id": "UC38",
      "name": "Gerenciar usuários (criar, papel, banir, excluir)",
      "actors": [
        "admin"
      ],
      "external": "",
      "src": "app/api/users/route.ts",
      "flag": "",
      "include": []
    },
    {
      "module": "Administração",
      "id": "UC39",
      "name": "Atualizar status de pedidos e pagamentos",
      "actors": [
        "admin"
      ],
      "external": "",
      "src": "lib/store.tsx · adminUpdateOrderStatus()",
      "flag": "só memória",
      "include": []
    },
    {
      "module": "Administração",
      "id": "UC40",
      "name": "Confirmar pagamento em sandbox",
      "actors": [
        "admin"
      ],
      "external": "",
      "src": "services/orderService.ts",
      "flag": "",
      "include": []
    },
    {
      "module": "Administração",
      "id": "UC41",
      "name": "Sincronizar dados com Supabase",
      "actors": [
        "admin"
      ],
      "external": "",
      "src": "lib/store.tsx · adminSyncSupabase()",
      "flag": "",
      "include": []
    },
    {
      "module": "Administração",
      "id": "UC42",
      "name": "Diagnosticar banco e abrir console SQL",
      "actors": [
        "admin"
      ],
      "external": "",
      "src": "components/SupabaseConfigModal.tsx",
      "flag": "",
      "include": []
    },
    {
      "module": "Plataforma & Integrações",
      "id": "UC43",
      "name": "Autenticar contas no Supabase Auth",
      "actors": [],
      "external": "Supabase Auth",
      "src": "services/supabaseClient.ts",
      "flag": "",
      "include": []
    },
    {
      "module": "Plataforma & Integrações",
      "id": "UC44",
      "name": "Persistir dados em PostgreSQL com RLS",
      "actors": [],
      "external": "PostgreSQL (RLS)",
      "src": "lib/db-queries.ts",
      "flag": "",
      "include": []
    },
    {
      "module": "Plataforma & Integrações",
      "id": "UC45",
      "name": "Expor API Routes internas (produtos, lojas, usuários)",
      "actors": [],
      "external": "",
      "src": "app/api/*",
      "flag": "",
      "include": []
    },
    {
      "module": "Plataforma & Integrações",
      "id": "UC46",
      "name": "Servir imagens do catálogo",
      "actors": [],
      "external": "",
      "src": "public/products/*",
      "flag": "",
      "include": []
    },
    {
      "module": "Plataforma & Integrações",
      "id": "UC47",
      "name": "Operar em modo offline com dados iniciais",
      "actors": [],
      "external": "",
      "src": "lib/initial-data.ts",
      "flag": "",
      "include": []
    },
    {
      "module": "Plataforma & Integrações",
      "id": "UC48",
      "name": "Consultar prazo e frete da transportadora",
      "actors": [],
      "external": "Transportadora",
      "src": "components/ProductDetailModal.tsx",
      "flag": "",
      "include": []
    }
  ]
}
```

---

## 5. Regras do layout UML e da renderização

### 5.1 Estrutura visual

1. **Fronteira do sistema**: retângulo grande (`boundary`) com o título “CoreMotiom — Sistema de Marketplace
   Esportivo” e a assinatura `UML® 2.5 · caso de uso` no canto.
2. **Faixas horizontais**: **uma faixa por módulo**, empilhadas de cima para baixo na ordem do §4, cada uma com
   o cabeçalho do módulo (`38 px`) e fundo levemente destacado.
3. **Pílulas**: cada caso de uso é uma pílula arredondada com o ID em destaque (mono, menor) e o nome quebrado
   em até 2 linhas. As pílulas ficam em **duas colunas** dentro da faixa.
4. **Corredores de atores**: à **esquerda** da fronteira ficam visitante, atleta e lojista; à **direita**,
   o super admin; os **sistemas externos** ficam ainda mais à direita, empilhados.
5. **Associações**: linha sólida ligando ator ↔ pílula. Para não cruzar módulos, a linha desce pelo **corredor
   vertical** (`actorSpineX = 158`) e entra na faixa pela lateral, terminando em um pequeno “elbow”.
6. **«include»**: seta tracejada **roxa** entre pílulas do mesmo módulo (ex.: `UC16 → UC15`).
7. **Sistemas externos**: associação **tracejada azul** até a pílula (ex.: `UC03 → Google`, `UC17 → Banco/PIX`).
8. **Lacunas**: **ponto âmbar** ao lado da pílula dos casos com `flag` + linha “X casos com lacuna conhecida” na legenda.

### 5.2 Geometria e algoritmo (valores normativos)

| Constante | Valor | Papel |
| --- | --- | --- |
| `bandW` | 1140 | largura útil da faixa de módulo |
| `laneLeft` | 244 | X do início da fronteira (corredor esquerdo) |
| `boundaryPad` | 26 | respiro entre fronteira e faixas |
| `bandHeaderH` | 38 | altura do cabeçalho de cada módulo |
| `colGap` | 44 | espaço entre as duas colunas de pílulas |
| `pillH` / `pillGap` | 38 / 9 | altura mínima da pílula e espaço vertical entre pílulas |
| `bandGap` | 26 | espaço entre faixas |
| `top` | 104 | Y do topo da fronteira (abaixo da legenda) |
| `actorSpineX` / `actorIconX` | 158 / 96 | X do corredor vertical e do ícone do ator |
| `itemFont` / `idFont` | 11.8 / 8.8 | corpo do nome do UC e do identificador |

**Algoritmo** (reproduza nesta ordem):

1. **Medição**: para cada módulo, quebre o nome de cada UC com largura `bandW/2 − 76`; a altura da pílula é
   `max(pillH, 16 + linhas × 14,6)`; a altura da faixa é `bandHeaderH + max(alturaColunaL, alturaColunaR) + 16`.
2. **Distribuição em colunas** (`splitColumns`): casos com `ext` vão para a **direita**; casos com `include`
   seguem a coluna do caso incluído; os demais preenchem alternadamente a coluna com menos itens.
3. **Empilhamento das faixas**: `y` começa em `top + boundaryPad + 4`; cada faixa avança `altura + bandGap`.
4. **Posicionamento dos atores** (`spread`): cada ator tem um `desiredY` (centro da faixa que ele mais usa) e é
   empurrado para baixo até respeitar um espaçamento mínimo — **112 px** para atores primários e **92 px** para
   sistemas externos —, evitando sobreposição de ícones/rótulos.
5. **Roteamento**: associação sai do ícone do ator na horizontal, desce/sobe pelo corredor (`actorSpineX`),
   entra na faixa e faz um “elbow” até a lateral da pílula; «include» sai da borda direita da pílula de origem.
6. **Moldura final**: `width = boundaryRight + 300` (espaço para os externos) e `height` = fundo da última faixa
   + respiro; `viewBox` com padding; fundo `CANVAS_BG` + grade sutil; legenda no topo com 4 marcadores.

### 5.3 Estilo

- Fundo `#0B0C10` com grade; fronteira `#1C1633`/`#A78BFA` (roxo UML); faixas com cabeçalho em caixa alta e
  fundo `#12151C`.
- Cores por ator (mesma paleta do fluxograma): visitante cinza `#8B93A7`, atleta verde `#34D399`, lojista azul
  `#38BDF8`, admin vermelho `#F87171`, externos azuis tracejados, ponto de lacuna âmbar `#FBBF24`.
- Tipografia sem serifa, títulos em negrito; IDs em fonte monoespaçada; textos sempre escapados.

---

## 6. Catálogo completo, resumo por módulo e lacunas

### 6.1 Catálogo (48 casos de uso)

| ID | Caso de uso | Módulo | Atores | Sistema externo | Onde está no código | Lacuna |
| --- | --- | --- | --- | --- | --- | --- |
| `UC01` | Criar conta (Atleta C2C ou Lojista B2C) | Conta & Acesso | Visitante | — | `components/AuthModal.tsx` | — |
| `UC02` | Entrar com e-mail e senha | Conta & Acesso | Visitante | — | `services/authService.ts` | — |
| `UC03` | Entrar com Google (OAuth) | Conta & Acesso | Visitante | Google OAuth | `app/auth/callback/page.tsx` | — |
| `UC04` | Usar acesso rápido de demonstração | Conta & Acesso | Visitante, Atleta (usuário) | — | `lib/store.tsx · switchRole()` | — |
| `UC05` | Simular outro papel (visitante/atleta/lojista/admin) | Conta & Acesso | Atleta (usuário) | — | `components/Sidebar.tsx` | — |
| `UC06` | Editar perfil e interesses esportivos | Conta & Acesso | Atleta (usuário) | — | `lib/store.tsx · updateUserProfile()` | (!) sem tela |
| `UC07` | Recuperar senha | Conta & Acesso | Visitante | — | `components/AuthModal.tsx · modo forgot` | (!) inoperante |
| `UC08` | Encerrar sessão (logout) | Conta & Acesso | Atleta (usuário), Lojista (vendedor), Super Admin | — | `services/authService.ts · signOut()` | — |
| `UC09` | Navegar pela Home e vitrines de destaque | Descoberta & Compra | Visitante | — | `components/HomeHeroAndHighlights.tsx` | — |
| `UC10` | Buscar produtos no catálogo (⌘K) | Descoberta & Compra | Visitante | — | `components/Sidebar.tsx` | — |
| `UC11` | Filtrar e ordenar catálogo (tipo, categoria, modalidade, condição, selo) | Descoberta & Compra | Visitante | — | `components/MarketplaceView.tsx` | — |
| `UC12` | Ver ficha do produto (galeria, tamanhos, avaliação) | Descoberta & Compra | Visitante | — | `components/ProductDetailModal.tsx` | — |
| `UC13` | Calcular frete por CEP | Descoberta & Compra | Visitante | — | `components/ProductDetailModal.tsx` | — |
| `UC14` | Salvar produto nos favoritos | Descoberta & Compra | Atleta (usuário) | — | `lib/store.tsx · toggleFavorite()` | (!) sem tela |
| `UC15` | Gerenciar carrinho (quantidade, remover, subtotal) | Descoberta & Compra | Visitante, Atleta (usuário) | — | `components/CheckoutModal.tsx` | — |
| `UC16` | Finalizar compra (carrinho → entrega → pagamento) | Descoberta & Compra | Visitante, Atleta (usuário) | — | `components/CheckoutModal.tsx` | — |
| `UC17` | Pagar com PIX, cartão ou boleto | Descoberta & Compra | Visitante, Atleta (usuário) | Banco / PIX | `lib/store.tsx · createOrder()` | — |
| `UC18` | Acompanhar pedidos e rastreio | Descoberta & Compra | Atleta (usuário) | — | `lib/store.tsx · orders` | (!) sem tela |
| `UC19` | Anunciar equipamento seminovo (C2C) | Oferta & Lojas | Atleta (usuário) | — | `components/SellC2CView.tsx` | — |
| `UC20` | Gerenciar meus anúncios (listar e excluir) | Oferta & Lojas | Atleta (usuário) | — | `components/SellC2CView.tsx` | — |
| `UC21` | Acompanhar vendas em custódia | Oferta & Lojas | Atleta (usuário) | — | `components/SellC2CView.tsx` | (!) placeholder |
| `UC22` | Salvar rascunho de anúncio | Oferta & Lojas | Atleta (usuário) | — | `components/SellC2CView.tsx` | (!) placeholder |
| `UC23` | Criar loja oficial (B2C) | Oferta & Lojas | Lojista (vendedor) | — | `components/CreateStoreModal.tsx` | — |
| `UC24` | Exibir catálogo e perfil público da loja | Oferta & Lojas | Lojista (vendedor), Visitante | — | `components/StoresView.tsx` | — |
| `UC25` | Solicitar selo de loja verificada (CNPJ) | Oferta & Lojas | Lojista (vendedor) | — | `components/StoresView.tsx` | — |
| `UC26` | Filtrar lojas verificadas | Oferta & Lojas | Visitante | — | `components/StoresView.tsx` | — |
| `UC27` | Publicar no feed da comunidade | Comunidade & Serviços | Atleta (usuário) | — | `components/CommunityView.tsx` | — |
| `UC28` | Curtir publicação | Comunidade & Serviços | Visitante | — | `services/communityService.ts` | — |
| `UC29` | Comentar publicação | Comunidade & Serviços | Atleta (usuário) | — | `components/CommunityView.tsx` | — |
| `UC30` | Filtrar feed por categoria | Comunidade & Serviços | Visitante | — | `components/CommunityView.tsx` | — |
| `UC31` | Denunciar publicação para moderação | Comunidade & Serviços | Atleta (usuário) | — | `lib/store.tsx · reportCommunityPost()` | (!) sem UI |
| `UC32` | Buscar treinador por modalidade | Comunidade & Serviços | Visitante | — | `components/CoachesView.tsx` | — |
| `UC33` | Agendar assessoria esportiva | Comunidade & Serviços | Atleta (usuário) | — | `components/CoachesView.tsx` | (!) não persiste |
| `UC34` | Acessar painel executivo master | Administração | Super Admin | — | `components/AdminDashboard.tsx` | — |
| `UC35` | Ver métricas (GMV, custódia 4,5%, B2C × C2C) | Administração | Super Admin | — | `components/AdminDashboard.tsx` | — |
| `UC36` | Auditar loja: aprovar ou recusar selo | Administração | Super Admin | — | `lib/store.tsx · adminVerifyStore()` | — |
| `UC37` | Moderar catálogo (status e exclusão) | Administração | Super Admin | — | `lib/store.tsx · adminToggleProductStatus()` | — |
| `UC38` | Gerenciar usuários (criar, papel, banir, excluir) | Administração | Super Admin | — | `app/api/users/route.ts` | — |
| `UC39` | Atualizar status de pedidos e pagamentos | Administração | Super Admin | — | `lib/store.tsx · adminUpdateOrderStatus()` | (!) só memória |
| `UC40` | Confirmar pagamento em sandbox | Administração | Super Admin | — | `services/orderService.ts` | — |
| `UC41` | Sincronizar dados com Supabase | Administração | Super Admin | — | `lib/store.tsx · adminSyncSupabase()` | — |
| `UC42` | Diagnosticar banco e abrir console SQL | Administração | Super Admin | — | `components/SupabaseConfigModal.tsx` | — |
| `UC43` | Autenticar contas no Supabase Auth | Plataforma & Integrações | — | Supabase Auth | `services/supabaseClient.ts` | — |
| `UC44` | Persistir dados em PostgreSQL com RLS | Plataforma & Integrações | — | PostgreSQL (RLS) | `lib/db-queries.ts` | — |
| `UC45` | Expor API Routes internas (produtos, lojas, usuários) | Plataforma & Integrações | — | — | `app/api/*` | — |
| `UC46` | Servir imagens do catálogo | Plataforma & Integrações | — | — | `public/products/*` | — |
| `UC47` | Operar em modo offline com dados iniciais | Plataforma & Integrações | — | — | `lib/initial-data.ts` | — |
| `UC48` | Consultar prazo e frete da transportadora | Plataforma & Integrações | — | Transportadora | `components/ProductDetailModal.tsx` | — |

### 6.2 Resumo por módulo

| Módulo | UCs | Faixa | Atores | Sistemas externos | Lacunas |
| --- | ---: | --- | --- | --- | --- |
| Conta & Acesso | 8 | UC01–UC08 | Visitante, Atleta (usuário) | Google OAuth | 2 (UC06, UC07) |
| Descoberta & Compra | 10 | UC09–UC18 | Visitante, Atleta (usuário) | Banco / PIX | 2 (UC14, UC18) |
| Oferta & Lojas | 8 | UC19–UC26 | Atleta (usuário), Lojista (vendedor) | — | 2 (UC21, UC22) |
| Comunidade & Serviços | 7 | UC27–UC33 | Atleta (usuário) | — | 2 (UC31, UC33) |
| Administração | 9 | UC34–UC42 | Super Admin | — | 1 (UC39) |
| Plataforma & Integrações | 6 | UC43–UC48 | Sistema | Supabase Auth, PostgreSQL (RLS), Transportadora | — |

### 6.3 Casos de uso com lacuna conhecida

| ID | Caso de uso | Módulo | Lacuna | Arquivo |
| --- | --- | --- | --- | --- |
| `UC06` | Editar perfil e interesses esportivos | Conta & Acesso | sem tela | `lib/store.tsx · updateUserProfile()` |
| `UC07` | Recuperar senha | Conta & Acesso | inoperante | `components/AuthModal.tsx · modo forgot` |
| `UC14` | Salvar produto nos favoritos | Descoberta & Compra | sem tela | `lib/store.tsx · toggleFavorite()` |
| `UC18` | Acompanhar pedidos e rastreio | Descoberta & Compra | sem tela | `lib/store.tsx · orders` |
| `UC21` | Acompanhar vendas em custódia | Oferta & Lojas | placeholder | `components/SellC2CView.tsx` |
| `UC22` | Salvar rascunho de anúncio | Oferta & Lojas | placeholder | `components/SellC2CView.tsx` |
| `UC31` | Denunciar publicação para moderação | Comunidade & Serviços | sem UI | `lib/store.tsx · reportCommunityPost()` |
| `UC33` | Agendar assessoria esportiva | Comunidade & Serviços | não persiste | `components/CoachesView.tsx` |
| `UC39` | Atualizar status de pedidos e pagamentos | Administração | só memória | `lib/store.tsx · adminUpdateOrderStatus()` |

---

## 7. Integração no pipeline (HTML/PDF) e reprodução

```bash
npm i -D pdf-lib @resvg/resvg-js   # o PDF precisa dos dois
npm run flow                       # HTML + PDF principal + PDF de casos de uso
npm run flow:uc                    # apenas Fluxograma/Diagrama C. De Uso/casos-de-uso.pdf
npm run mestres                    # regenera os dois arquivos mestre
```

- O SVG do diagrama vem de `renderUseCaseSvg()` (`scripts/lib/usecase-core.mjs`) e é usado **tal e qual** no HTML
  e — via `@resvg/resvg-js` (PNG em `zoom 2`) — no PDF. Não há duas versões do desenho.
- No PDF dedicado, o gerador monta capa, sumário em duas passagens, tabelas e o diagrama; as descrições dos
  atores e sistemas externos vêm de `UC_ACTOR_INFO` / `UC_EXTERNAL_INFO` no mesmo núcleo.
- Ao adicionar um caso de uso, basta incluí-lo no módulo certo: as contagens, a legenda, o catálogo e o resumo
  por módulo se atualizam sozinhos.

---

## 8. Validação

- [ ] Contagens: **48 UC · 6 módulos · 4 atores · 5 externos · 9 lacunas**.
- [ ] IDs `UC01`–`UC48` únicos e presentes no diagrama **e** no catálogo.
- [ ] Nenhuma associação cruza uma faixa de módulo; nenhum rótulo de ator sobreposto.
- [ ] Todas as 5 integrações externas aparecem associadas a pelo menos um UC.
- [ ] `Fluxograma/Diagrama C. De Uso/casos-de-uso.pdf` com 7 páginas, sumário correto e nenhuma página em branco.
- [ ] HTML sem recursos externos, com o SVG inline e o catálogo com 48 linhas.

---

## 9. Manutenção

1. **Fonte de verdade**: `scripts/lib/usecase-core.mjs` — atores, sistemas externos, módulos, os 48 UC e o layout UML.
2. Criou uma funcionalidade? Acrescente o UC no módulo correspondente com `src` real e rode `npm run flow`.
3. Corrigiu uma lacuna? Remova o `flag` do UC e o ponto âmbar some do diagrama e das tabelas.
4. Mudou de ator ou integração? Atualize `UC_ACTORS` / `UC_EXTERNALS` (e `UC_ACTOR_INFO` / `UC_EXTERNAL_INFO`).
5. Rode `npm run mestres` para manter este documento sincronizado.

---

## Apêndice A — Código-fonte de referência (`scripts/lib/usecase-core.mjs`)

```js
/**
 * CoreMotiom — Diagrama e catálogo de casos de uso (UML).
 * ------------------------------------------------------
 * Modela TUDO que a plataforma oferece hoje, agrupado em 6 módulos funcionais,
 * com atores primários (visitante, atleta, lojista, admin) e secundários
 * (Google OAuth, Supabase, PIX/banco, transportadora).
 *
 * Casos de uso marcados com `flag` documentam comportamentos parciais ou
 * inoperantes no código atual (mesmos pontos ⚠ do fluxograma).
 *
 * Consumido por scripts/generate-user-flowchart.mjs (HTML) e
 * scripts/generate-user-flowchart-pdf.mjs (PDF).
 */

import { ACTORS, CANVAS_BG, escapeXml, round, wrapText } from './flowchart-core.mjs';

/* ------------------------------------------------------------------ *
 * 1. Atores                                                           *
 * ------------------------------------------------------------------ */

export const UC_ACTORS = {
  visitante: { label: 'Visitante', actor: 'visitante', side: 'left' },
  atleta: { label: 'Atleta (usuário)', actor: 'atleta', side: 'left' },
  lojista: { label: 'Lojista (vendedor)', actor: 'lojista', side: 'bottom' },
  admin: { label: 'Super Admin', actor: 'admin', side: 'right' },
};

export const UC_EXTERNALS = {
  google: { label: 'Google OAuth', actor: 'sistema' },
  supabaseAuth: { label: 'Supabase Auth', actor: 'sistema' },
  postgres: { label: 'PostgreSQL (RLS)', actor: 'sistema' },
  pix: { label: 'Banco / PIX', actor: 'sistema' },
  correios: { label: 'Transportadora', actor: 'sistema' },
};

/* ------------------------------------------------------------------ *
 * 2. Casos de uso por módulo                                          *
 * ------------------------------------------------------------------ */

export const UC_ACTOR_INFO = {
  visitante: 'Navega, busca, filtra, curte publicações e compra sem exigir conta (pedido criado como "guest-user").',
  atleta: 'Papel "user": favorita produtos, anuncia equipamentos C2C, publica e comenta no feed, agenda treinadores e compra com custódia.',
  lojista: 'Papel "seller": cria e personaliza a loja oficial, mantém o catálogo B2C e solicita o selo de verificação por CNPJ.',
  admin: 'E-mails master autorizados: acessa o painel executivo, homologa lojas, modera catálogo, gere usuários, pedidos e o banco.',
};

export const UC_EXTERNAL_INFO = {
  google: 'Provedor de identidade do login social (popup + retorno em /auth/callback).',
  supabaseAuth: 'Serviço de autenticação: e-mail/senha, OAuth Google, sessões e callback.',
  postgres: 'Banco relacional com RLS: profiles, stores, products, orders e community_posts.',
  pix: 'Meio de pagamento instantâneo com QR Code, copia-e-cola e desconto de 5%.',
  correios: 'Cálculo de prazo e frete (SEDEX/PAC) apresentado no checkout e na ficha do produto.',
};

export const USE_CASE_MODULES = [
  {
    id: 'm-conta',
    title: 'Conta & Acesso',
    col: 0,
    row: 0,
    actors: ['visitante', 'atleta'],
    uc: [
      { id: 'UC01', name: 'Criar conta (Atleta C2C ou Lojista B2C)', src: 'components/AuthModal.tsx', actors: ['visitante'] },
      { id: 'UC02', name: 'Entrar com e-mail e senha', src: 'services/authService.ts', actors: ['visitante'] },
      { id: 'UC03', name: 'Entrar com Google (OAuth)', src: 'app/auth/callback/page.tsx', actors: ['visitante'], ext: 'google' },
      { id: 'UC04', name: 'Usar acesso rápido de demonstração', src: 'lib/store.tsx · switchRole()', actors: ['visitante', 'atleta'] },
      { id: 'UC05', name: 'Simular outro papel (visitante/atleta/lojista/admin)', src: 'components/Sidebar.tsx', actors: ['atleta'] },
      { id: 'UC06', name: 'Editar perfil e interesses esportivos', src: 'lib/store.tsx · updateUserProfile()', actors: ['atleta'], flag: 'sem tela' },
      { id: 'UC07', name: 'Recuperar senha', src: 'components/AuthModal.tsx · modo forgot', actors: ['visitante'], flag: 'inoperante' },
      { id: 'UC08', name: 'Encerrar sessão (logout)', src: 'services/authService.ts · signOut()', actors: ['atleta', 'lojista', 'admin'] },
    ],
  },
  {
    id: 'm-compra',
    title: 'Descoberta & Compra',
    col: 0,
    row: 1,
    actors: ['visitante', 'atleta'],
    uc: [
      { id: 'UC09', name: 'Navegar pela Home e vitrines de destaque', src: 'components/HomeHeroAndHighlights.tsx', actors: ['visitante'] },
      { id: 'UC10', name: 'Buscar produtos no catálogo (⌘K)', src: 'components/Sidebar.tsx', actors: ['visitante'] },
      { id: 'UC11', name: 'Filtrar e ordenar catálogo (tipo, categoria, modalidade, condição, selo)', src: 'components/MarketplaceView.tsx', actors: ['visitante'] },
      { id: 'UC12', name: 'Ver ficha do produto (galeria, tamanhos, avaliação)', src: 'components/ProductDetailModal.tsx', actors: ['visitante'] },
      { id: 'UC13', name: 'Calcular frete por CEP', src: 'components/ProductDetailModal.tsx', actors: ['visitante'] },
      { id: 'UC14', name: 'Salvar produto nos favoritos', src: 'lib/store.tsx · toggleFavorite()', actors: ['atleta'], flag: 'sem tela' },
      { id: 'UC15', name: 'Gerenciar carrinho (quantidade, remover, subtotal)', src: 'components/CheckoutModal.tsx', actors: ['visitante', 'atleta'] },
      { id: 'UC16', name: 'Finalizar compra (carrinho → entrega → pagamento)', src: 'components/CheckoutModal.tsx', actors: ['visitante', 'atleta'], include: ['UC15'] },
      { id: 'UC17', name: 'Pagar com PIX, cartão ou boleto', src: 'lib/store.tsx · createOrder()', actors: ['visitante', 'atleta'], ext: 'pix' },
      { id: 'UC18', name: 'Acompanhar pedidos e rastreio', src: 'lib/store.tsx · orders', actors: ['atleta'], flag: 'sem tela' },
    ],
  },
  {
    id: 'm-oferta',
    title: 'Oferta & Lojas',
    col: 1,
    row: 0,
    actors: ['atleta', 'lojista'],
    uc: [
      { id: 'UC19', name: 'Anunciar equipamento seminovo (C2C)', src: 'components/SellC2CView.tsx', actors: ['atleta'] },
      { id: 'UC20', name: 'Gerenciar meus anúncios (listar e excluir)', src: 'components/SellC2CView.tsx', actors: ['atleta'] },
      { id: 'UC21', name: 'Acompanhar vendas em custódia', src: 'components/SellC2CView.tsx', actors: ['atleta'], flag: 'placeholder' },
      { id: 'UC22', name: 'Salvar rascunho de anúncio', src: 'components/SellC2CView.tsx', actors: ['atleta'], flag: 'placeholder' },
      { id: 'UC23', name: 'Criar loja oficial (B2C)', src: 'components/CreateStoreModal.tsx', actors: ['lojista'] },
      { id: 'UC24', name: 'Exibir catálogo e perfil público da loja', src: 'components/StoresView.tsx', actors: ['lojista', 'visitante'] },
      { id: 'UC25', name: 'Solicitar selo de loja verificada (CNPJ)', src: 'components/StoresView.tsx', actors: ['lojista'] },
      { id: 'UC26', name: 'Filtrar lojas verificadas', src: 'components/StoresView.tsx', actors: ['visitante'] },
    ],
  },
  {
    id: 'm-comunidade',
    title: 'Comunidade & Serviços',
    col: 1,
    row: 1,
    actors: ['atleta'],
    uc: [
      { id: 'UC27', name: 'Publicar no feed da comunidade', src: 'components/CommunityView.tsx', actors: ['atleta'] },
      { id: 'UC28', name: 'Curtir publicação', src: 'services/communityService.ts', actors: ['visitante'] },
      { id: 'UC29', name: 'Comentar publicação', src: 'components/CommunityView.tsx', actors: ['atleta'] },
      { id: 'UC30', name: 'Filtrar feed por categoria', src: 'components/CommunityView.tsx', actors: ['visitante'] },
      { id: 'UC31', name: 'Denunciar publicação para moderação', src: 'lib/store.tsx · reportCommunityPost()', actors: ['atleta'], flag: 'sem UI' },
      { id: 'UC32', name: 'Buscar treinador por modalidade', src: 'components/CoachesView.tsx', actors: ['visitante'] },
      { id: 'UC33', name: 'Agendar assessoria esportiva', src: 'components/CoachesView.tsx', actors: ['atleta'], flag: 'não persiste' },
    ],
  },
  {
    id: 'm-admin',
    title: 'Administração',
    col: 2,
    row: 0,
    actors: ['admin'],
    uc: [
      { id: 'UC34', name: 'Acessar painel executivo master', src: 'components/AdminDashboard.tsx', actors: ['admin'] },
      { id: 'UC35', name: 'Ver métricas (GMV, custódia 4,5%, B2C × C2C)', src: 'components/AdminDashboard.tsx', actors: ['admin'] },
      { id: 'UC36', name: 'Auditar loja: aprovar ou recusar selo', src: 'lib/store.tsx · adminVerifyStore()', actors: ['admin'] },
      { id: 'UC37', name: 'Moderar catálogo (status e exclusão)', src: 'lib/store.tsx · adminToggleProductStatus()', actors: ['admin'] },
      { id: 'UC38', name: 'Gerenciar usuários (criar, papel, banir, excluir)', src: 'app/api/users/route.ts', actors: ['admin'] },
      { id: 'UC39', name: 'Atualizar status de pedidos e pagamentos', src: 'lib/store.tsx · adminUpdateOrderStatus()', actors: ['admin'], flag: 'só memória' },
      { id: 'UC40', name: 'Confirmar pagamento em sandbox', src: 'services/orderService.ts', actors: ['admin'] },
      { id: 'UC41', name: 'Sincronizar dados com Supabase', src: 'lib/store.tsx · adminSyncSupabase()', actors: ['admin'] },
      { id: 'UC42', name: 'Diagnosticar banco e abrir console SQL', src: 'components/SupabaseConfigModal.tsx', actors: ['admin'] },
    ],
  },
  {
    id: 'm-plataforma',
    title: 'Plataforma & Integrações',
    col: 2,
    row: 1,
    actors: [],
    uc: [
      { id: 'UC43', name: 'Autenticar contas no Supabase Auth', src: 'services/supabaseClient.ts', actors: [], ext: 'supabaseAuth' },
      { id: 'UC44', name: 'Persistir dados em PostgreSQL com RLS', src: 'lib/db-queries.ts', actors: [], ext: 'postgres' },
      { id: 'UC45', name: 'Expor API Routes internas (produtos, lojas, usuários)', src: 'app/api/*', actors: [] },
      { id: 'UC46', name: 'Servir imagens do catálogo', src: 'public/products/*', actors: [] },
      { id: 'UC47', name: 'Operar em modo offline com dados iniciais', src: 'lib/initial-data.ts', actors: [] },
      { id: 'UC48', name: 'Consultar prazo e frete da transportadora', src: 'components/ProductDetailModal.tsx', actors: [], ext: 'correios' },
    ],
  },
];

export const USE_CASE_DIAGRAM = {
  id: 'casos-de-uso',
  num: 8,
  title: 'Diagrama de casos de uso — tudo que a plataforma oferece',
  desc:
    'Visão UML dos 48 casos de uso implementados, agrupados em 6 módulos funcionais, com atores primários (visitante, atleta, lojista, admin) e sistemas externos (Google OAuth, Supabase, PostgreSQL, banco/PIX e transportadora). Os identificadores UC correspondem ao catálogo completo logo abaixo.',
};

/* ------------------------------------------------------------------ *
 * 3. Catálogo consolidado                                             *
 * ------------------------------------------------------------------ */

export const USE_CASE_CATALOG = USE_CASE_MODULES.flatMap((m) =>
  m.uc.map((u) => ({
    module: m.title,
    id: u.id,
    name: u.name,
    actors: u.actors,
    external: u.ext ? UC_EXTERNALS[u.ext].label : '',
    src: u.src,
    flag: u.flag || '',
    include: u.include || [],
  }))
);

export const USE_CASE_STATS = {
  total: USE_CASE_CATALOG.length,
  modules: USE_CASE_MODULES.length,
  atores: Object.keys(UC_ACTORS).length,
  externos: Object.keys(UC_EXTERNALS).length,
  parciais: USE_CASE_CATALOG.filter((u) => u.flag).length,
};

/* ------------------------------------------------------------------ *
 * 4. Layout do diagrama UML                                           *
 *    Faixas horizontais empilhadas (1 módulo por faixa) com corredores *
 *    laterais de atores — nenhuma associação cruza um módulo.          *
 * ------------------------------------------------------------------ */

const UML = {
  laneLeft: 244,
  boundaryPad: 26,
  bandW: 1140,
  bandPadX: 18,
  bandHeaderH: 38,
  colGap: 44,
  pillH: 38,
  pillGap: 9,
  bandGap: 26,
  top: 104,
  itemFont: 11.8,
  idFont: 8.8,
  actorSpineX: 158,
  actorIconX: 96,
};

const BAND_TITLES = {
  'm-conta': 'Conta & Acesso',
  'm-compra': 'Descoberta & Compra',
  'm-oferta': 'Oferta & Lojas',
  'm-comunidade': 'Comunidade & Serviços',
  'm-admin': 'Administração',
  'm-plataforma': 'Plataforma & Integrações',
};

function actorGlyph(cx, cy, label, color, textColor, anchor = 'middle') {
  return `
  <circle cx="${round(cx)}" cy="${round(cy - 19)}" r="8.5" fill="none" stroke="${color}" stroke-width="1.7" />
  <path d="M${round(cx)},${round(cy - 10.5)} V${round(cy + 7)}" stroke="${color}" stroke-width="1.7" fill="none" />
  <path d="M${round(cx - 16)},${round(cy - 3)} H${round(cx + 16)}" stroke="${color}" stroke-width="1.7" fill="none" />
  <path d="M${round(cx - 13)},${round(cy + 27)} L${round(cx)},${round(cy + 7)} L${round(cx + 13)},${round(cy + 27)}" stroke="${color}" stroke-width="1.7" fill="none" />
  <text x="${round(cx)}" y="${round(cy + 44)}" text-anchor="${anchor}" font-size="12.6" font-weight="700" fill="${textColor}">${escapeXml(label)}</text>`;
}

/** Distribui os casos de uso de um módulo em duas colunas, mantendo a ordem de leitura. */
function splitColumns(items) {
  const cols = { L: [], R: [] };
  const columnOf = new Map();
  for (const it of items) {
    const included = (it.include || []).map((id) => columnOf.get(id)).find(Boolean);
    if (it.ext) cols.R.push(it);
    else if (included) cols[included].push(it);
    else if (cols.L.length <= cols.R.length) cols.L.push(it);
    else cols.R.push(it);
    columnOf.set(it.id, cols.L.includes(it) ? 'L' : 'R');
  }
  return cols;
}

export function renderUseCaseSvg(diagram = USE_CASE_DIAGRAM) {
  // ---------- 1. medição ----------
  const bands = USE_CASE_MODULES.map((m) => {
    const items = m.uc.map((u) => ({ ...u, lines: wrapText(u.name, UML.bandW / 2 - 76, UML.itemFont, false) }));
    const cols = splitColumns(items);
    const colH = (list) => list.reduce((a, it) => a + Math.max(UML.pillH, 16 + it.lines.length * 14.6) + UML.pillGap, 0);
    const inner = Math.max(colH(cols.L), colH(cols.R));
    return { ...m, items, cols, h: UML.bandHeaderH + inner + 16 };
  });

  const bandStackH = bands.reduce((a, b) => a + b.h + UML.bandGap, 0) - UML.bandGap;
  const boundaryX = UML.laneLeft;
  const boundaryY = UML.top;
  const boundaryW = UML.bandW + UML.boundaryPad * 2;
  const boundaryH = bandStackH + UML.boundaryPad * 2 + 8;
  const boundaryRight = boundaryX + boundaryW;
  const width = boundaryRight + 300;

  /** Empurra itens para que fiquem no mínimo `minGap` afastados no eixo Y. */
  const spread = (items, minGap) => {
    const sorted = [...items].sort((a, b) => a.desiredY - b.desiredY);
    let last = -Infinity;
    for (const it of sorted) {
      it.y = Math.max(it.desiredY, last + minGap);
      last = it.y;
    }
    return sorted;
  };

  const bandX = boundaryX + UML.boundaryPad;
  const pillW = (UML.bandW - UML.bandPadX * 2 - UML.colGap) / 2;

  // ---------- 2. posicionamento ----------
  let y = boundaryY + UML.boundaryPad + 4;
  for (const b of bands) {
    b.x = bandX;
    b.y = y;
    b.cy = y + b.h / 2;
    let cursorL = y + UML.bandHeaderH;
    b.cols.L.forEach((it) => {
      it.x = bandX + UML.bandPadX;
      it.y = cursorL;
      it.w = pillW;
      it.h = Math.max(UML.pillH, 16 + it.lines.length * 14.6);
      cursorL += it.h + UML.pillGap;
    });
    let cursorR = y + UML.bandHeaderH;
    b.cols.R.forEach((it) => {
      it.x = bandX + UML.bandPadX + pillW + UML.colGap;
      it.y = cursorR;
      it.w = pillW;
      it.h = Math.max(UML.pillH, 16 + it.lines.length * 14.6);
      cursorR += it.h + UML.pillGap;
    });
    y += b.h + UML.bandGap;
  }
  const byId = (id) => bands.flatMap((b) => b.items).find((i) => i.id === id);

  // ---------- 3. desenho ----------
  const body = [];

  // faixa de título / legenda superior
  const legendY = 52;
  const legend = [
    ['#8B93A7', 'Atores primários à esquerda e à direita'],
    ['#38BDF8', 'Sistemas externos (tracejado azul)'],
    ['#A78BFA', 'Relações «include» (tracejado roxo)'],
    ['#FBBF24', 'Caso de uso com lacuna conhecida'],
  ];
  let lx = UML.laneLeft - 40;
  legend.forEach(([color, text], i) => {
    const x = lx + i * 430;
    body.push(
      `<circle cx="${round(x)}" cy="${round(legendY - 4)}" r="5" fill="${color}" />`,
      `<text x="${round(x + 14)}" y="${round(legendY)}" font-size="11.4" font-weight="600" fill="#98A0B1">${escapeXml(text)}</text>`
    );
  });

  // boundary (fronteira do sistema)
  body.push(
    `<rect x="${boundaryX}" y="${boundaryY}" width="${boundaryW}" height="${round(
      boundaryH
    )}" rx="24" fill="rgba(255,255,255,0.018)" stroke="#3A4152" stroke-width="1.6" />`,
    `<text x="${boundaryX + 20}" y="${boundaryY + 25}" font-size="13.4" font-weight="700" fill="#C7CDDA">CoreMotiom — Sistema de Marketplace Esportivo</text>`,
    `<text x="${round(boundaryRight - 20)}" y="${boundaryY + 25}" text-anchor="end" font-size="10.8" font-weight="700" letter-spacing="1.1" fill="#767F93">${USE_CASE_STATS.total} CASOS DE USO · ${USE_CASE_STATS.modules} MÓDULOS</text>`
  );

  // corredores dos atores primários
  const lanes = { left: [], right: [] };
  for (const [key, def] of Object.entries(UC_ACTORS)) {
    const mods = bands.filter((b) => b.actors.includes(key));
    if (!mods.length) continue;
    lanes[def.side === 'right' ? 'right' : 'left'].push({ key, def, mods });
  }
  const leftActors = spread(
    lanes.left.map(({ key, def, mods }) => ({ key, def, mods, desiredY: Math.min(...mods.map((m) => m.cy)) })),
    112
  );
  leftActors.forEach(({ key, def, mods }, idx) => {
    const color = ACTORS[def.actor].stroke;
    const spineX = UML.actorSpineX + idx * 18;
    const offset = (idx - (leftActors.length - 1) / 2) * 16;
    const conns = mods.map((m) => ({ y: m.cy + offset, band: m }));
    const top = Math.min(...conns.map((c) => c.y));
    const bottom = Math.max(...conns.map((c) => c.y));
    const cyIcon = idx === 0 ? top : bottom;
    body.push(
      `<path d="M${round(spineX)},${round(Math.min(top, cyIcon))} V${round(
        Math.max(bottom, cyIcon)
      )}" fill="none" stroke="${color}" stroke-width="1.7" opacity="0.85" />`,
      `<path d="M${round(UML.actorIconX + 22)},${round(cyIcon)} H${round(spineX)}" fill="none" stroke="${color}" stroke-width="1.7" opacity="0.85" />`
    );
    for (const c of conns) {
      body.push(
        `<path d="M${round(spineX)},${round(c.y)} H${round(c.band.x)}" fill="none" stroke="${color}" stroke-width="1.5" opacity="0.9" />`
      );
    }
    body.push(actorGlyph(UML.actorIconX, cyIcon, UC_ACTORS[key].label, color, ACTORS[def.actor].text));
  });

  // corredor direito: Super Admin
  lanes.right.forEach(({ key, def, mods }) => {
    const color = ACTORS[def.actor].stroke;
    const spineX = boundaryRight + 54;
    const cy = mods[0].cy;
    body.push(
      `<path d="M${round(spineX)},${round(cy - 26)} V${round(cy + 26)}" fill="none" stroke="${color}" stroke-width="1.7" opacity="0.85" />`
    );
    for (const m of mods) {
      body.push(
        `<path d="M${round(boundaryRight)},${round(m.cy)} H${round(spineX)}" fill="none" stroke="${color}" stroke-width="1.5" opacity="0.9" />`
      );
    }
    body.push(actorGlyph(spineX + 46, cy, UC_ACTORS[key].label, color, ACTORS[def.actor].text));
  });

  // módulos + casos de uso
  for (const b of bands) {
    const accent = ACTORS[(b.actors[0] || 'sistema')].stroke;
    body.push(
      `<rect x="${round(b.x)}" y="${round(b.y)}" width="${UML.bandW}" height="${round(
        b.h
      )}" rx="16" fill="rgba(15,17,22,0.95)" stroke="${accent}" stroke-width="1.3" stroke-dasharray="7 5" />`,
      `<text x="${round(b.x + UML.bandPadX)}" y="${round(b.y + 25)}" font-size="12.8" font-weight="700" fill="${accent}">${escapeXml(
        BAND_TITLES[b.id] || b.title
      )}</text>`,
      `<text x="${round(b.x + UML.bandW - UML.bandPadX)}" y="${round(b.y + 25)}" text-anchor="end" font-size="10.2" font-weight="700" fill="#6F7789">${b.items.length} UC · ${b.actors.map((a) => UC_ACTORS[a].label.replace(/ \(.*\)/, '')).join(' · ')}</text>`
    );

    for (const it of b.items) {
      const a = ACTORS[it.actors[0] || 'sistema'];
      const cy = it.y + it.h / 2;
      body.push(
        `<rect x="${round(it.x)}" y="${round(it.y)}" width="${round(it.w)}" height="${round(it.h)}" rx="${round(
          it.h / 2
        )}" fill="${a.fill}" stroke="${it.ext ? '#38BDF8' : a.stroke}" stroke-width="1.25" />`,
        `<text x="${round(it.x + 16)}" y="${round(cy + 3.7)}" font-size="${UML.idFont}" font-weight="700" fill="${a.sub}">${escapeXml(
          it.id
        )}</text>`,
        `<text x="${round(it.x + 50)}" y="${round(cy + 4.2)}" font-size="${UML.itemFont}" fill="${a.text}">${escapeXml(
          it.lines[0]
        )}</text>`
      );
      if (it.flag) {
        body.push(
          `<circle cx="${round(it.x + it.w - 16)}" cy="${round(cy)}" r="4" fill="#FBBF24" />`,
          `<title>${escapeXml(it.id)}: ${escapeXml(it.flag)}</title>`
        );
      }
    }

    // «include» entre casos de uso
    for (const it of b.items) {
      for (const inc of it.include || []) {
        const t = byId(inc);
        if (!t) continue;
        const sameCol = Math.abs(it.x - t.x) < 2;
        if (sameCol) {
          const x = it.x + 26;
          body.push(
            `<path d="M${round(x)},${round(it.y + it.h)} V${round(t.y - 6)}" fill="none" stroke="#A78BFA" stroke-width="1.3" stroke-dasharray="5 4" marker-end="url(#uc-include)" />`,
            `<text x="${round(x + 8)}" y="${round((it.y + it.h + t.y) / 2)}" font-size="9.6" font-weight="600" fill="#C4B5FD">«include»</text>`
          );
        } else {
          const fromRight = t.x > it.x;
          const x1 = fromRight ? it.x + it.w : it.x;
          const x2 = fromRight ? t.x : t.x + t.w;
          const y = t.y + t.h / 2;
          const midX = (x1 + x2) / 2;
          body.push(
            `<path d="M${round(x1)},${round(it.y + it.h / 2)} H${round(midX)} V${round(y)} H${round(
              x2
            )}" fill="none" stroke="#A78BFA" stroke-width="1.3" stroke-dasharray="5 4" marker-end="url(#uc-include)" />`,
            `<text x="${round(midX)}" y="${round(Math.min(it.y, t.y) - 4)}" text-anchor="middle" font-size="9.6" font-weight="600" fill="#C4B5FD">«include»</text>`
          );
        }
      }
    }

  }

  // integrações com sistemas externos (corredor direito, sem sobreposição)
  const extItems = bands
    .flatMap((b) => b.items.filter((it) => it.ext))
    .map((it) => ({ it, desiredY: it.y + it.h / 2 }));
  const placedExt = spread(extItems, 92);
  const height = Math.max(boundaryY + boundaryH, Math.max(...placedExt.map((e) => e.y)) + 78) + 34;
  placedExt.forEach(({ it, y }) => {
    const ext = UC_EXTERNALS[it.ext];
    const pillCy = it.y + it.h / 2;
    const iconX = boundaryRight + 150;
    const elbow = iconX - 62;
    body.push(
      `<path d="M${round(it.x + it.w)},${round(pillCy)} H${round(elbow)} V${round(y)} H${round(
        iconX - 26
      )}" fill="none" stroke="#38BDF8" stroke-width="1.2" stroke-dasharray="5 4" marker-end="url(#uc-ext)" />`,
      actorGlyph(iconX, y, ext.label, '#38BDF8', '#A9D8F2')
    );
  });

  const defs = `<marker id="uc-include" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="#A78BFA" /></marker>
<marker id="uc-ext" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="#38BDF8" /></marker>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${round(width)} ${round(
    height
  )}" width="${round(width)}" height="${round(height)}" role="img" aria-label="${escapeXml(
    diagram.title
  )}" class="flow-svg">
<defs>${defs}</defs>
<rect x="0" y="0" width="${round(width)}" height="${round(height)}" fill="${CANVAS_BG}" />
${body.join('\n')}
</svg>`;
}
```

## Apêndice B — Trechos de integração nos geradores

### B.1 HTML — seção do diagrama e catálogo (`scripts/generate-user-flowchart.mjs`)

```js
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
```

### B.2 PDF — capítulo do diagrama no documento principal (`scripts/generate-user-flowchart-pdf.mjs`)

```js
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
```

### B.3 PDF — documento dedicado (`scripts/generate-user-flowchart-pdf.mjs`)

```js
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
```
