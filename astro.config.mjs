import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  output: "server", // Cambiar a modo servidor para que funcionen los endpoints
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});
