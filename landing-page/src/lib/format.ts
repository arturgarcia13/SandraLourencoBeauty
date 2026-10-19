/**
 * Formata valores vindos da API do Avec para padrão brasileiro elegante.
 */
export function formatPrice(valor: number | null | undefined, tipoValor?: string): string {
  if (valor === null || valor === undefined || tipoValor === 'sobconsulta') {
    return 'Sob consulta';
  }

  const formattedNum = valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  if (tipoValor === 'apartirde') {
    return `A partir de ${formattedNum}`;
  }

  return formattedNum;
}

/**
 * Formata minutos para exibição amigável (ex: 80 -> "1h20", 30 -> "30 min")
 */
export function formatDuration(minutes: number | null | undefined, override?: string): string {
  if (override) {
    return override;
  }

  if (!minutes || minutes <= 0) {
    return 'Sob avaliação';
  }

  const hours = Math.floor(minutes / 60);
  const remainingMins = minutes % 60;

  if (hours > 0 && remainingMins > 0) {
    return `${hours}h${remainingMins.toString().padStart(2, '0')}`;
  }

  if (hours > 0) {
    return `${hours}h00`;
  }

  return `${remainingMins} min`;
}
