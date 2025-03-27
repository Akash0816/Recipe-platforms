import axios from "axios";
import {
  failureFetchMyRecipe,
  successFetchMyRecipe,
  successFetchMyRecipeCount,
} from "./slice";

export const getMyRecipe = (emailId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `https://recipe-server-c7oz.onrender.com/my-recipes?email=${emailId}`
      );
      if (response.status === 200) {
        console.log(response, "response");
        dispatch(successFetchMyRecipe(response.data.recipes));
        dispatch(successFetchMyRecipeCount(response.data.count));
      }
    } catch (err) {
      dispatch(failureFetchMyRecipe(err.message));
    }
  };
};
