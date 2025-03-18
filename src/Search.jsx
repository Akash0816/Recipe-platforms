import React, { useState, useEffect, useCallback } from "react";
import Navbar from "./Navbar";
import Card from "./Card";
import "./Style/login.css";

function Search() {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Debounced search function to prevent excessive API calls
  const fetchRecipes = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8000/all?title=${searchQuery}`);
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  }, [searchQuery]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchRecipes();
    }, 500); // Waits 500ms before making an API call

    return () => clearTimeout(delayDebounceFn); // Cleanup timeout on each render
  }, [fetchRecipes]);

  return (
    <div>
      <Navbar />

      <div className="mo1">
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="Search">Search:</label>
          <input
            type="text"
            id="Search"
            name="title"
            className="ser"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a recipe..."
          />
        </form>
      </div>

      <div className="cad">
        <div className="container">
          <div className="row">
            {recipes.length > 0 ? (
              recipes.map((recipe) => (
                <div className="col-sm-4" key={recipe._id}>
                  <Card recipe={recipe} showEdit={false} />
                </div>
              ))
            ) : (
              <p>No recipes found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
