import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { getMyRecipe } from "./store/recipe/thunk";
import { myRecipeCount, myRecipeList } from "./store/recipe/selector";

function Home() {
  const [user, setUser] = useState(null);
  // const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const myRecipes = useSelector(myRecipeList) || [];
  const myRecipeCounts = useSelector(myRecipeCount);
  console.log(myRecipes, "myRecipes");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        // Fetch user profile
        const profileResponse = await fetch(
          "https://recipe-server-c7oz.onrender.com/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const profileData = await profileResponse.json();
        console.log(profileData);
        if (profileResponse.ok) {
          setUser(profileData.user);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        navigate("/login");
      }
    };

    fetchProfile();
    // fetchUserRecipes();
  }, [navigate]);

  useEffect(() => {
    const emailId = localStorage.getItem("user-email");
    dispatch(getMyRecipe(emailId));
  }, []); // mo need if [] is in side the closed

  return (
    <div>
      <Navbar />

      {/* Profile Section */}
      <div className="row justify-content-center my-5 ">
        <div className="col-md-6">
          <div className="card text-center mt-5 shadow-sm">
            <div className="card-body">
              <img
                src="https://via.placeholder.com/120"
                alt="Profile"
                className="rounded-circle mb-3"
                width="120"
                height="120"
              />
              <h3>{user?.name || "Loading..."}</h3>
              <p className="text-muted">Total Recipes: {myRecipeCounts}</p>
              <NavLink to={"/createrecipe"}>
                {" "}
                <button className="btn btn-primary btn-sm">Add Recipe</button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      {/* Recipes Section */}
      <div className="mt-4 container">
        <h3>Your Recipes</h3>
        <div>
          <div className="row">
            {myRecipes.length > 0 ? (
              myRecipes.map((myRecipes) => (
                <div
                  className="col-lg-4 col-md-6 col-sm-12 mb-3"
                  key={myRecipes._id}
                >
                  <Card recipe={myRecipes} showEdit={true} />
                </div>
              ))
            ) : (
              <p className="text-center">
                No recipes found. Start adding some!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
