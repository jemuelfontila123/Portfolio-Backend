import { Link, useNavigate } from "react-router-dom";
import FormField from "../components/FormField";
import useForm from "../hooks/useForm";
import { api, saveSession, clearAuth } from "../api";
import { validateSignIn } from "../utils/validators";

const initialValues = {
  email: "",
  password: "",
};

const SignIn = () => {
  const navigate = useNavigate();

  const {
    values,
    errors,
    submitError,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm(initialValues, validateSignIn);

const onSubmit = async ({ email, password }) => {
  const response = await api.signIn({ email: email.trim(), password });
  if (response.data?.role !== "admin") {
    clearAuth();
    throw new Error("This area is restricted to administrators.");
  }
  saveSession(response);

  // Go back to the page they were sent from, if any
  navigate("/admin/dashboard", { replace: true });
};

  return (
    <section className="container page-section">
      <div className="section-heading">
        <p className="eyebrow">SIGN IN</p>
        <h1>Welcome Back</h1>
        <p>Sign in to manage your qualifications and projects.</p>
      </div>

      <form className="contact-form auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
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
          autoComplete="current-password"
          value={values.password}
          error={errors.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        {submitError && (
          <p className="form-error" role="alert">
            {submitError}
          </p>
        )}

        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Sign In"}
        </button>

        <p className="form-footer">
          <Link to="/">Return to portfolio</Link>
        </p>
      </form>
    </section>
  );
};

export default SignIn;
