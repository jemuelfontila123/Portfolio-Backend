import { useEffect, useState } from "react";

const empty = {
  firstName: "",
  lastName: "",
  contactNumber: "",
  email: "",
  message: "",
};

// Simple checks that mirror the Contact model
const validate = (v) => {
  const errors = {};
  if (v.firstName.trim().length < 2) errors.firstName = "First name must be at least 2 characters.";
  if (v.lastName.trim().length < 2) errors.lastName = "Last name must be at least 2 characters.";
  if (!/^(?:\+?1[\s.-]?)?(?:\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}$/.test(v.contactNumber.trim()))
    errors.contactNumber = "Enter a valid North American phone number.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) errors.email = "Enter a valid email address.";
  if (v.message.trim().length < 10) errors.message = "Message must be at least 10 characters.";
  return errors;
};

// Used for both create (POST) and edit (PATCH)
export default function ContactForm({ initial, onSubmit, onCancel, submitting }) {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setValues(
      initial
        ? {
            firstName: initial.firstName || "",
            lastName: initial.lastName || "",
            contactNumber: initial.contactNumber || "",
            email: initial.email || "",
            message: initial.message || "",
          }
        : empty
    );
    setErrors({});
  }, [initial]);

  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length === 0) onSubmit(values);
  };

  const field = (name, label, type = "text") => (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={values[name]}
        onChange={handleChange}
        className={errors[name] ? "invalid" : ""}
      />
      {errors[name] && <p className="field-error">{errors[name]}</p>}
    </div>
  );

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        {field("firstName", "First Name")}
        {field("lastName", "Last Name")}
      </div>

      <div className="form-row">
        {field("contactNumber", "Contact Number")}
        {field("email", "Email", "email")}
      </div>

      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows="4"
          value={values.message}
          onChange={handleChange}
          className={errors.message ? "invalid" : ""}
        />
        {errors.message && <p className="field-error">{errors.message}</p>}
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
