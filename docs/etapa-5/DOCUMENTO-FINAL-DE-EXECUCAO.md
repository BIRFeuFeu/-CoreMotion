# CoreMotion — Documento final de execução da Etapa 5
## Especificação consolidada, responsabilidades e comandos para implementação com Arena IA

**Data:** 16/10/2026  
**Finalidade:** concluir e validar o sistema, produzir a documentação do TCC e preparar a entrega ao professor Antonio Carlos.  
**Versão:** 2 — consolidada com o modelo institucional recebido. Substitui o plano inicial como instrução de execução.

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
- `CONTRIBUTING.md` ainda menciona equipe de 5 pessoas e um fluxo de branches genérico. Deve ser revisado para refletir a organização real, sem contrariar as regras da sessão Arena.

**Regra:** conferir código e execução antes de declarar que algo funciona. Não confundir interface pronta, dados locais ou botões demonstrativos com integração real.

## 3. Como a equipe vai trabalhar com o Arena

### 3.1 Responsabilidades

| Integrante | Frente principal | Revisor de apoio | Entrega principal |
| --- | --- | --- | --- |
| Pessoa 1 — [nome] | Frontend e experiência de uso | Pessoa 4 | Telas e navegação completas para os perfis |
| Pessoa 2 — [nome] | Backend, banco e segurança | Pessoa 1 | Autenticação, permissões, persistência e migrações |
| Pessoa 3 — [nome] | TCC, requisitos e diagramas | Pessoa 2 | Documento fiel ao sistema e diagramas atualizados |
| Pessoa 4 — [nome] | Testes, README, apresentação e entrega | Pessoa 3 | Evidências, instruções reproduzíveis, slides e links |

O responsável coordena, executa com auxílio do Arena e confere o resultado. Não deve simplesmente aceitar a resposta da IA sem verificar.

### 3.2 Regras contra conflitos

1. Cada pessoa usa uma conversa própria no Arena conectada ao repositório, respeitando a branch fixa atribuída à sua sessão. **Não peça ao Arena para trocar ou criar outra branch.**
2. A equipe define um integrador antes de começar. Sugestão: Pessoa 4 coordena a fila; Pessoa 2 revisa alterações técnicas de integração.
3. Antes de editar, o Arena deve listar arquivos envolvidos e dependências. Não editar o mesmo arquivo em duas frentes ao mesmo tempo.
4. Arquivos compartilhados — especialmente `lib/store.tsx`, `lib/types.ts`, componentes administrativos, schemas e contratos das APIs — exigem coordenação entre Pessoas 1 e 2.
5. Não iniciar integração final enquanto os contratos de perfis e permissões não estiverem aprovados.
6. Publicação, push, abertura e merge de PR devem ocorrer com autorização da equipe, para a branch permitida pela sessão. Não fazer merge automático de trabalho ainda não revisado.
7. Antes de cada rodada, confirmar qual versão integrada está disponível. Mudanças em conversas separadas não devem ser presumidas como sincronizadas.

### 3.3 Uso responsável da IA

- Anexar o enunciado, o PDF e o modelo do TCC quando disponíveis.
- Não enviar senhas, tokens ou chaves privadas. Usar o mecanismo seguro de configuração do ambiente; não colar segredos no chat, nos documentos ou no Git.
- Não executar migração, seed, limpeza ou testes destrutivos em produção sem autorização explícita. Preferir banco isolado de testes e backup.
- Não inventar resultados, referências bibliográficas, reuniões, nomes, aprovação de usuários ou links publicados.
- Identificar claramente protótipos, simulações e funções não integradas.
- A equipe deve revisar autoria, fontes e eventual declaração de uso de IA conforme as regras da instituição.
- O Arena pode gerar arquivos e instruções, mas permissões de publicação, acesso às contas, reuniões reais e validação com o professor dependem de pessoas.

### 3.4 Cabeçalho comum — colar antes dos prompts de cada pessoa

