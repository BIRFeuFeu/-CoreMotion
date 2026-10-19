# Matriz de permissões — proposta para aprovação

**Projeto:** CoreMotion — Etapa 5
**Data:** 19/10/2026
**Status:** RASCUNHO. **Nada foi implementado.** As decisões marcadas com ❓ precisam de
aprovação da equipe antes de qualquer migração ou alteração de servidor.
**Base:** auditoria em `auditoria-backend.md` e requisito da Etapa 5 de hierarquia
Administrador → Supervisor → Usuário.

---

## 1. Situação atual (resumo)

- Papéis no código: `visitor | user | seller | admin` (`lib/types.ts:1`).
- **Supervisor não existe** em nenhum arquivo.
- `admin` é decidido no cliente por e-mail fixo/prefixo (`lib/store.tsx:32-48`,
  `services/auth.ts:10-20`) e no banco por e-mail/prefixo e metadado de cadastro
  (`supabase/migrations/...:159-165`).
- Não há verificação de sessão nas APIs; o papel do cliente não é confiável.
- `localStorage` guarda o usuário, inclusive `role` (`lib/store.tsx:250 e 351`), e o painel
  admin confia nesse objeto (`components/AdminDashboard.tsx:78`).

**Consequência:** hoje a matriz efetiva é “quem consegue abrir o painel no navegador manda”.
Isso não atende ao requisito de hierarquia com permissões reais.

---

## 2. Proposta de modelo

### 2.1 Papéis de acesso (hierarquia exigida)

| Papel | Definição | Observação |
|---|---|---|
| **Visitante** | Não autenticado | Só leitura pública |
| **Usuário** | Conta autenticada | Compra, vende C2C, participa da comunidade |
| **Supervisor** | Conta designada pela administração | Moderação e verificação; **não** gerencia papéis nem credenciais |
| **Administrador** | Conta designada pela administração | Administra usuários, papéis e configuração; sujeito a auditoria |

### 2.2 Lojista

Proposta: **lojista não é um nível de hierarquia**. É um **perfil de negócio** de um Usuário que
possui loja (`stores.owner_id`). Assim:

- `role` passa a ser `user | supervisor | admin` (+ visitante como ausência de sessão);
- `seller`/`lojista` deixa de ser papel de acesso e vira **vínculo com loja**;
- permissões de loja derivam de `owner_id`, não de `role`.

> ❓ **Decisão D-01:** aceitar esse modelo ou manter `seller` como papel separado?
> Recomendação: aceitar o modelo acima; preserva o lojista como ator de negócio sem criar um
> quarto nível que o requisito não pede.

---

## 3. Matriz proposta

Legenda: ✅ permitido · 🔸 somente sobre recurso próprio · ❌ negado · ❓ pendente de decisão

| Capacidade | Visitante | Usuário | Lojista (dono de loja) | Supervisor | Administrador |
|---|---|---|---|---|---|
| Ver catálogo, lojas, produtos e conteúdo público | ✅ | ✅ | ✅ | ✅ | ✅ |
| Criar conta / entrar | ✅ | — | — | — | — |
| Comprar e finalizar pedido | ❌ | ✅ | ✅ | ✅ | ✅ |
| Ver os próprios pedidos e dados | ❌ | 🔸 | 🔸 | 🔸 | 🔸 |
| Anunciar produto C2C | ❌ | ✅ | ✅ | ✅ | ✅ |
| Editar/excluir o próprio anúncio | ❌ | 🔸 | 🔸 | 🔸 | 🔸 |
| Criar loja | ❌ | ✅ (vira lojista) | — | ❓ D-02 | ❓ D-02 |
| Editar dados e produtos da própria loja | ❌ | 🔸 | 🔸 | ❌ | ✅ (moderação) |
| Solicitar verificação da loja | ❌ | 🔸 | 🔸 | ❌ | ❌ |
| Aprovar/recusar verificação de loja | ❌ | ❌ | ❌ | ✅ (D-03) | ✅ (D-03) |
| Publicar post/comentário | ❌ | ✅ | ✅ | ✅ | ✅ |
| Editar/excluir o próprio post/comentário | ❌ | 🔸 | 🔸 | 🔸 | 🔸 |
| Denunciar conteúdo | ❌ | ✅ | ✅ | ✅ | ✅ |
| Moderar conteúdo e denúncias | ❌ | ❌ | ❌ | ✅ | ✅ |
| Suspender anúncio/post de terceiro | ❌ | ❌ | ❌ | ✅ | ✅ |
| Banir/desbanir conta | ❌ | ❌ | ❌ | ❌ (D-04) | ✅ |
| Alterar papel de usuário | ❌ | ❌ | ❌ | ❌ | ✅ (com travas) |
| Listar usuários e e-mails | ❌ | ❌ | ❌ | ❓ D-05 | ✅ (mínimo necessário) |
| Ver todos os pedidos da plataforma | ❌ | ❌ | ❌ | ❓ D-06 | ✅ |
| Alterar status de pedido/pagamento | ❌ | ❌ | 🔸 (só próprio envio, se aprovado) | ❌ (D-06) | ✅ |
| Ver financeiro da própria loja | ❌ | 🔸 | 🔸 | ❌ | ❌ |
| Ver financeiro consolidado (sem detalhe por loja) | ❌ | ❌ | ❌ | ❌ | ❓ D-07 |
| Configurar integrações e segredos | ❌ | ❌ | ❌ | ❌ | ✅ (D-08) |
| Consultar log de auditoria | ❌ | ❌ | ❌ | ❌ | ✅ |
| Usar modo demonstrativo | — | — | — | — | — (modo separado, D-09) |

