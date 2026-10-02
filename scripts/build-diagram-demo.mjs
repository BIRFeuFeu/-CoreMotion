import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderUseCaseSvg } from './lib/usecase-core.mjs';

/* --------------------------------------------------------------------------
 * Variante de apresentação do diagrama, usada em "Demonstração do Diagrama".
 *
 * O renderizador oficial (usecase-core.mjs) alimenta os documentos técnicos do
 * projeto: fundo escuro e nomenclatura UML. Aqui o mesmo desenho — mesmas
 * posições, mesmos 48 casos — é reescrito em tons de papel e com palavras do
 * dia a dia, para quem nunca viu um diagrama de casos de uso.
 * ------------------------------------------------------------------------ */

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outFile = path.join(root, 'Demonstração do Diagrama', 'diagrama.svg');

const COLORS = {
  // fundo e estruturas
  '#0B0C10': '#FBF8F2',
  '#111620': '#FBF8F2',
  'rgba(255,255,255,0.018)': '#FFFDF9',
  'rgba(15,17,22,0.95)': '#FFFFFF',
  '#141b26': '#FFFDF9',
  '#364253': '#D9D1C1',
  '#3A4152': '#D9D1C1',
  // caixas de situação, por perfil de quem faz
  '#1c2935': '#F6F3EC',
  '#181C25': '#F6F3EC',
  '#0E2A22': '#EFF4EE',
  '#0D2337': '#EEF2F6',
  '#2E1219': '#F7EFED',
  '#1C1633': '#F1EFF6',
  '#2B2107': '#F8F1E4',
  // textos
  '#C7CDDA': '#2F3A42',
  '#9daec4': '#7E888F',
  '#767F93': '#7E888F',
  '#6F7789': '#8A939A',
  '#aab8ce': '#6C7681',
  '#98A0B1': '#5F6A73',
  '#edf2fa': '#333C44',
  '#E5E7EB': '#333C44',
  '#ECFDF5': '#333C44',
  '#EFF6FF': '#333C44',
  '#FEF2F2': '#333C44',
  '#F5F3FF': '#333C44',
  '#FFFBEB': '#333C44',
  '#F0FDF4': '#333C44',
  '#A8AFBF': '#9AA5AD',
  '#8FD9C0': '#9AA5AD',
  '#9CCBEC': '#9AA5AD',
  '#BDB0EE': '#9AA5AD',
  '#EBA8A8': '#9AA5AD',
  '#E3C87F': '#9AA5AD',
  '#93DBA8': '#9AA5AD',
  '#E7CD8C': '#9AA5AD',
  '#b3c0d2': '#9AA5AD',
  // linhas e destaques
  '#8B93A7': '#7E8C99',
  '#34D399': '#5E9A7E',
  '#22C55E': '#4F8F6B',
  '#F87171': '#BE7E72',
  '#A78BFA': '#8E86B8',
  '#C4B5FD': '#7C7295',
  '#38BDF8': '#6E93B8',
  '#A9D8F2': '#4E7191',
  '#FBBF24': '#D89A3C',
};

