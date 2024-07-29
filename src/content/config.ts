import { defineCollection, z } from "astro:content";
import { docsSchema } from "@astrojs/starlight/schema";

export const collections = {
  docs: defineCollection({ schema: docsSchema() }),
  blog: defineCollection({
    schema: z.object({
      id: z.number(),
      title: z.object({ rendered: z.string() }),
      date: z.string(),
      content: z.object({ rendered: z.string() }),
      excerpt: z.object({ rendered: z.string() }),
      tags: z.array(z.number()),
    }),
  }),
};
