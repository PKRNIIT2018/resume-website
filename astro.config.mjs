import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://resume-prasanthkr.vercel.app',
  output: 'server',
  adapter: vercel(),
  build: {
    inlineStylesheets: 'auto',
  },
});
