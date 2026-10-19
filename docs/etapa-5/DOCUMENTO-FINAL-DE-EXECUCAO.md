# CoreMotion — Documento final de execução da Etapa 5
## Especificação consolidada, responsabilidades e comandos para implementação com Arena IA

**Data:** 16/10/2026 · revisão de papéis em 19/10/2026  
**Finalidade:** concluir e validar o sistema, produzir a documentação do TCC e preparar a entrega ao professor Antonio Carlos.  
**Versão:** 3 — consolidada com o modelo institucional e com a reformulação dos papéis em **quatro frentes independentes**. Substitui o plano inicial como instrução de execução.

**O que significa “final”:** este é o guia consolidado para executar e encerrar o projeto. Não é o TCC final, não certifica implementação, não comprova testes e não registra reuniões como já realizadas. A conclusão do sistema depende da execução e da comprovação descritas aqui.

**Fonte institucional:** `docs/etapa-5/referencias/Modelo-de-TCC.docx.pdf` (20 páginas). A leitura rastreável está em `referencias/LEITURA-DO-MODELO.md`.

**Integridade dos registros:** dados sintéticos são permitidos em ambiente de teste e exemplos explicitamente rotulados. Reuniões, participação, entrevistas, aprovação, screenshots e resultados não podem ser inventados e apresentados como acontecimentos reais. Campos desconhecidos permanecem PENDENTES.

**Como começar:** para concentrar a execução em um chat, use o prompt mestre da seção 13.3. Para quatro chats, use o cabeçalho comum da seção 3.4 e os prompts da função. As exigências específicas do modelo estão na seção 12; evidências e reuniões, na seção 14; arquivos finais e liberação, na seção 15.

---

## 1. O que precisa ser entregue

1. **Sistema funcional**, com hierarquia de **Administrador, Supervisor e Usuário**, autenticação e permissões reais.
2. **Repositório GitHub público** contendo frontend, backend, scripts do banco e um README que permita executar o projeto.
3. **Documento do TCC**, adaptado ao modelo fornecido pelo professor e às normas ABNT aplicáveis.
4. **Diagrama de casos de uso**, legível no documento e na apresentação, acompanhado da explicação dos principais passos de uso. Fluxograma pode complementar, mas não substitui o diagrama UML de casos de uso.
5. **Registro do Daily Scrum**, com imagens reais que identifiquem os integrantes, suas funções e participação.
6. **Apresentação no Google Slides ou PowerPoint Online**. Um arquivo PPTX pode ser usado para importação, mas não substitui o link da apresentação na plataforma exigida.
7. **Resposta final no formato solicitado pelo professor**, com nomes e links públicos conferidos.

### Fontes e pontos ainda a confirmar

- O modelo acadêmico foi recebido e analisado em 16/10/2026: `referencias/Modelo-de-TCC.docx.pdf`. A leitura por página está em `referencias/LEITURA-DO-MODELO.md`. Se houver outro PDF específico de requisitos da Etapa 5, ele ainda precisa ser obtido.
- A expressão “sistema publicado apenas no github.com” precisa ser esclarecida: significa código público, demonstração online ou ambos? **GitHub Pages não executa sozinho o backend Next.js deste projeto.** Não prometer publicação funcional no Pages sem verificar compatibilidade e obter esclarecimento.
- Confirmar prazo, duração da apresentação, exigências de imagens e links de documentos aceitos pelo professor.
- Padronizar o nome do produto: o repositório contém variações como “CoreMotion” e “CoreMotiom”. Usar uma grafia aprovada pela equipe, sem renomear identificadores técnicos indiscriminadamente.

**Importante:** as imagens do professor exemplificam organização de pastas e SQL. Não obrigam a trocar Next.js por outra estrutura nem a usar tabelas de um aplicativo de eventos.

## 2. Ponto de partida do projeto

Inspeção inicial do repositório `BIRFeuFeu/-CoreMotion`:

- Aplicação em Next.js, React e TypeScript, com Tailwind e Supabase.
- Existem `app/api/`, `app/actions/`, `services/` e `supabase/migrations/`.
- Há scripts de verificação: `npm run lint`, `npm run type-check` e `npm run build`.
- Já existem diagramas, PDFs e arquivos mestre em `Fluxograma/Diagrama C. De Uso/`.
- Os geradores estão em `scripts/`, incluindo `scripts/lib/flowchart-core.mjs` e `scripts/lib/usecase-core.mjs`.
- O material de documentação existente descreve perfis visitante, usuário, lojista e administrador, além de modo demonstrativo e possíveis lacunas de segurança. Isso é **pista para auditoria**, não comprovação do comportamento atual.
- `CONTRIBUTING.md` descrevia uma equipe de 5 pessoas com revisão obrigatória; foi alinhado nesta rodada a quatro frentes independentes, sem revisão bloqueante. O fluxo de branches deve continuar respeitando a branch fixa de cada sessão Arena.

**Regra:** conferir código e execução antes de declarar que algo funciona. Não confundir interface pronta, dados locais ou botões demonstrativos com integração real.

## 3. Como a equipe vai trabalhar com o Arena

Cada pessoa é responsável por uma **fatia completa do trabalho**: interface, servidor e dados do seu escopo, além de um entregável próprio de fechamento. Nenhuma frente espera a conclusão, a revisão, o repasse ou a autorização de outra pessoa para executar a sua parte.

O que existe entre as frentes são **contratos de interface versionados no repositório** — tipos, schemas, rotas e documentos em `docs/etapa-5/contratos/` — e o **mapa de propriedade de arquivos**. Contrato é artefato público, não favor pessoal: qualquer pessoa consegue trabalhar sozinha lendo o contrato, mesmo que a outra frente ainda não tenha começado.

### 3.1 Responsabilidades — quatro frentes independentes

| Integrante | Frente independente | Escopo completo (interface + servidor + dados) | Entregável de fechamento próprio |
| --- | --- | --- | --- |
| Pessoa 1 — [nome] | Identidade, acesso e administração | Cadastro, login, sessão, papéis de Administrador, Supervisor e Usuário, painel administrativo, RLS e migrações de identidade, remoção de segredos | Hierarquia aplicada no servidor e no banco, matriz de permissões publicada e scripts de banco reproduzíveis |
| Pessoa 2 — [nome] | Catálogo, negócio e comunidade | Produtos, lojas, anúncios C2C, carrinho, checkout, pedidos, comunidade e treinadores — telas, rotas e consultas do domínio | Jornada de compra e venda completa, com persistência real e simulações rotuladas |
| Pessoa 3 — [nome] | Documento acadêmico, requisitos e diagramas | TCC conforme o modelo, referências verificáveis, catálogo de requisitos, casos de uso, fluxogramas e roteiro de capturas | TCC em DOCX e PDF, diagramas legíveis em A4 e para slides, matriz de rastreabilidade |
| Pessoa 4 — [nome] | Verificação, publicação e entrega | Ambiente de teste próprio, plano e execução de testes, README, apresentação, Daily Scrum, links públicos e resposta final | Relatório de testes com evidências, README validado, slides publicados e checklist de entrega |

Cada frente verifica o próprio trabalho: `npm run lint`, `npm run type-check`, `npm run build` e os testes do seu escopo. O responsável executa com auxílio do Arena, confere o resultado e registra o que não foi possível verificar. Não deve aceitar a resposta da IA sem evidência.

### 3.2 Regras de independência

