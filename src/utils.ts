import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";
import content from "./content.json";

export type ProjectCollectionEntry = CollectionEntry<"project">;

export type Project = (typeof content)[0];

export const getProjects = () => {
  return content.sort((a, b) => {
    return a.index - b.index;
  });
};
