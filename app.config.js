import { defineConfig } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ["solid-icons"],
    },
    server: {
      proxy: {
        "/api": {
          target:"http://localhost:8000",
          changeOrigin: true,
        },
      },
    },
  },
});
