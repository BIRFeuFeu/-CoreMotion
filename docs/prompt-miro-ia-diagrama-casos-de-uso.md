# Prompt para a IA do Miro — casos de uso do CoreMotiom

Copie **somente o texto dentro do bloco** e cole no Miro AI. Depois, confira os atores, as linhas e a legibilidade antes de exportar; a geração automática pode precisar de pequenos ajustes manuais.

```text
Crie, diretamente no quadro do Miro, UM DIAGRAMA DE CASOS DE USO UML COMPLETO E EDITÁVEL, em português do Brasil, para o sistema “CoreMotiom — plataforma esportiva”. Não crie fluxograma, mapa mental, jornada do usuário, organograma, imagem única não editável ou apenas uma lista textual. Use formas UML (atores em bonecos, casos de uso em elipses, associações em linhas contínuas) e conectores editáveis ancorados às formas. Não invente funcionalidades: as regras a seguir já resumem o projeto atual.

CONTEXTO DO SISTEMA
O CoreMotiom é um marketplace esportivo com catálogo B2C (produtos de lojas) e C2C (anúncios entre atletas), carrinho, lojas com solicitação de verificação, comunidade, consulta de treinadores e painel administrativo. O checkout/PIX/custódia são fluxos demonstrativos ou de sandbox; NÃO há prova de cobrança real nem de custódia financeira operacional. Cadastro e login reais dependem de Supabase, mas há acesso rápido com perfis de demonstração. A listagem de treinadores existe; não há painel de treinador nem contratação efetiva.

FRONTEIRA E NOTAÇÃO
1. Desenhe UM retângulo grande, com o título “CoreMotiom — plataforma esportiva”, representando a fronteira do sistema. Ponha TODAS as 17 elipses dentro dele e TODOS os 5 atores fora dele.
2. Atores (nomes exatamente assim): “Pessoa que navega” (papel genérico de qualquer pessoa, com ou sem conta), “Visitante” (sem autenticação), “Atleta cadastrado” (conta de atleta, também pode vender C2C), “Lojista” (titular ou futuro titular de uma loja) e “Administrador”. Pessoas podem exercer papéis diferentes em momentos diferentes.
3. Faça quatro GENERALIZAÇÕES DE ATORES: Visitante → Pessoa que navega; Atleta cadastrado → Pessoa que navega; Lojista → Pessoa que navega; Administrador → Pessoa que navega. Cada uma é uma linha CONTÍNUA com TRIÂNGULO VAZIO apontando para “Pessoa que navega”. Não represente “Atleta cadastrado” como subtipo de “Visitante”.
4. Para associação ator–caso de uso, use LINHA CONTÍNUA SEM SETA. As associações específicas estão abaixo. Não crie relações «include» ou «extend» só para ligar etapas cronológicas: possuir loja é pré-condição para solicitar verificação; estar autenticado é pré-condição de anúncio, favoritos e publicação, não um «include» automático. O checkout demonstrativo não exige login no protótipo, portanto NÃO o ligue obrigatoriamente a “Entrar na conta”.

CASOS DE USO E ASSOCIAÇÕES — desenhe uma elipse para cada linha, com ID e nome:
Pessoa que navega ─ UC01 “Consultar e filtrar produtos” (inclui busca e visualização de produtos B2C/C2C).
Pessoa que navega ─ UC02 “Consultar lojas” (diretório e vitrine).
Pessoa que navega ─ UC03 “Ler publicações da comunidade”.
Pessoa que navega ─ UC04 “Consultar treinadores”.
Pessoa que navega ─ UC05 “Gerenciar carrinho” (adicionar, alterar quantidade e remover itens).
Pessoa que navega ─ UC06 “Finalizar pedido (simulação)” (endereço e escolha de pagamento; sem cobrança real).
Visitante ─ UC07 “Cadastrar conta”.
Visitante ─ UC08 “Entrar na conta”.
Atleta cadastrado ─ UC09 “Anunciar produto C2C”.
Atleta cadastrado ─ UC10 “Interagir na comunidade” (publicar e comentar).
Lojista ─ UC11 “Cadastrar loja”.
Lojista ─ UC12 “Solicitar verificação da loja”.
Administrador ─ UC13 “Analisar verificação da loja” (aprovar ou rejeitar).
Administrador ─ UC14 “Gerenciar usuários”.
Administrador ─ UC15 “Moderar produtos”.
Administrador ─ UC16 “Atualizar situação de pedidos” (inclusive confirmação de teste/sandbox).
Atleta cadastrado ─ UC17 “Salvar produto como favorito”.

ASPECTOS QUE NÃO DEVEM APARECER COMO CASOS DE USO PRONTOS
Não inclua processamento de pagamento real, liberação real de custódia, integração com transportadora, contratação/agendamento real de treinador, painel do treinador, SmartScan/avaliação por IA, painel de loja para publicação B2C, páginas de notícias ou página completa “Meus Favoritos”. Não use “Treinador”, “Banco de dados”, “PIX”, “Google”, “Supabase”, botões ou páginas como atores de negócio neste diagrama. O UC17 é apenas a ação de salvar um produto; não pressupõe página funcional de lista de favoritos.

APRESENTAÇÃO E SAÍDA
Organize o interior da fronteira em regiões visuais próximas (consulta e compra, conta/comunidade, loja, administração), SEM criar outros retângulos que pareçam sistemas separados. Distribua os atores ao redor da fronteira para minimizar cruzamento de linhas. Use fundo branco, traços escuros, alto contraste e nomes legíveis quando a figura for reduzida para uma página A4; não esconda casos de uso por falta de espaço. Acrescente uma nota discreta fora da fronteira: “UC06 e atualização de pagamento: fluxos demonstrativos/sandbox. Consulta de treinadores não implica contratação efetiva.” Não invente etapas ou datas. Ao terminar, confira: 1 fronteira, 5 atores, 17 elipses com IDs UC01–UC17, 17 associações ator–caso e 4 generalizações corretas. Deixe o resultado como formas EDITÁVEIS no Miro, em um único frame intitulado “Diagrama de casos de uso — CoreMotiom”. Prepare-o para exportação em PNG/SVG de alta resolução para inserção no TCC; se não puder exportar, deixe o frame pronto para eu fazer isso manualmente. Não responda somente com texto: produza o diagrama visual.
```

