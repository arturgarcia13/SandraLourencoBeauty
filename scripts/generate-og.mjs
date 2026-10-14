import path from 'node:path';
import sharp from 'sharp';

const width = 1200;
const height = 630;
const outPath = path.resolve('public/og-image.jpg');

const svgOverlay = Buffer.from(`
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#171310" />
      <stop offset="50%" stop-color="#121010" />
      <stop offset="100%" stop-color="#0d0b0b" />
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#c6a87d" />
      <stop offset="50%" stop-color="#edd8be" />
      <stop offset="100%" stop-color="#c6a87d" />
    </linearGradient>
  </defs>

  <!-- Dark luxury backdrop -->
  <rect width="${width}" height="${height}" fill="url(#bgGrad)" />

  <!-- Elegant gold borders -->
  <rect x="30" y="30" width="1140" height="570" rx="16" fill="none" stroke="#c6a87d" stroke-width="1.5" stroke-opacity="0.35" />
  <rect x="38" y="38" width="1124" height="554" rx="12" fill="none" stroke="#ffffff" stroke-width="1" stroke-opacity="0.08" />

  <!-- Brand Typography -->
  <g transform="translate(80, 140)">
    <!-- Category Pill -->
    <rect x="0" y="0" width="280" height="34" rx="17" fill="rgba(198, 168, 125, 0.12)" stroke="#c6a87d" stroke-width="1" stroke-opacity="0.5" />
    <text x="140" y="22" font-family="sans-serif" font-size="12" font-weight="600" letter-spacing="2" fill="#c6a87d" text-anchor="middle">COSMETOLOGIA CAPILAR</text>

    <!-- Main Title -->
    <text x="0" y="90" font-family="serif" font-size="56" font-weight="600" fill="#f6efe6" letter-spacing="-0.5">Sandra Lourenço</text>
    <text x="0" y="150" font-family="serif" font-size="56" font-weight="400" fill="url(#goldGrad)" letter-spacing="-0.5">Beauty</text>

    <!-- Specialty tags -->
    <text x="0" y="220" font-family="sans-serif" font-size="20" font-weight="500" fill="#edd8be">Loiros Saudáveis · Morena Iluminada · Alisamento Sem Formol</text>

    <!-- Location & Credibility -->
    <text x="0" y="270" font-family="sans-serif" font-size="16" fill="#a89f91">Estúdio Privativo com Hora Marcada · Fortaleza, CE</text>

    <g transform="translate(0, 315)">
      <rect x="0" y="0" width="210" height="38" rx="8" fill="#25d366" />
      <text x="105" y="24" font-family="sans-serif" font-size="14" font-weight="700" fill="#0e1a12" text-anchor="middle">WhatsApp (85) 98997-8555</text>
    </g>
  </g>
</svg>
`);

// Crop right side photo from hero
const heroBuffer = await sharp('public/media/hero.jpg')
  .resize(500, 570, { fit: 'cover', position: 'center' })
  .toBuffer();

// Mask right side photo with soft gradient edge
const heroMasked = await sharp(heroBuffer)
  .composite([
    {
      input: Buffer.from(`
        <svg width="500" height="570" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="fadeLeft" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#121010" stop-opacity="1" />
              <stop offset="25%" stop-color="#121010" stop-opacity="0.6" />
              <stop offset="70%" stop-color="#121010" stop-opacity="0" />
            </linearGradient>
          </defs>
          <rect width="500" height="570" fill="url(#fadeLeft)" />
        </svg>
      `),
      blend: 'over',
    },
  ])
  .toBuffer();

await sharp(svgOverlay)
  .composite([
    {
      input: heroMasked,
      top: 30,
      left: 670,
      blend: 'over',
    },
    {
      input: Buffer.from(`
        <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
          <rect x="30" y="30" width="1140" height="570" rx="16" fill="none" stroke="#c6a87d" stroke-width="1.5" stroke-opacity="0.35" />
        </svg>
      `),
      top: 0,
      left: 0,
      blend: 'over',
    },
  ])
  .jpeg({ quality: 92, chromaSubsampling: '4:4:4' })
  .toFile(outPath);

console.log(`[og] Imagem Open Graph 1200x630 gerada em ${outPath}`);
