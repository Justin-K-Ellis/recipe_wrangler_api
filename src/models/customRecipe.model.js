import knex from "../knex.js";
import getUnixTime from "../utils/getUnixTime.js";

// == Create ==
async function createRecipe(data, user_id) {
  const recipeData = {
    name: data.name,
    cuisine: data.cuisine,
    ingredients: JSON.stringify(data.ingredients),
    steps: JSON.stringify(data.steps),
    notes: data.notes || "",
    created_at: getUnixTime(),
    user_id: user_id,
  };
  try {
    await knex("custom_recipe").insert(recipeData);
    return recipeData;
  } catch (error) {
    console.error(error);
  }
}

const customRecipeModel = { createRecipe };

export default customRecipeModel;
