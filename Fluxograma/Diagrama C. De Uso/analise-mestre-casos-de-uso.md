# Análise — `mestre-casos-de-uso.md` (MESTRE · Diagrama e Catálogo de Casos de Uso)

> **Documento de análise escrito à mão** (não é gerado por script, ao contrário dos demais arquivos desta pasta).
> Objeto analisado: [`mestre-casos-de-uso.md`](mestre-casos-de-uso.md) — 2.281 linhas · 91 KB.
> Método: leitura integral do documento + verificação contra a fonte de verdade (`scripts/lib/usecase-core.mjs`),
> os geradores e os artefatos publicados (`fluxograma-usuario.html`, `casos-de-uso.pdf`, `fluxograma-usuario.pdf`).
> Data da análise: 1 de outubro de 2026.

---

## 1. Veredito rápido

O documento **cumpre o que promete**: é autocontido, os números batem com o código e com os artefatos, e o
Apêndice A é **byte a byte idêntico** ao `usecase-core.mjs` (481 linhas). Como artefato de *handoff* para um
chat novo, funciona.

As ressalvas se concentram em três frentes — nenhuma delas quebra o documento, mas todas afetam o que um
leitor (ou uma IA) vai *reproduzir* a partir dele:

1. **Modelagem x realidade:** o diagrama apresenta 5 "sistemas externos" integrados, mas **frete/transportadora
   e PIX não têm integração real** — e os UC correspondentes **não estão marcados como lacuna**. O contador
   oficial ("9 lacunas") **subestima** o que o código mostra.
2. **Especificação x implementação:** alguns valores de §4/§5 divergem do renderizador (campo `side: "bottom"`
   do lojista, campos `col`/`row` nunca lidos, "elbow até a pílula" que na prática termina na borda da faixa).
3. **Estrutura:** **50% do arquivo** (§4, 1.138 linhas) é JSON de dados que já aparecem duplicados em §6.1, e o
   mesmo caso de uso é representado **4 vezes** no mesmo documento.

---

## 2. Anatomia do documento

| Seção | Conteúdo | Linhas | % |
| --- | --- | ---: | ---: |
| Cabeçalho + "Como usar em chat novo" + índice | prompt pronto, data, referências | 1–57 | 2% |
| §1 Missão e critérios de aceitação | entregáveis A/B/C + 5 critérios | 58–80 | 1% |
| §2 Especificação das saídas | HTML §8/§9, capítulo do PDF, PDF dedicado (7 pp.) | 81–130 | 2% |
| §3 Contexto do site | atores, sistemas externos, 6 módulos | 131–179 | 2% |
| **§4 Dados autoritativos** | **JSON: `diagram`, `stats`, `actors`, `externals`, `modules[48 UC]`, `actorInfo`, `externalInfo`, `catalog[48]`** | **180–1317** | **50%** |
| §5 Regras do layout UML | estrutura visual, geometria normativa, estilo | 1318–1375 | 3% |
| §6 Catálogo / resumo / lacunas | 48 linhas + resumo por módulo + 9 lacunas | 1376–1457 | 4% |
| §7 Integração no pipeline | comandos e fluxo de regeneração | 1458–1475 | 1% |
| §8 Validação | checklist de 6 itens | 1476–1486 | 0% |
| §9 Manutenção | 5 regras de manutenção | 1487–1496 | 0% |
| Apêndice A | `usecase-core.mjs` completo (idêntico ao arquivo real) | 1497–1982 | 21% |
| Apêndice B | trechos de integração nos 3 geradores | 1983–2281 | 13% |

Dois blocos `json` ocupam 524 + 590 linhas — e o array `catalog` (§4) repete integralmente o array `modules`
(§4), que por sua vez é repetido na tabela de §6.1. São **4 representações dos mesmos 48 UC** no mesmo arquivo.

---

## 3. Verificações executadas

Tudo abaixo foi checado por script, não por inspeção visual.

