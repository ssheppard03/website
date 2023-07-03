import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: 'https://ssheppard03.github.io',
  base: '/website', 
  integrations: [tailwind(), react()]
});
