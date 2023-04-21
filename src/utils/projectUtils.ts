export const getProjectSlug = (projectName: string) => {
  return projectName.toLowerCase().replaceAll(" ", "-");
}
