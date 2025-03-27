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
        "https://recipe-server-1-68ju.onrender.com/loginapi",
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
    <div className="background ">
      <div className="Border">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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
              <i className="bi bi-lock"></i>
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
            <br />
          </div>
          <div className="none">
            {error && <div className="error">{error}</div>}
            <NavLink to="/Home">
              {" "}
              <button
                type="submit"
                className="mb-4"
                onClick={handleSubmit}
                style={{ borderRadius: "20px" }}
              >
                Login
              </button>
            </NavLink>
          </div>
        </form>
        <p className="pl-5 pb-2">
          Not Registered Yet?<a href="/Register">Create Account</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
