/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";

export default defineConfig({
  plugins: [react(), basicSsl()],
  test: {
    // 👋 add the line below to add jsdom to vite
    environment: "jsdom",
    globals: true,
  },
});