```text
Você está auxiliando a equipe do CoreMotion na Etapa 5 do TCC.
Leia docs/etapa-5/DOCUMENTO-FINAL-DE-EXECUCAO.md, o enunciado e o modelo em
docs/etapa-5/referencias/Modelo-de-TCC.docx.pdf. Consulte também
docs/etapa-5/referencias/LEITURA-DO-MODELO.md.
Trabalhe no repositório e na branch permitida pela sessão Arena, sem trocar de branch.
Inspecione o código real antes de fazer afirmações. Diferencie implementado, demonstrativo,
pendente e não verificado. Não invente fontes, testes, imagens, reuniões ou links.
Antes de editar, apresente os arquivos envolvidos e os conflitos com outras frentes.
Não exponha segredos, não altere produção e não publique nem faça merge sem autorização.
Preserve a arquitetura existente e aproveite os diagramas e scripts já disponíveis.
Quando algo depender de acesso, decisão ou documento ausente, registre o bloqueio.
Ao concluir, informe arquivos alterados, verificações executadas, resultado e pendências.
Minha função é a Pessoa [1, 2, 3 ou 4]. Meu nome é [nome].
```

Substituir os campos entre colchetes antes de enviar. Os prompts abaixo são sequenciais: executar uma rodada, revisar e só então avançar.

## 4. Pessoa 1 — Frontend e experiência de uso

### Objetivo

Entregar uma interface completa, coerente e utilizável, integrada aos contratos definidos com a Pessoa 2, sem telas vazias nem funcionalidades falsas apresentadas como reais.

### Tarefas

1. Inventariar telas, menus, formulários, modais e links. Conferir quais componentes são usados de verdade; há arquivos de reexportação em subpastas.
2. Identificar telas ausentes, navegação sem destino, botões sem ação e operações que apenas alteram dados locais.
3. Alinhar com a Pessoa 2 os perfis, a matriz de permissões, os contratos das APIs e os estados de erro.
4. Completar os fluxos previstos no escopo aprovado: autenticação, navegação do marketplace, produtos, loja, anúncios e painéis pertinentes. Não ampliar o escopo com funcionalidades não exigidas.
5. Adaptar menus e telas de Usuário, Supervisor e Administrador. Lojista pode continuar como perfil de negócio; não equivale automaticamente a Supervisor.
6. Mostrar estados de carregamento, vazio, sucesso, erro e acesso negado. Validar formulários, mas lembrar que a validação também deve existir no servidor.
7. Revisar responsividade, foco de teclado, rótulos de campos, contraste e legibilidade.
8. Entregar uma lista de cenários para a Pessoa 4 e capturas reais para a Pessoa 3.

### Arquivos prováveis

`components/`, `app/page.tsx`, `app/globals.css` e arquivos de apresentação relacionados. Alterações em `lib/store.tsx` ou `lib/types.ts` precisam ser combinadas com a Pessoa 2.

### Critérios de conclusão

- [ ] Nenhum menu do escopo leva a tela vazia ou erro não tratado.
- [ ] Fluxos principais funcionam com o backend de testes, não apenas com dados locais.
- [ ] Menus refletem permissões reais, com bloqueios de servidor sob responsabilidade da Pessoa 2.
- [ ] Interface conferida em celular e computador, com evidências reais.
- [ ] Formulários têm mensagens claras e não perdem dados desnecessariamente.
- [ ] Alterações não criam novas falhas nas verificações técnicas; falhas anteriores são registradas.

### Prompt 1A — Diagnóstico do frontend

```text
Sou a Pessoa 1, responsável pelo frontend.
Audite a interface do CoreMotion sem alterar arquivos nesta primeira rodada.
Mapeie telas, navegação, formulários e componentes realmente importados.
Compare o comportamento com o escopo da Etapa 5 e destaque telas vazias,
botões sem ação, recursos demonstrativos, responsividade e acessibilidade.
Não trate o que diz a documentação antiga como prova de funcionamento.
Crie docs/etapa-5/pessoa-1/diagnostico-frontend.md com:
problema, evidência no arquivo, impacto, prioridade e critério de aceite.
Liste as dependências da Pessoa 2 e os arquivos compartilhados.
Proponha lotes pequenos de implementação e aguarde minha aprovação.
```

### Prompt 1B — Implementação