1. **Escopo vertical.** Cada frente entrega sua parte de ponta a ponta: tela, regra no servidor e dado persistido. Não existe “eu faço a tela e outra pessoa liga no banco”.
2. **Nenhuma espera por pessoa.** Ninguém aguarda revisão, aprovação, repasse ou entrega de outra frente para começar, continuar ou concluir. Se faltar informação, registra `PENDENTE` e segue pelo contrato.
3. **Branch fixa.** Cada pessoa usa a própria conversa no Arena conectada ao repositório, respeitando a branch atribuída à sessão. **Não peça ao Arena para trocar ou criar outra branch.**
4. **Contrato é a única combinação entre frentes.** O contrato do próprio escopo é publicado em `docs/etapa-5/contratos/` e em `lib/types.ts`/`lib/schemas/` antes da implementação. Mudanças de contrato são aditivas e registradas com data; quem consome lê a versão publicada, sem reunião obrigatória.
5. **Mapa de propriedade de arquivos.** Cada arquivo tem um guardião declarado. Quem não é guardião pode fazer mudança aditiva e pequena no seu próprio PR, sem autorização prévia; o guardião ajusta depois, se necessário. Não editar o mesmo arquivo em duas frentes ao mesmo tempo.
6. **Verificação individual.** Cada frente roda suas verificações e registra comando, resultado e limitação em `docs/etapa-5/pessoa-N/`. Falha anterior não impede avanço; precisa ser registrada.
7. **Revisão cruzada é opcional.** Quando acontecer, vira registro no repositório. Não é condição para concluir nem portão para publicar.
8. **Merge é ato de liberação, não de dependência.** Push na branch da sessão é livre, com autorização da equipe. O merge na `main` é uma liberação única, feita quando a versão estiver verificada, e não é pré-requisito para nenhuma frente terminar sua função.
9. **Conflito se resolve por contrato, CI e conversa curta** — nunca parando a outra frente.
10. **Ninguém presume o estado da outra sessão.** Antes de cada rodada, cada frente confere no repositório a versão realmente disponível e não trata mudanças de outra conversa como sincronizadas.

### 3.3 Uso responsável da IA

- Anexar o enunciado, o PDF e o modelo do TCC quando disponíveis.
- Não enviar senhas, tokens ou chaves privadas. Usar o mecanismo seguro de configuração do ambiente; não colar segredos no chat, nos documentos ou no Git.
- Não executar migração, seed, limpeza ou testes destrutivos em produção sem autorização explícita. Preferir banco isolado de testes e backup.
- Não inventar resultados, referências bibliográficas, reuniões, nomes, aprovação de usuários ou links publicados.
- Identificar claramente protótipos, simulações e funções não integradas.
- A equipe deve revisar autoria, fontes e eventual declaração de uso de IA conforme as regras da instituição.
- O Arena pode gerar arquivos e instruções, mas permissões de publicação, acesso às contas, reuniões reais e validação com o professor dependem de pessoas.

### 3.4 Cabeçalho comum — colar antes do prompt de cada pessoa

```text
Você está auxiliando a equipe do CoreMotion na Etapa 5 do TCC.
Leia docs/etapa-5/DOCUMENTO-FINAL-DE-EXECUCAO.md, o enunciado e o modelo em
docs/etapa-5/referencias/Modelo-de-TCC.docx.pdf. Consulte também
docs/etapa-5/referencias/LEITURA-DO-MODELO.md e os contratos em docs/etapa-5/contratos/.
Trabalhe no repositório e na branch permitida pela sessão Arena, sem trocar de branch.
Inspecione o código real antes de fazer afirmações. Diferencie implementado, demonstrativo,
pendente e não verificado. Não invente fontes, testes, imagens, reuniões ou links.
Trabalhe apenas no escopo da sua frente. Antes de editar, declare os arquivos que ela possui,
os contratos de interface que consome e eventuais mudanças aditivas em arquivos de outra frente.
Não exponha segredos, não altere produção e não publique nem faça merge sem autorização.
Preserve a arquitetura existente e aproveite os diagramas e scripts já disponíveis.
Quando algo depender de acesso, decisão ou documento ausente, registre o bloqueio.
Ao concluir, informe arquivos alterados, verificações executadas, resultado e pendências.
Minha função é a Pessoa [1, 2, 3 ou 4]. Meu nome é [nome].
```

Substituir os campos entre colchetes antes de enviar. Cada prompt abaixo é autossuficiente: executar a rodada, registrar a evidência e seguir sem esperar outra frente.

## 4. Pessoa 1 — Identidade, acesso e administração

### Objetivo

Entregar a hierarquia Administrador → Supervisor → Usuário funcionando de ponta a ponta — tela, servidor e banco — com autenticação real, sessão validada no servidor e painel administrativo com permissões aplicadas. Nenhuma etapa depende da frente de catálogo.

### Escopo completo

- **Interface:** cadastro, login, recuperação de senha, sessão, menu por papel, painel administrativo e estados de acesso negado.
- **Servidor:** rotas e Server Actions de autenticação e usuários, verificação de sessão, validação de entrada e registro de auditoria.
- **Dados:** migrações incrementais, políticas RLS, definição dos três papéis, scripts de banco e remoção de credenciais do repositório.

### Tarefas

1. Remover credenciais e fallbacks secretos do código e do bundle do cliente; exigir configuração por variáveis de ambiente.
2. Implementar sessão no servidor (cookie httpOnly) e um único helper de verificação usado por todas as rotas e actions do escopo.
3. Definir os papéis Administrador, Supervisor e Usuário em `lib/types.ts` e no banco; manter lojista como vínculo de negócio, não como nível de acesso.
4. Publicar `docs/etapa-5/contratos/matriz-permissoes.md` com capacidades, invariantes e decisões registradas.
5. Impedir autopromoção: cadastro sempre cria `user`; nenhum `role`, `userId` ou `seller_id` do cliente é aceito; RLS com trava de coluna.
6. Remover privilégio por e-mail, prefixo ou lista fixa de administradores, inclusive do bundle e do SQL.
7. Ligar o painel administrativo a endpoints reais: criar, promover, banir, desbanir e excluir com autorização e auditoria.
8. Eliminar o login de demonstração e a troca de papel pelo menu; se houver modo demonstrativo, isolá-lo por flag e rotulá-lo.
9. Criar migrações incrementais, script de recriação do banco e documentação de aplicação e reversão.
10. Escrever testes positivos e negativos do escopo e registrar resultados reais.

### Arquivos que a frente possui

`app/api/users/`, `app/api/auth/`, `app/actions/auth.ts`, `services/auth.ts`, `services/authService.ts`, `services/supabaseClient.ts`, `lib/schemas/auth.schema.ts`, `lib/store.tsx`, `lib/types.ts`, `lib/db.ts`, `lib/supabase.ts`, `middleware.ts`, `supabase/migrations/`, `components/AuthModal.tsx`, `components/admin/`, `components/AdminDashboard.tsx`, `docs/etapa-5/contratos/matriz-permissoes.md`.

### Critérios de conclusão

☐ Os três níveis exigidos existem e são aplicados no servidor e no banco.
☐ Acesso direto à API não contorna a hierarquia; anônimo recebe 401 e sem permissão recebe 403.
☐ Alterar navegador, `localStorage` ou corpo da requisição não promove ninguém.
☐ Nenhuma credencial ou privilégio por e-mail permanece no código ou no bundle.
☐ Painel administrativo persiste após recarregar e registra quem executou cada ação sensível.
☐ Banco de teste pode ser recriado pelos scripts documentados, com plano de reversão.
☐ Verificações e testes do escopo registrados, com o que não foi possível verificar marcado como pendente.

### Prompt 1A — Auditoria de identidade e acesso

