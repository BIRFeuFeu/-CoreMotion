# MESTRE — Diagrama e Catálogo de Casos de Uso (CoreMotiom)

<!-- GERADO AUTOMATICAMENTE por scripts/generate-master-docs.mjs — não edite à mão.
     Fonte de verdade: scripts/lib/usecase-core.mjs (atores, 48 UC, layout UML e SVG).
     Para regenerar: npm run mestres -->

**Documento mestre autocontido.** Contém tudo o que um chat novo do Arena precisa para **recriar o diagrama
UML e o catálogo de casos de uso** do CoreMotiom — mesmo sem acesso ao repositório: o contexto do site (§3),
os 48 casos de uso em formato de dados (§4), as regras do layout UML (§5), a especificação das saídas (§2) e o
**código-fonte de referência completo** (Apêndice A).

- Produto documentado: **CoreMotiom** — `{{STACK}}`
- Repositório de origem: `{{REPO}}`
- Gerado em: `{{DATA_GERACAO}}`
- Artefatos de referência: `{{DOCS_DIR}}/fluxograma-usuario.html` (§8 e §9), `{{DOCS_DIR}}/casos-de-uso.pdf` ({{PAGINAS_UC_PDF}} páginas) e o capítulo equivalente em `{{DOCS_DIR}}/fluxograma-usuario.pdf`
- Documento irmão: `{{DOCS_DIR}}/mestre-fluxograma.md` (os 7 fluxos de usuário + pipeline HTML/PDF compartilhado)

### Como usar este arquivo em um chat novo

1. Anexe **este arquivo** (idealmente junto de `{{DOCS_DIR}}/mestre-fluxograma.md`, que traz o dossiê completo do site
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
| **A. Seção do HTML** | `{{DOCS_DIR}}/fluxograma-usuario.html` §8 e §9 | Diagrama UML inline + catálogo com 48 linhas agrupadas por módulo |
| **B. Capítulo do PDF principal** | `{{DOCS_DIR}}/fluxograma-usuario.pdf` (páginas 12–15) | Diagrama em página própria + catálogo paginado |
| **C. PDF dedicado** | `{{DOCS_DIR}}/casos-de-uso.pdf` ({{PAGINAS_UC_PDF}} páginas) | Capa, sumário, atores e sistemas externos, diagrama, catálogo, resumo por módulo, lacunas e manutenção |

**Critérios de aceitação** (validados no §8):

1. Exatamente **{{TOTAL_UC}} casos de uso** em **{{TOTAL_MODULOS}} módulos**, com os IDs `UC01`–`UC48` preservados.
2. **{{TOTAL_ATORES}} atores primários** (visitante, atleta, lojista, admin) e **{{TOTAL_EXTERNOS}} sistemas
   externos** (Google OAuth, Supabase Auth, PostgreSQL/RLS, Banco/PIX, Transportadora).
3. Cada caso de uso aponta o **arquivo real** onde está implementado (coluna “Onde está no código”).
4. Casos com lacuna: **{{TOTAL_PARCIAIS}}** marcados com ponto âmbar no diagrama e `(!)` no catálogo/tabelas.
5. Nenhuma associação de ator cruza uma faixa de módulo — o layout é determinístico e reproduzível.

---

## 2. Especificação das saídas

### 2.1 Seção do HTML (§8 e §9)

```html
<section class="card" id="casos-de-uso">
  <div class="card-head"><span class="num">8</span>
    <div><h2>{{TITULO_DIAGRAMA}}</h2><p class="desc">{{DESC_DIAGRAMA}}</p></div>
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

### 2.3 PDF dedicado (`{{DOCS_DIR}}/casos-de-uso.pdf`, {{PAGINAS_UC_PDF}} páginas)

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
> arquivos) está no §3 de `{{DOCS_DIR}}/mestre-fluxograma.md`. Abaixo, o recorte necessário para os casos de uso.

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

{{MODULOS_RESUMO}}

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
{{JSON_UC}}
```

Listas de apoio (papel por ator e descrição longa das integrações):

```json
{{JSON_UC_INFO}}
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

### 6.1 Catálogo ({{TOTAL_UC}} casos de uso)

{{CATALOGO_TABELA}}

### 6.2 Resumo por módulo

{{MODULOS_TABELA}}

### 6.3 Casos de uso com lacuna conhecida

{{LACUNAS_UC_TABELA}}

---

## 7. Integração no pipeline (HTML/PDF) e reprodução

```bash
npm i -D pdf-lib @resvg/resvg-js   # o PDF precisa dos dois
npm run flow                       # HTML + PDF principal + PDF de casos de uso
npm run flow:uc                    # apenas {{DOCS_DIR}}/casos-de-uso.pdf
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

- [ ] Contagens: **{{TOTAL_UC}} UC · {{TOTAL_MODULOS}} módulos · {{TOTAL_ATORES}} atores · {{TOTAL_EXTERNOS}} externos · {{TOTAL_PARCIAIS}} lacunas**.
- [ ] IDs `UC01`–`UC48` únicos e presentes no diagrama **e** no catálogo.
- [ ] Nenhuma associação cruza uma faixa de módulo; nenhum rótulo de ator sobreposto.
- [ ] Todas as 5 integrações externas aparecem associadas a pelo menos um UC.
- [ ] `{{DOCS_DIR}}/casos-de-uso.pdf` com {{PAGINAS_UC_PDF}} páginas, sumário correto e nenhuma página em branco.
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
{{CODIGO_USECASE_CORE}}
```

## Apêndice B — Trechos de integração nos geradores

### B.1 HTML — seção do diagrama e catálogo (`scripts/generate-user-flowchart.mjs`)

```js
{{CODIGO_HTML_UC}}
```

### B.2 PDF — capítulo do diagrama no documento principal (`scripts/generate-user-flowchart-pdf.mjs`)

```js
{{CODIGO_PDF_UC}}
```

### B.3 PDF — documento dedicado (`scripts/generate-user-flowchart-pdf.mjs`)

```js
{{CODIGO_PDF_UC_DOC}}
```