```text
Implemente somente o lote aprovado no diagnóstico da Pessoa 1: [identificar lote].
Use a matriz de permissões e o contrato de integração aprovados pela Pessoa 2.
Se esses documentos ainda não existirem, liste o bloqueio e não invente APIs ou perfis.
Preserve o visual do projeto, corrija os fluxos do escopo e inclua estados de
carregamento, vazio, sucesso, erro e acesso negado.
Não simule persistência real com localStorage nem trate esconder botões como segurança.
Não altere migrações, políticas RLS ou regras de servidor sem coordenação.
Execute as verificações disponíveis e registre resultados reais e limitações em
docs/etapa-5/pessoa-1/registro-implementacao.md.
```

### Prompt 1C — Revisão e repasse

```text
Revise as alterações do frontend após a integração com a Pessoa 2.
Percorra os fluxos de Usuário, Supervisor e Administrador, identificando
se cada validação foi executada ou se está apenas proposta.
Crie docs/etapa-5/pessoa-1/repasse-frontend.md com telas alteradas, passos de uso,
cenários para a Pessoa 4 e lista das capturas necessárias ao TCC.
Se não houver ferramenta de navegador, não invente screenshots: forneça um roteiro
para eu capturá-las e registre que a revisão visual está pendente.
```

## 5. Pessoa 2 — Backend, banco e segurança

### Objetivo

Garantir que o sistema autentique usuários, persista dados e aplique a hierarquia exigida no servidor e no banco, e não apenas na interface.

### Tarefas

1. Auditar Auth, rotas, Server Actions, serviços, sessões, SQL e RLS do Supabase.
2. Definir com a equipe uma **matriz de permissões**. Proposta inicial, sujeita a aprovação:
   - Usuário: consultar catálogo e executar operações próprias do escopo.
   - Supervisor: moderar operações ou conteúdos autorizados, sem promover administradores nem acessar dados sem necessidade.
   - Administrador: administrar o sistema e os perfis autorizados, com controles de segurança.
   - Visitante e lojista: manter como atores adicionais se existirem no produto; não substituem os três níveis exigidos.
3. Definir como os papéis são atribuídos, alterados e auditados. Usuário comum não pode se promover no cadastro nem enviando uma requisição modificada.
4. Criar contratos para a Pessoa 1: operações, dados de entrada/saída, estados e erros.
5. Implementar verificações de autenticação, autorização, propriedade dos registros e validação de entrada em todos os pontos relevantes.
6. Revisar atalhos de demonstração e privilégios baseados em e-mail ou estado do navegador. Separar demonstração de ambiente real e eliminar caminhos de escalada indevida.
7. Criar migrações incrementais, dados fictícios de teste quando necessários e instruções de aplicação. Não editar silenciosamente uma migração já aplicada para esconder mudanças.
8. Distinguir pedido registrado de pagamento real. Não afirmar integração financeira, custódia ou PIX real sem evidência técnica.
9. Revisar `.env.example`, sem valores secretos, e repassar à Pessoa 4 os passos reais de configuração.
10. Preparar testes positivos e negativos de acesso para a Pessoa 4.

### Arquivos prováveis

`app/api/`, `app/actions/`, `services/`, `lib/`, `types/`, `middleware.ts`, `supabase/migrations/` e scripts de banco. Evitar alterações visuais paralelas às da Pessoa 1.

### Critérios de conclusão

- [ ] Os três perfis exigidos existem e possuem permissões aprovadas.
- [ ] Acesso direto à API não contorna a hierarquia.
- [ ] Alterar o navegador ou o corpo da requisição não promove o usuário.
- [ ] Usuário não lê nem altera registros privados de outro usuário sem autorização.
- [ ] Regras de RLS e credenciais privilegiadas são revisadas conforme a arquitetura real.
- [ ] Banco de testes pode ser recriado com os scripts documentados.
- [ ] Dados persistem após recarregar e entrar novamente.
- [ ] Modo demonstrativo está separado e claramente identificado.

### Prompt 2A — Auditoria e contrato

```text
Sou a Pessoa 2, responsável por backend, banco e segurança.
Audite autenticação, sessões, APIs, Server Actions, serviços, SQL e políticas RLS.
Confirme os perfis atuais no código e a diferença entre modo demo e banco real.
Investigue autorização apenas no cliente, privilégios por e-mail, possibilidade de
autopromoção, acesso entre usuários e exposição de credenciais, sem reproduzir segredos.
Não execute alterações no banco nesta rodada.
Crie docs/etapa-5/pessoa-2/auditoria-backend.md,
docs/etapa-5/pessoa-2/matriz-permissoes.md e
docs/etapa-5/pessoa-2/contrato-integracao.md.
Na matriz, proponha Administrador, Supervisor e Usuário e preserve papéis de negócio
quando necessário. Marque as decisões que precisam de aprovação da equipe.
Priorize riscos e proponha migrações, testes e um plano de reversão.
Aguarde aprovação antes de implementar.
```

