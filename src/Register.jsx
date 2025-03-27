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
    <div class="background">
      <div className="Border1">
        <h2 className="head2">Register</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Name:</label>
          <br />
          <div className="input-wrapper">
            <span className="input-icon pt-3">
              <i className="bi bi-person"></i>
            </span>
            <input
              type="email"
              name="email"
              required
              onChange={(e) => setName(e.target.value)}
              className="password-input"
              placeholder="Enter your Name"
            />
            <br />
          </div>

          <label htmlFor="email">Email:</label>
          <br />
          <div className="input-wrapper">
            <span className="input-icon pt-3">
              <i className="bi bi-envelope"></i>
            </span>
            <input
              type="email"
              name="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="password-input"
              placeholder="Enter your email"
            />
            <br />
          </div>

          <label htmlFor="password">Password:</label>
          <br />
          <div className="input-wrapper">
            <span className="input-icon">
              <i className="bi bi-lock mt-2"></i>
            </span>
            <input
              type="password"
              name="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              className="password-input"
              placeholder="Enter your password"
            />
            <br />
          </div>

          <label htmlFor="password">Conform Password:</label>
          <br />
          <div className="input-wrapper">
            <span className="input-icon">
              <i className="bi bi-lock"></i>
            </span>
            <input
              type="password"
              name="conformpassword"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="password-input"
              placeholder="Enter your conform password"
            />
            <br />
            <br />
          </div>

          <div className="none">
            {error && <div className="error">{error}</div>}
            <NavLink to="/Home">
              {" "}
              <button
                type="submit"
                className="mb-5"
                onClick={handleSubmit}
                style={{ borderRadius: "20px" }}
              >
                Register
              </button>
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
