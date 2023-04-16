import { defineCollection } from "astro:content";
import { z } from "zod";

export const collections = {
  project: defineCollection({
    schema: z.object({
      index: z.number(),
      title: z.string(),
      description: z.string().optional(),
      mainImage: z.any(),
      images: z.array(z.object({
        index: z.number(),
        url: z.string(),
        alt: z.string(),
        disabled: z.boolean().optional()
      })),
    }),
  }),
};
