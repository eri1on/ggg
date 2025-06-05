import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/ggg/", // Replace 'your-repo-name' with your actual GitHub repository name
  server: {
    host: "0.0.0.0",
  },
});