### Prompt 2B — Implementação segura

```text
Implemente o lote aprovado da auditoria da Pessoa 2: [identificar lote].
Aplique a matriz de permissões aprovada no servidor e no banco, conforme a arquitetura.
Valide sessão, papel, propriedade do registro e dados recebidos; não confie em papel,
ID de usuário ou indicador de admin enviado pelo navegador.
Impeça autopromoção e separe atalhos demonstrativos do funcionamento real.
Versione mudanças SQL em migrações incrementais e atualize tipos e contratos necessários.
Não use chave privilegiada no cliente nem execute migrações, seeds ou limpezas em produção.
Se faltar ambiente seguro, prepare os scripts e marque a aplicação como pendente.
Inclua testes positivos e negativos, execute o que for possível e registre comandos,
resultados reais, riscos e instruções em docs/etapa-5/pessoa-2/registro-backend.md.
```

### Prompt 2C — Repasse técnico

```text
Prepare o repasse do backend para as Pessoas 1 e 4.
Atualize contrato-integracao.md e matriz-permissoes.md para o comportamento implementado.
Crie docs/etapa-5/pessoa-2/repasse-backend.md com configuração sem segredos,
ordem das migrações, criação segura de contas de teste, rotas/operações por perfil,
cenários de acesso negado, limitações e estado dos testes.
Diferencie integração real, simulação e funcionalidade ainda pendente.
Não declare segurança validada sem evidências dos testes correspondentes.
```

## 6. Pessoa 3 — TCC, requisitos e diagramas

### Objetivo

Produzir documentação acadêmica legível, rastreável e fiel à versão integrada do sistema, usando o modelo do professor e reaproveitando os diagramas existentes.

### Tarefas

1. Ler o modelo recebido em `referencias/Modelo-de-TCC.docx.pdf` e a leitura por página. Obter um PDF adicional de requisitos da Etapa 5, se existir; registrar exigências e lacunas.
2. Receber nomes completos, instituição, curso, orientador, cidade, ano e grafia oficial do aplicativo.
3. Elaborar estrutura de capítulos conforme o modelo. Em geral: introdução, problema, objetivos, justificativa, fundamentação, metodologia, desenvolvimento, testes/resultados, conclusão e referências; não impor essa estrutura se o modelo exigir outra.
4. Descrever arquitetura, tecnologias, requisitos funcionais e não funcionais, perfis, banco e jornadas de uso reais.
5. Criar rastreabilidade: requisito → caso de uso → tela/API → teste → evidência.
6. Revisar o material em `Fluxograma/Diagrama C. De Uso/`. Confrontar o catálogo existente com o sistema; contagens antigas não são metas de completude.
7. Atualizar as fontes dos diagramas e regenerar os arquivos; não editar PDFs/HTML gerados à mão.
8. Criar versão A4 do diagrama, com decomposição por módulos se necessário, e versão adequada para slides. Não encolher um diagrama inteiro a ponto de ficar ilegível.
9. Descrever casos principais com ator, objetivo, pré-condições, fluxo principal, alternativas e pós-condições. Usar fluxogramas ou passos numerados como complemento.
10. Inserir capturas reais fornecidas pelas Pessoas 1 e 4, com legenda, fonte e proteção de dados pessoais.
11. Buscar referências verificáveis. Não usar referências inventadas ou tratar respostas da IA como fonte técnica primária.
12. Conferir sumário, numeração, citações, referências, legendas e diagramação na exportação final.

### Arquivos sob sua coordenação

`docs/etapa-5/pessoa-3/`, fontes de documentação em `scripts/lib/`, templates de documentação e artefatos em `Fluxograma/Diagrama C. De Uso/`. Alterar somente conteúdo pertinente; combinar mudanças em scripts compartilhados.

### Critérios de conclusão

