// Patterns copied from the Mongoose models so client and server agree.
const NAME_PATTERN = /^[\p{L}][\p{L}\p{M}' -]*$/u;
const PHONE_PATTERN = /^(?:\+?1[\s.-]?)?(?:\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateName = (value, label) => {
  const name = value.trim();
  if (!name) return `${label} is required`;
  if (name.length < 2) return `${label} must be at least 2 characters`;
  if (name.length > 50) return `${label} cannot exceed 50 characters`;
  if (!NAME_PATTERN.test(name)) return `${label} contains invalid characters`;
  return "";
};

const validateEmail = (value) => {
  const email = value.trim();
  if (!email) return "Email address is required";
  if (email.length > 254) return "Email address is too long";
  if (!EMAIL_PATTERN.test(email)) return "Enter a valid email address";
  return "";
};

const validatePhone = (value) => {
  const phone = value.trim();
  if (!phone) return "Contact number is required";
  if (!PHONE_PATTERN.test(phone)) return "Enter a valid North American phone number";
  return "";
};

const validatePassword = (value) => {
  if (!value) return "Password is required";
  if (value.length < 8) return "Password must be at least 8 characters";
  if (!/[a-z]/.test(value) || !/[A-Z]/.test(value) || !/\d/.test(value)) {
    return "Use uppercase, lowercase and a number";
  }
  return "";
};

// Remove empty-string results so the form only holds real errors.
const compact = (errors) =>
  Object.fromEntries(Object.entries(errors).filter(([, message]) => message));

export const validateContact = (values) =>
  compact({
    firstName: validateName(values.firstName, "First name"),
    lastName: validateName(values.lastName, "Last name"),
    contactNumber: validatePhone(values.contactNumber),
    email: validateEmail(values.email),
    message: (() => {
      const message = values.message.trim();
      if (!message) return "Message is required";
      if (message.length < 10) return "Message must be at least 10 characters";
      if (message.length > 2000) return "Message cannot exceed 2000 characters";
      return "";
    })(),
  });

export const validateSignUp = (values) =>
  compact({
    name: values.name.trim() ? "" : "Name is required",
    email: validateEmail(values.email),
    password: validatePassword(values.password),
    confirmPassword:
      values.confirmPassword === values.password ? "" : "Passwords do not match",
  });

export const validateSignIn = (values) =>
  compact({
    email: validateEmail(values.email),
    password: values.password ? "" : "Password is required",
  });

// Shared by qualifications and projects (same schema shape).
export const validateEntry = (values) =>
  compact({
    title: values.title.trim() ? "" : "Title is required",
    completionDate:
      values.completionDate && Number.isNaN(Date.parse(values.completionDate))
        ? "Enter a valid date"
        : "",
    description:
      values.description.length > 1000 ? "Description cannot exceed 1000 characters" : "",
  });
