import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import buger from "./Style/pic/images.jpg";

function RecipeEdit() {
  const { id } = useParams(); // Get recipe ID from URL
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState({
    title: "",
    ingredients: "",
    steps: "",
    cookingTime: "",
    difficulty: "low",
    image: null,
    imageUrl: "",
  });

  const [error, setError] = useState("");

  // Fetch existing recipe data
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`https://recipe-server-c7oz.onrender.com/recipe/${id}`);
        if (response.status === 200) {
          const data = response.data;
          setRecipe({
            title: data.title,
            ingredients: data.ingredients.join(", "),
            steps: data.steps,
            cookingTime: data.cookingTime,
            difficulty: data.difficulty,
            imageUrl: data.imageUrl,
          });
        }
      } catch (err) {
        console.error("Error fetching recipe:", err);
        setError("Recipe not found.");
      }
    };

    fetchRecipe();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  // Handle image upload
  // const handleImageChange = (e) => {
  //   if (e.target.files.length > 0) {
  //     setRecipe({ ...recipe, image: e.target.files[0] });
  //   }
  // };

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];

      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        image: file,
        imageUrl: URL.createObjectURL(file), // Temporary preview
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to update a recipe.");
      return;
    }

    const formData = new FormData();
    formData.append("title", recipe.title);
    formData.append("ingredients", recipe.ingredients);
    formData.append("steps", recipe.steps);
    formData.append("cookingTime", recipe.cookingTime);
    formData.append("difficulty", recipe.difficulty);
    if (recipe.image) {
      formData.append("image", recipe.image);
    }

    try {
      const response = await axios.put(
        `https://recipe-server-c7oz.onrender.com/recipe/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        navigate("/home"); // Redirect after update
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update recipe.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h2 className="mb-4 text-center">Edit Recipe</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title:</label>
            <input
              type={recipe.title}
              name="title"
              className="form-control"
              value={recipe.title}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Ingredients:</label>
            <textarea
              name="ingredients"
              className="form-control"
              value={recipe.ingredients}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Steps:</label>
            <textarea
              name="steps"
              className="form-control"
              value={recipe.steps}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Cooking Time:</label>
            <input
              type="text"
              name="cookingTime"
              className="form-control"
              value={recipe.cookingTime}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Difficulty:</label>
            <select
              name="difficulty"
              className="form-control"
              value={recipe.difficulty}
              onChange={handleChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Upload Image:</label>
            <input
              type="file"
              className="form-control"
              onChange={handleImageChange}
            />
            (
            <img
              src={
                recipe.imageUrl
                  ? `https://recipe-server-c7oz.onrender.com${recipe.imageUrl}`
                  : buger
              }
              alt="Recipe"
              className="img-fluid rounded mt-3"
              style={{ maxHeight: "200px", objectFit: "cover" }}
            />
            )
          </div>

          <button type="submit" className="btn btn-success w-100">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default RecipeEdit;
