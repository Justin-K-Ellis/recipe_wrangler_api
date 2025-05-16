import express from "express";
import customRecipeModel from "../models/customRecipe.model.js";
import getUserIdFromEmail from "../utils/getUserIdFromEmail.js";

const customRecipeController = express.Router();

// == Create ==
customRecipeController.post("/", async (req, res) => {
  const email = req.user.email;
  console.error("post:", email);
  const { name, cuisine, ingredients, steps, notes, readyInMinutes, servings } =
    req.body;
  try {
    const user_id = await getUserIdFromEmail(email);
    const recipe = await customRecipeModel.createRecipe(
      {
        name,
        cuisine,
        ingredients,
        steps,
        notes,
        readyInMinutes,
        servings,
      },
      user_id
    );

    res.json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500);
    res.json({ message: "An error occured when trying to create recipe." });
  }
});

// == Read ==
// Get all customer recipes
customRecipeController.get("/", async (req, res) => {
  const email = req.user.email;
  console.error("get all:", email);

  try {
    const user_id = await getUserIdFromEmail(email);
    const recipes = await customRecipeModel.getallRecipes(user_id);

    res.json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500);
    res.json("Something went wrong when trying to get all custom recipes.");
  }
});

// Get custom recipe by uuid
customRecipeController.get("/:uuid", async (req, res) => {
  const email = req.user.email;
  console.error("get by id:", email);
  const { uuid } = req.params;
  try {
    const user_id = await getUserIdFromEmail(email);
    const result = await customRecipeModel.getRecipe(uuid, user_id);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500);
    res.json({ message: "An error occured when fetching recipe." });
  }
});

export default customRecipeController;
