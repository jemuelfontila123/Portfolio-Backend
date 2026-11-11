const FormField = ({ label, name, error, as: Component = "input", ...props }) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <Component
      id={name}
      name={name}
      className={error ? "invalid" : undefined}
      aria-invalid={Boolean(error)}
      aria-describedby={error ? `${name}-error` : undefined}
      {...props}
    />
    {error && (
      <p id={`${name}-error`} className="field-error" role="alert">
        {error}
      </p>
    )}
  </div>
);

export default FormField;
