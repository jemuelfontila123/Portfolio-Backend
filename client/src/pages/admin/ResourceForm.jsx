import { useEffect, useState } from "react";

const empty = { title: "", completionDate: "", description: "" };

// Used for both create (POST) and edit (PATCH)
export default function ResourceForm({ initial, onSubmit, onCancel, submitting }) {
  const [values, setValues] = useState(empty);
  const [error, setError] = useState("");

  useEffect(() => {
    setValues(
      initial
        ? {
            title: initial.title || "",
            completionDate: initial.completionDate
              ? initial.completionDate.slice(0, 10)
              : "",
            description: initial.description || "",
          }
        : empty
    );
    setError("");
  }, [initial]);

  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.title.trim()) {
      setError("Title is required.");
      return;
    }
    const body = { ...values };
    if (!body.completionDate) delete body.completionDate;
    onSubmit(body);
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="title">Title</label>
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