- [ ] Modelo e requisitos do professor foram conferidos; se ausentes, documento continua identificado como rascunho.
- [ ] Documento corresponde ao sistema testado, sem anunciar recursos simulados como reais.
- [ ] Diagrama representa corretamente os atores e suas permissões.
- [ ] Versões A4 e de apresentação são legíveis em tamanho real.
- [ ] Casos de uso, requisitos e testes são rastreáveis.
- [ ] Fontes e referências são verificáveis.
- [ ] Arquivo editável, versão de leitura e link público da documentação foram conferidos pela equipe.

### Prompt 3A — Estrutura e lacunas acadêmicas

```text
Sou a Pessoa 3, responsável pelo TCC e pelos diagramas.
Leia o enunciado, o PDF e o modelo acadêmico anexados, quando disponíveis.
Se faltarem, registre exatamente o que falta e não declare conformidade ABNT definitiva.
Inspecione o sistema e os documentos existentes, sem alterar código da aplicação.
Crie docs/etapa-5/pessoa-3/requisitos-documentais.md com cada exigência,
fonte da exigência, entrega correspondente e informação ainda necessária.
Crie uma estrutura de TCC coerente com o modelo e uma tabela de dados acadêmicos faltantes.
Diferencie afirmações confirmadas no código, confirmadas em execução e não verificadas.
Não invente integrantes, instituição, resultados ou referências.
```

### Prompt 3B — Texto do TCC

```text
Redija a versão de trabalho do TCC com base na estrutura aprovada, no modelo do professor,
na matriz de permissões e na versão integrada do sistema.
Crie os arquivos em docs/etapa-5/pessoa-3/tcc/.
Explique problema, objetivos, justificativa, método, arquitetura, requisitos,
implementação, validação e conclusão, ajustando os capítulos ao modelo recebido.
Inclua uma matriz requisito → caso de uso → tela/API → teste → evidência.
Use somente resultados de teste documentados e referências verificáveis.
Na ausência de dados, deixe marcações explícitas de PENDENTE e uma lista de coleta.
Não apresente pagamento, custódia, segurança ou publicação como reais sem comprovação.
Prepare arquivo editável e versão PDF se as ferramentas permitirem; se não,
explique o procedimento de exportação e revisão final no editor.
```

### Prompt 3C — Diagramas e passos de uso

```text
Revise os casos de uso e fluxogramas existentes em Fluxograma/Diagrama C. De Uso/.
Confira scripts/lib/usecase-core.mjs e scripts/lib/flowchart-core.mjs contra
os contratos aprovados e o código integrado. Não use o catálogo antigo como prova de conclusão.
Atualize atores e permissões, incluindo Administrador, Supervisor e Usuário,
sem apagar atores de negócio pertinentes. Use UML correta; include/extend só quando aplicáveis.
Atualize as fontes e rode os geradores documentados no package.json quando possível.
Produza diagramas legíveis em páginas A4 e imagens vetoriais ou de boa resolução para slides,
com visão geral e recortes por módulo quando necessário.
Documente os principais casos com pré-condições, fluxo principal, alternativas e pós-condições.
Crie docs/etapa-5/pessoa-3/revisao-diagramas.md com mudanças, comandos executados,
arquivos gerados e verificações de legibilidade ainda pendentes.
```

## 7. Pessoa 4 — Testes, README, apresentação e entrega

### Objetivo

Verificar a versão integrada, organizar evidências reais e preparar uma entrega pública reproduzível, sem confundir arquivos gerados com links efetivamente publicados.

### Tarefas