// Nomes técnicos do catálogo -> mesmo significado em palavras comuns.
const RENAMES = {
  'Criar conta (Atleta C2C ou Lojista B2C)': 'Criar conta (como atleta ou como lojista)',
  'Entrar com Google (OAuth)': 'Entrar com a conta Google',
  'Usar acesso rápido de demonstração': 'Entrar rápido em modo demonstração',
  'Simular outro papel (visitante/atleta/lojista/admin)': 'Trocar de perfil para testar a plataforma',
  'Buscar produtos no catálogo (⌘K)': 'Buscar produtos no catálogo',
  'Filtrar e ordenar catálogo (tipo, categoria, modalidade, condição, selo)':
    'Filtrar e ordenar produtos (tipo, categoria, esporte, condição, selo)',
  'Ver ficha do produto (galeria, tamanhos, avaliação)': 'Ver detalhes do produto (fotos, tamanhos, avaliações)',
  'Finalizar compra (carrinho → entrega → pagamento)': 'Finalizar compra (carrinho, entrega e pagamento)',
  'Anunciar equipamento seminovo (C2C)': 'Anunciar equipamento usado (venda entre pessoas)',
  'Gerenciar meus anúncios (listar e excluir)': 'Gerenciar meus anúncios (ver e excluir)',
  'Acompanhar vendas em custódia': 'Acompanhar minhas vendas (pagamento guardado até a entrega)',
  'Criar loja oficial (B2C)': 'Criar loja oficial (empresa)',
  'Solicitar selo de loja verificada (CNPJ)': 'Pedir selo de loja verificada (CNPJ)',
  'Denunciar publicação para moderação': 'Denunciar publicação para a moderação',
  'Acessar painel executivo master': 'Entrar no painel do administrador',
  'Ver métricas (GMV, custódia 4,5%, B2C × C2C)':
    'Ver números do negócio (vendas, taxa de 4,5%, lojas e pessoas)',
  'Auditar loja: aprovar ou recusar selo': 'Analisar loja: aprovar ou recusar o selo',
  'Moderar catálogo (status e exclusão)': 'Moderar produtos (situação e remoção)',
  'Gerenciar usuários (criar, papel, banir, excluir)': 'Gerenciar usuários (criar, permissão, banir)',
  'Atualizar status de pedidos e pagamentos': 'Atualizar situação de pedidos e pagamentos',
  'Confirmar pagamento em sandbox': 'Confirmar pagamento de teste',
  'Sincronizar dados com Supabase': 'Sincronizar dados com o banco na nuvem',
  'Diagnosticar banco e abrir console SQL': 'Verificar o banco de dados e abrir consultas',
  'Autenticar contas no Supabase Auth': 'Autenticar contas no serviço de login',
  'Persistir dados em PostgreSQL com RLS': 'Guardar dados com segurança (regras por usuário)',
  'Expor API Routes internas (produtos, lojas, usuários)':
    'Entregar dados internos para o site (produtos, lojas, usuários)',
  'Servir imagens do catálogo': 'Exibir as imagens dos produtos',
  'Operar em modo offline com dados iniciais': 'Funcionar sem internet, com dados iniciais',
  'Consultar prazo e frete da transportadora': 'Consultar prazo e frete na transportadora',
};

// Papéis e serviços: nomes que qualquer pessoa reconhece.
const LABELS = {
  'Atleta (usuário)': 'Atleta',
  'Lojista (vendedor)': 'Lojista',
  'Super Admin': 'Administrador',
  'Google OAuth': 'Google',
  'Banco / PIX': 'Banco (PIX)',
  'Supabase Auth': 'Supabase (login)',
  'PostgreSQL (RLS)': 'Banco de dados',
};

/** Quebra o nome da situação em até duas linhas, dentro da caixa. */
function rewrap(text) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (const word of words) {
    if (!line) line = word;
    else if (`${line} ${word}`.length <= 58) line += ` ${word}`;
    else {
      lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 2);
}

let svg = renderUseCaseSvg();
const [, width, height] = /viewBox="0 0 (\d+) (\d+)"/.exec(svg).map(Number);

svg = svg.replace(
  'class="flow-svg"',
  "class=\"flow-svg\" font-family=\"Georgia, 'Iowan Old Style', 'Times New Roman', serif\""
);
svg = svg.replace(
  /(<svg[^>]*>)/,
  '$1\n<title>CoreMotiom — tudo o que dá para fazer na plataforma</title>\n<desc>Mapa com 48 situações do dia a dia, separadas em seis áreas. À esquerda e à direita aparecem quem usa a plataforma e os serviços de fora. O ponto amarelo marca um assunto que ainda precisa ser definido.</desc>'
);

// Cores
svg = svg.replace(/="(#[0-9A-Fa-f]{6}|rgba\([^)]*\))"/g, (match, color) => {
  const next = COLORS[color] ?? COLORS[color.toLowerCase()];
  return next ? `="${next}"` : match;
});

