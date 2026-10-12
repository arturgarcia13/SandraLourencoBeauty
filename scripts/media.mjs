// Otimiza as fotos colocadas em public/media e gera src/data/media.json.
// Convenção de nomes (extensão jpg, jpeg, png ou webp):
//   hero            foto principal do topo (vertical 4:5)
//   sandra          retrato da fundadora
//   espaco-01..06   o espaço e a equipe
//   antes-1 / depois-1 ... antes-4 / depois-4   pares reais de transformação
//   foto-01..20     galeria de resultados
// Vídeos (mp4) em public/media são apenas listados, sem conversão.
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC = path.resolve('public/media');
const OUT = path.resolve('public/m');
const WIDTHS = [480, 960, 1600];
const manifest = {};

await fs.mkdir(SRC, { recursive: true });
await fs.rm(OUT, { recursive: true, force: true });
await fs.mkdir(OUT, { recursive: true });

for (const file of await fs.readdir(SRC)) {
  const ext = path.extname(file).toLowerCase();
  const name = path.basename(file, ext).toLowerCase();
  if (ext === '.mp4' || ext === '.webm') { manifest[name] = { type: 'video', src: `/media/${file}` }; continue; }
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) continue;
  const input = sharp(path.join(SRC, file), { failOn: 'none' }).rotate();
  const meta = await input.metadata();
  const sizes = [];
  for (const w of WIDTHS) {
    if (w > (meta.width ?? w) && sizes.length) break;
    const width = Math.min(w, meta.width ?? w);
    await input.clone().resize({ width }).avif({ quality: 55, effort: 4 }).toFile(path.join(OUT, `${name}-${width}.avif`));
    await input.clone().resize({ width }).webp({ quality: 78 }).toFile(path.join(OUT, `${name}-${width}.webp`));
    sizes.push(width);
  }
  manifest[name] = { type: 'image', width: meta.width, height: meta.height, sizes };
  console.log(`[media] ${file} → ${sizes.join(', ')}px`);
}

await fs.mkdir(path.resolve('src/data'), { recursive: true });
await fs.writeFile(path.resolve('src/data/media.json'), JSON.stringify(manifest, null, 2));
console.log(`[media] ${Object.keys(manifest).length} arquivo(s) no manifesto`);
