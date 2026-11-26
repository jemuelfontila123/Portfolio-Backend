import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  base: process.env.VITE_BASE_PATH || "/Portfolio-Project/",

  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/tests/setup.js"],
    include: ["src/**/*.test.{js,jsx}"],
  },
});