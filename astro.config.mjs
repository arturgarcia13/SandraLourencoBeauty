import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { site } from './src/config/site';

export default defineConfig({
  site: site.url,
  output: 'static',
  integrations: [sitemap()],
  vite: {
    server: {
      allowedHosts: [
        'universities-sides-opt-club.trycloudflare.com',
        '.trycloudflare.com',
      ],
    },
  },
});
