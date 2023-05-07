import fs from "fs";
import path from "path";
import { z } from "zod";

const metadataSchema = z.object({
  description: z.string().optional(),
  altNames: z.array(z.string()).optional()
});

type ProjectMetadata = z.infer<typeof metadataSchema>;

interface ProjectImageData {
  mainImage: Image,
  images: Array<Image>,
}

interface BaseProject {
  name: string,
  filename: string,
  index: number,
  metadata: ProjectMetadata,
}

export interface Project {
  name: string,
  slug: string,
  index: number,
  metadata: ProjectMetadata,
  imageData: ProjectImageData
}

interface Image {
  src: any,
  alt: string,
  index: number,
  width: number,
  height: number
}

const getAllImages = async (): Promise<any> => {
  const imagesRaw = import.meta.glob("./content/projects/*/*");
  const images: any = {};
  for (const key of Object.keys(imagesRaw)) {
    const res = (await imagesRaw[key]()) as Record<string, any>;
    images[key] = res.default;
  }

  return images;
}

const allImages = await getAllImages();

const baseProjectDir = path.join(process.cwd(), 'src/content/projects');
const maxImageWidth = 750;

function getProjectSlug(projectName: string): string {
  return decodeURI(projectName).toLowerCase().replaceAll(" ", "-");
}

function getProjectDir(projectName: string): string {
  return `${baseProjectDir}/${projectName}`;
}

function getProjectImageFiles(projectName: string): string[] {
  const projectDir = getProjectDir(projectName);
  const files = fs.readdirSync(projectDir);
  return files.filter(x =>
    !x.startsWith(".") && !x.endsWith(".json")
  )
}

function parseImageIndex(rawIndex: string): number {
  return parseInt(rawIndex.replace("*", "")) || 99
}
function isMainImage(filename: string): boolean {
  return filename.startsWith("*");
}

function removeFileExtension(filename: string): string {
  return filename.replace(/\.[^/.]+$/, "");
}

function parseImageMetadata(filename: string, projectName: string): Image | undefined {
  const imageParts = filename.split(" ");
  if (imageParts[0] == undefined)
    return;

  /* eslint @typescript-eslint/no-unsafe-member-access: "off", @typescript-eslint/no-var-requires: "off" */
  const imageFilepath = `./content/projects/${projectName}/${filename}`;
  const imageData = allImages[imageFilepath];

  const percentageDecrease = Math.max(imageData.width, maxImageWidth) / maxImageWidth;

  return {
    src: imageData,
    alt: removeFileExtension(imageParts.slice(1).join(" ")),
    index: parseImageIndex(imageParts[0]),
    width: imageData.width / percentageDecrease,
    height: imageData.height / percentageDecrease
  }
}

function getImagesForProject(projectName: string): ProjectImageData | null {
  const images: Image[] = [];
  let mainImage: Image | null = null;

  const imageFilenames = getProjectImageFiles(projectName)
  imageFilenames.forEach(imageFilename => {
    const image = parseImageMetadata(imageFilename, projectName);
    if (image == undefined) return;

    images.push(image);
    if (mainImage === null || isMainImage(imageFilename)) mainImage = image;
  });

  // Sort just in case they aren't in order
  images.sort((a, b) => a.index - b.index);

  // Make sure image data is vald
  if (mainImage == null || images.length === 0) return null;

  return {
    mainImage,
    images
  }
}

function parseProjectMetadata(projectName: string): ProjectMetadata {
  const filepath = `${baseProjectDir}/${projectName}/metadata.json`;
  if (!fs.existsSync(filepath)) return {};

  const data = fs.readFileSync(filepath, "utf-8");
  return metadataSchema.parse(JSON.parse(data));
}

function getProjectIndex(projectFilename: string): number {
  const nameParts = projectFilename.split(" ");
  const index = Number(nameParts[0]);
  if (nameParts.length < 2 || isNaN(index)) {
    console.warn(`Couldn't determine project index defaulting to last: '${projectFilename}'`)
    return Infinity;
  }

  return index
}

function formatProjectfilename(projectFilename: string): string {
  const nameParts = projectFilename.split(" ");
  return nameParts.slice(1).join(" ");
}

function getAllProjects(): BaseProject[] {
  const files = fs.readdirSync(baseProjectDir).filter(x => !x.startsWith("."));
  return files.map(filename => {
    const metadata: ProjectMetadata = parseProjectMetadata(filename);
    return {
      name: formatProjectfilename(filename),
      filename: filename,
      index: getProjectIndex(filename),
      metadata,
    }
  });
}

export default function getProjects(): Project[] {
  const projectData: Project[] = [];
  getAllProjects().forEach(project => {
    const imageData = getImagesForProject(project.filename);
    if (imageData == null) {
      console.error(`Invalid image data for ${project.name}`);
      return;
    }

    projectData.push({
      name: project.name,
      slug: getProjectSlug(project.name),
      index: project.index,
      metadata: project.metadata,
      imageData
    })
  });

  projectData.sort((a, b) => a.index - b.index);
  return projectData;
}
