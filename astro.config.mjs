import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://yourname.com', // Replace with your actual domain
  output: 'server',
  adapter: vercel(),
  build: {
    inlineStylesheets: 'auto',
  },
});
