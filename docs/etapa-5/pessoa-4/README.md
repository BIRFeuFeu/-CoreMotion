# Pessoa 4 — Verificação, publicação e entrega

**Frente independente.** Monta o próprio ambiente de teste com os scripts do repositório e verifica a versão disponível. Não espera repasse, revisão ou liberação de outra frente; se algo não puder ser testado, registra `BLOQUEADO` ou `NÃO EXECUTADO`.

**Estado:** NÃO INICIADO nesta rodada.
**Data:** 19/10/2026

Esta pasta foi criada para receber os artefatos de validação e entrega. Nada foi produzido ainda
porque os testes dependem de um ambiente de banco isolado e de decisões da equipe.

## O que já existe como evidência (não é teste funcional)

- `npm run type-check` passou (exit 0).
- `npm run lint` passou com 23 avisos `no-img-element`, 0 erros.
- `npm run build` passou (Next.js 15.5.28).
- `GET /` respondeu 200 em execução local.
- `GET /api/products`, `/api/stores` e `/api/users` responderam 500 por bloqueio de rede do
  sandbox ao Supabase — **não** por falha de código comprovada.

Esses resultados estão registrados em `docs/etapa-5/STATUS-EXECUCAO.md`.

## Bloqueios atuais

- [ ] Ambiente de teste isolado ainda não montado (é tarefa desta frente, não de outra pessoa).
- [ ] Credencial do banco exposta (P0) — exige ação humana de quem tem acesso ao Supabase antes de apontar qualquer ambiente para o banco real.
- [ ] APIs sem autenticação: os casos de autorização serão registrados como `FALHOU` até que o escopo de identidade seja corrigido; o teste é desta frente e não depende de liberação de outra pessoa.
- [ ] Não existe `README.md` na raiz do repositório.
- [ ] Lockfile é `bun.lock`; não há `package-lock.json`. Decidir o gerenciador antes de documentar.
- [ ] Nenhum registro real de Daily Scrum foi fornecido.

## Artefatos planejados (ainda não criados)

```
pessoa-4/
  plano-testes.md
  relatorio-testes.md
  backlog-falhas.md
  daily-scrum.md
  checklist-entrega.md
  entrega-final.md
  apresentacao/
```

## Regras

- Usar os status PASSOU, FALHOU, BLOQUEADO e NÃO EXECUTADO — nunca “aprovado” por leitura de código.
- Registrar falhas e retestes; não apagar histórico para produzir relatório positivo.
- Não inventar reuniões, presença, imagens ou links publicados.
- Testes destrutivos apenas em banco isolado e com autorização.
- README e instruções devem ser testados em ambiente limpo; o que não for validado precisa ser
  declarado como limitação.
