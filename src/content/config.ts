import { defineCollection } from "astro:content";
import { z } from "zod";

export const collections = {
  project: defineCollection({
    schema: z.object({
      title: z.string(),
      description: z.string(),
      mainImage: z.string(),
      images: z.array(z.string()),
    }),
  }),
};