```text
Sou a Pessoa 1, responsável por identidade, acesso e administração.
Audite somente o meu escopo, sem alterar arquivos nesta rodada: autenticação, sessão,
rotas e actions de usuários, painel administrativo, RLS, migrações e segredos.
Confirme no código o que é real, o que é demonstrativo e o que está ausente.
Verifique especificamente: login que aceita senha inválida, autopromoção por metadado,
privilégio por e-mail ou prefixo, rotas administrativas sem sessão, credenciais no bundle
e ausência do papel Supervisor.
Crie docs/etapa-5/pessoa-1/auditoria-identidade.md com problema, evidência por arquivo e linha,
impacto, prioridade, critério de aceite e dependência de contrato (não de pessoa).
Proponha lotes pequenos e verificáveis e aguarde minha aprovação para implementar.
```

### Prompt 1B — Implementação do lote aprovado

```text
Implemente somente o lote aprovado em docs/etapa-5/pessoa-1/auditoria-identidade.md.
Aplique a matriz de permissões do meu escopo no servidor e no banco, sem confiar em papel,
userId ou indicador de admin enviado pelo navegador.
Remova privilégios por e-mail/prefixo, impeça autopromoção e separe demonstração do ambiente real.
Versione mudanças SQL em migrações incrementais, atualize tipos e contratos de forma aditiva e
não edite arquivos de outra frente sem registrar a mudança como aditiva.
Não use chave privilegiada no cliente nem execute migração em produção.
Inclua testes positivos e negativos do escopo, execute o que for possível e registre comandos,
resultados reais, limitações e reversão em docs/etapa-5/pessoa-1/registro-implementacao.md.
Não declare segurança validada sem evidência dos testes correspondentes.
```

### Prompt 1C — Verificação e publicação do contrato

```text
Revise o meu escopo já implementado e verifique sozinho, sem esperar outra frente:
sessão, papéis, painel administrativo, RLS e remoção de segredos.
Execute npm run lint, npm run type-check, npm run build e os testes do escopo.
Atualize docs/etapa-5/contratos/matriz-permissoes.md para o comportamento realmente implementado
e publique em docs/etapa-5/pessoa-1/estado-identidade.md o que está integrado, o que é simulado,
o que está pendente e como outra pessoa consome o contrato sem me consultar.
Se algo depender de banco ou acesso indisponível, registre BLOQUEADO com a instrução de reprodução.
Não afirme conformidade de segurança sem os testes correspondentes.
```

## 5. Pessoa 2 — Catálogo, negócio e comunidade

### Objetivo

Entregar a jornada de catálogo, compra, venda e comunidade de ponta a ponta — tela, servidor e dados — com persistência real ou estado vazio honesto, sem depender da frente de identidade para avançar.

### Escopo completo

- **Interface:** início, marketplace, detalhe do produto, lojas, anúncio C2C, carrinho, checkout, comunidade e treinadores.
- **Servidor:** rotas e actions de produtos, lojas, anúncios e pedidos; validação; cálculo de total no servidor.
- **Dados:** consultas do domínio, verificação de loja, pedidos e conteúdo da comunidade.

### Tarefas

1. Inventariar telas, rotas e serviços do domínio e identificar o que só altera estado local.
2. Ligar produtos, lojas e anúncios a dados persistidos; eliminar o uso de `INITIAL_*` como fachada em ambiente real.
3. Corrigir a solicitação de verificação de loja para gravar `pending`, separando-a da aprovação.
4. Exigir sessão no checkout; calcular subtotal, frete e total no servidor; validar estoque.
5. Rotular pagamento e custódia como simulação enquanto não houver integração financeira real.
6. Implementar estados de carregamento, vazio, sucesso, erro e acesso negado nas telas do escopo.
7. Revisar responsividade, foco de teclado, rótulos e contraste nas telas do escopo.
8. Persistir ou marcar explicitamente como não integrados comunidade, treinadores e recursos demonstrativos.
9. Escrever testes do domínio e registrar resultados reais.
10. Publicar `docs/etapa-5/contratos/contrato-catalogo.md` com operações, dados de entrada/saída e erros.

### Arquivos que a frente possui

`app/api/products/`, `app/api/stores/`, `app/api/listings/`, `app/actions/products.ts`, `app/actions/orders.ts`, `app/actions/stores.ts`, `services/products.ts`, `services/stores.ts`, `services/listings.ts`, `services/productService.ts`, `services/storeService.ts`, `services/orderService.ts`, `services/communityService.ts`, `lib/db-queries.ts`, `lib/schemas/product.schema.ts`, `lib/schemas/store.schema.ts`, `lib/schemas/order.schema.ts`, `app/page.tsx`, `components/Sidebar.tsx`, `components/HomeHeroAndHighlights.tsx`, `components/MarketplaceView.tsx`, `components/ProductCard.tsx`, `components/ProductDetailModal.tsx`, `components/StoresView.tsx`, `components/CreateStoreModal.tsx`, `components/SellC2CView.tsx`, `components/CheckoutModal.tsx`, `components/CommunityView.tsx`, `components/CoachesView.tsx`, `docs/etapa-5/contratos/contrato-catalogo.md`.

### Critérios de conclusão

☐ Nenhum menu do escopo leva a tela vazia ou erro não tratado.
☐ Fluxos principais funcionam com dados persistidos, não apenas com dados locais.
☐ Verificação de loja grava `pending` e só supervisor ou administrador aprova.
☐ Checkout sem sessão é bloqueado; total e frete não são manipuláveis pelo cliente.
☐ Nenhum texto promete pagamento ou custódia reais sem integração comprovada.
☐ Interface conferida em celular e computador, com evidências reais.
☐ Verificações e testes do escopo registrados, com pendências explícitas.

### Prompt 2A — Diagnóstico do domínio

```text
Sou a Pessoa 2, responsável por catálogo, negócio e comunidade.
Audite somente o meu escopo, sem alterar arquivos nesta rodada: telas, rotas, actions,
serviços e consultas de produtos, lojas, anúncios, checkout, pedidos, comunidade e treinadores.
Classifique cada operação como real, demonstrativa, pendente ou não verificada, com arquivo e linha.
Destaque telas vazias, botões sem efeito, dados iniciais usados como fachada, verificação de loja
que grava o status errado, checkout sem sessão e textos que prometem pagamento real.
Crie docs/etapa-5/pessoa-2/diagnostico-catalogo.md com problema, evidência, impacto, prioridade,
critério de aceite e o contrato de interface envolvido (não a pessoa).
Proponha lotes pequenos e aguarde minha aprovação.
```

### Prompt 2B — Implementação do lote aprovado

```text
Implemente somente o lote aprovado em docs/etapa-5/pessoa-2/diagnostico-catalogo.md.
Ligue as telas do meu escopo a dados persistidos e preserve o visual existente.
Garanta que dono de recurso venha da sessão no servidor e que valores de pedido sejam
calculados no servidor, nunca aceitos do cliente.
Corrija a verificação de loja e separe solicitação de aprovação.
Inclua os estados de carregamento, vazio, sucesso, erro e acesso negado e rotule simulações.
Não altere arquivos da frente de identidade sem registrar mudança aditiva e seu motivo.
Execute as verificações disponíveis e registre comandos, resultados reais e limitações em
docs/etapa-5/pessoa-2/registro-implementacao.md.
```

### Prompt 2C — Verificação e publicação do contrato

```text
Revise o meu escopo já implementado e verifique sozinho, sem esperar outra frente.
Percorra catálogo, lojas, anúncio, checkout, pedidos e comunidade, distinguindo o que foi
executado do que está apenas proposto.
Execute npm run lint, npm run type-check, npm run build e os testes do escopo.
Publique docs/etapa-5/contratos/contrato-catalogo.md com as operações, formatos e erros reais e
docs/etapa-5/pessoa-2/estado-catalogo.md com passos de uso, limitações e cenários de teste do domínio.
Se não houver ferramenta de navegador, não invente capturas: entregue o roteiro e registre a
revisão visual como pendente.
```

