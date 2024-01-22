import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";
import content from "./content.json";

export type ProjectCollectionEntry = CollectionEntry<"project">;

export type Project = (typeof content)[0];

export function getProjects() {
  return content.sort((a, b) => {
    return a.index - b.index;
  });
}

export function getImages() {
  return import.meta.glob<{ default: ImageMetadata }>(
    "/src/assets/images/*.{jpeg,jpg,png,gif,webp}"
  );
}