> O Administrador **não** deve editar o próprio papel nem excluir a própria conta (D-10).
> Nenhum papel pode ler segredos de integração pela interface.

---

## 4. Invariantes obrigatórias (independentes das decisões)

1. **Papel só é atribuído no servidor.** `role` do cliente, do `localStorage` ou do corpo da
   requisição é ignorado.
2. **Sem autopromoção.** Cadastro sempre cria `user`; ninguém altera o próprio papel.
3. **Propriedade sempre verificada.** `seller_id`, `owner_id`, `user_id` e `author_id` vêm da
   sessão, nunca do payload.
4. **Supervisor não promove ninguém**, não altera papéis, não acessa segredos e não exclui contas.
5. **Último administrador protegido**: não pode ser rebaixado nem removido; deve existir
   procedimento de bootstrap documentado.
6. **Toda ação sensível é auditada**: mudança de papel, banimento, exclusão, verificação de loja,
   alteração de pedido/pagamento — com autor, data, alvo e motivo.
7. **Menor privilégio e minimização**: listagens administrativas retornam campos necessários,
   não o registro inteiro; e-mails só quando indispensável.
8. **Modo demonstrativo é separado do ambiente real**: sem sessão de admin fictícia em produção,
   sem dados demo apresentados como reais.
9. **A regra vale no servidor e no banco**: RLS e policies não podem permitir o que a interface nega.
10. **Nenhuma regra por e-mail pessoal ou prefixo**: identidade administrativa é atribuída por
    operação auditada, não pelo endereço.

---

## 5. Decisões pendentes de aprovação

| ID | Decisão | Opções | Recomendação |
|---|---|---|---|
| D-01 | Lojista é papel ou vínculo com loja? | (a) papel `seller`; (b) vínculo `stores.owner_id` | (b), com `role = user/supervisor/admin` |
| D-02 | Supervisor/Admin podem criar loja? | sim / não | Não; criar loja é ação de usuário/negócio |
| D-03 | Quem aprova verificação de loja? | Supervisor / Admin / ambos | Supervisor aprova; Admin pode reverter com auditoria |
| D-04 | Supervisor pode banir conta? | sim / não | Não; pode suspender conteúdo e abrir denúncia |
| D-05 | Supervisor vê lista de usuários? | completa / mínima / não | Mínima, apenas para moderação, sem e-mails |
| D-06 | Supervisor vê/edita pedidos? | tudo / somente leitura / não | Somente leitura e apenas campos operacionais |
| D-07 | Admin vê financeiro por loja? | sim / agregado / não | Agregado; detalhe por loja fica com o titular |
| D-08 | Quem administra segredos? | Admin / responsável técnico | Responsável técnico fora da interface; nunca no cliente |
| D-09 | Como isolar o modo demo? | rota separada / env flag / remover | Env flag + rota/banner explícito, sem contas reais |
| D-10 | Admin pode se rebaixar/excluir? | sim / não | Não; exige outro admin e auditoria |

---

## 6. O que precisa mudar para implementar (depende de aprovação)

1. `lib/types.ts` — `UserRole` sem `visitor`/`seller` como papéis de acesso (ou manter compatibilidade
   temporária mapeada).
2. Migração incremental — reconciliar `public.users` e `public.profiles`; incluir `supervisor`;
   travas de `role`; policies e grants revisados.
3. `lib/db-queries.ts` — remover `isMasterAdminEmail` e a promoção por metadado; CRUD com filtros
   de autorização.
4. `services/auth.ts` e `authService.ts` — unificar; nunca concluir login sem sessão válida.
5. APIs e Server Actions — helper de sessão; validação Zod; respostas 401/403; auditoria.
6. Frontend — remover demo admin/troca de papel; menus derivados do papel retornado pelo servidor;
   estados de acesso negado.

**Nada disso deve ser executado antes da aprovação desta matriz e do lote B0 de credenciais.**

---

## 7. Critério de aceite da matriz

- [ ] Equipe aprovou D-01 a D-10 (ou registrou outra decisão).
- [ ] Matriz reflete os três níveis exigidos e mantém o lojista como ator de negócio.
- [ ] Cada capacidade tem endpoint e verificação de servidor previstos no contrato.
- [ ] Existem casos de teste positivos e negativos para cada papel.
- [ ] Nenhuma permissão depende de e-mail, `localStorage` ou botão escondido.