// A legenda vive no painel "Como ler" da página: o desenho fica só com o mapa.
svg = svg.replace(/(<rect x="0" y="0"[^>]*\/>\n)[\s\S]*?(<rect x="244")/, (match, before, boundary) => before + boundary);

svg = svg.replace(
  />CoreMotiom — Sistema de Marketplace Esportivo</,
  '>CoreMotiom — tudo o que dá para fazer na plataforma<'
);
svg = svg.replace(/>\d+ CASOS DE USO · \d+ MÓDULOS</, '>48 situações do dia a dia · 6 áreas<');
svg = svg.replace(/stroke-dasharray="7 5" \/>/g, 'stroke-dasharray="none" stroke-opacity="0.5" />');

// Cada área vira "X situações"; o "&" das áreas vira "e"
svg = svg.replace(
  /(<text[^>]*font-size="12\.8" font-weight="700" fill="#[0-9A-F]{6}">)([^<]*)</g,
  (match, open, title) =>
    `${open.replace('font-size="12.8"', 'font-size="14"')}${title.replace(/ &amp; /g, ' e ')}<`
);
svg = svg.replace(
  /(text-anchor="end" font-size="10\.2" font-weight="700" fill="#8A939A">)(\d+) UC · ([^<]*)</g,
  (match, open, count, actors) =>
    `${open}${count} situações${actors.trim() ? ` · ${actors.replace(/\s+$/, '')}` : ''}<`
);

// Papéis e serviços conhecidos
for (const [from, to] of Object.entries(LABELS)) svg = svg.split(from).join(to);

// Numeração das caixas: discreta, para não competir com o texto
svg = svg.replace(
  /<text x="(\d+)" y="([\d.]+)" font-size="8\.8" font-weight="700" fill="#9AA5AD">(UC\d+)<\/text>/g,
  (match, x, y, id) => `<text x="${x}" y="${y}" font-size="9.6" letter-spacing="0.4" fill="#ADB6BC">${id}</text>`
);

// Nomes das situações: maiores, em até duas linhas, com palavras comuns
svg = svg.replace(
  /<text x="(\d+)" y="([\d.]+)" font-size="11\.8" fill="#333C44">([^<]*)<\/text>/g,
  (match, x, y, label) => {
    const lines = rewrap(RENAMES[label] ?? label);
    const middle = Number(y) - 2 - (lines.length - 1) * 7.5;
    return `<text x="${x}" y="${y}" font-size="13.4" fill="#333C44">${lines
      .map((line, i) => `<tspan x="${x}" y="${(middle + i * 15.5).toFixed(1)}">${line}</tspan>`)
      .join('')}</text>`;
  }
);

// A seta do «include» do carrinho passa a contornar as caixas, sem cobrir textos
svg = svg.replace(
  /<path d="M818,647 H\d+ V600 H\d+" fill="none" stroke="#8E86B8" stroke-width="1\.3" stroke-dasharray="5 4" marker-end="url\(#uc-include\)" \/>/,
  '<path d="M818,647 H840 V600 H819" fill="none" stroke="#8E86B8" stroke-width="1.3" stroke-dasharray="5 4" marker-end="url(#uc-include)" />'
);
svg = svg
  .split('font-size="9.6" font-weight="600" fill="#7C7295">«include»')
  .join('font-size="9.2" fill="#7C7295">inclui');

// O desenho perde a faixa superior que era da legenda e ganha uma borda limpa.
const cropTop = 66;
const croppedHeight = height - cropTop;
svg = svg
  .replace(
    /viewBox="0 0 \d+ \d+" width="\d+" height="\d+"/,
    `viewBox="0 ${cropTop} ${width} ${croppedHeight}" width="${width}" height="${croppedHeight}"`
  )
  .replace(
    /(<rect x="0" y="0"[^>]*\/>\n)([\s\S]*)(\n<\/svg>)/,
    (match, background, content, close) => `${background}<g transform="translate(0,-${cropTop})">${content}</g>${close}`
  );

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, svg);
console.log(`Diagrama de apresentação gerado: ${path.relative(root, outFile)} (${width}×${croppedHeight})`);