1. Coordenar a lista de pendências e a integração entre as outras frentes.
2. Preparar ambiente de testes com contas fictícias e autorização da Pessoa 2.
3. Testar cadastro/login, fluxos de negócio, persistência, validações, responsividade e os três perfis.
4. Testar acesso negado por URL/API, operações de outro usuário e tentativa de promoção indevida. Não fazer testes destrutivos ou ofensivos contra produção.
5. Registrar cada caso com ID, versão, data, perfil, pré-condição, passos, resultado esperado, resultado obtido, evidência e status.
6. Encaminhar falhas à pessoa responsável e executar reteste. Registrar o histórico; não apagar falhas para produzir um relatório artificialmente positivo.
7. Criar `README.md` na raiz com visão geral, stack, pré-requisitos reais, instalação, variáveis sem segredos, preparação do banco, execução, build, testes, perfis, limitações e links reais.
8. Verificar o gerenciador e lockfile existentes antes de definir instruções. O repositório tem `bun.lock`; não gerar lockfiles conflitantes sem decisão.
9. Revisar `CONTRIBUTING.md` com a equipe para refletir 4 integrantes e as regras reais de colaboração, sem instruir sessões Arena a trocarem suas branches fixas.
10. Preparar slides e notas de fala usando resultados e capturas reais. Incluir problema, solução, equipe, arquitetura, casos de uso, demonstração, testes, conclusão e referências pertinentes.
11. Organizar os registros do Daily Scrum e imagens autênticas dos integrantes. Usar fotos, capturas de reuniões ou do quadro real com consentimento. A forma exata de imagem deve ser confirmada com o professor.
12. Obter esclarecimento sobre publicação, preparar a opção autorizada e conferir todos os links em janela anônima.
13. Publicar/importar a apresentação na plataforma exigida e preencher o modelo final de entrega.

### Critérios de conclusão

- [ ] Cenários principais e negativos executados e rastreáveis; pendências aparecem claramente.
- [ ] Bugs bloqueantes corrigidos e retestados.
- [ ] README validado em ambiente limpo ou com limitações de reprodução explicitadas.
- [ ] Slides revisados e disponíveis no Google Slides ou PowerPoint Online por link de leitura.
- [ ] Daily Scrum registra participação verdadeira dos quatro integrantes.
- [ ] Repositório, documentação e apresentação acessíveis sem login do avaliador.
- [ ] Publicação do sistema atende à interpretação confirmada com o professor.
- [ ] Nenhuma credencial ou dado privado aparece nos arquivos e nas evidências.

### Prompt 4A — Plano e execução de testes

```text
Sou a Pessoa 4, responsável por testes e entrega.
Leia a matriz de permissões, os contratos e os repasses das Pessoas 1 e 2.
Crie docs/etapa-5/pessoa-4/plano-testes.md com casos de login/cadastro,
fluxos principais, persistência, formulários, responsividade e autorização dos três perfis.
Inclua acesso direto à API, registros de outro usuário e tentativa de autopromoção.
Execute apenas os testes possíveis no ambiente autorizado e seguro.
Registre versão, ambiente, data, passos, esperado, obtido, evidência e status.
Use os status PASSOU, FALHOU, BLOQUEADO e NÃO EXECUTADO.
Não marque teste como aprovado apenas porque o código parece correto.
Crie relatorio-testes.md e backlog-falhas.md na mesma pasta, com responsável sugerido
para cada falha. Não modifique funcionalidades de outra frente sem coordenação.
```

### Prompt 4B — README e preparação da publicação

```text
Crie ou atualize o README.md do CoreMotion com base na execução real.
Verifique package.json, lockfiles, .env.example, migrações e configuração do Next.js.
Documente instalação com o gerenciador escolhido, ambiente sem segredos,
preparação de banco de testes, execução, build, perfis, scripts e limitações.
Não apresente modo demo como sistema integrado. Não inclua contas ou senhas privadas.
Teste as instruções em ambiente isolado quando possível e registre o que não foi validado.
Revise as divergências de CONTRIBUTING.md com o plano da equipe e proponha correções.
Antes de publicar, destaque a ambiguidade da exigência “apenas no github.com” e solicite
a decisão do professor. Explique a limitação do GitHub Pages para o backend Next.js.
Prepare um checklist de publicação; não publique, mude visibilidade ou invente URLs.
```

### Prompt 4C — Apresentação

```text
Prepare a apresentação do TCC a partir do texto revisado pela Pessoa 3 e dos testes reais.
Se a duração oficial não estiver informada, proponha um roteiro enxuto e marque a duração
como decisão pendente. Divida as falas entre os quatro integrantes.
Inclua problema, objetivos, solução, papéis da equipe, arquitetura, casos de uso,
demonstração dos três perfis, testes, resultados reais, limitações e conclusão.
Use capturas reais e diagramas legíveis; não invente screenshots ou métricas.
Gere roteiro, notas de fala e, se possível, um PPTX importável, em
docs/etapa-5/pessoa-4/apresentacao/. Se não for possível gerar PPTX, entregue o conteúdo
slide a slide. Explique como importar e conferir no Google Slides ou PowerPoint Online.
Não trate o PPTX local como apresentação publicada. Aguarde a publicação autorizada
para registrar um link real e verificar acesso de leitura sem login.
```