**Revisão manual recomendada:** se o Miro não conseguir desenhar as quatro generalizações de ator corretamente, apague as setas erradas e represente `Pessoa que navega` como papel comum com uma anotação esclarecendo que abrange os outros quatro perfis. Não deixe o triângulo apontando para o ator especializado. Confira também se o checkout está marcado como simulação antes de inserir o diagrama no TCC.

A seleção dos casos segue [`guia-diario-de-bordo-casos-de-uso.md`](./guia-diario-de-bordo-casos-de-uso.md); UC17 é o recurso de favorito apresentado em [`ProductDetailModal.tsx`](../components/ProductDetailModal.tsx). A lista não pressupõe que a IA do Miro tenha acesso ao código.

## Se o Miro gerar caixas compartimentadas (diagrama errado)

**Não adicione essa prévia ao canvas como entrega.** A geração automática da Miro divulga sobretudo diagramas UML de **classes e sequência**, enquanto há um [modelo específico de casos de uso](https://miro.com/templates/use-case-diagram/) para editar manualmente. O modo escolhido pode não conseguir respeitar a notação de casos de uso apesar de afirmar que conseguiu. [1](https://miro.com/ai/uml-diagram-ai/) [1](https://miro.com/templates/use-case-diagram/)

No campo **Solicitar alterações**, selecione a versão atual e tente **uma vez** este prompt de correção:

```text
A prévia está ERRADA: são caixas retangulares com compartimentos e ligações hierárquicas, parecidas com diagrama de classes/organograma. NÃO clique em concluir ainda. Recrie visualmente COMO DIAGRAMA UML DE CASOS DE USO, mantendo os nomes e pares ator–caso de uso da minha especificação anterior. Preciso de: 1 retângulo de fronteira do sistema; 5 bonecos de ator FORA dele; 17 ELIPSES UC01–UC17 DENTRO; associações em linhas contínuas sem setas; 4 generalizações com triângulo vazio apontando para “Pessoa que navega”. Apague todas as caixas internas com divisórias e as setas de organograma. Se este modo da IA só gera diagramas de classes/fluxogramas e não consegue usar bonecos e elipses, diga explicitamente que não consegue; não entregue caixas renomeadas como se fossem casos de uso.
```

Se repetir o mesmo erro, **o diagrama correto já foi criado**: abra [a versão `.drawio` editável](./diagrama-casos-de-uso-coremotiom.drawio) diretamente no diagrams.net ou no aplicativo **+ → Draw.io Diagrams** do Miro. Há também [PNG](./diagrama-casos-de-uso-coremotiom.png) e [SVG](./diagrama-casos-de-uso-coremotiom.svg) para o TCC. A documentação da Miro indica que o aplicativo Draw.io está disponível em todos os planos. [2](https://help.miro.com/hc/en-us/articles/14066677626770-Draw-io-diagrams-by-Miro)

Como alternativa de edição por **código** no Miro, no botão **+**, pesquise **PlantUML Diagrams**, cole o conteúdo de [`diagrama-casos-de-uso-coremotiom.puml`](./diagrama-casos-de-uso-coremotiom.puml) no editor e confira a prévia antes de **Add to board**. O PlantUML gera uma imagem editável por código, não elipses independentes. [1](https://help.miro.com/hc/en-us/articles/7004940386578-PlantUML-diagrams-for-Miro)
