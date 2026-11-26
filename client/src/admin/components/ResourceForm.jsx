
import { useEffect, useState } from "react";

const empty = {
  title: "",
  completionDate: "",
  description: "",
  image: "",
  role: "",
  outcome: "",
  year: "",
  school: "",
  credential: "",
  displayOrder: 999,
};

const projectFields = [
  ["image", "Image filename or URL"],
  ["role", "Role"],
  ["outcome", "Outcome"],
];

const qualificationFields = [
  ["year", "Year / period"],
  ["school", "School"],
  ["credential", "Credential"],
];

// Shared form for creating and updating resources.
export default function ResourceForm({
  label,
  initial,
  onSubmit,
  onCancel,
  submitting,
}) {
  const [values, setValues] = useState({ ...empty });
  const [error, setError] = useState("");

  const isProject = label === "Project";

  const fields = isProject
    ? projectFields
    : qualificationFields;

  useEffect(() => {
    if (initial) {
      setValues({
        ...empty,
        ...Object.fromEntries(
          Object.keys(empty).map((key) => [
            key,
            initial[key] ?? empty[key],
          ])
        ),
        completionDate: initial.completionDate
          ? initial.completionDate.slice(0, 10)
          : "",
      });
    } else {
      setValues({ ...empty });
    }

    setError("");
  }, [initial, label]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!values.title.trim()) {
      setError(
        isProject
          ? "Title is required."
          : "Program is required."
      );

      return;
    }

    const body = {
      title: values.title.trim(),
      completionDate: values.completionDate || null,
      description: values.description.trim(),
      displayOrder: values.displayOrder ?? 999,

      ...Object.fromEntries(
        fields.map(([name]) => [
          name,
          values[name].trim(),
        ])
      ),
    };

    const success = await onSubmit(body);

    if (success && !initial) {
      setValues({ ...empty });
      setError("");
    }
  };

  return (
    <form
      className="contact-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="title">
            {isProject ? "Title" : "Program"}
          </label>

          <input
            id="title"
            name="title"
            value={values.title}
            onChange={handleChange}
            className={error ? "invalid" : ""}
            required
          />

          {error && (
            <p className="field-error" role="alert">
              {error}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="completionDate">
            Completion Date
          </label>

          <input
            id="completionDate"
            name="completionDate"
            type="date"
            value={values.completionDate}
            onChange={handleChange}
          />
        </div>
      </div>

      {fields.map(([name, caption]) => (
        <div className="form-group" key={name}>
          <label htmlFor={name}>
            {caption}
          </label>

          <input
            id={name}
            name={name}
            value={values[name]}
            onChange={handleChange}
          />
        </div>
      ))}

      <div className="form-group">
        <label htmlFor="description">
          Description
        </label>

        <textarea
          id="description"
          name="description"
          rows="4"
          value={values.description}
          onChange={handleChange}
        />
      </div>

      <div className="hero-actions">
        <button
          className="btn btn-primary"
          type="submit"
          disabled={submitting}
        >
          {submitting
            ? "Saving..."
            : initial
              ? "Update"
              : "Add"}
        </button>

        {initial && (
          <button
            className="btn btn-secondary"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
