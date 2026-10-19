# Pessoa 2 — Catálogo, negócio e comunidade

**Frente independente.** Entrega a jornada de catálogo, compra, venda e comunidade de ponta a
ponta: tela, servidor e dados. Não espera conclusão, revisão ou autorização de outra frente.

**Data de referência:** 19/10/2026
**Branch da sessão:** `arena/92deaf3d-coremotion`

## Escopo

| Camada | O que está sob responsabilidade desta frente |
|---|---|
| Interface | Início, marketplace, detalhe do produto, lojas, anúncio C2C, carrinho, checkout, comunidade e treinadores |
| Servidor | Rotas e Server Actions de produtos, lojas, anúncios e pedidos; validação; cálculo de total no servidor |
| Dados | Consultas do domínio, verificação de loja, pedidos e conteúdo da comunidade |

## Arquivos que esta frente possui

`app/api/products/`, `app/api/stores/`, `app/api/listings/`, `app/actions/products.ts`,
`app/actions/orders.ts`, `app/actions/stores.ts`, `services/products.ts`, `services/stores.ts`,
`services/listings.ts`, `services/productService.ts`, `services/storeService.ts`,
`services/orderService.ts`, `services/communityService.ts`, `lib/db-queries.ts`,
`lib/schemas/product.schema.ts`, `lib/schemas/store.schema.ts`, `lib/schemas/order.schema.ts`,
`app/page.tsx`, `components/Sidebar.tsx`, `components/HomeHeroAndHighlights.tsx`,
`components/MarketplaceView.tsx`, `components/ProductCard.tsx`,
`components/ProductDetailModal.tsx`, `components/StoresView.tsx`,
`components/CreateStoreModal.tsx`, `components/SellC2CView.tsx`, `components/CheckoutModal.tsx`,
`components/CommunityView.tsx`, `components/CoachesView.tsx`.

## Insumos já produzidos

- `docs/etapa-5/diagnosticos/frontend.md` — achados F-01 a F-11, com os lotes por frente.
- `docs/etapa-5/diagnosticos/backend.md` — achados B-09 a B-13 e B-16 no domínio de catálogo.
- `docs/etapa-5/contratos/contrato-integracao.md` — operações de catálogo, lojas, pedidos e comunidade.
- `docs/etapa-5/contratos/matriz-permissoes.md` — capacidades por papel.

## Como esta frente verifica sozinha

```bash
npm run lint
npm run type-check
npm run build
```

Além disso: testes do domínio (produto persiste após recarregar; verificação de loja grava
`pending`; checkout sem sessão bloqueado; total calculado no servidor). Registrar em
`docs/etapa-5/pessoa-2/registro-implementacao.md`.

## Estado atual

- Telas funcionam com dados iniciais locais mesmo quando a API falha (`INITIAL_*` como fachada).
- Ações administrativas de produto/pedido e denúncia só alteram o navegador.
- Verificação de loja grava `rejected` quando deveria gravar `pending`.
- Checkout não exige sessão e o PIX é gerado localmente, sem PSP.
- Rotas do domínio sem verificação de sessão e sem validação de entrada.

## Próximo passo

1. Implementar o lote aprovado do domínio: persistência real, estados de UI e verificação de loja.
2. Corrigir checkout e linguagem de simulação.
3. Publicar `docs/etapa-5/contratos/contrato-catalogo.md` com as operações reais.

Nada nesta pasta substitui teste de execução. Não apresentar simulação como integração real.
