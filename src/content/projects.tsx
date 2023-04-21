export interface Project {
  name: string,
  images: Array<string>,
  description?: string,
  altNames?: Array<string>
}

const projects: Project[] = [
  {
    name: "The Importance of Touch",
    images: [
      "/main-image.jpeg"
    ],
    altNames: [
      "test project"
    ]
  }
]

export default projects;
