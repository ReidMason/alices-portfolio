import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

export type ProjectCollectionEntry = CollectionEntry<"project">;

export const getProjects = async (): Promise<ProjectCollectionEntry[]> => {
  const projects = await getCollection("project");
  projects.sort((a, b) => a.data.index - b.data.index);
  projects.map((x) => x.data.images.sort((a, b) => a.index - b.index));
  return projects;
};

export const getMainImage = (project: ProjectCollectionEntry) => {
  return (
    project.data.images.find((x) => x.isMainImage) ?? project.data.images[0]
  );
};
