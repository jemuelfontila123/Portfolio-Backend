const ProjectCard = ({ project }) => {
  return (
    <article className="project-card">
      <img src={project.image} alt={project.title} />

      <div className="project-content">
        <h2>{project.title}</h2>

        <p>{project.description}</p>

        <p>
          <strong>Role:</strong> {project.role}
        </p>

        <p>
          <strong>Outcome:</strong> {project.outcome}
        </p>
      </div>
    </article>
  );
}

export default ProjectCard;