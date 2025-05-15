import dotenv from "dotenv";

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
    id: data.id,
    name: data.title,
    ingredients: ingredients || [],
    steps: steps || [],
    readyInMinutes: data.readyInMinutes || 0,
  };
  return result;
}

const externalRecipeModel = { getRecipeBySearch, getRecipeById };

export default externalRecipeModel;
