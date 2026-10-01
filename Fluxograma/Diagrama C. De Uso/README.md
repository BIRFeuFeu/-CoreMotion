# Fluxograma & Diagrama de Casos de Uso — CoreMotiom

Pasta única com **toda a documentação visual** do CoreMotiom: os 7 fluxos de usuário, o diagrama UML e o
catálogo de 48 casos de uso, em HTML, PDF e Markdown. Tudo aqui é **gerado por script** — não edite estes
arquivos à mão.

## Conteúdo

| Arquivo | Formato | O que é |
| --- | --- | --- |
| [`fluxograma-usuario.html`](fluxograma-usuario.html) | HTML autocontido (sem CDN) | Documento navegável: 14 seções, os 7 diagramas em SVG inline, diagrama UML, catálogo de UC, permissões, máquina de estados, lacunas e mapa de arquivos |
| [`fluxograma-usuario.pdf`](fluxograma-usuario.pdf) | PDF A4 · 18 páginas | O mesmo conteúdo em versão imprimível: capa, sumário numerado, uma página por diagrama (com orientação escolhida por diagrama) e seções de apoio |
| [`casos-de-uso.pdf`](casos-de-uso.pdf) | PDF A4 · 7 páginas | Recorte só de casos de uso: atores e sistemas externos, diagrama UML, catálogo dos 48 UC, resumo por módulo e lacunas |
| [`mestre-fluxograma.md`](mestre-fluxograma.md) | Markdown · ~5.500 linhas | **Arquivo mestre**: dossiê completo do site, dados normativos dos 7 fluxos, regras de layout/render, especificação das saídas e o código-fonte de referência completo |
| [`mestre-casos-de-uso.md`](mestre-casos-de-uso.md) | Markdown · ~2.300 linhas | **Arquivo mestre**: contexto do produto, os 48 UC em JSON, regras do layout UML em faixas, catálogo/resumo/lacunas e o código do núcleo |

### Para que servem os arquivos mestre

São documentos **autocontidos**: contêm tudo o que um chat novo (ou um dev sem acesso ao repositório) precisa
para recriar a documentação — o dossiê do produto, os dados normativos dos diagramas, a especificação de
layout e o código-fonte dos geradores. Cada um abre com um bloco **“Como usar este arquivo em um chat novo”**
e um prompt pronto para copiar e colar.

## Como regenerar

```bash
npm install                 # na raiz do projeto
npm run flow                # HTML + fluxograma-usuario.pdf + casos-de-uso.pdf
npm run mestres             # mestre-fluxograma.md + mestre-casos-de-uso.md
```

Atalhos: `npm run flow:html` (só o HTML) · `npm run flow:pdf` (os dois PDFs) · `npm run flow:uc` (só o PDF de
casos de uso). Rode `npm run flow:pdf` **antes** de `npm run mestres`: os mestres leem a contagem real de
páginas do sidecar `.flowchart-pages.json`.

> Requisitos dos PDFs: `pdf-lib` e `@resvg/resvg-js` (já em `devDependencies`). Em ambiente offline é possível
> apontar `FLOW_PNG_DIR` para uma pasta com os PNGs dos diagramas e `PDF_LIB_PATH` para o módulo `pdf-lib`.

## Onde ficam as fontes

| Arquivo | Papel |
| --- | --- |
| `scripts/lib/flowchart-core.mjs` | **Fonte de verdade dos fluxos**: nós, arestas, tabelas de permissões/estados/lacunas, motor de layout e renderizador SVG |
| `scripts/lib/usecase-core.mjs` | **Fonte de verdade dos casos de uso**: atores, 48 UC em 6 módulos e o layout do diagrama UML |
| `scripts/lib/pdf-kit.mjs` | Mini-kit A4 (texto, tabelas, cartões, imagens, rodapé numerado) sobre `pdf-lib` |
| `scripts/generate-user-flowchart.mjs` | Gera o HTML e o manifesto de dados |
| `scripts/generate-user-flowchart-pdf.mjs` | Gera os dois PDFs (rasteriza os SVGs com `@resvg/resvg-js`) |
| `scripts/generate-master-docs.mjs` | Gera os dois arquivos mestre (usa os templates em `scripts/master-templates/`) |

Fluxo de manutenção completo (e as 14 lacunas documentadas) em [`CONTRIBUTING.md`](../../CONTRIBUTING.md), seção 5.

## Notas

- Os arquivos `.flowchart-data.json` e `.flowchart-pages.json` são artefatos intermediários dos geradores e
  ficam fora do Git (ver `.gitignore`).
- Produto documentado: **CoreMotiom** — `Next.js 15 · React 19 · TypeScript · Supabase / PostgreSQL · Tailwind CSS v4`.
- Repositório de origem: [`BIRFeuFeu/-CoreMotion`](https://github.com/BIRFeuFeu/-CoreMotion).
