import { defineCollection } from "astro:content";
import { z } from "zod";

export const collections = {
  project: defineCollection({
    schema: z.object({
      title: z.string(),
      image: z.string(),
    })
  })
};
