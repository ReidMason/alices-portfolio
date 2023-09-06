import { z, defineCollection } from "astro:content";

const projectCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      index: z.number(),
      title: z.string(),
      description: z.string().optional(),
      mainImage: image(),
      mainImageAlt: z.string(),
      images: z.array(
        z.object({
          index: z.number(),
          url: z.string(),
          alt: z.string(),
          disabled: z.boolean().optional(),
        }),
      ),
    }),
});

export const collections = {
  project: projectCollection,
};
