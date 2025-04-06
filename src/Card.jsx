import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import buger from "./Style/pic/images.jpg";

const Card = ({ recipe, showEdit }) => {
  const navigate = useNavigate();
  const path = window.location.pathname;
  console.log(path, "path");
  if (!recipe) {
    return <p>Loading...</p>; // Handle cases where recipe is undefined
  }

  const emailId = localStorage.getItem("user-email");
  const token = localStorage.getItem("token");

  const handleViewRecipe = async () => {
    if (recipe._id) {
      try {
        await axios.post(
          `https://recipe-server-c7oz.onrender.com/recipe/view/${recipe._id}`,
          { email: emailId }, // Send user email instead of ID
          {
            headers: { Authorization: `Bearer ${token}` }, // Include token for authentication
          }
        );
      } catch (error) {
        console.error("Error updating view count:", error);
      }
    }

    // const handleViewRecipe = async () => {
    //   try {
    //     await axios.post(`http://localhost:8000/recipe/view/${recipe._id}`);
    //   } catch (error) {
    //     console.error("Error updating view count:", error);
    //   }

    navigate(
      path === "/Search" ? `/recipe/${recipe._id}` : `/my-recipe/${recipe._id}`
    );
  };

  console.log("Recipe Image URL:", recipe.imageUrl); // Debugging

  return (
    <div className="card shadow-sm mb-2">
      <img
        src={
          recipe.imageUrl
            ? `https://recipe-server-c7oz.onrender.com${recipe.imageUrl}`
            : buger
        }
        className="card-img-top"
        alt={recipe.title || "Recipe Image"}
        onError={(e) => (e.target.src = buger)} // If image fails to load, use fallback
      />
      <div className="card-body">
        <h5 className="card-title">{recipe.title || "Untitled Recipe"}</h5>
        <p className="card-text">
          {recipe.ingredients?.join(", ") || "No ingredients available"}
        </p>
        {/* <button
          onClick={() =>
            path === "/Search"
              ? navigate(`/recipe/${recipe._id}`)
              : navigate(`/my-recipe/${recipe._id}`)
          }
          className="btn btn-primary btn-sm"
        >
          View Recipe
        </button> */}

        <button onClick={handleViewRecipe} className="btn btn-primary btn-sm">
          View Recipe
        </button>

        {showEdit && (
          <button
            onClick={() => navigate(`/edit/recipe/${recipe._id}`)}
            className="btn btn-danger btn-sm ms-3"
          >
            Edit Recipe
          </button>
        )}
        <div className="position-absolute bottom-0 end-0 p-2 d-flex align-items-center">
          <i className="bi bi-eye fs-4 text-primary"></i>
          <span className="text-primary ms-1">{recipe.viewCount || 0}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
