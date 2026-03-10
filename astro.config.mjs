import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://resume-prasanthkr.vercel.app',
  output: 'server',
  adapter: vercel(),
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'auto',
  },
});
