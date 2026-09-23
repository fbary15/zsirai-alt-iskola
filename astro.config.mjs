import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.iskola.zsira.hu',
  trailingSlash: 'always',
  build: { format: 'directory' },
  compressHTML: true,
  integrations: [sitemap({ changefreq: 'weekly', priority: 0.7, lastmod: new Date() })],
});
