import App from "./App";
// import { createBrowserRouter } from "react-router-dom";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Createrecipe from "./Createrecipe";
import Search from "./Search";
import Home from "./Home";
import Card from "./Card";
import Register from "./Register";
import Viewrecipe from "./Viewrecipe";
import EditRecipe from "./EditRecipe";

const router = HashRouter([
  { path: "/", element: <App /> },
  { path: "/login", element: <Login /> },
  { path: "/createrecipe", element: <Createrecipe /> },
  { path: "/Search", element: <Search /> },
  { path: "/Home", element: <Home /> },
  { path: "/card", element: <Card /> },
  { path: "/Register", element: <Register /> },
  { path: "/recipe/:id", element: <Viewrecipe /> },
  { path: "/my-recipe/:id", element: <Viewrecipe /> },
  { path: "edit/recipe/:id", element: <EditRecipe /> },
]);
export default router;
