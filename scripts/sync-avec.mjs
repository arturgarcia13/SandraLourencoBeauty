import fs from 'node:fs/promises';
import path from 'node:path';

const SALON_ID = 74902;
const TARGET_PATH = path.resolve('src/data/avec-services.json');

async function sync() {
  console.log(`[sync-avec] Buscando serviços do salão ${SALON_ID} na API Avec...`);
  try {
    const res = await fetch(`https://api.avec.beauty/salao/${SALON_ID}/servicos/online?status=1`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SandraLourencoLP/1.0)',
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    const data = await res.json();
    if (data.code !== 200 || !data.data?.salonServices) {
      throw new Error(`Resposta inválida da API Avec: ${JSON.stringify(data).slice(0, 200)}`);
    }

    const slim = data.data.salonServices
      .filter((s) => s.agendamento_online)
      .map(({ id, servico, categoria, descricao, valor, tipo_valor, tempo }) => ({
        id,
        servico: servico.trim(),
        categoria,
        descricao: descricao ? descricao.trim() : '',
        valor,
        tipo_valor,
        tempo,
      }));

    const payload = {
      fetchedAt: new Date().toISOString(),
      salonId: SALON_ID,
      count: slim.length,
      services: slim,
    };

    await fs.mkdir(path.dirname(TARGET_PATH), { recursive: true });
    await fs.writeFile(TARGET_PATH, JSON.stringify(payload, null, 2), 'utf-8');
    console.log(`[sync-avec] Sucesso! ${slim.length} serviços sincronizados em ${TARGET_PATH}`);
  } catch (err) {
    console.warn(`[sync-avec] Aviso: falha ao sincronizar com a API (${err.message}).`);
    try {
      await fs.access(TARGET_PATH);
      console.log(`[sync-avec] Mantendo snapshot existente em ${TARGET_PATH}.`);
    } catch {
      console.error(`[sync-avec] Erro crítico: arquivo de snapshot não encontrado e API falhou.`);
      process.exit(1);
    }
  }
}

sync();
