import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Style/nav.css";

function Navbar() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(() => {
    return localStorage.getItem("token") ? true : false;
  });

  const [dropdownOpen, setDropdownOpen] = useState(false); // Track dropdown state

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen); // Toggle dropdown visibility
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user-email");

    setLoggedIn(false);
    setDropdownOpen(false); // Close dropdown after logout
    navigate("/");
  };

  const letter = localStorage.getItem("user-email");
  const emailInitial = letter?.charAt(0).toUpperCase();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar fixed-top">
      <div className="container-fluid">
        <NavLink to={"/createrecipe"} className="navbar-brand logo">
          🍽️ Foodie
        </NavLink>

        <div className="d-flex align-items-center">
          <NavLink to={"/Search"} className="nav-icon">
            <i className="bi bi-search"></i>
          </NavLink>

          {/* Home Icon */}
          <NavLink to={"/Home"} className="nav-icon">
            <i className="bi bi-house"></i>
          </NavLink>

          {/* Login Button or Profile Dropdown */}
          {!loggedIn ? (
            <NavLink to={"/login"} className="btn login-btn">
              <i className="bi bi-person-circle"></i>{" "}
              <span className="pad">Login</span>
            </NavLink>
          ) : (
            <div className="dropdown">
              {/* Profile Button (Dropdown Toggle) */}
              <a className="btn profile-btn" onClick={toggleDropdown}>
                <span>{emailInitial}</span>
              </a>

              {/* Dropdown Menu (Conditionally Rendered) */}
              {dropdownOpen && (
                <ul className="dropdown-menu dropdown-menu-right show">
                  <li>
                    <NavLink className="dropdown-item" to="/change-password">
                      Change Password
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/about-us">
                      About Us
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/about-us">
                      Wishlist
                    </NavLink>
                  </li>
                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
