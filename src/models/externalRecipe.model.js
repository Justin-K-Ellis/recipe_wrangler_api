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

  // Check if recipe already exists in external_recipe table
  const existingRecipeRows = await knex("external_recipe")
    .count("id as count")
    .where("dish_id", recipeId);
  const recipeCount = existingRecipeRows[0].count;

  if (recipeCount === 0) {
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
  } else if (recipeCount === 1) {
    // Check if recipe is already liked by user
    const likedRows = await knex("user_external_recipe").count().where({
      user_id: userId,
      external_recipe_id: recipeId,
    });
    const userExternalCount = likedRows[0].count;

    if (userExternalCount === 1) return;

    if (userExternalCount === 0) {
      // If recipe is not liked by user, insert it
      const result = await knex("user_external_recipe").insert({
        user_id: userId,
        external_recipe_id: externalId,
        liked: true,
      });
      return result;
    }
  }
}

async function unfavoriteRecipe(recipeId, firebaseId) {
  // Get user id
  const userRows = await knex("user_data")
    .select("id")
    .where("firebase_id", firebaseId);
  const userId = userRows[0].id;

  // Get external recipe DB id
  const recipeRows = await knex("external_recipe")
    .select("id")
    .where("dish_id", recipeId);
  const externalId = recipeRows[0].id;

  // Set liked to false in user_external_recipe table
  const result = await knex("user_external_recipe")
    .where({
      user_id: userId,
      external_recipe_id: externalId,
    })
    .update({ liked: false });
  return result;
}

const externalRecipeModel = {
  getRecipeBySearch,
  getRecipeById,
  favoriteRecipe,
};

export default externalRecipeModel;
