import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";
import AuthLayout from "../auth/AuthLayout";
import FormField from "../auth/FormField";
import SubmitButton from "../auth/SubmitButton";
import { validateEmail, hasErrors, MIN_PASSWORD_LENGTH } from "../auth/validation";

const Register = () => {
  const { register } = useContext(GlobalContext);
  const [form, setForm] = useState({ email: "", password: "", confirmPassword: "" });
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const { email, password, confirmPassword } = form;
    return {
      email: validateEmail(email),
      password: !password
        ? "Password is required"
        : password.length < MIN_PASSWORD_LENGTH
        ? `Password must be at least ${MIN_PASSWORD_LENGTH} characters`
        : undefined,
      confirmPassword: !confirmPassword
        ? "Please confirm your password"
        : confirmPassword !== password
        ? "Passwords do not match"
        : undefined,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side checks for quick feedback; the server validates again
    const errors = validate();
    setFieldErrors(errors);
    if (hasErrors(errors)) return;

    try {
      setLoading(true);
      setError("");
      await register(form.email.trim(), form.password);
      // PublicOnly redirects to "/" once isAuthenticated flips
    } catch (err) {
      setError(err.message); // e.g. "User already exists"
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start tracking your expenses in under a minute."
      error={error}
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Log in
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
          placeholder="Create a password"
          autoComplete="new-password"
          value={form.password}
          onChange={handleChange}
          error={fieldErrors.password}
          hint={`At least ${MIN_PASSWORD_LENGTH} characters`}
        />
        <FormField
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="Confirm password"
          placeholder="Re-enter your password"
          autoComplete="new-password"
          value={form.confirmPassword}
          onChange={handleChange}
          error={fieldErrors.confirmPassword}
        />

        <SubmitButton loading={loading} loadingText="Creating account...">
          Create account
        </SubmitButton>
      </form>
    </AuthLayout>
  );
};

export default Register;
