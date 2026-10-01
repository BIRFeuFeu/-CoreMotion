# GOVERNANÇA E GUIA DE ENGENHARIA — PROJETO COREMOTIOM

Este documento estabelece os padrões técnicos, regras de ramificação (Git Flow), qualidade de código e arquitetura para a equipe de 5 desenvolvedores do CoreMotiom.

---

## 1. Stack Tecnológica
- **Framework**: Next.js 15+ (App Router, Server Components & Server Actions)
- **Linguagem**: TypeScript em modo estrito (`strict: true`, sem `any` injustificado)
- **Design System**: Tailwind CSS v4 + shadcn/ui (Radix UI primitives em `components/ui/`)
- **Backend-as-a-Service**: Supabase (PostgreSQL 15+, Auth, Storage, RLS)
- **Validação de Schemas**: Zod (`lib/schemas/`)
- **Formulários**: React Hook Form integrado via `@hookform/resolvers/zod`
- **CI/CD**: GitHub Actions (`.github/workflows/ci.yml`) + Vercel Hosting

---

## 2. Git Flow Pragmático (Equipe de 5 Pessoas)

### Branch `main` Protegida
- A branch `main` representa o ambiente de produção estável.
- **Commits diretos na `main` são estritamente proibidos.**
- Todo merge para a `main` exige:
  1. Pull Request (PR) aberto.
  2. Pelo menos 1 revisão e aprovação (code review) de outro membro da equipe.
  3. Sucesso completo na pipeline do GitHub Actions (`npm run ci`).

### Padrão de Nomenclatura de Branches
Crie sua branch a partir da `main` atualizada seguindo a convenção:
- `feature/nome-da-funcionalidade` (Ex.: `feature/auth-supabase`, `feature/escrow-pix`)
- `fix/descricao-do-bug` (Ex.: `fix/checkout-total-calculation`)
- `refactor/area-modificada` (Ex.: `refactor/products-services`)

### Ciclo de Desenvolvimento
```bash
# 1. Atualizar a main
git checkout main
git pull origin main

# 2. Criar branch de trabalho
git checkout -b feature/minha-feature

# 3. Desenvolver e validar localmente
npm run lint
npm run type-check
npm run build

# 4. Commit e push
git commit -m "feat(auth): adiciona validacao com zod no login"
git push origin feature/minha-feature
```

---

## 3. Banco de Dados e Migrações (Supabase Governance)

1. **Alterações Estruturais**:
   - Proibido alterar schemas em produção diretamente via dashboard sem migração.
   - Todas as migrações devem ser versionadas em:
     `supabase/migrations/<timestamp>_<nome_da_migracao>.sql`
2. **Tipagem Automática (End-to-End Type Safety)**:
   - Os tipos do Supabase estão em `types/supabase.ts`.
   - Para regenerar a tipagem após uma migração:
     ```bash
     npm run types:supabase
     ```
3. **Row Level Security (RLS)**:
   - Toda nova tabela DEVE ter RLS ativado: `ALTER TABLE nome_tabela ENABLE ROW LEVEL SECURITY;`.
   - Visitantes: apenas leitura de dados públicos.
   - Usuários autenticados: acesso restrito aos seus próprios dados (`auth.uid() = user_id`).
   - Admin Mestre (`mattheusxmljz@gmail.com`): acesso via função protegida `is_admin()`.

---

## 4. Estrutura de Diretórios de Componentes

```text
components/
├── ui/           # Primitivas shadcn/ui (Button, Dialog, Badge, Input, Card, Tabs, Form, etc.)
├── auth/         # Telas e modais de login, cadastro, recuperação de conta
├── marketplace/  # Cards de produtos, filtros técnicos, vitrine esportiva
├── stores/       # Painel do lojista, verificação com CNPJ, catálogo oficial
├── admin/        # Auditoria administrativa, moderação e métricas
└── shared/       # Header, Footer, EmptyStates, Skeletons
```

---

## 5. Documentação de Fluxos e Casos de Uso

A documentação viva das jornadas do produto tem duas saídas, ambas geradas por script:

| Artefato | Conteúdo |
| --- | --- |
| `docs/fluxograma-usuario.html` | documento navegável (autocontido, sem CDN): 7 fluxos de usuário, diagrama UML de casos de uso, catálogo de 48 UC, permissões, máquina de estados, lacunas e arquivos-chave |
| `docs/fluxograma-usuario.pdf` | o mesmo conteúdo em PDF A4, com capa, sumário numerado e os diagramas embutidos em alta resolução |
| `docs/casos-de-uso.pdf` | recorte só de casos de uso: atores e sistemas externos, diagrama UML, catálogo dos 48 UC, resumo por módulo e lacunas |

```bash
npm run flow        # gera HTML + os dois PDFs
npm run flow:html   # apenas docs/fluxograma-usuario.html
npm run flow:pdf    # docs/fluxograma-usuario.pdf e docs/casos-de-uso.pdf
npm run flow:uc     # apenas docs/casos-de-uso.pdf
```

Os arquivos são **gerados** — nunca edite o HTML/PDF à mão. A fonte de verdade é:

```text
scripts/lib/flowchart-core.mjs   # fluxos de usuário (nós, arestas), tabelas de permissões/status/lacunas,
                                 # motor de layout, roteamento ortogonal e renderizador SVG
scripts/lib/usecase-core.mjs     # atores, 48 casos de uso em 6 módulos e o layout do diagrama UML
scripts/lib/pdf-kit.mjs          # mini-kit A4 (texto, tabelas, cartões, imagens, rodapé numerado)
scripts/generate-user-flowchart.mjs      # entrada que produz HTML + manifesto JSON
scripts/generate-user-flowchart-pdf.mjs  # entrada que produz o PDF
```

Regras de manutenção:

1. Ao mudar uma jornada (nova tela, guarda de acesso, status ou gravação no banco), atualize o diagrama
   correspondente em `scripts/lib/flowchart-core.mjs` e rode `npm run flow`.
2. Ao criar/remover uma funcionalidade, atualize os casos de uso em `scripts/lib/usecase-core.mjs`
   (o diagrama, as estatísticas e o catálogo se ajustam automaticamente).
3. O gerador de HTML valida arestas órfãs, nós fora da área e labels sobrepostos; avisos de layout
   aparecem no terminal e devem ser resolvidos antes do commit.
4. Casos de uso com `flag` (e nós âmbar marcados com `(!)` no PDF) documentam lacunas conhecidas;
   ao corrigir a lacuna, remova o marcador e atualize a seção 10 ("Lacunas e riscos").
5. O PDF precisa de `pdf-lib` e `@resvg/resvg-js` (ambos em `devDependencies`). Em ambientes offline,
   aponte `PDF_LIB_PATH` para o módulo `pdf-lib` e `FLOW_PNG_DIR` para uma pasta com os PNGs
   numerados (`01-…png` a `08-…png`) gerados por `FLOW_EMIT_SVG=/tmp/fluxos npm run flow:html`.