| # | Verificação | Resultado |
| --- | --- | --- |
| 1 | 48 UC · 6 módulos · 4 atores · 5 externos · 9 lacunas | ✅ `{total:48, modules:6, atores:4, externos:5, parciais:9}` |
| 2 | IDs `UC01`–`UC48` únicos e sem buracos | ✅ 48 IDs únicos, contíguos |
| 3 | UC por módulo (8·10·8·7·9·6) e faixas UC01–08 / 09–18 / 19–26 / 27–33 / 34–42 / 43–48 | ✅ igual ao §6.2 |
| 4 | Lacunas = UC06, UC07, UC14, UC18, UC21, UC22, UC31, UC33, UC39 | ✅ idêntico em §4, §6.1, §6.3, HTML (9 `span.flag`) e diagrama (9 pontos âmbar) |
| 5 | Atores declarados × usados | ✅ nenhum órfão, nenhum não declarado |
| 6 | 5 sistemas externos, todos associados a ≥1 UC | ✅ google, supabaseAuth, postgres, pix, correios |
| 7 | Relações «include» e inexistentes/dangling | ✅ apenas `UC16 → UC15`, dentro do módulo, sem dangling |
| 8 | Apêndice A == `scripts/lib/usecase-core.mjs` | ✅ **byte a byte idêntico** (481 linhas) |
| 9 | HTML: 14 seções, diagrama = §8, catálogo = §9, 48 IDs, 6 grupos, SVG inline | ✅ |
| 10 | `casos-de-uso.pdf` | ✅ **7 páginas** (confirmado por inflate dos streams) |
| 11 | `fluxograma-usuario.pdf` | ✅ **18 páginas** |
| 12 | §3.2 "5 tabelas + 20 políticas RLS" | ✅ `migrate-supabase.mjs`: 5 `CREATE TABLE` + 20 `CREATE POLICY` |
| 13 | §5.2 constantes de geometria (`bandW`, `laneLeft`, `colGap`, `pillH/Gap`, `bandGap`, `top`, fontes) | ✅ conferem com o objeto `UML` do código |

**Nada disso está errado no documento.** Os achados a seguir são de outra natureza.

---

## 4. Achados

### A1 · «Média» — Integrações externas superdeclaradas; contador de lacunas subestima a realidade

O §3.2 e o diagrama descrevem **Transportadora** e **Banco / PIX** como sistemas externos integrados, e
`UC13`, `UC17` e `UC48` estão **sem `flag`** (ou seja, contam como "implementados"). O código diz outra coisa:

- **Frete (`UC13`, `UC48`, `components/ProductDetailModal.tsx`)** — `handleCalculateShipping()` só verifica
  `cep.length >= 8` e revela valores **fixos no JSX**: `SEDEX Express ... R$ 42,50` e `PAC Padrão ... R$ 24,90`.
  Não há chamada a nenhuma API de transportadora, cotação por peso/CEP/valor ou prazo calculado.
- **PIX (`UC17`, `CheckoutModal.tsx` / `lib/store.tsx` / `services/orderService.ts`)** — o "código copia-e-cola"
  é uma string EMV **gerada localmente** (`00020126580014br.gov.bcb.pix0136${Math.random()...}`) e o QR Code vem de
  um serviço de terceiros (`api.qrserver.com`), não de um PSP/banco. O desconto de 5% é real
  (`subtotal * 0.05`), mas a "integração bancária" não existe.

Comparação que reforça o contraste: **Google OAuth** (real, via `sb.auth.signInWithOAuth({provider:'google'})`
+ `OAUTH_AUTH_SUCCESS`) e **PostgreSQL/RLS** (5 tabelas + 20 políticas, verificado) são integrações legítimas;
por isso o diagrama usa o mesmo peso visual para coisas de naturezas muito diferentes.

**Impacto:** um chat/dev recriando o catálogo a partir deste arquivo vai (a) tratar frete e PIX como prontos e
(b) não enxergar a dívida técnica real. Correção mínima: `flag: 'mockado'` em UC13/UC17/UC48 — o que levaria o
total de **9 para 12 lacunas** (e exigiria ajuste das contagens em §1, §6.2, §6.3, §8, §3.2 e no `stats`).

