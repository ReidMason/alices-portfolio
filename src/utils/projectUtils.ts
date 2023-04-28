export const getProjectSlug = (projectName: string) => {
  return decodeURI(projectName).toLowerCase().replaceAll(" ", "-");
}
