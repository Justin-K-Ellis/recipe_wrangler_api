import dotenv from "dotenv";
dotenv.config();

async function getRecipeBySearch(searchTerm) {
  const searchString = `https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&instructionsRequired=true`;
  const response = await fetch(searchString, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "x-api-key": process.env.SPOONTACULAR_API,
    },
  });
  const data = await response.json();
  const results = data.results.map((recipe) => {
    return { id: recipe.id, name: recipe.title };
  });
  return results;
}

export { getRecipeBySearch };
