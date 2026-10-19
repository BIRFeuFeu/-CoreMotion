# Pessoa 1 — Identidade, acesso e administração

**Frente independente.** Entrega a hierarquia Administrador → Supervisor → Usuário de ponta a
ponta: tela, servidor e banco. Não espera conclusão, revisão ou autorização de outra frente.

**Data de referência:** 19/10/2026
**Branch da sessão:** `arena/92deaf3d-coremotion`

## Escopo

| Camada | O que está sob responsabilidade desta frente |
|---|---|
| Interface | Cadastro, login, recuperação de senha, sessão, menu por papel, painel administrativo, estados de acesso negado |
| Servidor | Rotas e Server Actions de autenticação e usuários, verificação de sessão, validação, auditoria |
| Dados | Papéis, migrações incrementais, políticas RLS, scripts de banco, remoção de credenciais |

## Arquivos que esta frente possui

`app/api/users/`, `app/api/auth/`, `app/actions/auth.ts`, `services/auth.ts`,
`services/authService.ts`, `services/supabaseClient.ts`, `lib/schemas/auth.schema.ts`, `lib/store.tsx`, `lib/types.ts`,
`lib/db.ts`, `lib/supabase.ts`, `middleware.ts`, `supabase/migrations/`,
`components/AuthModal.tsx`, `components/admin/`, `components/AdminDashboard.tsx`.

## Insumos já produzidos

- `docs/etapa-5/diagnosticos/backend.md` — achados B-01 a B-08, B-14 e B-15.
- `docs/etapa-5/diagnosticos/incidente-credenciais-expostas.md` — P0, exige ação humana.
- `docs/etapa-5/contratos/matriz-permissoes.md` — proposta de papéis e decisões D-01 a D-10.
- `docs/etapa-5/contratos/contrato-integracao.md` — operações de identidade e administração.

## Como esta frente verifica sozinha

```bash
npm run lint
npm run type-check
npm run build
```

Além disso: testes positivos e negativos do escopo (anônimo → 401; usuário comum → 403;
tentativa de autopromoção; edição de `localStorage`). Registrar comandos e resultados em
`docs/etapa-5/pessoa-1/registro-implementacao.md`.

## Estado atual

- **P0 aberto:** credencial PostgreSQL exposta em `lib/db.ts` e no bundle do cliente.
- **P0 aberto:** rotas administrativas sem sessão; login aceita senha inválida; autopromoção
  por metadado e por RLS; privilégio por e-mail/prefixo.
- **Ausente:** papel `Supervisor` em todo o projeto.
- **Pendente:** banco de teste e decisões D-01 a D-10.

## Próximo passo

1. Aguardar a rotação da credencial por quem tem acesso ao Supabase.
2. Implementar o lote de identidade aprovado: sessão no servidor, papéis, remoção de privilégio
   por e-mail, painel real e migrações.
3. Publicar a matriz de permissões atualizada em `docs/etapa-5/contratos/`.

Nada nesta pasta substitui teste de execução. Não declarar segurança validada sem evidência.