### A2 · «Média» — `"side": "bottom"` do lojista contradiz §5 e é código morto

§4 traz `"lojista": { ..., "side": "bottom" }`, mas:

- §5.1.4 afirma: *"à esquerda da fronteira ficam visitante, atleta e lojista"* — que é o que **de fato acontece**;
- o renderizador só distingue `right` de todo o resto: `lanes[def.side === 'right' ? 'right' : 'left']`
  (`usecase-core.mjs:341`). O valor `'bottom'` **nunca** produz um corredor inferior.

Ou seja: o dado autoritativo (§4) contradiz a regra de layout (§5) e a implementação — o documento mostra os dois
lados sem apontar a contradição. Um dev seguindo §4 literalmente tentaria posicionar o lojista embaixo.

### A3 · «Média» — `col`/`row` dos módulos são documentados como normativos, mas nunca são lidos

§4 define cada módulo como uma grade (`col: 0..2`, `row: 0..1`), sugerindo layout 3×2. O renderizador **ignora
esses campos**: empilha as faixas na ordem do array (`y += b.h + bandGap`). Confirmei por busca no código: as
únicas ocorrências de `col:`/`row:` são as declarações em `USE_CASE_MODULES`; nenhum gerador as consome.
São campos mortos que o documento apresenta como parte dos "dados autoritativos".

### A4 · «Média» — §5.1.5 promete associação "terminando em elbow até a lateral da pílula"; na prática para na borda da faixa

O item 5 de §5.1 diz que a linha do ator "entra na faixa pela lateral, terminando em um pequeno *elbow*".
O código desenha apenas `M {spineX},{c.y} H {band.x}` — termina na **borda esquerda da faixa**, sem nenhum
elbow e **sem apontar para pílula alguma**. Consequência prática verificável no SVG publicado: em módulos com
dois atores (ex.: *Descoberta & Compra*, *Oferta & Lojas*, *Conta & Acesso*), as linhas de dois atores chegam ao
mesmo traço de borda e **não é possível ler no diagrama qual UC pertence a qual ator** — a associação é de
*faixa*, não de caso de uso. Isso enfraquece um pouco o valor UML do diagrama e merece ou correção no código
(elbow até `it.x`) ou correção no texto (§5).

### A5 · «Baixa» — O ator "Sistema" não existe, mas é citado em §3.3 e §6.2

- §3.3: *"Plataforma & Integrações — 6 UC (UC43–UC48) · atores: **Sistema**"*;
- §6.2: coluna Atores = **Sistema** para esse módulo;
- §4/§6.1: `actors: []` e catálogo exibe **—**; o critério 2 de §1 fixa **4 atores primários**.

Não há "Sistema" em `UC_ACTORS`. O rótulo vem de `UC_EXTERNALS[*].actor = 'sistema'`, que é só uma **chave de
cor** (`ACTORS['sistema']`) usada para pintar pílulas sem ator primário. As três seções deveriam dizer "acionado
por sistema / sem ator primário".

### A6 · «Baixa» — `colspan="6"` em uma tabela de 4 colunas (bug real, promovido a especificação)

§2.1 especifica `<tr class="group"><td colspan="6">Nome do módulo</td></tr>`, mas o `<thead>` tem **4** colunas
(`ID · Caso de uso · Atores · Onde está no código`). O HTML publicado tem exatamente esse defeito (6 ocorrências
de `colspan="6"`). O navegador "conserta" visualmente, mas a especificação está **documentando um bug** e
propagando-o para quem recriar o artefato.

### A7 · «Baixa» — Regra de quebra de linha da pílula não fecha com a largura útil: UC11 estoura

Medição x layout (verificado no SVG publicado):

- A quebra usa `wrapText(name, bandW/2 − 76, 11.8px)` = **494 px** de referência (`charW ≈ 6,82 px` → 72 chars).
- A pílula tem `530 px` de largura e o nome começa em `x + 50`, com o ponto âmbar em `x + w − 16` ⇒ largura
  realmente disponível = **464 px (68 chars)**.
