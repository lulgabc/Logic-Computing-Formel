import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://lulgabc.github.io",
  base: "/Logic-Computing-Formel",
  trailingSlash: "always",
  integrations: [sitemap({ filter: (page) => !page.includes("/404") })],
  build: {
    format: "directory",
  },
  devToolbar: {
    enabled: false,
  },
  markdown: {
    shikiConfig: { theme: "github-dark" },
  },
});