## 6. Pessoa 3 — Documento acadêmico, requisitos e diagramas

### Objetivo

Produzir o TCC e os diagramas a partir do modelo institucional e do repositório, com rastreabilidade e referências verificáveis, sem esperar texto, decisão ou revisão de outra frente. Onde faltar dado, registrar `PENDENTE` e seguir.

### Escopo completo

- **Documento:** estrutura conforme o modelo, capa, folha de rosto, resumo, capítulos, referências e apêndices.
- **Diagramas:** casos de uso e fluxogramas atualizados nas fontes, regenerados pelos scripts, em A4 e para slides.
- **Rastreabilidade:** requisito → caso de uso → tela/API → teste → evidência, extraída do código e dos contratos publicados.

### Tarefas

1. Ler o modelo recebido e a leitura por página; registrar exigências e lacunas em `requisitos-documentais.md`.
2. Montar a estrutura do TCC conforme o modelo e manter uma tabela de dados acadêmicos faltantes.
3. Extrair do repositório arquitetura, stack, requisitos, banco, perfis e jornadas reais.
4. Redigir os capítulos em `docs/etapa-5/pessoa-3/tcc/`, marcando `PENDENTE` onde faltar dado.
5. Criar a matriz de rastreabilidade a partir dos contratos e do código disponíveis.
6. Revisar as fontes dos diagramas em `scripts/lib/` e regenerar os arquivos pelos comandos do `package.json`.
7. Produzir versão A4 legível e versão para slides, com decomposição por módulo se necessário.
8. Documentar os casos principais com ator, objetivo, pré-condições, fluxo, alternativas e pós-condições.
9. Escrever o roteiro das capturas necessárias, com legenda, fonte e proteção de dados pessoais.
10. Conferir sumário, numeração, citações, referências e diagramação na exportação final.

### Arquivos que a frente possui

`docs/etapa-5/pessoa-3/`, `docs/etapa-5/referencias/LEITURA-DO-MODELO.md`, `Fluxograma/Diagrama C. De Uso/`, `scripts/lib/usecase-core.mjs`, `scripts/lib/flowchart-core.mjs`, `scripts/master-templates/` e as fontes de documentação correspondentes.

### Critérios de conclusão

☐ Modelo conferido e lacunas registradas; sem modelo completo, o documento permanece identificado como rascunho.
☐ Documento corresponde ao que está implementado ou explicitamente marcado como pendente.
☐ Diagrama representa os atores e permissões realmente aprovados.
☐ Versões A4 e de apresentação legíveis em tamanho real.
☐ Requisitos, casos de uso, testes e evidências rastreáveis.
☐ Referências verificáveis, sem fonte inventada.

### Prompt 3A — Estrutura e lacunas

```text
Sou a Pessoa 3, responsável pelo TCC e pelos diagramas.
Leia o modelo acadêmico em docs/etapa-5/referencias/ e a leitura por página.
Se faltar algum documento, registre exatamente o que falta e não declare conformidade ABNT definitiva.
Inspecione o repositório e os contratos publicados, sem alterar código da aplicação.
Crie docs/etapa-5/pessoa-3/requisitos-documentais.md com cada exigência, fonte da exigência,
entrega correspondente, informação ainda necessária e status.
Crie a estrutura de capítulos coerente com o modelo e a tabela de dados acadêmicos faltantes.
Não invente integrantes, instituição, resultados ou referências; use PENDENTE.
```

### Prompt 3B — Texto do TCC

```text
Redija a versão de trabalho do TCC com base na estrutura aprovada, no modelo do professor,
nos contratos publicados e no código disponível no repositório.
Crie os arquivos em docs/etapa-5/pessoa-3/tcc/.
Explique problema, objetivos, justificativa, método, arquitetura, requisitos, implementação,
validação e conclusão, ajustando os capítulos ao modelo recebido.
Inclua a matriz requisito → caso de uso → tela/API → teste → evidência.
Use somente resultados de teste documentados no repositório e referências verificáveis.
Na ausência de dados, marque PENDENTE e liste o que precisa ser coletado; não espere outra frente.
Não apresente pagamento, custódia, segurança ou publicação como reais sem comprovação.
```

### Prompt 3C — Diagramas e passos de uso

```text
Revise os casos de uso e fluxogramas existentes em Fluxograma/Diagrama C. De Uso/.
Confira scripts/lib/usecase-core.mjs e scripts/lib/flowchart-core.mjs contra os contratos
publicados e o código disponível; não trate o catálogo antigo como prova de conclusão.
Atualize atores e permissões, incluindo Administrador, Supervisor e Usuário, sem apagar atores
de negócio pertinentes. Use UML correta; include/extend só quando aplicáveis.
Atualize as fontes e rode os geradores documentados no package.json.
Produza diagramas legíveis em páginas A4 e imagens vetoriais ou de boa resolução para slides,
com visão geral e recortes por módulo quando necessário.
Documente os casos principais com pré-condições, fluxo principal, alternativas e pós-condições.
Crie docs/etapa-5/pessoa-3/revisao-diagramas.md com mudanças, comandos executados, arquivos
gerados e verificações de legibilidade ainda pendentes.
```

## 7. Pessoa 4 — Verificação, publicação e entrega

### Objetivo

Verificar a versão disponível e publicar a entrega com evidências reais, montando o próprio ambiente de teste com os scripts do repositório. Nenhum teste depende de outra pessoa executar algo: se a versão não permitir, o caso é registrado como `BLOQUEADO` ou `FALHOU`.

### Escopo completo

- **Verificação:** banco de testes próprio, plano, execução, registro e reteste.
- **Documentação operacional:** README na raiz, instruções de execução e limitações reais.
- **Entrega:** apresentação importável e publicada, Daily Scrum, checklist, links e resposta final.

### Tarefas

1. Criar ambiente de teste isolado com os scripts do repositório e contas fictícias.
2. Escrever `plano-testes.md` com casos de login, fluxos principais, persistência, formulários, responsividade e autorização dos três perfis.
3. Executar o que o ambiente permitir e registrar versão, data, passos, esperado, obtido, evidência e status.
4. Testar acesso direto à API, operação sobre registro de outro usuário e tentativa de autopromoção.
5. Criar `relatorio-testes.md` e `backlog-falhas.md`, encaminhando cada falha ao escopo correspondente.
6. Escrever o `README.md` com stack, pré-requisitos, instalação, variáveis sem segredos, banco, execução, build, testes, perfis e limitações.
7. Validar as instruções em ambiente limpo ou registrar o que não foi possível reproduzir.
8. Preparar slides e notas de fala com resultados e capturas reais; explicar a importação e a publicação.
9. Organizar o Daily Scrum com dados e imagens reais fornecidos pela equipe.
10. Preencher `checklist-entrega.md` e `entrega-final.md`, conferindo cada link em janela anônima.

### Arquivos que a frente possui

`README.md`, `docs/etapa-5/pessoa-4/`, `docs/etapa-5/STATUS-EXECUCAO.md`, `.env.example` (revisão de nomes e comentários, sem valores), scripts de teste que criar em `scripts/`.

### Critérios de conclusão

☐ Cenários principais e negativos executados e rastreáveis; pendências visíveis.
☐ Bugs bloqueantes registrados no backlog e retestados quando houver correção disponível.
☐ README validado em ambiente limpo ou com limitações explicitadas.
☐ Slides publicados na plataforma exigida, com link de leitura testado.
☐ Daily Scrum registra participação real dos quatro integrantes.
☐ Repositório, documento e apresentação acessíveis sem login do avaliador.
☐ Nenhuma credencial ou dado privado nas evidências.

### Prompt 4A — Plano e execução de testes

