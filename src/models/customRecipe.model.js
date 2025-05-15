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

// == Read ==
// Read all custom recipes
async function getallRecipes(user_id) {
  try {
    const rows = await knex
      .select("uuid", "ingredients", "steps", "notes", "name", "cuisine")
      .from("custom_recipe")
      .where("user_id", user_id);
    return rows;
  } catch (error) {
    console.error(error);
  }
}

// Read custom recipe by uuid
async function getRecipe(uuid) {
  try {
    const rows = await knex
      .select(
        "uuid",
        "created_at",
        "ingredients",
        "steps",
        "notes",
        "name",
        "cuisine"
      )
      .from("custom_recipe")
      .where("uuid", uuid);
    console.log(rows[0]);
  } catch (error) {
    console.error(error);
  }
}

const customRecipeModel = { createRecipe, getallRecipes, getRecipe };

export default customRecipeModel;
