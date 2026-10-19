import { site } from '../config/site';

/**
 * Gera URL seguro para o WhatsApp oficial com mensagem codificada.
 */
export function waLink(customMessage?: string): string {
  const parts: string[] = [];

  if (site.whatsapp.greeting) {
    parts.push(site.whatsapp.greeting);
  }

  if (customMessage) {
    parts.push(customMessage.trim());
  }

  const fullText = parts.join(' ');
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(fullText)}`;
}

/**
 * Gera mensagem contextualizada para um serviço e período específico.
 */
export function waServiceLink(serviceName: string, periodLabel?: string): string {
  let msg = `Gostaria de consultar disponibilidade para *${serviceName}*`;
  if (periodLabel) {
    msg += `, de preferência no período da *${periodLabel}*`;
  }
  msg += '.';
  return waLink(msg);
}
