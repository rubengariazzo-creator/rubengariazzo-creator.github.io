import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  base: "/assets/app-dist/",
  plugins: [react()],
  build: {
    outDir: resolve(__dirname, "../assets/app-dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        app: resolve(__dirname, "src/main.jsx"),
        "page-entrance": resolve(__dirname, "src/page-entrance.js"),
      },
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "chunks/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },
  },
});
