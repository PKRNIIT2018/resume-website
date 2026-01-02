// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://yourname.com', // Replace with your actual domain
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
});

// Made with Bob
