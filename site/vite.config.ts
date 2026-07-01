import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// GitHub Pages for https://yinkyin.github.io/GUI-Datasets/ needs /GUI-Datasets/.
// Local dev keeps Vite's normal root behavior, while preview must match the built asset base.
export default defineConfig(({ command, isPreview }) => ({
  base: command === "serve" && !isPreview ? "/" : "/GUI-Datasets/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
