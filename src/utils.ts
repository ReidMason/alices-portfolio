import { getCollection } from "astro:content";

export const getProjects = async () => {
  const projects = await getCollection("project");
  projects.sort((a, b) => a.data.index - b.data.index);
  return projects;
}

export const getAllImages = async (): Promise<any> => {
  const imagesRaw = import.meta.glob("./images/*/*");
  const images: any = {};
  for (const key of Object.keys(imagesRaw)) {
    const res = (await imagesRaw[key]()) as Record<string, any>;
    images[key] = res.default;
  }

  return images;
}
