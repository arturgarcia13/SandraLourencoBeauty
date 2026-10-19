type Gtag = (...args: unknown[]) => void;

/**
 * Mede cliques em qualquer link de WhatsApp com a origem (seção) e o rótulo
 * do CTA. Silencioso quando o GA4 não está configurado.
 */
export function initAnalytics() {
  document.addEventListener(
    'click',
    (event) => {
      const target = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href*="wa.me"]');
      if (!target) return;

      const gtag = (window as unknown as { gtag?: Gtag }).gtag;
      if (typeof gtag !== 'function') return;

      const region = target.closest('section[id], footer');
      let origem = 'pagina';
      if (region instanceof HTMLElement) {
        origem = region.id || (region.tagName.toLowerCase() === 'footer' ? 'rodape' : 'pagina');
      }

      const servico = (target.dataset.waService || target.getAttribute('aria-label') || target.textContent || '').trim();

      gtag('event', 'whatsapp_click', { origem, servico });
    },
    { capture: true }
  );
}
