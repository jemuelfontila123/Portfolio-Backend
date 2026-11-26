import rows from "./generated/projects.json";

const assets = import.meta.glob("../../assets/*", {
  eager: true,
  query: "?url",
  import: "default",
});

const projects = rows.map((project) => ({
  ...project,
  image:
    assets[`../../assets/${project.image}`] ||
    (/^https?:\/\//i.test(project.image)
      ? project.image
      : undefined),
}));

export default projects;