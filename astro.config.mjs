import { defineConfig } from "astro/config";

export default defineConfig({
  site: process.env.SITE_URL || "https://furkandogan.org",
  base: process.env.BASE_PATH || "/",
  output: "static",
  devToolbar: { enabled: false },
  build: {
    format: "directory"
  }
});
