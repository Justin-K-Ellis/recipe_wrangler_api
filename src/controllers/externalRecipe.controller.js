import express from "express";
import externalRecipeModel from "../models/externalRecipe.model.js";

const externalRecipeController = express.Router();

// Search for a recipe by search term
externalRecipeController.get("/search/:searchTerm", async (req, res) => {
  const { searchTerm } = req.params;
  try {
    const result = await externalRecipeModel.getRecipeBySearch(searchTerm);
    console.log("Search results:");
    console.log(result);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500);
    res.json("Something went wrong when searching for food.");
  }
});

// Get recipe details by ID
externalRecipeController.get("/id/:id", async (req, res) => {
  const { id } = req.params;
  const result = await externalRecipeModel.getRecipeById(id);
  console.log("id search result:");
  console.log(result);

  res.json(result);
  try {
  } catch (error) {
    console.error(error);
    res.status(500);
    res.json({ message: "Something went wrong when fetching food by id." });
  }
});

// Favorite a recipe
externalRecipeController.post("/favorite/:recipeId", async (req, res) => {
  const { recipeId } = req.params;
  const firebaseId = req.user.uid;
  const { name } = req.body;

  try {
    const result = await externalRecipeModel.favoriteRecipe(
      recipeId,
      firebaseId,
      name
    );
    console.log(result);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500);
    res.json({ message: "Something went wrong when favoriting the recipe." });
  }
});

// Unfavorite a recipe
externalRecipeController.put("/unfavorite/:recipeId", async (req, res) => {
  const { recipeId } = req.params;
  const firebaseId = req.user.uid;

  try {
    const result = await externalRecipeModel.unfavoriteRecipe(
      recipeId,
      firebaseId
    );
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500);
    res.json({ message: "Something went wrong when unfavoriting the recipe." });
  }
});

// Get all favorite recipes for a user
externalRecipeController.get("/favorites", async (req, res) => {
  const firebaseId = req.user.uid;
  try {
    const favorites = await externalRecipeModel.getAllFavoriteRecipes(
      firebaseId
    );
    console.log("favorites:", favorites);
    // res.end();
    res.json(favorites);
  } catch (error) {
    console.error(error);
    res.status(500);
    res.json({ message: "Something went wrong when fetching favorites." });
  }
});

export default externalRecipeController;
