import services from "../data/services";

const Services = () => {
  return (
    <section className="container page-section">
      <div className="section-heading">
        <p className="eyebrow">WHAT I DO</p>
        <h1>Services</h1>
      </div>
     {/* Pull the Data from  Services.js */}
      <div className="service-grid">
        {services.map((service) => (
          <article className="service-card" key={service.title}>
            <h2>{service.title}</h2>
            <p>{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Services;