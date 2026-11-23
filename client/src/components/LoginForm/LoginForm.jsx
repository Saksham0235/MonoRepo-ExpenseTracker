import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";
import AuthLayout from "../auth/AuthLayout";
import FormField from "../auth/FormField";
import SubmitButton from "../auth/SubmitButton";
import { validateEmail, hasErrors } from "../auth/validation";

const Login = () => {
  const { login } = useContext(GlobalContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {
      email: validateEmail(form.email),
      password: form.password ? undefined : "Password is required",
    };
    setFieldErrors(errors);
    if (hasErrors(errors)) return;

    try {
      setLoading(true);
      setError("");
      await login(form.email.trim(), form.password);
      // PublicOnly redirects to "/" once isAuthenticated flips
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to keep tracking your expenses."
      error={error}
      footer={
        <>
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Create one
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <FormField
          id="email"
          name="email"
          type="email"
          label="Email"
          placeholder="you@example.com"
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
          error={fieldErrors.email}
        />
        <FormField
          id="password"
          name="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          autoComplete="current-password"
          value={form.password}
          onChange={handleChange}
          error={fieldErrors.password}
        />

        <SubmitButton loading={loading} loadingText="Logging in...">
          Log in
        </SubmitButton>
      </form>
    </AuthLayout>
  );
};

export default Login;
