import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  base: "/gym-coach-app/",      // путь для GitHub Pages
  build: {
    outDir: "docs",             // СЮДА будет собираться прод-сайт
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
