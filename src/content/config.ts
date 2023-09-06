import { z, defineCollection } from "astro:content";

const projectCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      index: z.number(),
      title: z.string(),
      description: z.string().optional(),
      images: z.array(
        z.object({
          index: z.number(),
          image: image(),
          alt: z.string(),
          disabled: z.boolean().optional(),
          isMainImage: z.boolean().optional(),
        }),
      ),
    }),
});

export const collections = {
  project: projectCollection,
};