```text
Sou a Pessoa 4, responsável por verificação e entrega.
Leia os contratos publicados em docs/etapa-5/contratos/ e o código disponível; não espere repasse.
Crie docs/etapa-5/pessoa-4/plano-testes.md com casos de login/cadastro, fluxos principais,
persistência, formulários, responsividade e autorização dos três perfis.
Inclua acesso direto à API, registros de outro usuário e tentativa de autopromoção.
Monte o ambiente de teste com os scripts do repositório e execute apenas o que for seguro.
Registre versão, ambiente, data, passos, esperado, obtido, evidência e status.
Use os status PASSOU, FALHOU, BLOQUEADO e NÃO EXECUTADO; não aprove teste por leitura de código.
Crie relatorio-testes.md e backlog-falhas.md na mesma pasta, com o escopo responsável por cada falha.
Não modifique funcionalidades de outra frente; registre a falha e siga.
```

### Prompt 4B — README e preparação da publicação

```text
Crie ou atualize o README.md do CoreMotion com base na execução real.
Verifique package.json, lockfiles, .env.example, migrações e configuração do Next.js.
Documente instalação com o gerenciador escolhido, ambiente sem segredos, preparação de banco
de testes, execução, build, perfis, scripts e limitações.
Não apresente modo demo como sistema integrado e não inclua contas ou senhas privadas.
Teste as instruções em ambiente isolado quando possível e registre o que não foi validado.
Antes de publicar, destaque a ambiguidade da exigência "apenas no github.com" e solicite a
decisão do professor; explique a limitação do GitHub Pages para o backend Next.js.
Prepare um checklist de publicação; não publique, mude visibilidade ou invente URLs.
```

### Prompt 4C — Apresentação

```text
Prepare a apresentação do TCC a partir do TCC em produção e dos testes registrados no repositório.
Se a duração oficial não estiver informada, proponha um roteiro enxuto e marque a duração
como decisão pendente. Divida as falas entre os quatro integrantes.
Inclua problema, objetivos, solução, papéis da equipe, arquitetura, casos de uso,
demonstração dos três perfis, testes, resultados reais, limitações e conclusão.
Use capturas reais e diagramas legíveis; não invente screenshots ou métricas.
Gere roteiro, notas de fala e, se possível, um PPTX importável em docs/etapa-5/pessoa-4/apresentacao/.
Explique como importar e conferir no Google Slides ou PowerPoint Online.
Não trate o PPTX local como apresentação publicada e aguarde a publicação autorizada para
registrar um link real e verificar acesso de leitura sem login.
```

### Prompt 4D — Daily Scrum e entrega final

```text
Crie docs/etapa-5/pessoa-4/daily-scrum.md com um modelo de registro por encontro:
data, presentes, o que cada um fez, o que fará, impedimentos, decisões e evidências.
Use somente nomes, registros e imagens reais fornecidos pela equipe; se faltarem, deixe PENDENTE.
Não reconstrua reuniões fictícias a partir de commits.
Inclua um quadro com a função de cada integrante e a indicação das imagens reais a inserir.
Depois, crie checklist-entrega.md e entrega-final.md com os campos exatos pedidos pelo professor.
Não invente URLs nem declare acesso público sem verificação.
Liste todos os links ainda não publicados ou não verificados.
```


## 8. Trilhas independentes e ponto de encontro

Não há prazo oficial informado e **não há ordem obrigatória entre as frentes**. Cada pessoa executa a própria sequência e conclui o seu entregável; o encontro acontece no repositório, por contratos publicados e verificações registradas.

| Frente | Sequência própria | Conclui quando |
| --- | --- | --- |
| Pessoa 1 — Identidade e administração | Remover segredos → sessão no servidor → papéis e RLS → painel real → testes | Hierarquia não contornável, com testes registrados |
| Pessoa 2 — Catálogo e negócio | Diagnóstico → persistência → checkout e verificação de loja → estados de UI → testes | Jornada completa com dados persistidos e simulações rotuladas |
| Pessoa 3 — Documento e diagramas | Modelo e lacunas → estrutura → capítulos → diagramas → revisão final | TCC e diagramas legíveis, com pendências explícitas |
| Pessoa 4 — Verificação e entrega | Ambiente próprio → plano e testes → README → slides → links | Evidências reais e links verificados |

**Ponto de encontro — não é portão:** contratos em `docs/etapa-5/contratos/`, verificações do CI e `STATUS-EXECUCAO.md` atualizado. Qualquer frente pode avançar sem que as outras tenham terminado.

**Prioridade técnica:** autorização e persistência → fluxos principais → testes → fidelidade documental → apresentação. Melhorias estéticas não devem impedir a correção de falhas de acesso.

### Modelo de Daily Scrum

Fazer um encontro curto em cada dia de trabalho conjunto, no ritmo combinado pela equipe.

| Data | Pessoa | Fez desde o último encontro | Próxima tarefa | Impedimento | Evidência real |
| --- | --- | --- | --- | --- | --- |
| [data] | [nome] | [atividade] | [atividade] | [bloqueio ou nenhum] | [arquivo, tarefa ou imagem] |

A Pessoa 4 organiza; cada integrante confirma o próprio registro. Usar consentimento para imagens e ocultar dados pessoais e segredos nas capturas.

## 9. Estrutura sugerida dos materiais

Criar as pastas conforme necessário, sem duplicar arquivos grandes nem versionar dependências ou dumps reais.

```text
docs/etapa-5/
  DOCUMENTO-FINAL-DE-EXECUCAO.md
  PLANO-EQUIPE-E-PROMPTS.md
  STATUS-EXECUCAO.md
  referencias/
    Modelo-de-TCC.docx.pdf
    LEITURA-DO-MODELO.md
  contratos/
    matriz-permissoes.md
    contrato-integracao.md
    contrato-catalogo.md
  diagnosticos/
    frontend.md
    backend.md
    incidente-credenciais-expostas.md
  pessoa-1/   # identidade, acesso e administração
    auditoria-identidade.md
    registro-implementacao.md
    estado-identidade.md
  pessoa-2/   # catálogo, negócio e comunidade
    diagnostico-catalogo.md
    registro-implementacao.md
    estado-catalogo.md
  pessoa-3/   # TCC, requisitos e diagramas
    requisitos-documentais.md
    revisao-diagramas.md
    tcc/
  pessoa-4/   # verificação, publicação e entrega
    plano-testes.md
    relatorio-testes.md
    backlog-falhas.md
    daily-scrum.md
    checklist-entrega.md
    entrega-final.md
    apresentacao/
```

Manter migrações em `supabase/migrations/`, README na raiz e diagramas no local existente. Usar armazenamento adequado para vídeos e arquivos grandes; não publicar dados sensíveis para cumprir a exigência de links públicos.

## 10. Regra de conclusão: o que significa “pronto”

Uma tarefa só está pronta quando:

1. Tem critério de aceite definido.
2. Foi implementada ou produzida na versão integrada.
3. Foi verificada por execução ou revisão apropriada, com evidência.
4. Não depende de segredo ou arquivo privado escondido para o avaliador conseguir utilizá-la conforme as instruções.
5. Está descrita de forma coerente no README, nos diagramas e no TCC, quando aplicável.
6. Foi verificada com evidência reproduzível e auto-revisão registrada; revisão cruzada é bem-vinda, mas não é condição de conclusão.

**Não é conclusão:** “o Arena disse que está pronto”, “o botão aparece”, “o build passou”, “o PDF foi gerado” ou “o link funciona apenas na minha conta”. Build não substitui teste funcional, e diagrama exportado não garante legibilidade.

### Bloqueadores da entrega

- Hierarquia exigida ausente ou contornável.
- Fluxos essenciais quebrados ou sem persistência exigida.
- Scripts insuficientes para preparar o banco.
- Credenciais ou dados privados expostos.
- TCC sem conferir o modelo exigido.
- Apresentação fora das plataformas autorizadas.
- Links privados, inexistentes ou não verificados.

