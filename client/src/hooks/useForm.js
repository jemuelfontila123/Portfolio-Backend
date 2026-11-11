import { useState } from "react";

/**
 * Handles values, field errors, touched state and submission.
 *
 * @param {object} initialValues  starting values for every field
 * @param {function} validate     (values) => ({ field: "message" })
 */
const useForm = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nextValues = { ...values, [name]: value };
    setValues(nextValues);

    // Once a field has been visited, keep its error up to date as the user types.
    if (touched[name]) {
      const fieldError = validate(nextValues)[name];
      setErrors((previous) => ({ ...previous, [name]: fieldError }));
    }
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((previous) => ({ ...previous, [name]: true }));
    setErrors((previous) => ({ ...previous, [name]: validate(values)[name] }));
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setSubmitError("");
  };

  const handleSubmit = (onSubmit) => async (event) => {
    event.preventDefault();

    const validationErrors = validate(values);
    setErrors(validationErrors);
    setTouched(Object.fromEntries(Object.keys(values).map((key) => [key, true])));
    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      await onSubmit(values, reset);
    } catch (error) {
      setSubmitError(error.message);
      if (error.fieldErrors) {
        setErrors((previous) => ({ ...previous, ...error.fieldErrors }));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    values,
    errors,
    submitError,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
  };
};

export default useForm;
