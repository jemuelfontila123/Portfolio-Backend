import { useEffect, useState } from "react";

const empty = { title: "", completionDate: "", description: "", image: "", role: "", outcome: "", year: "", school: "", credential: "", displayOrder: 999 };

// Used for both create (POST) and edit (PATCH)
export default function ResourceForm({ label, initial, onSubmit, onCancel, submitting }) {
  const [values, setValues] = useState(empty);
  const [error, setError] = useState("");

  useEffect(() => {
    setValues(
      initial
        ? {
            ...empty,
            ...Object.fromEntries(["image", "role", "outcome", "year", "school", "credential", "displayOrder"].map(key => [key, initial[key] ?? empty[key]])),
            title: initial.title || "",
            completionDate: initial.completionDate
              ? initial.completionDate.slice(0, 10)
              : "",
            description: initial.description || "",
          }
        : empty
    );
    setError("");
  }, [initial, label]);

  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.title.trim()) {
      setError("Title is required.");
      return;
    }
    const keys = label === "Project" ? ["image", "role", "outcome"] : ["year", "school", "credential"];
    const body = Object.fromEntries(["title", "completionDate", "description", "displayOrder", ...keys].map(key => [key, values[key]]));
    body.displayOrder = values.displayOrder === "" ? 999 : Number(values.displayOrder);
    if (!body.completionDate) body.completionDate = null;
    onSubmit(body);
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="title">{label === "Qualification" ? "Program" : "Title"}</label>
          <input
            id="title"
            name="title"
            value={values.title}
            onChange={handleChange}
            className={error ? "invalid" : ""}
          />
          {error && <p className="field-error">{error}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="completionDate">Completion Date</label>
          <input
            id="completionDate"
            name="completionDate"
            type="date"
            value={values.completionDate}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="4"
          value={values.description}
          onChange={handleChange}
        />
      </div>

      {(label === "Project" ? [["image", "Image filename or URL"], ["role", "Role"], ["outcome", "Outcome"]] : [["year", "Year / period"], ["school", "School"], ["credential", "Credential"]]).map(([name, caption]) => (
        <div className="form-group" key={name}>
          <label htmlFor={name}>{caption}</label>
          <input id={name} name={name} value={values[name]} onChange={handleChange} />
        </div>
      ))}
      <div className="form-group">
        <label htmlFor="displayOrder">Display order (lowest first)</label>
        <input id="displayOrder" name="displayOrder" type="number" min="0" value={values.displayOrder} onChange={handleChange} />
      </div>
      <div className="hero-actions">
        <button className="btn btn-primary" type="submit" disabled={submitting}>
          {submitting ? "Saving..." : initial ? "Update" : "Add"}
        </button>
        {initial && (
          <button className="btn btn-secondary" type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
