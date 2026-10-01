# MESTRE — Fluxograma do Usuário (CoreMotiom)

<!-- GERADO AUTOMATICAMENTE por scripts/generate-master-docs.mjs — não edite à mão.
     Fonte de verdade: scripts/lib/flowchart-core.mjs (dados + layout + SVG).
     Para regenerar: npm run mestres -->

**Documento mestre autocontido.** Ele contém tudo o que um chat novo do Arena precisa para **recriar o
fluxograma do usuário** do CoreMotiom — inclusive sem acesso ao repositório: o dossiê completo do site (§3), os
dados autoritativos de cada nó e aresta (§4), as regras de layout/renderização (§5), a especificação dos dois
entregáveis (§2) e o **código-fonte de referência completo** (Apêndice B).

- Produto documentado: **CoreMotiom** — `{{STACK}}`
- Repositório de origem: `{{REPO}}`
- Gerado em: `{{DATA_GERACAO}}`
- Artefatos de referência: `docs/fluxograma-usuario.html` (navegável) e `docs/fluxograma-usuario.pdf` (A4, {{PAGINAS_PDF}} páginas)
- Documento irmão: `docs/mestre-casos-de-uso.md` (diagrama e catálogo dos 48 casos de uso)

### Como usar este arquivo em um chat novo

1. Anexe **este arquivo** (e, se quiser o pacote completo, também `docs/mestre-casos-de-uso.md`).
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
| **B. Documento imprimível** | PDF A4 (retrato e paisagem), {{PAGINAS_PDF}} páginas | Capa, sumário numerado, mapa dos diagramas, 7 figuras em página própria, seções de apoio, rodapé com paginação |

**Critérios de aceitação** (detalhados no §8):

1. Nenhum conteúdo inventado: cada nó, aresta, tabela e lacuna deve ter origem no §3/§4 ou no código do Apêndice B.
2. Os 7 fluxos com os mesmos IDs (`visao-geral`, `autenticacao`, `compra`, `venda`, `engajamento`, `admin`, `dados`)
   e a mesma numeração 1–7.
3. HTML sem dependências externas (zero `<script src="http…">`, zero webfont remota) e com todos os SVGs embutidos.
4. PDF sem páginas em branco, com sumário apontando para a página certa e cada figura legível na orientação escolhida.
5. Lacunas marcadas com `(!)` no PDF e `⚠` no HTML, coerentes com a tabela do §3.11.

---

## 2. Especificação dos entregáveis

### 2.1 HTML — `docs/fluxograma-usuario.html`

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
| 8 | Diagrama de casos de uso — tudo que a plataforma oferece | UML (ver `docs/mestre-casos-de-uso.md`) |
| 9 | Catálogo completo de casos de uso | 48 linhas agrupadas por módulo |
| 10 | Papéis e permissões por tela | matriz 13 × 5 (Capacidade × 4 papéis) |
| 11 | Máquina de estados do domínio | tabela de 6 entidades com status e quem altera |
| 12 | Lacunas e riscos encontrados no fluxo | 14 cards com tag, título e descrição |
| 13 | Arquivos-chave por fluxo | tabela Fluxo × Ponto de entrada × Regras e dados |
| 14 | Como ler este fluxograma | legenda de formas, cores e tipos de aresta |

Cada bloco de diagrama traz: número, título, descrição, legenda de atores (pílulas coloridas), o SVG em
`figure` com `viewBox` próprio e, quando útil, uma tabela de leitura (“o que observar”).

### 2.2 PDF — `docs/fluxograma-usuario.pdf`

| Página | Conteúdo |
| --- | --- |
| 1 | **Capa** escura: marca “CM”, título, tagline, stack, 4 cartões de números (7 diagramas · 1 diagrama UML · {{TOTAL_UC}} casos de uso · 14 lacunas) e data de geração |
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

{{DOSSIE_SITE}}

---

## 4. Dados autoritativos dos diagramas

