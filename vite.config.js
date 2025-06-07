import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import polyfillNode from "rollup-plugin-polyfill-node";

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": {},
  },
  build: {
    rollupOptions: {
      plugins: [polyfillNode()],
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
  assetsInclude: ["**/*.jpg", "**/*.png", "**/*.jpeg"],
});
