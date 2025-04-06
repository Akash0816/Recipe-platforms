import React, { useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import "./Style/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await axios.post(
        "https://recipe-server-c7oz.onrender.com/loginapi",
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token); // Store JWT
        localStorage.setItem("user-email", response.data.email); // Store email

        navigate("/home");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    }
  };
  return (
    <div className="background d-flex justify-content-center align-items-center">
      <div className="form-box p-4 shadow bg-white rounded">
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3 position-relative">
            <label htmlFor="email">Email</label>
            <i className="bi bi-envelope position-absolute input-icon" />

            <input
              type="email"
              className="form-control ps-5 bucky"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3 position-relative">
            <label htmlFor="password">Password:</label>
            <i className="bi bi-lock position-absolute input-icon" />
            <input
              type="password"
              className="form-control ps-5"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="text-danger mb-3">{error}</div>}
          <button
            type="submit"
            className="btn btn-success w-100 mb-3 rounded-pill"
          >
            Login
          </button>
          <p className="text-center">
            Not Registered Yet? <NavLink to="/Register">Create Account</NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
