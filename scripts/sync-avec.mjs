import fs from 'node:fs/promises';
import path from 'node:path';

const SALON_ID = 74902;
const API = 'https://api.avec.beauty';
const DATA = path.resolve('src/data');
const headers = { 'User-Agent': 'Mozilla/5.0 (compatible; SandraLourencoLP/1.0)' };

async function get(route) {
  const res = await fetch(`${API}/${route}`, { headers });
  if (!res.ok) throw new Error(`HTTP ${res.status} em ${route}`);
  const json = await res.json();
  if (json.code !== 200) throw new Error(`Resposta inválida em ${route}`);
  return json.data;
}

async function save(file, payload) {
  await fs.mkdir(DATA, { recursive: true });
  await fs.writeFile(path.join(DATA, file), JSON.stringify(payload, null, 2), 'utf-8');
}

async function keepOrFail(file, err) {
  console.warn(`[sync-avec] Aviso (${file}): ${err.message}`);
  try {
    await fs.access(path.join(DATA, file));
    console.log(`[sync-avec] Mantendo snapshot existente de ${file}.`);
  } catch {
    console.error(`[sync-avec] Erro crítico: sem snapshot de ${file} e a API falhou.`);
    process.exitCode = 1;
  }
}

async function services() {
  const data = await get(`salao/${SALON_ID}/servicos/online?status=1`);
  const list = data.salonServices
    .filter((s) => s.agendamento_online)
    .map(({ id, servico, categoria, descricao, valor, tipo_valor, tempo }) => ({
      id, servico: servico.trim(), categoria, descricao: descricao ? descricao.trim() : '', valor, tipo_valor, tempo,
    }));
  await save('avec-services.json', { fetchedAt: new Date().toISOString(), salonId: SALON_ID, count: list.length, services: list });
  console.log(`[sync-avec] ${list.length} serviços`);
}

async function reviews() {
  const first = await get(`salao/${SALON_ID}/avaliacoes`);
  const pages = first.ratings.last_page || 1;
  let all = first.ratings.data;
  for (let p = 2; p <= pages; p++) all = all.concat((await get(`salao/${SALON_ID}/avaliacoes?page=${p}`)).ratings.data);
  const slim = all.map((r) => ({
    stars: r.estrelas,
    text: (r.avaliacao || '').trim(),
    name: r.nome,
    date: (r.datacad || '').slice(0, 10),
  }));
  await save('avec-reviews.json', { fetchedAt: new Date().toISOString(), total: first.ratings.total, reviews: slim });
  console.log(`[sync-avec] ${slim.length} avaliações`);
}

async function team() {
  const data = await get(`salao/${SALON_ID}/profissionais?status=1&status_agenda_online=1`);
  const list = data.professionals.map((p) => ({ name: p.apelido || p.nome, role: p.cargo }));
  await save('avec-team.json', { fetchedAt: new Date().toISOString(), team: list });
  console.log(`[sync-avec] ${list.length} profissionais`);
}

for (const [file, job] of [['avec-services.json', services], ['avec-reviews.json', reviews], ['avec-team.json', team]]) {
  try { await job(); } catch (err) { await keepOrFail(file, err); }
}