Todo o conteúdo visual vem das estruturas abaixo. Elas são **completas e normativas**: reproduza os IDs, os
textos, as colunas/linhas, os tipos de nó e os rótulos de aresta exatamente como estão.

### 4.1 Metadados, paleta, tipos e geometria

```json
{{JSON_BASE}}
```

### 4.2 Os 7 diagramas (nós e arestas)

Campos por nó: `id`, `t` (título), `s` (subtítulo/descrição), `type` (`start|process|decision|data|note|end`),
`actor` (chave de `ACTORS`), `col` (0–4, coluna horizontal), `row` (linha vertical).
Campos por aresta: `from`, `to`, `label`, `kind` (`flow|auth|success|error|admin|data`), `fromSide`/`toSide`
(`left|right|top|bottom`), `labelOffset` `[dx,dy]`, `dstOffsetX` (deslocamento do ponto de chegada).

```json
{{JSON_DIAGRAMAS}}
```

### 4.3 Tabelas de apoio

```json
{{JSON_TABELAS}}
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
npm run flow:html          # docs/fluxograma-usuario.html   (+ docs/.flowchart-data.json, ignorado no git)

# 3. gerar o PDF (rasteriza os SVGs do manifesto com resvg e monta o A4 com pdf-lib)
npm run flow:pdf           # docs/fluxograma-usuario.pdf (+ docs/casos-de-uso.pdf)

# atalhos úteis
npm run flow               # HTML + os dois PDFs
npm run mestres            # regenera este documento mestre
FLOW_EMIT_SVG=/tmp/svgs npm run flow:html   # despeja os SVGs 01–08 para inspeção
FLOW_EMIT_JSON=/tmp/flow.json npm run flow:html
FLOW_MANIFEST=... FLOW_PNG_DIR=... PDF_DEBUG=1 npm run flow:pdf   # modo offline/depuração
```

- **Manifesto** (`docs/.flowchart-data.json`): metadados, os 7 diagramas (com `width`/`height`), os 48 casos de
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

{{RESUMO_DIAGRAMAS}}

---

## 8. Validação e critérios de aceitação

**HTML**

- [ ] 14 seções, 7 SVGs de fluxo (+1 UML), nenhum recurso externo, todos os SVGs com `viewBox`.
- [ ] Aninhamento sem erros (parser HTML), âncoras do sumário resolvendo para os `id`s das seções.
- [ ] Contadores do hero coerentes com o conteúdo (7 diagramas · {{TOTAL_UC}} casos de uso · 14 lacunas).

**PDF**

- [ ] Contagem de páginas = {{PAGINAS_PDF}} e **nenhuma página em branco**.
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
const doc = await pdfjs.getDocument({ data: new Uint8Array(fs.readFileSync('docs/fluxograma-usuario.pdf')) }).promise;
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
4. Ao criar/remover caso de uso, ajuste `scripts/lib/usecase-core.mjs` (ver `docs/mestre-casos-de-uso.md`).
5. Rode `npm run mestres` para manter este documento sincronizado com o código.

---

## Apêndice A — Datasheet dos diagramas

{{DATASHEET_DIAGRAMAS}}

## Apêndice B — Código-fonte de referência (completo)

> Estes são os arquivos que geram os entregáveis. Copie-os como estão para reproduzir exatamente o mesmo
> resultado (ou use-os como referência fina de layout/roteamento se estiver reimplementando).

### B.1 `scripts/lib/flowchart-core.mjs` — dados + layout + renderizador SVG

```js
{{CODIGO_FLOWCHART_CORE}}
```

### B.2 `scripts/lib/pdf-kit.mjs` — mini-kit A4 sobre pdf-lib

```js
{{CODIGO_PDF_KIT}}
```

### B.3 `scripts/generate-user-flowchart.mjs` — gerador do HTML + manifesto

```js
{{CODIGO_GEN_HTML}}
```

### B.4 `scripts/generate-user-flowchart-pdf.mjs` — gerador dos PDFs

```js
{{CODIGO_GEN_PDF}}
```
