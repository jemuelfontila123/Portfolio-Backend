import education from "../data/education";

const Education = () => {
  return (
    <section className="container page-section">
      <div className="section-heading">
        <p className="eyebrow">BACKGROUND</p>
        <h1>Education</h1>
      </div>
    {/* Pull the Data from Education.js */}
      <div className="timeline">
        {education.map((item) => (
          <div className="timeline-item" key={item.id}>
            <span>{item.year}</span>
            <h2>{item.program}</h2>
            <p>{item.school}</p>
            <p>{item.credential}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Education;