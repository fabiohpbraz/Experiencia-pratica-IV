import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  base: "./",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    minify: "esbuild",
    cssMinify: "esbuild",
    sourcemap: false,
    reportCompressedSize: true,
    rollupOptions: {
      input: {
        index: resolve(process.cwd(), "index.html"),
        projetos: resolve(process.cwd(), "projetos.html"),
        cadastro: resolve(process.cwd(), "cadastro.html")
      }
    }
  }
});