### Prompt de auditoria final — usar com todos os materiais integrados

```text
Faça a auditoria final da Etapa 5 do CoreMotion sem assumir que entregas planejadas existem.
Leia enunciado, PDF, modelo, plano da equipe, código, README, migrações, TCC,
diagramas, relatório de testes, Daily Scrum e roteiro da apresentação disponíveis.
Crie docs/etapa-5/auditoria-final.md com requisito, evidência, status e responsável.
Separe CONCLUÍDO, PENDENTE, BLOQUEADO e NÃO VERIFICADO e indique a versão avaliada.
Destaque divergências entre sistema, documento e slides; dados sensíveis; recursos
simulados; falta dos três perfis; links não públicos e testes não executados.
Execute verificações técnicas possíveis e reporte seus resultados reais.
Não publique, não altere produção e não declare “100% concluído” sem comprovação.
Proponha a menor lista de ações necessária para liberar a entrega.
```

## 11. Modelo exato para responder ao professor

Preencher somente depois de verificar os nomes e os links. Não entregar os campos entre colchetes como se estivessem finalizados.

```text
Nome do Aplicativo => [grafia oficial aprovada]
Nome em ordem númerica de cada integrante da Equipe =>
1. [Nome completo — Identidade, acesso e administração]
2. [Nome completo — Catálogo, negócio e comunidade]
3. [Nome completo — TCC, requisitos e diagramas]
4. [Nome completo — Verificação, apresentação e entrega]

Link do aplicativo no GitHub => [URL pública verificada]
Link da Apresentação => [URL de leitura no Google Slides ou PowerPoint Online]
Link da Documentação do aplicativo => [URL pública do TCC]
```

O SQL e o README devem estar localizáveis no repositório. Se o professor exigir um acesso adicional à demonstração publicada, incluir conforme a orientação que ele confirmar, preservando o formato principal solicitado.

---

**Resumo:** cada integrante responde por uma frente independente e por um entregável completo. Pessoa 1 entrega identidade, acesso e administração; Pessoa 2 entrega catálogo, negócio e comunidade; Pessoa 3 entrega o TCC e os diagramas; Pessoa 4 entrega a verificação e a publicação. Ninguém depende da conclusão, da revisão ou da autorização de outra pessoa: as frentes se encontram nos contratos versionados e nas evidências do repositório. Todos participam das reuniões, conferem o próprio resultado e ensaiam a apresentação.

## 12. Aplicação obrigatória do modelo recebido

Esta seção prevalece sobre orientações genéricas de formatação nas seções anteriores. O arquivo recebido é um **PDF do modelo**, e não um DOCX editável: o Arena deve reconstruir a estrutura editável com estilos, e conferir a exportação. Não basta converter cada página em imagem dentro do Word.

### 12.1 Dados já disponíveis e dados que não podem ser presumidos

| Campo | Informação e tratamento |
| --- | --- |
| Instituição do modelo | Colégio Estadual Professor Júlio Szymanski. Utilizar após confirmação de que corresponde à equipe. |
| Curso do modelo | Técnico em Desenvolvimento de Sistemas. |
| Local do modelo | Araucária. Não substituir automaticamente pela localização de quem conversa com o Arena. |
| Período do modelo | 3.º trimestre de 2026. Confirmar o período efetivo da entrega. |
| Professor do enunciado | Antonio Carlos. Isso não comprova que ele seja o orientador ou integrante da banca. |
| Autores | Quatro nomes completos ainda não fornecidos. Manter campos PENDENTE. Não extrair nomes de e-mails ou usuários do GitHub. |
| Orientador/coorientador | Não confirmados. Usar campos a preencher, omitindo coorientador se não houver. |
| Banca, data, conceito e aprovação | Não confirmados. Não fabricar nomes, assinaturas, conceito nem declaração de aprovação consumada. |
| Título sugerido | CoreMotion: desenvolvimento de uma plataforma web de marketplace esportivo com controle hierárquico de acesso. É uma proposta editorial, não um fato a comprovar. |

### 12.2 Estrutura do TCC a gerar

1. Capa com instituição, curso, quatro autores, título, cidade e período.
2. Folha de rosto com natureza do trabalho, orientação e demais dados reais.
3. Folha de aprovação com campos apropriados ainda não preenchidos quando a banca não tiver ocorrido. O texto de aprovação do exemplo não deve afirmar uma aprovação inexistente.
4. Dedicatória e agradecimentos apenas se fornecidos ou aprovados pelos autores; confirmar sua necessidade. Epígrafe é opcional e requer fonte verificável.
5. Resumo de 150 a 500 palavras, um bloco, sem citações, terceira pessoa e voz ativa, fonte 12, espaço simples e palavras-chave abaixo. Escrever resultados apenas depois dos testes reais.
6. Listas de siglas e, quando pertinentes, ilustrações e quadros. Símbolos são opcionais. Não incluir listas vazias.
7. Sumário automático; não incluir os elementos pré-textuais nem copiar a paginação ilustrativa do modelo.
8. **1 INTRODUÇÃO:** contexto, problema, justificativa, objetivo geral, objetivos específicos e delimitação do projeto.
9. **2 FUNDAMENTAÇÃO TEÓRICA:** aplicações web, marketplaces, arquitetura cliente/servidor, persistência, autenticação, autorização por papéis e tecnologias realmente usadas; referências verificáveis.
10. **3 METODOLOGIA E ORGANIZAÇÃO:** processo de desenvolvimento e apoio de IA efetivamente utilizados; divisão de responsabilidades e registros de trabalho disponíveis. Não chamar um processo de Scrum integral apenas por existir uma tabela de tarefas.
11. **4 DESENVOLVIMENTO DO SISTEMA:** requisitos, arquitetura, estrutura real do repositório, modelo de dados, perfis e permissões, casos de uso e implementação.
12. **5 VALIDAÇÃO E RESULTADOS:** ambiente, versão, casos executados, resultados, evidências, discussão e limitações. Não substituir testes ausentes por resultados hipotéticos.
13. **6 CONCLUSÃO:** alcance dos objetivos, limitações e trabalhos futuros, coerentes com o que foi validado.
14. Referências efetivamente utilizadas, com dados e acesso verificáveis.
15. Apêndices de autoria da equipe: catálogo de casos de uso, fluxos, matriz de testes e registros reais de trabalho, conforme necessidade.
16. Anexos de terceiros apenas se necessários e autorizados, identificados corretamente.

Essa divisão de capítulos adapta o conteúdo de desenvolvimento sugerido pelo modelo. Não é exigência de seis capítulos encontrada no PDF. Registrar qualquer adaptação adicional aprovada pelo professor.

### 12.3 Regras de diagramação verificáveis

- A4; margens superior e esquerda de 3 cm; inferior e direita de 2 cm para entrega eletrônica.
- Corpo preto, tamanho 12; escolher família tipográfica consistente. O modelo não obriga uma família específica. Sugestão operacional: Arial ou Times New Roman, conforme orientação institucional.
- Entrelinha 1,5 no corpo; simples em resumo, citações longas, legendas, notas e referências.
- Seções primárias em nova página. Incluir texto de abertura antes das subseções.
- Primário: maiúsculas e negrito; secundário: maiúsculas sem negrito; terciário: iniciais maiúsculas e negrito, conforme recomendação do modelo.
- Títulos numerados à esquerda; títulos sem indicativo, como resumo, sumário e referências, centralizados.
- Contagem a partir da folha de rosto; exibição da numeração a partir do texto, no canto superior direito. O modelo pede ocultação na primeira página de cada seção primária: implementar e conferir no editor, sem alegar que seja uma regra universal da ABNT.
- Ilustrações com identificação acima e fonte correspondente. Quadros descrevem conteúdo discursivo; tabelas organizam dados numéricos/estatísticos.
- Citações diretas longas: fonte menor, recuo de 4 cm, espaço simples e sem aspas. Nunca inventar localização de uma citação.
- Atualizar sumário, listas e campos no editor antes da exportação final. Verificar quebras, páginas em branco, títulos isolados, imagens cortadas e leitura dos diagramas em tamanho real.

