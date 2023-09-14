import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

// import vercel from "@astrojs/vercel/serverless";
import vercel from "@astrojs/vercel/static";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  output: "server",
  adapter: vercel({
    imageService: true,
    webAnalytics: {
      enabled: true,
    },
    speedInsights: {
      enabled: true,
    },
  }),
});
