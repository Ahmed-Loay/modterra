import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    preserveSymlinks: true,
  },
  //to iterate quickly on the package without fighting the optimizer (i still have to, idky)
  optimizeDeps: {
    exclude: ["threejs-chunk-viewport"],
  },
});
