import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  myRecipe: [],
  sucessMessage: "",
  failureMessage: "",
  myRecipeCount: 0,
};

const myRecipeSlice = createSlice({
  name: "myRecipe",
  initialState: initialState,
  reducers: {
    successFetchMyRecipe: (state, action) => {
      state.myRecipe = action.payload;
    },
    successFetchMyRecipeCount: (state, action) => {
      state.myRecipeCount = action.payload;
    },
    failureFetchMyRecipe: (state, action) => {
      state.myRecipe = [];
      state.failureMessage = action.payload;
    },
    setRecipeView: (state, action) => {
      state.myRecipeView = action.payload;
    },
  },
});

export const {
  successFetchMyRecipe,
  failureFetchMyRecipe,
  successFetchMyRecipeCount,
  setRecipeView,
} = myRecipeSlice.actions;

export default myRecipeSlice.reducer;
