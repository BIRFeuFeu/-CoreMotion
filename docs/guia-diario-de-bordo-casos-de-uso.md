# Diário de Bordo — guia para o diagrama de casos de uso e a estrutura do TCC

**Projeto analisado:** CoreMotiom (nome usado na interface do repositório `-CoreMotion`).

**Leitura do código:** 29/09/2026. **Prazo informado no enunciado:** 30 de setembro. Se o prazo for deste ano, é **30/09/2026**; confirme no ambiente da disciplina o horário e o formato da postagem.

**Objetivo desta etapa:** atualizar o diagrama feito no início do ano para representar o **projeto atual** e preparar, no Word ou Google Docs, o lugar em que ele entrará no TCC.

> **Diagrama criado a partir do repositório (29/09/2026):** [arquivo Draw.io editável](./diagrama-casos-de-uso-coremotiom.drawio) · [imagem PNG para o TCC](./diagrama-casos-de-uso-coremotiom.png) · [imagem SVG vetorial](./diagrama-casos-de-uso-coremotiom.svg). Contém 17 casos, cinco atores e quatro generalizações, com cores suaves e proporção pensada para inserção em uma página A4 em paisagem. Como o desenho antigo não está no repositório, ele foi feito **do zero**; compare-o com a versão do início do ano antes de postar que ela foi atualizada. Para abrir dentro do Miro, use **+ → Draw.io Diagrams**, abra o app, arraste o `.drawio` para o editor e clique em **Save and close**; dentro do app, as formas continuam editáveis. [2](https://help.miro.com/hc/en-us/articles/14066677626770-Draw-io-diagrams-by-Miro)

## 1. O que entregar e quem faz o quê

| Responsável | Trabalho a executar | Evidência recomendada para o Diário de Bordo |
| --- | --- | --- |
| **Aluno A** | Abrir o diagrama antigo, comparar com as funcionalidades atuais e **desenhar/revisar em Draw.io (diagrams.net), Miro ou Lucidchart** os atores, casos de uso e associações. | Link ou arquivo **editável** do diagrama, imagem exportada (PNG/SVG) e breve justificativa das alterações em relação ao desenho antigo. |
| **Aluno B** | Abrir o TCC existente ou criar sua estrutura no **Word/Google Docs**, configurar página e estilos, gerar **sumário automático** e reservar a seção para inserir a figura. | Link ou arquivo editável do TCC, captura das margens, do sumário e da seção com legenda, figura e fonte. |
| **Dupla** | Conferir o diagrama dentro do documento, atualizar o sumário, revisar legibilidade e postar o relato conforme a orientação da turma. | Versão final em PDF **se solicitada** pelo professor; manter também os arquivos editáveis. |

> **Importante:** não encontrei no repositório o diagrama do início do ano nem um arquivo do TCC. Peçam esses arquivos à dupla antes de substituir qualquer conteúdo; as instruções abaixo partem do código atual. O enunciado pede a *atualização do Diário de Bordo* e a preparação da estrutura do TCC, não afirma que o TCC inteiro precisa estar pronto nesta data.

## 2. Diagnóstico: o que realmente existe no CoreMotiom

O aplicativo é uma plataforma esportiva com marketplace de produtos **B2C (lojas)** e **C2C (venda entre atletas)**. Os papéis cadastrados no código são `visitor`, `user`, `seller` e `admin` ([`lib/types.ts`](../lib/types.ts)); a navegação efetiva está em [`app/page.tsx`](../app/page.tsx) e [`components/Sidebar.tsx`](../components/Sidebar.tsx). A tabela abaixo separa **fluxo visível** de **promessa ainda não comprovada**:

| Área atual | Evidência no repositório | Como descrever com segurança |
| --- | --- | --- |
| Explorar catálogo B2C/C2C, pesquisar, filtrar e ver produtos/lojas | [`components/MarketplaceView.tsx`](../components/MarketplaceView.tsx), [`components/ProductDetailModal.tsx`](../components/ProductDetailModal.tsx), [`components/StoresView.tsx`](../components/StoresView.tsx) | Casos de uso de consulta para quem navega, sem exigir cadastro. |
| Criar conta/entrar; perfis de teste | [`components/AuthModal.tsx`](../components/AuthModal.tsx), [`services/authService.ts`](../services/authService.ts), [`lib/store.tsx`](../lib/store.tsx) | O login real depende do Supabase; o **acesso rápido** troca perfis de demonstração. Não confundir com autenticação segura em produção. |
| Carrinho e finalização de pedido | [`components/CheckoutModal.tsx`](../components/CheckoutModal.tsx), [`services/orderService.ts`](../services/orderService.ts), [`lib/store.tsx`](../lib/store.tsx) | O formulário pode ser iniciado até como visitante; pedido e PIX têm **fluxo de teste/sandbox** e *fallback* local. Não afirmar cobrança real, custódia financeira efetiva ou entrega integrada. |
| Anunciar equipamento C2C | [`components/SellC2CView.tsx`](../components/SellC2CView.tsx), [`lib/store.tsx`](../lib/store.tsx) | Tela de anúncio exige não ser visitante; o estado local pode ser usado caso a gravação remota falhe. |
| Cadastrar loja e solicitar verificação | [`components/CreateStoreModal.tsx`](../components/CreateStoreModal.tsx), [`components/StoresView.tsx`](../components/StoresView.tsx), [`services/storeService.ts`](../services/storeService.ts) | Conta autenticada pode cadastrar loja; titular pede análise e o administrador aprova/rejeita na interface. Persistência depende da integração. |
| Comunidade | [`components/CommunityView.tsx`](../components/CommunityView.tsx), [`services/communityService.ts`](../services/communityService.ts) | Visitante lê; pessoa autenticada pode publicar/comentar. Não desenhar moderação de denúncias como fluxo completo sem validá-lo. |
| Treinadores | [`components/CoachesView.tsx`](../components/CoachesView.tsx) | Há listagem e formulário demonstrativo de solicitação; sua confirmação é local. Não representar contratação paga, envio efetivo ao WhatsApp ou painel do treinador como prontos. |
| Administração | [`components/AdminDashboard.tsx`](../components/AdminDashboard.tsx), [`app/api/users/route.ts`](../app/api/users/route.ts) | Há controles para usuários, produtos, pedidos e verificação de lojas; parte das alterações ocorre no estado local. |

**Deixe fora do diagrama principal como “já implementado”:** pagamento/custódia reais, rastreamento de transportadora, agendamento real de treinador, loja publicando catálogo B2C por painel próprio e **SmartScan com IA**. Embora exista [`components/SmartScanView.tsx`](../components/SmartScanView.tsx), ele não é renderizado em [`app/page.tsx`](../app/page.tsx) e faz cálculos locais, não uma análise comprovada por IA. Também não há telas renderizadas para as vistas `news` e `profile` declaradas em [`lib/store.tsx`](../lib/store.tsx). Se forem requisitos futuros, anotem-nos **fora** do diagrama do sistema atual.

**Para provar a atualização do início do ano:** façam uma lista `caso/ator do desenho antigo → evidência no código atual → manter, renomear, incluir ou retirar`. Por exemplo, o código atual justifica *incluir* `Solicitar verificação da loja` caso não estivesse no arquivo antigo; já `Pagamento real por PIX` deve ser *retirado ou marcado como futuro* se o desenho anterior o apresentava como concluído. Não inventem um “antes”: registrem só as diferenças que conseguirem verificar no arquivo original.

## 3. Aluno A — montar o diagrama de casos de uso

### 3.1 Delimitar sistema e atores

Desenhe **um retângulo grande** com o nome `CoreMotiom — plataforma esportiva`; **todas as elipses** de casos de uso ficam dentro dele e **todos os atores** ficam fora. No desenho de visão geral, use estes papéis (uma pessoa pode exercer mais de um papel em momentos diferentes):

| Ator no desenho | Significado | Responsabilidades específicas |
| --- | --- | --- |
| **Pessoa que navega** | Papel genérico para visitante ou pessoa autenticada. | Consultar catálogo, lojas, comunidade e treinadores; usar carrinho e fluxo de pedido demonstrativo. |
| **Visitante** | Pessoa sem sessão autenticada. | Criar conta ou entrar. |
| **Atleta cadastrado** | Usuário com conta (`user`); no fluxo C2C, também atua como vendedor. | Anunciar produto usado e interagir na comunidade. |
| **Lojista** | Titular de conta/loja (`seller`, ou conta autenticada que passa a lojista ao criar a loja). | Cadastrar loja e solicitar sua verificação. |
| **Administrador** | Papel administrativo (`admin`). | Analisar verificação e executar ações administrativas disponíveis no painel. |

Para economizar linhas, **opcionalmente** una `Visitante`, `Atleta cadastrado`, `Lojista` e `Administrador` à `Pessoa que navega` com **generalização de ator** (linha contínua com triângulo vazio apontando para o papel genérico). Não desenhe “Atleta é um tipo de Visitante”: login é mudança de estado, não herança entre esses dois papéis. Se preferir não usar generalização, associe cada perfil que navega aos casos comuns. O **treinador não precisa ser ator** nesta versão: não há login ou painel para ele; ele aparece como conteúdo consultado. Banco de dados, página web e botão também não são atores. [2](https://docente.ifsc.edu.br/joao.augusto/MaterialDidatico/2018-1/An%C3%A1lise%20e%20Projeto%20de%20Sistemas/Diagrama%20de%20Casos%20de%20Uso.pdf)

### 3.2 Elipses e ligações sugeridas para a versão atual

Cada item abaixo é uma **elipse com nome de ação**. Ligue por **linha contínua simples (associação)** o ator indicado à elipse. Use a tabela como checklist e reduza a quantidade de elipses se a impressão ficar ilegível: é melhor um panorama legível com os casos centrais do que uma figura minúscula com todas as telas. A trilha principal é `UC01, UC02, UC05–UC09, UC11–UC16`; `UC03, UC04` e `UC10` mostram os serviços esportivos/comunidade e podem entrar se houver espaço.

| ID | Texto da elipse | Ator a ligar | Observação sobre o fluxo |
| --- | --- | --- | --- |
| UC01 | **Consultar e filtrar produtos** | Pessoa que navega | Catálogo B2C/C2C, pesquisa e detalhe do produto ([`MarketplaceView`](../components/MarketplaceView.tsx)). |
| UC02 | **Consultar lojas** | Pessoa que navega | Diretório e vitrine da loja ([`StoresView`](../components/StoresView.tsx)). |
| UC03 | **Ler publicações da comunidade** | Pessoa que navega | Feed aberto para leitura ([`CommunityView`](../components/CommunityView.tsx)). |
| UC04 | **Consultar treinadores** | Pessoa que navega | Apenas consulta; solicitação de contato é demonstrativa ([`CoachesView`](../components/CoachesView.tsx)). |
| UC05 | **Gerenciar carrinho** | Pessoa que navega | Adicionar/alterar/remover itens ([`CheckoutModal`](../components/CheckoutModal.tsx)). |
| UC06 | **Finalizar pedido (simulação)** | Pessoa que navega | Inclui endereço e escolha de pagamento; não é pagamento real ([`CheckoutModal`](../components/CheckoutModal.tsx), [`OrderService`](../services/orderService.ts)). |
| UC07 | **Cadastrar conta** | Visitante | Depende do serviço de autenticação configurado ([`AuthModal`](../components/AuthModal.tsx)). |
| UC08 | **Entrar na conta** | Visitante | Login por credenciais/Google quando disponível; teste rápido é demonstrativo. |
| UC09 | **Anunciar produto C2C** | Atleta cadastrado | Exige conta na interface ([`SellC2CView`](../components/SellC2CView.tsx)). |
| UC10 | **Interagir na comunidade** | Atleta cadastrado | Publicar e comentar; evite criar elipses separadas se faltar espaço. |
| UC11 | **Cadastrar loja** | Lojista | Uma conta autenticada pode criar a loja e passar a esse papel ([`CreateStoreModal`](../components/CreateStoreModal.tsx)). |
| UC12 | **Solicitar verificação da loja** | Lojista | Necessita loja previamente cadastrada; isso é **pré-condição**, não uma seta `«include»` para “Cadastrar loja”. |
| UC13 | **Analisar verificação da loja** | Administrador | Aprovar/rejeitar solicitação ([`AdminDashboard`](../components/AdminDashboard.tsx)). |
| UC14 | **Gerenciar usuários** | Administrador | Consultar e alterar papéis/suspensões, conforme painel atual. |
| UC15 | **Moderar produtos** | Administrador | Alterar status/remover produtos no painel atual. |
| UC16 | **Atualizar situação de pedidos** | Administrador | Ações administrativas, inclusive confirmação **sandbox**, não liquidação financeira. |

Se couber, acrescente `Salvar produto como favorito` (Atleta cadastrado; [`ProductDetailModal`](../components/ProductDetailModal.tsx)); não confunda “Meus Favoritos” com uma página pronta: o botão aponta para a vista `profile`, que não é renderizada em `app/page.tsx`. **Nunca** represente o Diagrama de Casos de Uso como sequência de páginas/telas; ele responde a **quem** interage e **para quê**. A relação `«include»` indica comportamento que sempre é executado pelo caso base (frequentemente compartilhado); `«extend»` indica comportamento opcional sob condição definida. Por exemplo, **se** criar uma elipse específica “Informar endereço e forma de pagamento”, uma seta tracejada `Finalizar pedido → Informar endereço e forma de pagamento` marcada `«include»` é coerente; não precisa usá-la para ter um diagrama correto. `Entrar na conta` não é parte obrigatória do checkout no código atual. [2](https://docente.ifsc.edu.br/joao.augusto/MaterialDidatico/2018-1/An%C3%A1lise%20e%20Projeto%20de%20Sistemas/Diagrama%20de%20Casos%20de%20Uso.pdf)

### 3.3 Passo a passo no Draw.io / diagrams.net

1. Abra **app.diagrams.net** (ou a ferramenta escolhida); crie um diagrama em branco chamado `CoreMotiom - casos de uso - versao atual`. **Importe o arquivo antigo**, se existir, para comparar: risque/remova os casos obsoletos, renomeie os sobreviventes e adicione os novos.
2. Na barra lateral, habilite as formas **UML / Use Case** (o nome do menu varia conforme a versão; em diagrams.net costuma estar em **Mais formas…**). Coloque os cinco atores fora da fronteira e as elipses da tabela dentro. Agrupe visualmente *catálogo/compra*, *comunidade*, *loja* e *administração*, sem transformar essas áreas em atores.
3. Conecte apenas os pares indicados na tabela com associação simples. Se usar generalização, o triângulo aponta para `Pessoa que navega`; se usar `«include»`, a seta pontilhada aponta para o caso **incluído**. Evite cruzamentos de linhas, duplicatas e textos pequenos. [2](https://docente.ifsc.edu.br/joao.augusto/MaterialDidatico/2018-1/An%C3%A1lise%20e%20Projeto%20de%20Sistemas/Diagrama%20de%20Casos%20de%20Uso.pdf)
4. Compare com [`app/page.tsx`](../app/page.tsx) e [`components/Sidebar.tsx`](../components/Sidebar.tsx); revise **a matriz ator × caso** com o colega. Use uma nota fora da fronteira, se necessário: `Checkout e solicitação de treinador: fluxos demonstrativos`.
5. Salve o original **editável** (`.drawio`, ou link do Miro/Lucidchart). Exporte também uma imagem **PNG em alta resolução** ou SVG; para Word/Docs, PNG é a opção de maior compatibilidade. Em A4 retrato, a largura útil com margens de 3 cm à esquerda e 2 cm à direita é **16 cm**; esta versão completa foi pensada para **A4 paisagem**, com largura útil de **24,7 cm**, e o PNG pronto tem **4.000 px**. Confirme com o orientador se aceita uma página paisagem e faça um teste de leitura no tamanho de impressão, não apenas no zoom do editor.

**Teste rápido das duas regras mais fáceis de errar:** um visitante **pode** abrir o carrinho/checkout, mas **não** pode anunciar C2C sem entrar; e `Solicitar verificação da loja` pertence ao **lojista**, enquanto `Analisar verificação` pertence ao **administrador**. Conferir: [`app/page.tsx`](../app/page.tsx), [`components/StoresView.tsx`](../components/StoresView.tsx).

## 4. Aluno B — preparar o TCC no Word ou Google Docs

### 4.1 Configuração inicial (para documento A4, só frente)

A orientação de bibliotecas universitárias para trabalhos acadêmicos baseada na **ABNT NBR 14724:2024** indica **A4**, margens **superior e esquerda 3 cm; inferior e direita 2 cm**, corpo do texto tamanho **12**, espaçamento **1,5** e texto justificado. **Arial ou Times New Roman**, recuo de primeira linha **1,25 cm** e diferenciação visual dos títulos são escolhas práticas adotadas no tutorial da PUC-SP; confirme a fonte, o recuo e eventuais exceções com o **manual do seu curso**. Legendas e fontes de ilustrações e notas usam espaço simples e tamanho de letra menor e uniforme; referências usam espaço simples e devem seguir a norma de referências e o manual da instituição. Se for imprimir **frente e verso**, as margens internas/externas e a paginação exigem ajuste específico; não aplique cegamente os valores de só frente. [1](https://www.pucsp.br/sites/default/files/download/biblioteca/2025/tutorial-de-normas-abnt-para-trabalhos-academicos-utilizando-o-microsoft-word.pdf) [3](https://www.bbt.ufv.br/wp-content/uploads/2025/02/Normalizacao-de-trabalhos-academicos-2025-UFV.pdf)

- **No Word:** `Layout → Tamanho → A4`; `Layout → Margens → Margens Personalizadas` (3/2/3/2 cm conforme os lados acima). Em `Página Inicial → Estilos`, modifique **Normal** (fonte 12, justificado, entrelinhas 1,5) e **Título 1/Título 2**. Para seções numeradas, associe uma **lista de vários níveis** aos estilos, em vez de digitar números sem controle. Seções primárias devem começar em nova página; os títulos numerados ficam alinhados à esquerda. [1](https://www.pucsp.br/sites/default/files/download/biblioteca/2025/tutorial-de-normas-abnt-para-trabalhos-academicos-utilizando-o-microsoft-word.pdf)
- **No Google Docs:** `Arquivo → Configuração da página` (modo **Páginas**, A4, margens 3/2/3/2 cm); `Formatar → Espaçamento entre linhas e parágrafos → 1,5`; defina fonte/tamanho, alinhamento justificado e **Formatar → Estilos de parágrafo → Título 1/Título 2**. Use a lista numerada hierárquica conforme o manual da instituição e revise a numeração após edições. Os nomes dos menus podem variar com o idioma/interface.
- **Em ambos:** não simule sumário com pontos e números de páginas digitados manualmente. `SUMÁRIO` é título pré-textual **não numerado**, e os pré-textuais (capa, resumos, o próprio sumário) **não entram** como itens do sumário; nele entram as seções textuais e os pós-textuais pertinentes, como `REFERÊNCIAS` sem número. Evite aplicar ao título `SUMÁRIO` um estilo que o insira no próprio índice. [1](https://www.pucsp.br/sites/default/files/download/biblioteca/2025/tutorial-de-normas-abnt-para-trabalhos-academicos-utilizando-o-microsoft-word.pdf)

### 4.2 Estrutura a criar ou encaixar no TCC já existente

Os campos entre **[colchetes] são espaços para preencher**, não dados inventados sobre a instituição. Se a equipe já tem um TCC, acrescente **apenas** a seção do diagrama no lugar correspondente, preservando capítulos e exigências do orientador.

```text
CAPA: [instituição] | [curso] | [autores] | COREMOTIOM: [subtítulo] | [cidade] | [ano]
FOLHA DE ROSTO: [autores] | [título] | [natureza do trabalho] | [orientador(a)] | [cidade/ano]
FOLHA DE APROVAÇÃO: [reservar conforme o modelo da instituição]
RESUMO / ABSTRACT: [texto real, redigido na fase adequada]
LISTA DE ILUSTRAÇÕES: [opcional, conforme o número de figuras/manual]
SUMÁRIO: [campo automático; último elemento pré-textual]

1 INTRODUÇÃO
2 DESENVOLVIMENTO / DESCRIÇÃO DO PROJETO
  2.1 Visão geral do CoreMotiom
  2.2 Atores e funcionalidades do sistema atual
  2.3 Diagrama de casos de uso
      [parágrafo de apresentação]
      Figura 1 – Diagrama de casos de uso do CoreMotiom
      [INSERIR A IMAGEM EXPORTADA PELO ALUNO A AQUI]
      Fonte: Elaboração da equipe com apoio de IA (2026).
      [parágrafo de análise: quem interage, o que é simulação, limites]
3 CONSIDERAÇÕES FINAIS
REFERÊNCIAS [sem numeração]
APÊNDICE A – [fichas de casos de uso, se forem escritas; opcional]
```

**Ajustes ABNT:** para um TCC completo, capa, folha de rosto, folha de aprovação, resumo na língua do trabalho, resumo em outra língua, sumário e referências integram a estrutura usual obrigatória; preencha-os com o material **real** e confira o modelo de sua instituição. A `LISTA DE ILUSTRAÇÕES` e apêndices não são obrigatórios em todo caso. Na seção `2.3`, a identificação da figura (`Figura 1 – ...`) fica **acima** da imagem e sua **fonte abaixo**, mesmo sendo criação da dupla. Renumere se já houver outra figura anterior; evite deixar título numa página e figura na seguinte. [1](https://www.pucsp.br/sites/default/files/download/biblioteca/2025/tutorial-de-normas-abnt-para-trabalhos-academicos-utilizando-o-microsoft-word.pdf) [3](https://www.bbt.ufv.br/wp-content/uploads/2025/02/Normalizacao-de-trabalhos-academicos-2025-UFV.pdf)

**Texto inicial para adaptar na seção 2.3 (não apresentar como resultado de testes de produção):**

> A Figura 1 apresenta os casos de uso do CoreMotiom na versão analisada do projeto. A pessoa que navega consulta produtos, lojas e conteúdos esportivos e pode usar o carrinho. O atleta cadastrado anuncia produtos C2C e participa da comunidade; o lojista solicita a verificação de sua loja; e o administrador analisa solicitações e opera os recursos de gestão disponíveis. O fluxo de finalização de pedidos é demonstrativo e não comprova pagamento ou custódia financeira reais.

**Criar e atualizar o sumário:** no **Word**, aplique `Título 1` às seções principais e `Título 2` às subseções; use `Referências → Sumário → Sumário Automático` e, após inserir a imagem ou mudar capítulos, **Atualizar Sumário → Atualizar o índice inteiro**. No **Docs**, aplique `Título 1`/`Título 2`, posicione o cursor depois de `SUMÁRIO`, use `Inserir → Sumário` (escolha a opção com números de página) e **Atualizar** após cada revisão. Verifique que `2.3 Diagrama de casos de uso` aparece no sumário e que `CAPA`, `RESUMO` e `SUMÁRIO` não aparecem. [1](https://www.pucsp.br/sites/default/files/download/biblioteca/2025/tutorial-de-normas-abnt-para-trabalhos-academicos-utilizando-o-microsoft-word.pdf)

**Inserir a figura:** no Word, `Inserir → Imagens`; crie a legenda **acima** (`Referências → Inserir Legenda → posição acima`, se disponível) e digite a linha `Fonte: Elaboração da equipe com apoio de IA (2026).` **abaixo** (ajuste à política de uso de IA da sua instituição). No Docs, `Inserir → Imagem → Fazer upload` e digite legenda acima/fonte abaixo como parágrafos associados à figura. Mantenha a proporção da imagem, texto legível no PDF e figura dentro das margens; se não couber em retrato, simplifique o desenho ou consulte o orientador sobre **uma página em paisagem com margens correspondentes**. [1](https://www.pucsp.br/sites/default/files/download/biblioteca/2025/tutorial-de-normas-abnt-para-trabalhos-academicos-utilizando-o-microsoft-word.pdf)

**Paginação, se exigida nesta etapa:** a capa não é contada; os pré-textuais são contados a partir da folha de rosto, mas a numeração impressa começa na primeira folha **textual** (Introdução). No Word, use quebras de seção antes da folha de rosto e da Introdução; no cabeçalho da Introdução, desvincule a seção anterior, insira o número no canto superior direito e confira a contagem contínua. No Docs, use quebras de seção e opções de numeração por seção; verifique manualmente o PDF. Consulte o modelo da sua biblioteca para exceções e impressão frente e verso. [1](https://www.pucsp.br/sites/default/files/download/biblioteca/2025/tutorial-de-normas-abnt-para-trabalhos-academicos-utilizando-o-microsoft-word.pdf)

## 5. Conferência final e postagem

**Em 29/09:** recuperar o diagrama antigo/TCC, atribuir A e B, confrontar os 16 casos da tabela com a interface, escolher o escopo legível do desenho. **Até 30/09:** A salva editável e imagem; B formata o documento, insere a figura, atualiza o sumário; ambos revisam PDF e publicam o Diário de Bordo **no canal e horário informados pelo professor**.

- [ ] O diagrama antigo foi comparado com o projeto atual; mudanças são explicadas.
- [ ] Atores **fora**, casos de uso **dentro** da fronteira nomeada; conexões são coerentes, sem promessas de funções inexistentes.
- [ ] Checkout marcado como simulação; treinador e SmartScan não são vendidos como integrações concluídas.
- [ ] Arquivo/link editável do diagrama e PNG/SVG exportado; figura legível no tamanho final.
- [ ] Word/Docs em A4 com margens corretas; estilos e **sumário automático**; seção do diagrama no desenvolvimento.
- [ ] Legenda acima, fonte abaixo; numeração da figura e páginas conferidas; PDF revisado se solicitado.
- [ ] Diário de Bordo informa responsáveis, alterações e **links/arquivos anexados**; nenhum documento pessoal ou dado sensível foi publicado junto às capturas.

### Modelo de texto para o Diário de Bordo — preencher *depois* de executar

> **Diário de Bordo — Diagrama de Casos de Uso do CoreMotiom.** Revisamos o diagrama de [data/versão anterior] à luz da versão atual do projeto. O Aluno A atualizou a representação em [Draw.io/Miro/Lucidchart], com os atores [lista final] e os casos de uso [resumo]; o desenho editável está em [link/arquivo]. Retiramos ou sinalizamos [funcionalidades antigas/não prontas]. O Aluno B configurou o TCC em [Word/Docs] com A4, margens de 3 cm em cima/à esquerda e 2 cm embaixo/à direita, estilos de títulos e sumário automático. A seção [número] contém a Figura [número] e sua fonte. O fluxo de checkout é [simulado/estado validado]. Anexamos [imagem/documento/PDF] e restam [pendências reais ou “nenhuma”].

### Fontes de apoio para a formatação e a notação

- [1](https://www.pucsp.br/sites/default/files/download/biblioteca/2025/tutorial-de-normas-abnt-para-trabalhos-academicos-utilizando-o-microsoft-word.pdf) — Sistema de Bibliotecas PUC-SP. *Como aplicar as normas ABNT ... usando o Microsoft Word* (orientações baseadas na NBR 14724:2024; não substitui o manual do seu curso).
- [3](https://www.bbt.ufv.br/wp-content/uploads/2025/02/Normalizacao-de-trabalhos-academicos-2025-UFV.pdf) — Biblioteca Central da UFV. *Normalização de trabalhos acadêmicos* (2025).
- [2](https://docente.ifsc.edu.br/joao.augusto/MaterialDidatico/2018-1/An%C3%A1lise%20e%20Projeto%20de%20Sistemas/Diagrama%20de%20Casos%20de%20Uso.pdf) — IFSC. *Diagrama de casos de uso* (atores, associações e limite do sistema).

> A fundamentação das **funcionalidades do CoreMotiom** é o próprio código nos caminhos citados acima. As fontes externas são apenas apoio de UML/normalização, não prova de que uma funcionalidade está pronta.
