import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Createrecipe() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !title ||
      !ingredients ||
      !steps ||
      !cookingTime ||
      !difficulty ||
      !image
    ) {
      setError("All fields are required.");
      return;
    }
    const emailId = localStorage.getItem("user-email");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("ingredients", ingredients);
    formData.append("steps", steps);
    formData.append("cookingTime", cookingTime);
    formData.append("difficulty", difficulty);
    formData.append("image", image);
    formData.append("emailId", emailId);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://recipe-server-1-68ju.onrender.com/recipe/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        navigate("/home");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Recipe creation failed.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-2">
        <h2 className="mb-4 text-center">Create Recipe</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title:
            </label>
            <input
              type="text"
              id="title"
              className="form-control"
              placeholder="Enter recipe title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="ingredients" className="form-label">
              Ingredients:
            </label>
            <textarea
              id="ingredients"
              className="form-control"
              placeholder="Enter ingredients (comma separated)"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            ></textarea>
          </div>

          <div className="mb-3">
            <label htmlFor="steps" className="form-label">
              Step-by-step:
            </label>
            <textarea
              className="form-control"
              id="steps"
              rows="5"
              placeholder="Describe the steps"
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
            ></textarea>
          </div>

          <div className="mb-3">
            <label htmlFor="cookingTime" className="form-label">
              Cooking Time (minutes):
            </label>
            <input
              type="number"
              id="cookingTime"
              className="form-control w-auto"
              value={cookingTime}
              onChange={(e) => setCookingTime(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Difficulty Level:</label>
            <div className="form-check">
              <input
                type="radio"
                id="low"
                name="difficulty"
                value="low"
                className="form-check-input"
                checked={difficulty === "low"}
                onChange={(e) => setDifficulty(e.target.value)}
              />
              <label htmlFor="low" className="form-check-label">
                Low
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                id="medium"
                name="difficulty"
                value="medium"
                className="form-check-input"
                checked={difficulty === "medium"}
                onChange={(e) => setDifficulty(e.target.value)}
              />
              <label htmlFor="medium" className="form-check-label">
                Medium
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                id="high"
                name="difficulty"
                value="high"
                className="form-check-input"
                checked={difficulty === "high"}
                onChange={(e) => setDifficulty(e.target.value)}
              />
              <label htmlFor="high" className="form-check-label">
                High
              </label>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="imageUpload" className="form-label">
              Image Upload:
            </label>
            <input
              type="file"
              id="imageUpload"
              className="form-control"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          {error && <div className="error text-danger">{error}</div>}

          <div className="d-flex justify-content-center mt-4 mb-5">
            <button type="submit" className="btn btn-primary btn-lg">
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Createrecipe;
