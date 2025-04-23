import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import basicSsl from "@vitejs/plugin-basic-ssl";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [basicSsl(), vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  define: {
    //global: "globalThis",
  },
  build: {
    sourcemap: false,
    //outDir: '../game.com',
    //emptyOutDir: true,
    //publicDir : './public',
    //minify: false
  },
  server: {
    // bind to 127.0.0.1 (localhost) instead of trying to resolve sibur.local
    host: "127.0.0.1",
    port: 3000, // or whatever port you like
    strictPort: true, // fail if that port is busy
  },
});

// https://vitejs.dev/config/
