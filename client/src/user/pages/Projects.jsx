import ProjectCard from "../components/ProjectCard";
import projects from "../data/projects";

const Projects = () => {
  return (
    <section className="container page-section">
      <div className="section-heading">
        <p className="eyebrow">WORK</p>
        <h1>Projects</h1>
        <p>A selection of projects I have worked on.</p>
      </div>
     {/* Pull the Data from Project.js */}
      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
          />
        ))}
      </div>
    </section>
  );
}

export default Projects;