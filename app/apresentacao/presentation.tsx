'use client';

import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Download,
  Layers3,
  Minus,
  Play,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Store,
  UsersRound,
  X,
  type LucideIcon,
} from 'lucide-react';
import styles from './presentation.module.css';

const diagramSvg = '/presentation/diagrama-casos-de-uso-coremotiom.svg';
const diagramPng = '/presentation/diagrama-casos-de-uso-coremotiom.png';
const diagramDrawio = '/presentation/diagrama-casos-de-uso-coremotiom.drawio';

const actors: {
  id: string;
  name: string;
  cases: string;
  description: string;
  icon: LucideIcon;
  tone: string;
  surface: string;
}[] = [
  {
    id: '01',
    name: 'Pessoa que navega',
    cases: 'UC01 — UC06',
    description: 'Explora produtos, lojas e conteúdos. Usa o carrinho e percorre o pedido demonstrativo.',
    icon: ShoppingBag,
    tone: '#4c91ff',
    surface: 'rgba(76, 145, 255, .13)',
  },
  {
    id: '02',
    name: 'Visitante',
    cases: 'UC07 — UC08',
    description: 'Pode criar uma conta ou entrar. Também herda as ações abertas a quem navega.',
    icon: UsersRound,
    tone: '#abb8ce',
    surface: 'rgba(171, 184, 206, .12)',
  },
  {
    id: '03',
    name: 'Atleta cadastrado',
    cases: 'UC09 · UC10 · UC17',
    description: 'Anuncia equipamentos entre atletas, participa da comunidade e salva favoritos.',
    icon: Activity,
    tone: '#b795ff',
    surface: 'rgba(183, 149, 255, .13)',
  },
  {
    id: '04',
    name: 'Lojista',
    cases: 'UC11 — UC12',
    description: 'Cadastra sua loja e solicita a verificação, sujeita à análise administrativa.',
    icon: Store,
    tone: '#6bd8aa',
    surface: 'rgba(107, 216, 170, .12)',
  },
  {
    id: '05',
    name: 'Administrador',
    cases: 'UC13 — UC16',
    description: 'Analisa lojas, gerencia usuários, modera produtos e atualiza pedidos em sandbox.',
    icon: ShieldCheck,
    tone: '#ffab84',
    surface: 'rgba(255, 171, 132, .13)',
  },
];

const deckLabels = ['Abertura', 'O diagrama', 'Atores', 'Limites', 'Entrega'];

function DiagramViewer({ presentation = false }: { presentation?: boolean }) {
  const [zoom, setZoom] = useState(1);
  const viewportRef = useRef<HTMLDivElement>(null);
  const changeZoom = (difference: number) => {
    setZoom((current) => Math.min(4, Math.max(1, Math.round((current + difference) * 100) / 100)));
  };
  const resetZoom = () => {
    setZoom(1);
    viewportRef.current?.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`${styles.viewer} ${presentation ? styles.viewerInDeck : ''}`}>
      <div className={styles.viewerToolbar}>
        <div className={styles.viewerTitle}>
          <span className={styles.viewerStatus} aria-hidden="true" />
          <span>DIAGRAMA UML</span>
          <span className={styles.viewerDivider}>/</span>
          <span className={styles.viewerSub}>visão geral do sistema</span>
        </div>
        <div className={styles.viewerTools}>
          <div className={styles.zoomControls} role="group" aria-label="Controle de zoom do diagrama">
            <button type="button" aria-label="Diminuir zoom" onClick={() => changeZoom(-0.5)} disabled={zoom <= 1}>
              <Minus size={15} />
            </button>
            <span aria-live="polite">{Math.round(zoom * 100)}%</span>
            <button type="button" aria-label="Aumentar zoom" onClick={() => changeZoom(0.5)} disabled={zoom >= 4}>
              <Plus size={15} />
            </button>
          </div>
          <button className={styles.fitButton} type="button" onClick={resetZoom} aria-label="Voltar à visualização inicial" title="Ajustar visualização">
            <RotateCcw size={16} />
          </button>
          <a className={styles.viewerDownload} href={diagramPng} download="CoreMotiom-diagrama-casos-de-uso.png" title="Baixar PNG em alta resolução">
            <Download size={16} /> <span>PNG</span>
          </a>
        </div>
      </div>
      <div className={styles.viewerViewport} ref={viewportRef} tabIndex={0} role="region" aria-label="Diagrama de casos de uso; use os controles para ampliar e deslize para explorar">
        <div
          className={styles.viewerCanvas}
          style={{
            width: presentation
              ? `min(${zoom * 100}%, max(${zoom * 260}px, calc((100svh - 400px) * ${2 * zoom})))`
              : `${zoom * 100}%`,
            minWidth: `calc(var(--viewer-min-width) * ${zoom})`,
          }}
        >
          <Image src={diagramSvg} alt="Diagrama UML do CoreMotiom com 5 atores, 17 casos de uso e 4 generalizações" width={2500} height={1250} unoptimized draggable={false} />
        </div>
      </div>
      <div className={styles.viewerFooter}>
        <span>Figura 1 — Diagrama de casos de uso do CoreMotiom</span>
        <span>Use + para ampliar e deslize para explorar · Fonte: elaboração da equipe com apoio de IA (2026)</span>
      </div>
    </div>
  );
}

