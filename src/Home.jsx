import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { getMyRecipe } from "./store/recipe/thunk";
import { myRecipeCount, myRecipeList } from "./store/recipe/selector";
import buger from "./Style/pic/images.jpg";

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
      <div>
        <Navbar />

        {/* Profile Section */}
        <div className="mt-4 pt-4">
          <div className="container my-5">
            <div className="row justify-content-center">
              <div className="col-12 col-sm-10 col-md-8 col-lg-6">
                <div className="card text-center border-0 shadow rounded-4">
                  <div className="card-body p-4">
                    <img
                      src={buger}
                      alt="Profile"
                      className="rounded-circle shadow-sm mb-3"
                      width="100"
                      height="100"
                    />
                    <h4 className="fw-semibold mb-1">
                      {user?.name || "Loading..."}
                    </h4>
                    <p className="text-muted mb-3">
                      Total Recipes: {myRecipeCounts}
                    </p>
                    <NavLink to="/createrecipe">
                      <button className="btn btn-outline-primary btn-sm px-4">
                        Add Recipe
                      </button>
                    </NavLink>
                  </div>
                </div>
              </div>
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
