import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import basicSsl from "@vitejs/plugin-basic-ssl";
import fs from "fs";
import path from "path";

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
    host: "127.0.0.1",
    // host: "siburaward.com",
    port: 3000,
    https: true,
    strictPort: true,
  },
  //   server: {
  //     host: "dev.siburaward.com",
  //     port: 5173,
  //     https: {
  //       key: fs.readFileSync(
  //         path.resolve(__dirname, "dev.siburaward.com-key.pem")
  //       ),
  //       cert: fs.readFileSync(path.resolve(__dirname, "dev.siburaward.com.pem")),
  //     },
  //     proxy: {
  //       "/api": {
  //         target: "https://api.siburaward.com",
  //         changeOrigin: true,
  //         secure: false,
  //       },
  //       "/sanctum": {
  //         target: "https://api.siburaward.com",
  //         changeOrigin: true,
  //         secure: false,
  //       },
  //     },
  //   },
});

// https://vitejs.dev/config/
