import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// GitHub Pages for https://yinkyin.github.io/GUI-Datasets/ needs /GUI-Datasets/.
// Local dev keeps Vite's normal root behavior.
export default defineConfig(({ command }) => ({
  base: command === "build" ? "/GUI-Datasets/" : "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
