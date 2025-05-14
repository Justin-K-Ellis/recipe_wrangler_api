import knex from "../knex.js";

// == Create ==
async function createRecipe(data) {
  const recipeData = {
    name: data.name,
    cuisine: data.cuisine,
    ingredients: JSON.stringify(data.ingredients),
    steps: JSON.stringify(data.steps),
    notes: data.notes,
    created_at: data.createdAt,
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
