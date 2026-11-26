import { Link, useNavigate } from "react-router-dom";
import FormField from "../components/FormField";
import useForm from "../hooks/useForm";
import { api } from "../api";
import { validateSignUp } from "../utils/validators";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const navigate = useNavigate();

  const {
    values,
    errors,
    submitError,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm(initialValues, validateSignUp);

  // The backend should hash `password` into `passwordHash` and set the default role
  const onSubmit = async ({ name, email, password }) => {
    await api.signUp({ name: name.trim(), email: email.trim(), password });
    navigate("/signin");
  };

  return (
    <section className="container page-section">
      <div className="section-heading">
        <p className="eyebrow">SIGN UP</p>
        <h1>Create Your Account</h1>
        <p>Register to manage your qualifications and projects.</p>
      </div>

      <form className="contact-form auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormField
          label="Full Name"
          name="name"
          type="text"
          autoComplete="name"
          value={values.name}
          error={errors.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <FormField
          label="Email Address"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          error={errors.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <FormField
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
          value={values.password}
          error={errors.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <FormField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          value={values.confirmPassword}
          error={errors.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        {submitError && (
          <p className="form-error" role="alert">
            {submitError}
          </p>
        )}

        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Create Account"}
        </button>

        <p className="form-footer">
          Already have an account? <Link to="/signin">Sign in</Link>
        </p>
      </form>
    </section>
  );
};

export default SignUp;
