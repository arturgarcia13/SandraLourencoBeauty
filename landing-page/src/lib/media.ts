import manifest from '../data/media.json';

type Entry = { type: 'image'; width: number; height: number; sizes: number[] } | { type: 'video'; src: string };
const m = manifest as Record<string, Entry>;

export function getImage(name: string) {
  const e = m[name];
  return e && e.type === 'image' ? e : null;
}
export function getVideo(name: string) {
  const e = m[name];
  return e && e.type === 'video' ? e : null;
}
export function gallery(prefix = 'foto-') {
  return Object.keys(m).filter((k) => k.startsWith(prefix) && m[k].type === 'image').sort();
}
export function pairs() {
  const out: { n: number; before: string; after: string }[] = [];
  for (let n = 1; n <= 4; n++) {
    if (getImage(`antes-${n}`) && getImage(`depois-${n}`)) out.push({ n, before: `antes-${n}`, after: `depois-${n}` });
  }
  return out;
}
