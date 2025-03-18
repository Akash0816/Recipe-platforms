import { configureStore } from "@reduxjs/toolkit";
import userRecipe from "../store/recipe/slice";

export const store = configureStore({
  reducer: {
    myRecipeList: userRecipe,
  },
});

export const getState = () => store.getState();
export const dispatch = (action) => store.dispatch(action);
