import { getCollection } from "astro:content";

export const getProjects = async () => {
  const projects = await getCollection("project");
  projects.sort((a, b) => a.data.index - b.data.index);
  return projects;
};
