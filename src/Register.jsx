import React, { useState } from "react";
import axios from "axios";
import "./Style/login.css";
import { NavLink, useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        "https://recipe-server-c7oz.onrender.com/signup",
        {
          name,
          email,
          password,
          confirmPassword,
        }
      );

      if (response.status === 200) {
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Try again.");
    }
  };

  return (
    <div className="background d-flex justify-content-center align-items-center">
      <div className="form-box p-4 shadow bg-white  Border1">
        <h2 className="text-center mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-2 position-relative">
            <label htmlFor="email">Name:</label>
            <i className="bi bi-person position-absolute input-icon" />
            <input
              type="text"
              className="form-control ps-5"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3 position-relative">
            <label htmlFor="email">Email:</label>
            <i className="bi bi-envelope position-absolute input-icon" />
            <input
              type="email"
              className="form-control ps-5"
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

          <div className="form-group mb-3 position-relative">
            <label htmlFor="password">Conform Password:</label>
            <i className="bi bi-lock position-absolute input-icon" />
            <input
              type="password"
              className="form-control ps-5"
              placeholder="Confirm your password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="text-danger mb-3">{error}</div>}
          <button
            type="submit"
            className="btn btn-success w-100 mb-3 rounded-pill"
          >
            Register
          </button>
          <p className="text-center">
            Already have an account? <NavLink to="/login">Login</NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}
export default Register;
