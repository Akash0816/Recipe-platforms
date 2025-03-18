import { useSelector } from "react-redux";

export const myRecipeList = (state) => state.myRecipeList?.myRecipe || [];
export const myRecipeCount = (state) => state.myRecipeList?.myRecipeCount || 0;
export const myRecipeView = (state) => state.myRecipeList?.myRecipeView || [];