### Prompt 4D — Daily Scrum e entrega final

```text
Crie docs/etapa-5/pessoa-4/daily-scrum.md com um modelo de registro por encontro:
data, presentes, o que cada um fez, o que fará, impedimentos, decisões e evidências.
Use somente nomes, registros e imagens reais fornecidos pela equipe; se faltarem,
deixe campos PENDENTE. Não reconstrua reuniões fictícias a partir de commits.
Inclua um quadro com função de cada integrante e indicação das imagens reais a inserir.
Depois, crie docs/etapa-5/pessoa-4/checklist-entrega.md e entrega-final.md
com os campos exatos pedidos pelo professor. Não invente URLs nem declare acesso
público sem verificação. Liste todos os links ainda não publicados ou não verificados.
```

## 8. Ordem de execução e dependências

Não há prazo oficial informado. Usar esta sequência e atribuir datas reais em reunião.

| Fase | Ação | Quem atua | Condição para avançar |
| --- | --- | --- | --- |
| 1 — Alinhamento | Obter PDF/modelo, confirmar publicação, nomes e escopo | Todos; Pessoa 4 registra | Exigências e pendências registradas |
| 2 — Diagnóstico | Auditar frontend e backend; planejar TCC e testes | Quatro em paralelo | Backlog priorizado e matriz de permissões aprovada |
| 3 — Contratos | Definir perfis, APIs, dados e arquivos compartilhados | Pessoas 1 e 2 | Contrato disponível para implementação |
| 4 — Implementação | Corrigir interface, servidor e banco em lotes | Pessoas 1 e 2 | Lotes integrados e verificações registradas |
| 5 — Documentação contínua | Escrever capítulos e revisar fontes dos diagramas | Pessoa 3; Pessoa 4 prepara README/slides | Texto compatível com a versão integrada |
| 6 — Validação | Executar testes, corrigir e retestar | Pessoa 4 coordena; Pessoas 1 e 2 corrigem | Sem falhas bloqueantes nos fluxos exigidos |
| 7 — Fechamento | Congelar versão, gerar documentos finais e ensaiar | Todos | Documento, diagramas e slides da mesma versão |
| 8 — Publicação | Publicar acessos autorizados e conferir anonimato | Pessoa 4 com a equipe | Links reais e acessíveis para avaliação |

**Prioridade:** autorização e persistência → fluxos principais → testes → fidelidade documental → apresentação. Melhorias estéticas não devem impedir a correção de falhas de acesso.

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
  STATUS-EXECUCAO.md  # criar ao iniciar a execução
  referencias/
    Modelo-de-TCC.docx.pdf
    LEITURA-DO-MODELO.md
  pessoa-1/
    diagnostico-frontend.md
    registro-implementacao.md
    repasse-frontend.md
  pessoa-2/
    auditoria-backend.md
    matriz-permissoes.md
    contrato-integracao.md
    registro-backend.md
    repasse-backend.md
  pessoa-3/
    requisitos-documentais.md
    revisao-diagramas.md
    tcc/
  pessoa-4/
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
6. Foi revisada por outra pessoa da equipe.

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
1. [Nome completo — Frontend]
2. [Nome completo — Backend e banco]
3. [Nome completo — TCC e diagramas]
4. [Nome completo — Testes, apresentação e entrega]