- Resultado concreto: **UC11** gera uma linha de **72 chars (~491 px)** — `rect` termina em `818` e o texto
  começa em `338`, projetando o fim em ~`829`, **~11 px fora da pílula**.

Há 30 px de folga entre a largura usada no cálculo e a disponível — o defeito é estrutural, apenas ainda não
atingiu outros nomes.

### A8 · «Baixa» — Tabela normativa de §5.2 incompleta

Faltam duas constantes que afetam o resultado:
- `bandPadX = 18` (define `pillW = (bandW − 2·bandPadX − colGap)/2 = 530` e o recuo do cabeçalho);
- o **offset de +18 px por ator** no corredor esquerdo (`spineX = actorSpineX + idx*18` → 158 / 176 / 194).
  §5.2 lista `actorSpineX = 158` como se fosse único, quando só o primeiro ator usa esse X.

Também não são mencionados: `legendY = 52`, espaçamento da legenda (430 px), `width = boundaryRight + 300`
(citado no algoritmo, mas não na tabela) e a direção do algoritmo `spread()` (empurra apenas para baixo —
pode deslocar um ator para longe da faixa que ele mais usa).

### A9 · «Baixa» — Casos de uso sobrepostos / atores questionáveis

- **UC13 × UC48**: mesma feature ("frete por CEP" no mesmo arquivo), dividida em dois UCs — e só UC48 recebe
  `ext: 'correios'`. Ou são um UC só, ou UC13 deveria referenciar UC48 via «include».
- **UC04 × UC05**: ambos tratam do *role switcher* de demonstração (`lib/store switchRole()` / `Sidebar.tsx`),
  sem fronteira clara entre "acesso rápido" e "simular outro papel".
- **UC24** ("Exibir catálogo e perfil público da loja") lista **lojista** como ator — um UC de exibição pública
  iniciado pelo lojista é discutível; é também o caso que evidencia a ambiguidade de A4 (banda com 2 atores).

### A10 · «Baixa» — `src` nem sempre aponta um arquivo real

O critério 3 de §1 exige "o arquivo real". Contudo há `app/api/*`, `public/products/*` (curingas) e
`lib/store.tsx · orders` (não é uma função — é um campo de estado). São 3 de 48 entradas de baixa
rastreabilidade, justamente nos UCs de "Plataforma & Integrações".

### A11 · «Privacidade» — E-mails master dentro de um documento feito para ser colado em chats

§3.1 lista os 4 e-mails da allowlist de admin (`mattheusxmljz@gmail.com`, `professorchines2026@gmail.com`,
`operacaoamd@gmail.com`, `admin@coremotiom.com`). Eles já existem no código (`lib/store.tsx`, `lib/db-queries.ts`),
mas **reproduzi-los em um doc de handoff** amplia a exposição — e como esse texto é feito para ser colado em
chats de IA, ele sai do controle do repositório. Sugestão: referenciar "4 e-mails master definidos em
`lib/db-queries.ts` (linhas 5–8)" e manter a lista só no código.

### A12 · «Estrutura» — 50% do arquivo é redundância

O mesmo UC aparece como: (1) objeto em `modules[].uc`, (2) objeto em `catalog[]`, (3) linha da tabela §6.1,
(4) linha (se lacuna) de §6.3. Somando o Apêndice A (que duplica um arquivo do repositório), ~**71% do arquivo**
é conteúdo derivado. Para o propósito declarado (anexar a um chat), isso custa contexto: ~91 KB ≈ 23k tokens, dos
quais ~16k seriam regeneráveis. Uma opção é gerar uma variante "enxuta" (sem Apêndice A e com o JSON apenas em
`modules`) mantendo a versão completa atual — ou aceitar o custo conscientemente, já que o objetivo é
autocontenção.

---

## 5. O que está sólido (e deve ser preservado)

- **Autocontenção real:** prompt de uso, contexto, dados, regras de layout, validação e *todo* o código-fonte.
  Confirmei que o Apêndice A reproduz o módulo exatamente — sem risco de cópia desatualizada.
