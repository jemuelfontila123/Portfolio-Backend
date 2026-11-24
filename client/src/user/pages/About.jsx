import about from "../data/about";

const About = () => {
  return (
    <section className="container page-section">
      <div className="section-heading">
        <p className="eyebrow">ABOUT</p>
        <h1>About Me</h1>
      </div>

      <div className="about-grid">
        <img
          src={about.image}
          alt="Profile"
          className="profile-image"
        />

        <div>
          <h2>{about.name}</h2>
          <p>{about.biography}</p>
          <a
            href={about.resume}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
          >
            View Résumé
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;