import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../admin/api.js";

const Contact = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Update form data whenever an input changes.
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setError("");
  };

  // Submit contact form to the backend API.
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading) return;

    setLoading(true);
    setError("");

    try {
      await api.createContact(formData);

      alert("Your message has been sent successfully!");

      navigate("/");
    } catch (error) {
      const fieldErrors = Object.values(
        error.fieldErrors || {}
      );

      setError(
        fieldErrors.length
          ? fieldErrors.join(" ")
          : error.message || "Failed to send message."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container page-section">
      <div className="section-heading">
        <p className="eyebrow">CONTACT</p>
        <h1>Let's Work Together</h1>
        <p>
          Have a question or want to discuss a project?
          Send me a message.
        </p>
      </div>

      <form
        className="contact-form"
        onSubmit={handleSubmit}
      >
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              minLength={2}
              maxLength={50}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              minLength={2}
              maxLength={50}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="contactNumber">
            Contact Number
          </label>

          <input
            id="contactNumber"
            name="contactNumber"
            type="tel"
            placeholder="905-123-4567"
            value={formData.contactNumber}
            onChange={handleChange}
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            title="Enter a phone number in the format 905-123-4567"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            maxLength={254}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows="6"
            value={formData.message}
            onChange={handleChange}
            minLength={10}
            maxLength={2000}
            required
          />
        </div>

        {error && (
          <p
            className="form-error"
            role="alert"
            style={{ color: "red" }}
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </section>
  );
};

export default Contact;