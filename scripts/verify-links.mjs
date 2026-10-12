import fs from 'node:fs/promises';
import path from 'node:path';

async function verify() {
  console.log('[verify] Iniciando verificação de integridade da build...');
  const distHtmlPath = path.resolve('dist/index.html');

  try {
    const html = await fs.readFile(distHtmlPath, 'utf-8');
    const errors = [];

    // 1. Checagem do WhatsApp oficial
    const waRegex = /href="https:\/\/wa\.me\/5585989978555\?text=[^"]*"/g;
    const waMatches = html.match(waRegex) || [];
    console.log(`[verify] Encontrados ${waMatches.length} links para o WhatsApp oficial (+55 85 98997-8555).`);
    if (waMatches.length < 5) {
      errors.push(`Esperava pelo menos 5 links de WhatsApp, encontrou ${waMatches.length}`);
    }

    // 2. Checagem de telefone antigo ou errado
    if (html.includes('98945-4290') || html.includes('5585989454290')) {
      errors.push('Detectado telefone antigo da Avec no HTML compilado!');
    }

    // 3. Checagem de CNPJ
    if (!html.includes('30.577.322/0001-69')) {
      errors.push('CNPJ não encontrado no rodapé.');
    }

    // 4. Checagem de Endereço e Cidade
    if (!html.includes('Rua Francisco Sales, 102') || !html.includes('Fortaleza')) {
      errors.push('Endereço oficial de Fortaleza não encontrado no HTML.');
    }

    // 5. Checagem de Prova Social
    if (!html.includes('5.0') || !html.includes('42')) {
      errors.push('Avaliações 5.0 / 42 não encontradas no HTML.');
    }

    // 6. Checagem do Schema.org JSON-LD HairSalon
    if (!html.includes('"@type":"HairSalon"') && !html.includes('"@type": "HairSalon"')) {
      errors.push('Structured Data Schema.org HairSalon ausente.');
    }

    // 7. Checagem de serviços-chave do Avec
    const keyServices = [
      'Escova Orgânica',
      'Alisamento Light',
      'Abertura de Fundo',
      'Botox',
      'Escova Inteligente',
      'Corte e Finalização',
      'Axilas',
    ];

    for (const s of keyServices) {
      if (!html.includes(s)) {
        errors.push(`Serviço essencial "${s}" não foi renderizado.`);
      }
    }

    if (errors.length > 0) {
      console.error('[verify] FALHAS ENCONTRADAS:');
      for (const err of errors) {
        console.error(`  ❌ ${err}`);
      }
      process.exit(1);
    }

    console.log('✅ [verify] Todos os testes de integridade passaram com sucesso!');
  } catch (err) {
    console.error(`[verify] Erro ao abrir dist/index.html: ${err.message}`);
    process.exit(1);
  }
}

verify();
