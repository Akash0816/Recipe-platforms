// import { NavLink } from "react-router-dom";
// import { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

// function Navbar() {
//   const [loggedIn, setLoggedIn] = useState(() => {
//     return localStorage.getItem("token") ? true : false;
//   });

//   const [dropdownOpen, setDropdownOpen] = useState(false); // Track dropdown state

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen); // Toggle dropdown visibility
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token"); // Remove token
//     setLoggedIn(false);
//     setDropdownOpen(false); // Close dropdown after logout
//   };


//   const letter = localStorage.

//   return (
//     <div className="nav23">
//       <nav>
//         <ul className="zero">
//           <NavLink to={"/createrecipe"} className="navbar-brand logo">
//             🍽️ Foodie
//           </NavLink>
//           {/* <li><a href="">Customer Support</a></li> */}
//           <div className="Body">
//             {/* <!-- Add to Cart Icon --> */}
//             <a href="">
//               <NavLink to={"/Search"}>
//                 <i
//                   className="bi bi-search"
//                   style={{ fontSize: "22px", color: "white" }}
//                 ></i>
//               </NavLink>
//             </a>

//             {/* <!-- Wishlist Icon --> */}
//             <a href="#">
//               <i
//                 className="bi bi-house change"
//                 style={{ fontSize: "22px", color: "white", marginTop: "2px" }}
//               ></i>
//             </a>

//             {/* <!-- Login Button with Profile Icon --> */}
//             {!loggedIn ? (
//               <a className="btn btn-primary d-flex align-items-center login-btn ">
//                 <i
//                   className="bi bi-person-circle"
//                   style={{ fontSize: "24px", marginRight: "8px" }}
//                 ></i>

//                 <NavLink to={"/login"}>Login</NavLink>
//               </a>
//             ) : (
//               <div className="dropdown">
//                 {/* Profile Button (Dropdown Toggle) */}
//                 <a
//                   className=" profile-btn"
                  
//                   onClick={toggleDropdown} // Handle click to toggle dropdown
//                 >
//                   <i className="bi bi-person-circle"></i>
//                 </a>

//                 {/* Dropdown Menu (Conditionally Rendered) */}
//                 {dropdownOpen && (
//                   <ul className="dropdown-menu dropdown-menu-end ">
//                     <li>
//                       <NavLink className="dropdown-item" to="/change-password">
//                         Change Password
//                       </NavLink>
//                     </li>
//                     <li>
//                       <NavLink className="dropdown-item" to="/about-us">
//                         About Us
//                       </NavLink>
//                     </li>
//                     <li>
//                       <button
//                         className="dropdown-item text-danger"
//                         onClick={handleLogout}
//                       >
//                         Logout
//                       </button>
//                     </li>
//                   </ul>
//                 )}
//               </div>
//             )}
//           </div>
//         </ul>
//       </nav>
//     </div>
//   );
// }

// export default Navbar;