- **Rastreabilidade numérica:** 48/6/4/5/9 reconstruídos a partir do código batem com §1, §4, §6.2, §8, HTML e PDF.
- **Determinismo documentado:** §5.2 traz constantes verificáveis e uma ordem de execução do algoritmo que
  descreve fielmente a maior parte de `renderUseCaseSvg()`.
- **Um desenho, três saídas:** HTML e PDFs usam o mesmo `renderUseCaseSvg()` (§7) — o diagrama do PDF confirmado
  com 7 páginas é o recorte correto.
- **Manutenção em uma fonte:** §9 aponta para `usecase-core.mjs` como fonte de verdade, o que se sustenta: mudar
  um UC recalcula contagens, legenda, catálogo e resumo automaticamente.

---

## 6. Recomendações priorizadas

| Prioridade | Ação | Onde |
| --- | --- | --- |
| P1 | Adicionar `flag` em UC13/UC17/UC48 (ex.: `mockado`) ou, se a intenção é manter, criar campo explícito `integração: simulada`; atualizar `stats.parciais` e as tabelas §6.2/§6.3/§8 | `usecase-core.mjs`, §1/§6/§8 |
| P1 | Corrigir `colspan="6"` → `colspan="4"` (e refletir em §2.1) | `generate-user-flowchart.mjs`, §2.1 |
| P2 | Alinhar §5.1.5 com a implementação (elbow até a pílula) **ou** corrigir o texto para "associação no nível da faixa" | §5 / `renderUseCaseSvg` |
| P2 | Remover/padronizar `side: 'bottom'` e decidir o destino de `col`/`row` (usar ou remover dos dados e de §4) | `usecase-core.mjs`, §4 |
| P2 | Unificar a regra de quebra de linha (usar a largura real disponível, 464 px) para eliminar o estouro do UC11 | `usecase-core.mjs` |
| P3 | Trocar "Sistema" por "acionado por sistema (sem ator primário)" em §3.3/§6.2; documentar `bandPadX`/offset de ator em §5.2 | §3.3/§5.2/§6.2 |
| P3 | Substituir os e-mails master por referência ao arquivo | §3.1 |
| P3 | Avaliar fusão de UC13+UC48 e de UC04+UC05; revisar atores de UC24 | `usecase-core.mjs` |

Nenhuma dessas ações exige mudar o desenho ou o pipeline — todas são ajustes de dados/metadados que os
geradores propagam sozinhos (`npm run flow && npm run mestres`).

---

## 7. Checklist de §8 — reavaliado

| Item de §8 | Situação |
| --- | --- |
| Contagens 48 · 6 · 4 · 5 · 9 | ✅ verdadeiro **para o que o documento conta** (ver A1: o critério de lacuna é frouxo) |
| IDs únicos no diagrama e no catálogo | ✅ |
| Nenhuma associação cruza faixa; nenhum rótulo sobreposto | ✅ (conferi as coordenadas dos 9 glifos; espaçamentos 112/92 px respeitados) |
| 5 integrações externas associadas a ≥1 UC | ✅ estruturalmente — ⚠️ semanticamente (A1) |
| `casos-de-uso.pdf` com 7 páginas e sumário correto | ✅ 7 páginas |
| HTML sem recursos externos, SVG inline, 48 linhas | ✅ |

---

## 8. Conclusão

`mestre-casos-de-uso.md` é um documento **numericamente confiável e tecnicamente generoso** — o que ele afirma
sobre *o próprio acervo* (contagens, IDs, lacunas, layout, artefatos) confere com o código e com os PDFs/HTML
publicados. O ponto fraco não é integridade, é **fidelidade ao estado real do produto**: o catálogo trata como
"implementado sem ressalva" três casos que dependem de valores fixos (frete) ou de um payload gerado localmente
(PIX), e o §5 descreve detalhes de roteamento que o renderizador não executa. Ajustar essa fidelidade (P1) e
limpar os dados mortos (P2) eleva o documento de "bom handoff" para "especificação que se pode implementar sem
surpresas".
