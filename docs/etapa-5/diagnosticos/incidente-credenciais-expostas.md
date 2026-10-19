# Incidente — credenciais expostas em repositório público

**Severidade:** P0 (crítico)
**Status:** ABERTO — depende de ação humana com acesso ao Supabase
**Data do registro:** 19/10/2026
**Registrado por:** Arena (diagnóstico integrado)
**Valores secretos:** deliberadamente omitidos deste documento

---

## 1. O que foi encontrado

| # | Local | O que está exposto | Evidência |
|---|---|---|---|
| I-01 | `lib/db.ts:8-9` | String de conexão PostgreSQL com usuário e senha embutidos; usada como fallback quando `DATABASE_URL` está ausente (`resolveDatabaseUrl`, linhas 20-30) | Leitura de código |
| I-02 | `components/SupabaseConfigModal.tsx:29` | Template de `.env` com a mesma senha do banco, montado dentro de componente `'use client'` | Leitura de código |
| I-03 | Bundle de produção | A senha aparece **2 vezes** em `.next/static` e 3 vezes em `.next/server` após `npm run build` | Busca por string no build, sem imprimir o valor |
| I-04 | Repositório GitHub | O repositório é público (`gh repo view ... isPrivate=false`) e o commit de referência contém I-01 e I-02 | `gh repo view` + `git log` |
| I-05 | `lib/supabase.ts:3-4` e `services/supabaseClient.ts:3-4` | URL e **anon key** do Supabase embutidas como fallback | Leitura de código |

**Sobre a anon key:** a chave `anon` é projetada para ser pública e não concede acesso além das
políticas RLS. O problema grave é a **senha do Postgres** (I-01/I-02), que permite conexão direta
ao banco fora do Supabase Auth e das políticas RLS. A anon key só se torna crítica combinada com
as políticas RLS frouxas descritas em `auditoria-backend.md` (B-06/B-07/B-08).

---

## 2. Por que isso é P0

1. Quem tiver a senha pode conectar diretamente ao banco como usuário `postgres`, ignorando
   autenticação, RLS e todas as regras de aplicação.
2. A credencial está no GitHub público **e** no JavaScript entregue a qualquer visitante.
3. Remover o código não invalida a credencial: ela continua no histórico Git e em cópias/forks.
4. O projeto afirma "custódia financeira" e armazena pedidos/endereços/e-mails; o impacto
   potencial inclui leitura e alteração de dados pessoais.

---

## 3. Contenção imediata (requer pessoa com acesso)

Ordem recomendada. Nada aqui deve ser feito pelo Arena sem autorização explícita.

- [ ] **1. Rotacionar a senha do banco no Supabase** (Database Settings → Reset database password).
      Usar senha nova, forte e exclusiva; não reutilizar a antiga.
- [ ] **2. Atualizar `DATABASE_URL`** nos ambientes de execução (AI Studio/Vercel/local) com a nova
      credencial, usando o gerenciador de segredos — nunca no código.
- [ ] **3. Revisar logs de acesso do banco** desde a publicação do commit `4f2c1d8` (16/10/2026):
      IPs desconhecidos, conexões fora do pooler esperado, alterações em `profiles/users`,
      `orders`, `products` e `stores`.
- [ ] **4. Fazer backup** do banco antes de qualquer limpeza ou correção de dados.
- [ ] **5. Verificar se há ambiente publicado** (Vercel/AI Studio) servindo o bundle com a senha;
      se sim, tirar do ar ou aplicar a correção imediatamente.
- [ ] **6. Revogar/rotacionar a anon key** se houver dúvida sobre exposição de chaves privilegiadas
      em outros arquivos ou histórico. A anon key sozinha não é segredo, mas a rotação é barata.

---

## 4. Correção no código (lote B0 — aguarda autorização)

- [ ] Remover `DEFAULT_DATABASE_URL` e o fallback silencioso de `lib/db.ts`.
      Sem `DATABASE_URL`, a aplicação deve falhar de forma explícita e segura.
- [ ] Remover `DEFAULT_SUPABASE_URL`/`DEFAULT_SUPABASE_ANON_KEY` de `lib/supabase.ts` e
      `services/supabaseClient.ts`; exigir variáveis de ambiente.
- [ ] Remover o template de `.env` de `components/SupabaseConfigModal.tsx` ou substituí-lo por
      instruções sem valores, carregadas do servidor.
- [ ] Não usar `NEXT_PUBLIC_*` para nada secreto; manter a service role key apenas no servidor.
- [ ] Atualizar `.env.example` com nomes e comentários, sem valores reais.
- [ ] Ativar **secret scanning / push protection** no GitHub.
- [ ] Adicionar verificação de CI que falhe se padrões de credencial aparecerem no diff.

## 5. Limpeza do histórico Git (somente depois da rotação)

A credencial antiga continuará válida enquanto não for rotacionada. Depois da rotação:

- [ ] Reescrever o histórico (`git filter-repo` ou BFG) para remover o arquivo/trecho.
- [ ] Coordenar force-push com todos os clones e branches abertas (inclusive branches de sessões
      Arena antigas).
- [ ] Revisar PRs, issues e artefatos que possam conter a credencial.
- [ ] Confirmar com o GitHub a remoção de caches/forks, se aplicável.

**Não fazer force-push sem combinar com a equipe**: pode apagar trabalho de outras sessões.

---

## 6. O que este relatório não faz

- Não reproduz a senha, a URL completa com credenciais ou a anon key.
- Não conecta ao banco real, não altera dados e não rotaciona credenciais.
- Não afirma que houve acesso indevido — isso só os logs do Supabase podem mostrar.

---

## 7. Critério de encerramento

1. Senha rotacionada e ambientes atualizados.
2. Logs revisados e qualquer anomalia registrada.
3. Código sem credenciais e build cliente verificado sem a string antiga.
4. Histórico limpo ou decisão registrada de mantê-lo com a credencial já inválida.
5. Revisão de segurança refeita por outra pessoa da equipe.
