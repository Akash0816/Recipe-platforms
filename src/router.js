import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./Login";
import Createrecipe from "./Createrecipe";
import Search from "./Search";
import Home from "./Home";
import Card from "./Card";
import Register from "./Register";
import Viewrecipe from "./Viewrecipe";
import EditRecipe from "./EditRecipe";

function RouterComponent() {
  return (
    <Router>
      <Routes>
        <Route path="/Recipe-platforms" element={<App />} />{" "}
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/createrecipe" element={<Createrecipe />} />
        <Route path="/search" element={<Search />} />
        <Route path="/card" element={<Card />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recipe/:id" element={<Viewrecipe />} />
        <Route path="/my-recipe/:id" element={<Viewrecipe />} />
        <Route path="/edit/recipe/:id" element={<EditRecipe />} />
      </Routes>
    </Router>
  );
}

export default RouterComponent;