**Edições das normas:** o PDF menciona normas de anos diferentes. Seguir as instruções institucionais explícitas e registrar eventuais conflitos com orientações atuais para confirmação do professor; não declarar atualização normativa sem verificação.

**O guia de execução não é o TCC:** o DOCX deste plano usa formatação de guia de trabalho. As regras acima são requisitos do TCC que será gerado na etapa acadêmica.

## 13. Execução concentrada pelo Arena

### 13.1 O que a IA pode executar e o que depende de acesso

O Arena pode inspecionar e editar o código, produzir migrações, criar testes, executar comandos disponíveis, gerar documentação e preparar arquivos de apresentação. Pode avançar em tarefas reversíveis e bem definidas sem solicitar aprovação para cada frase ou ajuste visual, desde que a equipe tenha autorizado o lote e os contratos estejam definidos.

O Arena não deve prometer autonomia ilimitada. Acessos a serviços, configuração segura de credenciais, decisões do professor, dados pessoais dos autores, participação em reuniões, autorizações de publicação e ensaio continuam dependendo da equipe. Ferramenta ausente ou ambiente sem banco/navegador deve produzir um bloqueio explícito, não uma alegação de execução.

### 13.2 Modo recomendado para economizar tempo

Se a equipe não consegue manter quatro chats simultâneos, **usar um único chat técnico integrador** continua válido: o Arena executa as quatro frentes na ordem que a pessoa escolher, sem criar dependência entre elas. Os quatro nomes continuam representando pessoas reais que precisam compreender e conferir suas entregas, não personagens criados pela IA.

Se forem usados quatro chats, cada um trabalha na sua frente independente, lendo este guia e os contratos publicados. Eles não compartilham automaticamente histórico, arquivos ainda não integrados ou decisões privadas de outra conversa. Antes de cada nova rodada, conferir os arquivos efetivamente disponíveis. Como cada frente tem escopo completo, nenhuma precisa esperar a outra: o que circula são contratos e código versionados, não repasses.

### 13.3 Prompt mestre — execução integrada

Copiar este prompt em uma sessão com acesso ao repositório. Ele substitui a necessidade de colar todos os prompts especializados de uma só vez; o Arena deve usá-los como instruções por frente.

```text
Quero executar a Etapa 5 do CoreMotion usando o Arena como assistente integrador.
Leia integralmente:
- docs/etapa-5/DOCUMENTO-FINAL-DE-EXECUCAO.md;
- docs/etapa-5/referencias/LEITURA-DO-MODELO.md;
- docs/etapa-5/referencias/Modelo-de-TCC.docx.pdf;
- CONTRIBUTING.md, package.json, .env.example e os documentos existentes.
O enunciado da atividade está consolidado no guia. Se houver outro PDF de requisitos,
verifique-o também. Trabalhe somente na branch atribuída à sessão Arena.

Execute as quatro frentes como escopos independentes, na ordem que eu indicar:
1. Pessoa 1 — identidade, acesso, papéis e administração (interface, servidor e banco).
2. Pessoa 2 — catálogo, negócio e comunidade (interface, servidor e dados).
3. Pessoa 3 — TCC, requisitos e diagramas.
4. Pessoa 4 — verificação, README, apresentação e publicação.
Cada frente deve poder ser concluída sem esperar a conclusão ou a revisão das outras.
O que conecta as frentes são os contratos em docs/etapa-5/contratos/ e o código versionado.

Comece pelo diagnóstico da frente em execução. Apresente o escopo e, quando houver mudança de
regra de negócio ou permissão, a proposta para aprovação. Depois de aprovado o lote,
execute mudanças reversíveis dentro dele sem pedir confirmação a cada arquivo.
Não amplie o escopo para integrações financeiras reais ou novos módulos não exigidos.

Reaproveite a arquitetura e os geradores existentes. Não trate dados em localStorage,
atalhos de demonstração ou telas estáticas como persistência, autenticação ou pagamentos reais.
A autorização deve ser aplicada no servidor e no banco conforme a arquitetura.
Inclua testes negativos e registre o que não puder ser executado.

Não invente reuniões, participação dos integrantes, entrevistas, aprovação da banca,
resultados de testes, referências ou screenshots. Use dados sintéticos apenas no
ambiente de teste e exemplos identificados como SIMULAÇÃO — NÃO É REGISTRO REAL.
Use PENDENTE para nomes, acessos, decisões e informações não fornecidas.
Não declare 100% de conclusão com bloqueios relevantes ou testes não executados.

Não exponha segredos, não altere produção e não execute operações destrutivas sem
autorização explícita e verificação de ambiente/backup. Não faça publicação, push,
merge ou mudança de visibilidade sem autorização. Nunca troque a branch da sessão.
Se o ambiente ou a ferramenta não permitir uma etapa, documente o bloqueio e
continue nas tarefas independentes, sem fabricar um resultado.

Mantenha docs/etapa-5/STATUS-EXECUCAO.md com estado por frente, versão avaliada,
arquivos alterados, comandos executados, evidências, bloqueios e próxima ação.
Ao encerrar cada rodada, registre em uma nota curta o que mudou e qual é o próximo lote da própria frente.
A entrega deve permanecer marcada como incompleta enquanto houver bloqueadores.
```

### 13.4 Prompt para continuar em um chat novo

```text
Continue a execução da Etapa 5 do CoreMotion.
Leia DOCUMENTO-FINAL-DE-EXECUCAO.md e STATUS-EXECUCAO.md em docs/etapa-5/,
os relatórios das quatro frentes e o modelo institucional em referencias/.
Se STATUS-EXECUCAO.md não existir, faça uma inspeção inicial antes de criá-lo.
Confira a branch atribuída à sessão, o código disponível e a versão integrada;
não suponha acesso ao histórico nem às mudanças de outro chat.
Revalide as afirmações de conclusão relevantes e identifique pendências desatualizadas.
Execute o próximo lote aprovado e atualize o status com evidências reais.
Não invente registros para preencher lacunas e não publique sem autorização.
```

### 13.5 Formato mínimo do controle de execução

O Arena deve criar o controle apenas ao iniciar efetivamente a implementação. Este guia não pré-preenche resultados.

| Frente | Estado inicial | Evidência de conclusão necessária |
| --- | --- | --- |
| Pessoa 1 — Identidade e administração | A verificar/implementar | Matriz publicada, sessão no servidor, três papéis, testes positivos/negativos e scripts de banco |
| Pessoa 2 — Catálogo e negócio | A verificar/completar | Fluxos persistidos, estados de UI, simulações rotuladas e testes do domínio |
| Pessoa 3 — TCC e diagramas | A produzir/revisar | DOCX e PDF conforme o modelo, fontes atualizadas e versões legíveis para A4 e slides |
| Pessoa 4 — Verificação e entrega | A executar | Relatório com resultados obtidos, README validado, capturas reais e links conferidos |
| Daily Scrum | Sem registros fornecidos | Registros reais confirmados pelos presentes |
| Publicação | A esclarecer/autorizar | Decisão do professor e acessos públicos verificados |

## 14. Reuniões, evidências e dados demonstrativos

### 14.1 Como lidar com registros ausentes