function ActorCard({ actor, compact = false }: { actor: (typeof actors)[number]; compact?: boolean }) {
  const Icon = actor.icon;
  const toneStyle = { '--actor-tone': actor.tone, '--actor-surface': actor.surface } as CSSProperties;

  return (
    <article className={`${styles.actorCard} ${compact ? styles.actorCardCompact : ''}`} style={toneStyle}>
      <div className={styles.actorCardTop}>
        <span className={styles.actorIcon}><Icon size={20} strokeWidth={1.8} /></span>
        <span className={styles.actorIndex}>{actor.id} / 05</span>
      </div>
      <h3>{actor.name}</h3>
      <p>{actor.description}</p>
      <span className={styles.actorCases}>{actor.cases}</span>
    </article>
  );
}

export default function CaseStudyPresentation() {
  const [isDeckOpen, setIsDeckOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const deckRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const openDeck = useCallback((slide: number) => {
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setActiveSlide(slide);
    setIsDeckOpen(true);
  }, []);

  useEffect(() => {
    if (!isDeckOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    deckRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsDeckOpen(false);
      }
      if (event.key === 'Tab' && deckRef.current) {
        const focusable = Array.from(deckRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), a[href]'));
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && (document.activeElement === first || document.activeElement === deckRef.current)) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
      if (event.key === 'ArrowRight' || event.key === 'PageDown') {
        event.preventDefault();
        setActiveSlide((slide) => Math.min(deckLabels.length - 1, slide + 1));
      }
      if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault();
        setActiveSlide((slide) => Math.max(0, slide - 1));
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
      returnFocusRef.current?.focus();
    };
  }, [isDeckOpen]);

  return (
    <div className={styles.page}>
      <div className={styles.pageGlow} aria-hidden="true" />
      <header className={styles.siteHeader} inert={isDeckOpen}>
        <div className={styles.headerInner}>
          <a className={styles.brand} href="#inicio" aria-label="CoreMotiom, voltar ao início da apresentação">
            <span className={styles.brandSymbol}><Activity size={21} strokeWidth={2.4} /></span>
            <span className={styles.brandText}>CORE<span>MOTIOM</span></span>
            <span className={styles.brandSlash} aria-hidden="true" />
            <span className={styles.brandLabel}>MODELAGEM <br /> 2026</span>
          </a>
          <nav className={styles.headerNav} aria-label="Navegação da página">
            <a href="#diagrama">O diagrama</a>
            <a href="#atores">Atores</a>
            <a href="#escopo">Escopo</a>
          </nav>
          <button className={styles.headerButton} type="button" onClick={() => openDeck(0)} aria-label="Modo apresentação">
            <Play size={14} fill="currentColor" /> <span>Modo apresentação</span>
          </button>
        </div>
      </header>

      <main inert={isDeckOpen}>
        <section className={styles.hero} id="inicio" aria-labelledby="hero-title">
          <div className={styles.heroNoise} aria-hidden="true" />
          <div className={styles.heroGrid} aria-hidden="true" />
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <div className={styles.eyebrow}><span className={styles.eyebrowLine} /> PROJETO COREMOTIOM <span>·</span> DIÁRIO DE BORDO</div>
              <h1 id="hero-title">O esporte visto <em>por quem usa.</em></h1>
              <p className={styles.heroLead}>Um mapa visual das interações que movem a plataforma — de quem chega para explorar até quem mantém o ecossistema funcionando.</p>
              <div className={styles.heroActions}>
                <a className={styles.primaryButton} href="#diagrama">Explorar o diagrama <ArrowDownRight size={18} /></a>
                <button className={styles.secondaryButton} type="button" onClick={() => openDeck(0)}><Play size={16} /> Apresentar em slides</button>
              </div>
              <div className={styles.heroFootnote}><span className={styles.liveDot} /> MODELAGEM UML <span className={styles.heroFootnoteDivider} /> SETEMBRO 2026</div>
            </div>
            <div className={styles.heroVisual} aria-hidden="true">
              <div className={styles.heroOrb} />
              <div className={styles.heroTopNote}>COREMOTIOM <span>/</span> 01 — VISÃO GERAL</div>
              <div className={styles.previewFrame}>
                <div className={styles.previewBar}><span><i /><i /><i /></span><span>mapa-de-interações.uml</span><Layers3 size={15} /></div>
                <div className={styles.previewImage}><Image src={diagramSvg} alt="" width={2500} height={1250} priority unoptimized /></div>
                <div className={styles.previewBottom}><span>FIG. 01 / SISTEMA</span><span>17 CASOS &nbsp;·&nbsp; 05 ATORES</span></div>
              </div>
              <div className={styles.previewBadge}><span className={styles.previewBadgeIcon}><ArrowUpRight size={17} /></span><span>Da complexidade<br /><strong>à clareza.</strong></span></div>
            </div>
          </div>
          <div className={styles.heroBottom}>
            <span><span className={styles.heroBottomNumber}>01</span> / APRESENTAÇÃO DO SISTEMA</span>
            <span>Role para explorar <ArrowDownRight size={15} /></span>
          </div>
        </section>

        <div className={styles.metricsBand} aria-label="Números do diagrama">
          <div className={styles.metricsInner}>
            <div><strong>17</strong><span>casos de uso</span></div>
            <div><strong>05</strong><span>atores</span></div>
            <div><strong>04</strong><span>generalizações</span></div>
            <div><strong>01</strong><span>fronteira do sistema</span></div>
          </div>
        </div>

        <section className={styles.contentSection} id="diagrama" aria-labelledby="diagram-title">
          <div className={styles.sectionTopline}><span>01 / O MAPA</span><span>MODELO DE CASOS DE USO &nbsp;—&nbsp; UML</span></div>
          <div className={styles.sectionHeading}>
            <div><span className={styles.smallOverline}>DO CONTEXTO À INTERAÇÃO</span><h2 id="diagram-title">Uma visão completa<br />do <span>ecossistema.</span></h2></div>
            <div className={styles.sectionAside}><p>O diagrama reúne as ações da plataforma atual e conecta cada objetivo aos papéis que podem realizá-lo.</p><button type="button" onClick={() => openDeck(1)}>Abrir como slide <ArrowUpRight size={17} /></button></div>
          </div>
          <DiagramViewer />
          <div className={styles.downloadRow}>
            <div><span className={styles.filePill}>ARQUIVOS DA APRESENTAÇÃO</span><p>Uma imagem para apresentar. Um arquivo editável para evoluir.</p></div>
            <div className={styles.downloadActions}>
              <a href={diagramSvg} download="CoreMotiom-diagrama-casos-de-uso.svg"><Download size={16} /> SVG vetorial</a>
              <a href={diagramDrawio} download="CoreMotiom-diagrama-casos-de-uso.drawio"><Download size={16} /> Editar no Draw.io</a>
            </div>
          </div>
        </section>

        <section className={`${styles.contentSection} ${styles.actorsSection}`} id="atores" aria-labelledby="actors-title">
          <div className={styles.sectionTopline}><span>02 / OS PAPÉIS</span><span>QUEM INTERAGE COM O SISTEMA</span></div>
          <div className={styles.sectionHeading}>
            <div><span className={styles.smallOverline}>ATRÁS DE CADA AÇÃO</span><h2 id="actors-title">Cinco perfis.<br /><span>Um sistema.</span></h2></div>
            <div className={styles.sectionAside}><p>O ator geral reúne as ações públicas. Os quatro perfis especializados acrescentam permissões e responsabilidades próprias.</p></div>
          </div>
          <div className={styles.actorsGrid}>{actors.map((actor) => <ActorCard actor={actor} key={actor.id} />)}</div>
          <div className={styles.inheritanceNote}><span className={styles.noteSymbol}><Layers3 size={19} /></span><p><strong>Como ler as setas:</strong> Visitante, Atleta cadastrado, Lojista e Administrador especializam “Pessoa que navega” e herdam seus casos de uso gerais.</p><span>04 GENERALIZAÇÕES</span></div>
        </section>

        <section className={`${styles.contentSection} ${styles.scopeSection}`} id="escopo" aria-labelledby="scope-title">
          <div className={styles.sectionTopline}><span>03 / A LEITURA CERTA</span><span>LIMITES DO PROTÓTIPO</span></div>
          <div className={styles.sectionHeading}>
            <div><span className={styles.smallOverline}>CLAREZA ANTES DE PROMESSAS</span><h2 id="scope-title">O que o desenho<br /><span>representa.</span></h2></div>
            <div className={styles.sectionAside}><p>Os casos de uso descrevem as interações disponíveis na versão analisada. Algumas etapas ainda são experiências demonstrativas.</p></div>
          </div>
          <div className={styles.scopeGrid}>
            <article className={`${styles.scopeCard} ${styles.scopeAvailable}`}>
              <span className={styles.scopeTag}><span /> VISÍVEL NO PROTÓTIPO</span>
              <h3>Experiências que já<br />podem ser exploradas.</h3>
              <ul><li>Catálogo e lojas B2C / anúncios C2C</li><li>Comunidade e consulta de treinadores</li><li>Carrinho, cadastro de loja e solicitações</li><li>Gestão administrativa na interface</li></ul>
              <span className={styles.scopeCorner}>01 / FLUXOS</span>
            </article>
            <article className={`${styles.scopeCard} ${styles.scopeCaveat}`}>
              <span className={styles.scopeTag}><span /> AINDA NÃO É INTEGRAÇÃO REAL</span>
              <h3>Uma simulação não é<br />uma transação.</h3>
              <ul><li>PIX, pagamento e custódia financeira reais</li><li>Agendamento efetivo de treinadores</li><li>Rastreamento de transportadoras</li><li>SmartScan com análise por IA</li></ul>
              <span className={styles.scopeCorner}>02 / LIMITES</span>
            </article>
          </div>
        </section>

        <section className={styles.endSection} aria-labelledby="closing-title">
          <div className={styles.endBackdrop} aria-hidden="true">17</div>
          <span className={styles.smallOverline}>AGORA É SUA VEZ DE APRESENTAR</span>
          <h2 id="closing-title">O projeto inteiro.<br /><em>Uma leitura de cada vez.</em></h2>
          <p>Use a apresentação para contar a história do sistema e o arquivo editável para acompanhar os próximos passos do CoreMotiom.</p>
          <div className={styles.endActions}><button type="button" className={styles.primaryButton} onClick={() => openDeck(0)}><Play size={16} fill="currentColor" /> Iniciar apresentação</button><a href={diagramPng} download="CoreMotiom-diagrama-casos-de-uso.png" className={styles.secondaryButton}><Download size={17} /> Baixar diagrama</a></div>
          <div className={styles.endFooter}><span>COREMOTIOM / DIÁRIO DE BORDO</span><Link href="/">Ir para a plataforma <ArrowRight size={15} /></Link></div>
        </section>
      </main>

      {isDeckOpen && (
        <div className={styles.deck} ref={deckRef} role="dialog" aria-modal="true" aria-label="Apresentação do diagrama de casos de uso" tabIndex={-1}>
          <div className={styles.deckBackground} aria-hidden="true" />
          <div className={styles.deckHeader}><div className={styles.deckBrand}><span className={styles.brandSymbol}><Activity size={18} /></span><span>COREMOTIOM <i>/</i> APRESENTAÇÃO</span></div><div className={styles.deckPosition} aria-live="polite">{String(activeSlide + 1).padStart(2, '0')} <span>/</span> 0{deckLabels.length} <span className={styles.deckPositionLabel}>— {deckLabels[activeSlide]}</span></div><button type="button" className={styles.deckClose} onClick={() => setIsDeckOpen(false)} aria-label="Fechar apresentação"><X size={20} /><span>Esc para sair</span></button></div>
          <div className={styles.deckContent} key={activeSlide}>
            {activeSlide === 0 && <div className={styles.deckCover}><span className={styles.smallOverline}>DIÁRIO DE BORDO &nbsp;/&nbsp; 2026</span><h2>O esporte visto<br /><em>por quem usa.</em></h2><p>Uma apresentação do diagrama de casos de uso do CoreMotiom.</p><div className={styles.deckCoverStats}><span><strong>17</strong> casos de uso</span><span><strong>05</strong> atores</span><span><strong>04</strong> generalizações</span></div><div className={styles.deckCoverOrb} aria-hidden="true" /></div>}
            {activeSlide === 1 && <div className={styles.deckDiagramSlide}><div className={styles.deckSlideHeading}><div><span className={styles.smallOverline}>01 / A VISÃO GERAL</span><h2>O mapa de interações.</h2></div><p>Uma fronteira. Cinco atores. Dezessete objetivos.</p></div><DiagramViewer presentation /></div>}
            {activeSlide === 2 && <div className={styles.deckActorsSlide}><div className={styles.deckSlideHeading}><div><span className={styles.smallOverline}>02 / QUEM PARTICIPA</span><h2>Os atores do sistema.</h2></div><p>O papel genérico de navegação se especializa em quatro perfis.</p></div><div className={styles.deckActorGrid}>{actors.map((actor) => <ActorCard actor={actor} compact key={actor.id} />)}</div></div>}
            {activeSlide === 3 && <div className={styles.deckScopeSlide}><div className={styles.deckSlideHeading}><div><span className={styles.smallOverline}>03 / LIMITES DO MODELO</span><h2>Protótipo ≠ produção.</h2></div><p>Representar a interação sem prometer uma integração inexistente.</p></div><div className={styles.deckScopeGrid}><div><span>O QUE O DIAGRAMA COBRE</span><h3>Catálogo, comunidade, lojas e gestão.</h3><p>O fluxo de pedidos pode ser demonstrado, assim como o contato inicial com treinadores.</p></div><div><span>O QUE AINDA NÃO AFIRMAMOS</span><h3>Pagamento, custódia e agendamento reais.</h3><p>O desenho distingue a experiência visível de integrações financeiras ou operacionais futuras.</p></div></div></div>}
            {activeSlide === 4 && <div className={styles.deckLastSlide}><span className={styles.smallOverline}>04 / PRONTO PARA O DIÁRIO DE BORDO</span><h2>Do diagrama<br /><em>à apresentação.</em></h2><p>Revise o arquivo editável, insira a figura no TCC e registre as decisões do modelo no Diário de Bordo.</p><div className={styles.deckLastActions}><a href={diagramDrawio} download="CoreMotiom-diagrama-casos-de-uso.drawio"><Download size={18} /> Arquivo editável</a><a href={diagramPng} download="CoreMotiom-diagrama-casos-de-uso.png"><Download size={18} /> PNG para o TCC</a></div><span className={styles.deckLastCaveat}>Entrega: 30 de setembro de 2026 · Fonte sugerida: elaboração da equipe com apoio de IA (2026).</span></div>}
          </div>
          <div className={styles.deckFooter}><div className={styles.deckProgress} aria-label="Slides da apresentação">{deckLabels.map((label, index) => <button type="button" key={label} className={index === activeSlide ? styles.progressActive : ''} aria-label={`Ir para ${label}`} aria-current={index === activeSlide ? 'step' : undefined} onClick={() => setActiveSlide(index)} />)}</div><div className={styles.deckControls}><span>← → para navegar</span><button type="button" disabled={activeSlide === 0} onClick={() => setActiveSlide((slide) => slide - 1)} aria-label="Slide anterior"><ChevronLeft size={21} /></button><button type="button" disabled={activeSlide === deckLabels.length - 1} onClick={() => setActiveSlide((slide) => slide + 1)} aria-label="Próximo slide"><ChevronRight size={21} /></button></div></div>
        </div>
      )}
    </div>
  );
}
