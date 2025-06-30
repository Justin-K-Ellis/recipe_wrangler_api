import dotenv from "dotenv";
import knex from "../knex.js";

dotenv.config();
const apiKey = process.env.SPOONTACULAR_API;

async function getRecipeBySearch(searchTerm) {
  const query = `https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&instructionsRequired=true`;
  const response = await fetch(query, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "x-api-key": apiKey,
    },
  });
  const data = await response.json();
  const results = data.results.map((recipe) => {
    return { id: recipe.id, name: recipe.title };
  });
  return results;
}

async function getRecipeById(id) {
  const query = `https://api.spoonacular.com//recipes/${id}/information?includeNutrition=false`;
  const response = await fetch(query, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "x-api-key": apiKey,
    },
  });
  const data = await response.json();

  const ingredients = data.extendedIngredients.map(
    (ing) =>
      `${ing.name} (${ing.measures.metric.amount} ${ing.measures.metric.unitLong})`
  );
  const steps = data.analyzedInstructions[0].steps.map((stepObj) => {
    return stepObj.step;
  });

  const result = {
    externalId: data.id,
    name: data.title,
    ingredients: ingredients || [],
    steps: steps || [],
    readyInMinutes: data.readyInMinutes || 0,
    servings: data.servings || 0,
  };
  return result;
}

async function favoriteRecipe(recipeId, firebaseId) {
  // Get user id
  const userRows = await knex("user_data")
    .select("id")
    .where("firebase_id", firebaseId);
  const userId = userRows[0].id;

  // TODO: either insert dishID into external_recipe table and then do business with
  // user_external_recipe table, or do a migration to simplify and just have one table
  // for external recipes.

  // Insert recipe in external_recipe table
  const recipeRows = await knex("external_recipe").returning("id").insert({
    dish_id: recipeId,
  });
  const externalId = recipeRows[0].id;

  // Insert into user_external_recipe table
  const result = await knex("user_external_recipe").insert({
    user_id: userId,
    external_recipe_id: externalId,
    liked: true,
  });
  return result;
}

const externalRecipeModel = {
  getRecipeBySearch,
  getRecipeById,
  favoriteRecipe,
};

export default externalRecipeModel;
