import React, { useState } from "react";
import {  GlobalContext } from "../../context/GlobalState"
import {  useContext } from 'react';

const Login = ({ onSubmit }) => {
  const { login } = useContext(GlobalContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Enter Email and Password");
      return;
    }
    // localStorage.setItem("isLoggedIn", "true");
    // onSubmit()

    try {
      setLoading(true);
      setError("");

      await login(email, password);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h2>Expense Tracker Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your Email"
          type="email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your Password"
          type="password"
        />
        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <button type="button" onClick={() => (window.location.href = "/register")}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Login;