Não existe um registro histórico de reunião apenas porque o sistema foi desenvolvido. Quando não houver ata ou evidência, escrever “não há registro disponível” e descrever somente o que puder ser sustentado. Histórico Git pode comprovar alterações técnicas, mas não prova presença em reunião, duração de trabalho ou participação verbal.

Se a equipe adotar encontros agora, documentá-los com data e presentes reais. Não retroagir a data para simular um processo anterior. Se o professor exigir evidências históricas inexistentes, a equipe precisa comunicar a limitação e pedir orientação.

A IA pode:

- Criar pauta, tabela de papéis, roteiro de reunião, quadro de tarefas e modelo de ata.
- Organizar relatos reais fornecidos pelos participantes e identificá-los como relatos.
- Resumir commits e tarefas com seus limites probatórios.
- Gerar usuários, produtos e pedidos fictícios para testes em ambiente isolado.
- Criar um exemplo didático de Daily Scrum, com a indicação explícita de que não aconteceu.

A IA não deve transformar esses exemplos em evidências da equipe, atribuir trabalho a pessoas sem confirmação ou produzir imagens sintéticas como se fossem fotografias de reuniões reais.

### 14.2 Roteiro mínimo para coletar evidências com pouco tempo

**Sugestão operacional, não histórico já realizado:**

1. Fazer um encontro real de aproximadamente 15 minutos com quem puder participar. Registrar data e presentes, sem incluir ausentes como presentes.
2. Cada integrante confirma sua função, o que efetivamente revisou e a próxima tarefa. A divisão deste guia é uma proposta até ser aceita.
3. Registrar impedimentos e definir um lote prioritário. Se houver consenso, salvar uma ata curta.
4. Capturar o quadro ou a reunião com consentimento, sem mostrar tokens ou dados pessoais desnecessários. Se não houver imagem, registrar a limitação em vez de inventá-la.
5. Executar a rodada de trabalho e salvar evidências técnicas.
6. Se a equipe quiser, fazer um encontro real de revisão antes da entrega. Ele não é condição para nenhuma frente concluir: registrar o que foi demonstrado e o que permaneceu pendente.

Dois encontros não comprovam que a equipe adotou Scrum completo ao longo do projeto. Descrever o processo com exatidão e confirmar com o professor se isso atende à atividade.

### 14.3 Exemplo permitido — não entregar como ata histórica

**SIMULAÇÃO DIDÁTICA — NÃO É REGISTRO REAL DA EQUIPE.**

| Participante demonstrativo | Papel | Relato fictício para exemplificar o preenchimento |
| --- | --- | --- |
| Integrante A | Identidade e administração | Revisaria o cadastro e publicaria o contrato de sessão do próprio escopo. |
| Integrante B | Catálogo e negócio | Ligaria a listagem de produtos ao banco e registraria os casos do domínio. |
| Integrante C | Documento e diagramas | Organizaria requisitos e marcaria resultados ainda não comprovados. |
| Integrante D | Verificação e entrega | Prepararia casos negativos e verificaria as permissões dos links. |

Não há data, presença, resultado ou imagem associados a esse exemplo. Ele deve ficar fora do conjunto de evidências reais da submissão, salvo se incluído explicitamente como modelo didático.

### 14.4 Prompt para produzir material de apoio sem falsificação

```text
Prepare uma pauta de alinhamento e uma ata preenchível para a equipe do CoreMotion.
Use a divisão de funções do documento final, mas não atribua nomes ou presença sem dados.
Crie um quadro de tarefas e um roteiro curto de revisão do sistema.
Se criar um exemplo preenchido, identifique no título e no corpo:
SIMULAÇÃO DIDÁTICA — NÃO É REGISTRO REAL DA EQUIPE.
Não gere imagens como comprovação de reunião real.
Depois de eu fornecer registros verdadeiros, organize-os preservando datas,
participantes, incertezas e a origem de cada evidência.
```

## 15. Pacote final a produzir e checagem de liberação

### 15.1 Entregáveis finais e seus estados

| Artefato final esperado | Quem coordena | Condição de liberação |
| --- | --- | --- |
| Código integrado | Frentes 1 e 2, em escopos separados | Fluxos exigidos funcionais e permissões verificadas |
| Scripts de banco | Pessoa 1 | Recriação/configuração documentada em ambiente seguro |
| README na raiz | Pessoa 4 | Instruções reproduzidas ou limitações explicitadas |
| TCC editável em DOCX | Pessoa 3 | Modelo aplicado, dados reais, revisão de conteúdo e campos |
| TCC em PDF | Pessoa 3 | Exportação e revisão visual concluídas, quando requerida |
| Casos de uso e fluxos | Pessoa 3 | Compatíveis com código, legíveis em A4 e apresentação |
| Relatório de testes | Pessoa 4 | Resultados reais, falhas e retestes preservados |
| Registros de equipe | Todos; Pessoa 4 organiza | Participação e imagens verdadeiras, com consentimento |
| Arquivo da apresentação | Pessoa 4 | Conteúdo coerente com a versão validada |
| Link Google Slides/PowerPoint Online | Pessoa 4 | Publicado com autorização e acesso de leitura testado |
| Links públicos para avaliação | Pessoa 4 | Repositório, documento e demais acessos verificados |
| Auditoria final | Todos, cada um no seu escopo | Ausência de bloqueadores e verificação final registrada |

### 15.2 Prompt de geração dos arquivos finais

```text
Com base na versão integrada e validada, prepare os arquivos finais do CoreMotion.
Releia o modelo institucional e docs/etapa-5/referencias/LEITURA-DO-MODELO.md.
Use o texto acadêmico e as evidências verificadas para gerar o TCC em DOCX editável,
com estilos, títulos, sumário por campos e diagramação conforme o modelo.
Não reutilize a formatação de guia operacional deste plano como se fosse o TCC.
Deixe dados acadêmicos não confirmados explicitamente pendentes e a folha de aprovação
sem aprovação fictícia. Use apenas resultados comprovados no resumo e na conclusão.
Gere PDF se houver conversor disponível; caso contrário, explique a exportação no editor.
Indique campos e sumário que precisam ser atualizados e revise os arquivos tecnicamente.
Não alegue revisão visual completa se não houver renderização disponível.
Prepare slides importáveis e roteiro de fala dos quatro integrantes, sem inventar nomes.
Liste cada arquivo entregue, o que foi verificado e o que ainda depende de publicação.
Não anuncie TCC final sem pendências se ainda existirem campos ou evidências ausentes.
```

### 15.3 Última conferência humana e técnica

- [ ] Os quatro integrantes leram e confirmaram seus nomes, funções e contribuições.
- [ ] Todos conseguem explicar os fluxos e permissões que irão demonstrar.
- [ ] A versão do site demonstrada corresponde aos diagramas, TCC e testes.
- [ ] Nenhum resultado inventado ou simulação aparece como evidência real.
- [ ] Autenticação, hierarquia e persistência foram testadas no ambiente de avaliação previsto.
- [ ] Documento editável e PDF não contêm texto didático remanescente do modelo.
- [ ] Sumário, referências, páginas, figuras e quadros foram revisados após a exportação.
- [ ] Nenhuma aprovação, assinatura, consentimento ou participação foi presumida.
- [ ] Links abrem em janela anônima e usam a plataforma exigida.
- [ ] A interpretação da publicação “apenas no github.com” foi esclarecida.
- [ ] A equipe autorizou a entrega e conhece as limitações restantes.

**Conclusão deste guia:** o Arena pode concentrar a implementação e a produção dos materiais em uma execução coordenada, mas conclusão exige funcionamento demonstrável, documentação fiel e acessos reais. Onde faltar evidência, registrar a falta e resolver o bloqueio; não substituir a realidade por um relato inventado.