Link do aplicativo no GitHub => [URL pública verificada]
Link da Apresentação => [URL de leitura no Google Slides ou PowerPoint Online]
Link da Documentação do aplicativo => [URL pública do TCC]
```

O SQL e o README devem estar localizáveis no repositório. Se o professor exigir um acesso adicional à demonstração publicada, incluir conforme a orientação que ele confirmar, preservando o formato principal solicitado.

---

**Resumo:** Pessoa 1 constrói e revisa a interface; Pessoa 2 garante regras, dados e segurança; Pessoa 3 transforma o sistema real em TCC e diagramas; Pessoa 4 valida, organiza a apresentação e confere a entrega. Todos participam das reuniões, revisam o resultado da IA e ensaiam a apresentação.

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

Se a equipe não consegue coordenar quatro chats simultâneos, **usar um único chat técnico integrador** reduz conflitos. Nesse chat, o Arena executa as quatro frentes por etapas, preservando as responsabilidades de revisão dos integrantes. Os quatro nomes continuam representando pessoas reais que precisam compreender e revisar suas entregas, não personagens criados pela IA.

Se forem usados quatro chats, cada um deve ler este guia e a versão integrada, e registrar o repasse. Eles não compartilham automaticamente histórico, arquivos ainda não integrados ou decisões privadas de outra conversa. Antes de cada nova rodada, conferir os arquivos efetivamente disponíveis.

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

Execute as quatro frentes em sequência coordenada:
1. Auditoria do estado real e backlog priorizado.
2. Matriz de permissões e contratos de integração para Usuário, Supervisor e Administrador.
3. Correções e implementação em lotes de frontend, servidor e banco.
4. Testes e retestes possíveis em ambiente seguro.
5. README, diagramas, TCC em DOCX e PDF quando possível, e apresentação importável.
6. Conferência final das entregas e preparação da publicação autorizada.

Comece pelo diagnóstico. Apresente o escopo e a matriz para aprovação antes de
implementar mudanças de regra de negócio ou permissão. Depois de aprovado o lote,
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
Ao encerrar cada rodada, faça um repasse curto e indique o próximo lote.
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
| Auditoria do produto | A executar | Inventário e backlog com referências a arquivos |
| Permissões e hierarquia | A verificar/implementar | Matriz aprovada, código e testes positivos/negativos |
| Frontend | A verificar/completar | Cenários executados, capturas reais e repasse |
| Banco e backend | A verificar/completar | Migrações, configuração e testes de persistência/acesso |
| Testes integrados | A executar | Relatório com resultados obtidos e evidências |
| TCC | A produzir/revisar | DOCX, fontes, revisão do modelo e PDF exportado quando possível |
| Diagramas | A revisar | Fontes atualizadas e versões legíveis para A4 e slides |
| Apresentação | A produzir/publicar | Conteúdo revisado e link na plataforma autorizada |
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
6. Fazer um encontro real de revisão antes da entrega. Registrar o que foi demonstrado, quem revisou e o que permaneceu pendente.

Dois encontros não comprovam que a equipe adotou Scrum completo ao longo do projeto. Descrever o processo com exatidão e confirmar com o professor se isso atende à atividade.

### 14.3 Exemplo permitido — não entregar como ata histórica

**SIMULAÇÃO DIDÁTICA — NÃO É REGISTRO REAL DA EQUIPE.**

| Participante demonstrativo | Papel | Relato fictício para exemplificar o preenchimento |
| --- | --- | --- |
| Integrante A | Frontend | Revisaria o formulário e aguardaria o contrato de autenticação. |
| Integrante B | Backend | Prepararia a matriz de permissões e um banco de testes isolado. |
| Integrante C | Documentação | Organizaria requisitos e marcaria resultados ainda não comprovados. |
| Integrante D | Testes e entrega | Prepararia casos negativos e verificaria as permissões dos links. |

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
| Código integrado | Pessoas 1 e 2 | Fluxos exigidos funcionais e permissões verificadas |
| Scripts de banco | Pessoa 2 | Recriação/configuração documentada em ambiente seguro |
| README na raiz | Pessoa 4 | Instruções reproduzidas ou limitações explicitadas |
| TCC editável em DOCX | Pessoa 3 | Modelo aplicado, dados reais, revisão de conteúdo e campos |
| TCC em PDF | Pessoa 3 | Exportação e revisão visual concluídas, quando requerida |
| Casos de uso e fluxos | Pessoa 3 | Compatíveis com código, legíveis em A4 e apresentação |
| Relatório de testes | Pessoa 4 | Resultados reais, falhas e retestes preservados |
| Registros de equipe | Todos; Pessoa 4 organiza | Participação e imagens verdadeiras, com consentimento |
| Arquivo da apresentação | Pessoa 4 | Conteúdo coerente com a versão validada |
| Link Google Slides/PowerPoint Online | Pessoa 4 | Publicado com autorização e acesso de leitura testado |
| Links públicos para avaliação | Pessoa 4 | Repositório, documento e demais acessos verificados |
| Auditoria final | Todos | Ausência de bloqueadores e revisão cruzada |

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
