import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";
import content from "./content.json";

export type ProjectCollectionEntry = CollectionEntry<"project">;

export type Project = typeof content[0];

export const getProjects = () => {
  return content;
};

export const getMainImage = (project: ProjectCollectionEntry) => {
  return (
    project.data.images.find((x) => x.isMainImage) ?? project.data.images[0]
  );
};
