import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import buger from "./Style/pic/images.jpg";
import { myRecipeView } from "./store/recipe/selector";
import { useSelector } from "react-redux";
import "./Style/Land.css"

function RecipeView() {
  const { id } = useParams(); // Get recipe ID from URL
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const myRecipesView = useSelector(myRecipeView) || [];

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const fetchRecipe = async () => {
    try {
      const response = await fetch(`https://recipe-server-c7oz.onrender.com/recipe/${id}`);
      const data = await response.json();
      setRecipe(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching recipe:", error);
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-5">Loading recipe...</p>;
  if (!recipe) return <p className="text-center mt-5">Recipe not found.</p>;

  return (
    <div>
      <Navbar />
      <div className="container poi1">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-lg rounded-lg">
              {/*  Recipe Image at the Top */}
              <img
                src={recipe.imageUrl ? `https://recipe-server-c7oz.onrender.com${recipe.imageUrl}` : buger}
                alt={recipe.title}
                className="card-img-top croseee"
                
                onError={(e) => (e.target.src = buger)}
              />
              <div className="card-body">
                {/*  Recipe Title */}
                <h2 className="display-4 font-weight-bold text-center mb-4 text-primary">
                  {recipe.title}
                </h2>

                {/*  Ingredients Section */}
                <h4 className="font-weight-bold mb-3">Ingredients:</h4>
                <ul className="list-group mb-4">
                  {recipe.ingredients && recipe.ingredients.length > 0 ? (
                    recipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="list-group-item">
                        {ingredient}
                      </li>
                    ))
                  ) : (
                    <li className="list-group-item">
                      No ingredients available.
                    </li>
                  )}
                </ul>

                {/*  Cooking Instructions Section */}
                <h4 className="font-weight-bold mb-3">Steps:</h4>
                <p>{recipe.steps || "No instructions provided."}</p>

                {/*  Recipe Details Section */}
                <div className="row mb-4">
                  <div className="col-md-6">
                    <p className="font-weight-bold">
                      <strong>Cooking Time:</strong>{" "}
                      {recipe.cookingTime || "Unknown"} hrs
                    </p>
                  </div>
                  <div className="col-md-6 text-md-end">
                    <p className="font-weight-bold">
                      <strong>Difficulty:</strong>
                      <span className="badge bg-success">
                        {recipe.difficulty || "Easy"}
                      </span>
                    </p>
                  </div>
                </div>

                {/*  Action Buttons */}
                <div className="d-flex justify-content-between mt-4">
                  <button className="btn btn-primary btn-lg">
                    Save Recipe
                  </button>
                  <button className="btn btn-danger btn-lg">
                    Delete Recipe
                  </button>
                </div>
              </div>{" "}
              {/* End of card-body */}
            </div>{" "}
            {/* End of card */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeView;
