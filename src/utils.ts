import content from "./content.json";
import type { ImageMetadata } from "astro";

export type Project = (typeof content)[0];

export function getProjects() {
  return content.sort((a, b) => {
    return a.index - b.index;
  });
}

type ImageResults = {
  [key: string]: () => Promise<{ default: ImageMetadata }>;
};

export function getImages(): ImageResults {
  return import.meta.glob("/src/assets/images/*.{jpeg,jpg,png,gif,webp}");
}
