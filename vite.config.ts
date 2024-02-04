import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
//

export default defineConfig({
  plugins: [react()],
  // base: "/react-contexts-state-managers",
  base: "/react-state-managers",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
