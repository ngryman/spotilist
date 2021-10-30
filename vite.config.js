import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/spotilist/",
  server: {
    port: 8080,
  },
  plugins: [svelte()],
  resolve: {
    alias: [
      { find: "@assets", replacement: "/src/assets" },
      { find: "@components", replacement: "/src/components" },
      { find: "@stores", replacement: "/src/stores" },
      { find: "@api", replacement: "/src/api" },
      { find: "@types", replacement: "/src/types" },
    ],
  },
  // https://github.com/EmilTholin/svelte-routing/pull/200
  optimizeDeps: { exclude: ["svelte-routing"] },
});
