import React, { useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
// import buger from "./Style/pic/images.jpg";
import img1 from "./Style/pic/img1.jpg";
import "./Style/Land.css"
    

const LandingPage = () => {
  const handleImageClick = () => {
    window.location.href = "/login";
  };

  const recipes = [
    {
      id: 1,
      image:
        "https://cdn.pixabay.com/photo/2015/04/08/13/13/food-712665_1280.jpg",
      name: "Tasty Pasta",
    },
    {
      id: 2,
      image:
        "https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg",
      name: "Cheesy Pizza",
    },
    { id: 3, image: img1, name: "Recipe 2" },
    {
      id: 4,
      image:
        "https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg",
      name: "Cheesy Pizza",
    },
  ];

  // Adding more items for the favorite section
  const favoriteRecipes = [
    ...recipes,
    {
      id: 5,
      image:
        "https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_1280.jpg",
      name: "Juicy Burger",
    },
    {
      id: 6,
      image:
        "https://cdn.pixabay.com/photo/2015/04/08/13/13/food-712665_1280.jpg",
      name: "Tasty Pasta",
    },
    {
      id: 7,
      image:
        "https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_1280.jpg",
      name: "Juicy Burger",
    },
    {
      id: 8,
      image:
        "https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_1280.jpg",
      name: "Juicy Burger",
    },
    {
      id: 9,
      image: img1,
      name: "Chocolate Cake",
    },
    {
      id: 10,
      image:
        "https://cdn.pixabay.com/photo/2015/04/08/13/13/food-712665_1280.jpg",
      name: "Tasty Pasta",
    },
    {
      id: 11,
      image:
        "https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg",
      name: "Cheesy Pizza",
    },
  ];

  // const scrollRef = useRef(null);

  // useEffect(() => {
  //   const scrollContainer = scrollRef.current;
  //   let scrollAmount = 0;
  //   const scrollSpeed = 1; // Adjust speed if needed
  //   const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;

  //   const autoScroll = () => {
  //     if (scrollAmount >= maxScroll) {
  //       scrollAmount = 0; // Reset to start
  //     } else {
  //       scrollAmount += scrollSpeed;
  //     }
  //     scrollContainer.scrollTo({ left: scrollAmount, behavior: "smooth" });
  //   };

  //   const interval = setInterval(autoScroll, 50); // Adjust interval speed

  //   return () => clearInterval(interval); // Cleanup on unmount
  // }, []);

  return (
    <div className="container poi1">
      {/* Image Slider */}
      <Carousel>
        {recipes.map((recipe) => (
          <Carousel.Item key={recipe.id}>
            <img
              className="d-block w-100"
              src={recipe.image}
              alt={recipe.name}
              style={{ height: "400px", objectFit: "cover", cursor: "pointer" }}
              onClick={handleImageClick}
            />
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Favorite Section */}
      <h2 className="text-center mt-4">What's your favorite:</h2>
      <div
        // ref={scrollRef}
        className="d-flex mt-3"
        style={{
          overflowX: "auto", // Enables horizontal scrolling
          whiteSpace: "nowrap", // Prevents wrapping
          padding: "15px",
          scrollBehavior: "smooth",
        }}
      >
        {favoriteRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="text-center"
            style={{ display: "inline-block", marginRight: "30px" }}
          >
            <img
              src={recipe.image}
              alt={recipe.name}
              className="rounded-circle"
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                cursor: "pointer",
              }}
              onClick={handleImageClick}
            />
            <p>{recipe.name}</p>
          </div>
        ))}
      </div>
      <div>
        <h2>Loading ...</h2>
      </div>
    </div>
  );
};

export default LandingPage;
