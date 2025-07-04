import knex from "../knex.js";
import getUnixTime from "../utils/getUnixTime.js";

// == Create ==
async function createRecipe(data, user_id) {
  const recipeData = {
    name: data.name,
    cuisine: data.cuisine,
    ingredients: JSON.stringify(data.ingredients),
    steps: JSON.stringify(data.steps),
    ready_in_minutes: data.readyInMinutes,
    servings: data.servings,
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
      .select("uuid", "name", "cuisine")
      .from("custom_recipe")
      .where("user_id", user_id);

    const results = rows.map((row) => {
      return {
        externalId: row.uuid,
        name: row.name,
        cuisine: row.cuisine,
      };
    });
    return results;
  } catch (error) {
    console.error(error);
  }
}

// Read custom recipe by uuid
async function getRecipe(uuid, user_id) {
  try {
    const rows = await knex
      .select(
        "uuid",
        "name",
        "ingredients",
        "steps",
        "ready_in_minutes",
        "servings",
        "cuisine"
      )
      .from("custom_recipe")
      .where({ uuid: uuid, user_id: user_id });
    const result = {
      externalId: rows[0].uuid,
      name: rows[0].name,
      ingredients: rows[0].ingredients,
      steps: rows[0].steps,
      readyInMinutes: rows[0].ready_in_minutes,
      servings: rows[0].servings,
      cuisine: rows[0].cuisine,
    };
    return result;
  } catch (error) {
    console.error(error);
  }
}

// Update
async function updateRecipe(recipeId, user_id, data) {
  const recipeData = {
    name: data.name,
    cuisine: data.cuisine,
    ingredients: JSON.stringify(data.ingredients),
    steps: JSON.stringify(data.steps),
    ready_in_minutes: data.readyInMinutes,
    servings: data.servings,
  };
  try {
    const result = await knex("custom_recipe")
      .where({ uuid: recipeId, user_id: user_id })
      .update(recipeData);
    return result;
  } catch (error) {
    console.error(error);
  }
}

// Delete
async function deleteRecipe(recipeId, user_id) {
  try {
    const result = await knex("custom_recipe")
      .where({ uuid: recipeId, user_id: user_id })
      .del();
    return result;
  } catch (error) {
    console.error(error);
  }
}

const customRecipeModel = {
  createRecipe,
  getallRecipes,
  getRecipe,
  deleteRecipe,
  updateRecipe,
};

export default customRecipeModel;
