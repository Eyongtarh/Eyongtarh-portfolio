import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

const root = (file) => fileURLToPath(new URL(file, import.meta.url));

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
    rollupOptions: {
      // Builds the site and a static 404 page. Vercel serves dist/404.html with a
      // real 404 status for unknown paths, as long as vercel.json has no catch all rewrite.
      input: {
        main: root("./index.html"),
        notFound: root("./404.html"),
      },
    },
  },
});
