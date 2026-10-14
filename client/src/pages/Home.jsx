import "../App.css";
import { Link } from "react-router-dom";
import home from "../data/home";

const Home = () => {
  return (
    <section className="hero container">
      <div className="hero-content">
        <p className="eyebrow">{home.role}</p>

        <h1>
          Hi, I'm <span>{home.name}</span>
        </h1>

        <p className="hero-description">
          {home.description}
        </p>

        <div className="hero-actions">
          <Link to="/about" className="btn btn-primary">
            About Me
          </Link>

          <Link to="/projects" className="btn btn-secondary">
            View Projects
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;