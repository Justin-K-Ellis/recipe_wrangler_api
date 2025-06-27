import express from "express";
import externalRecipeModel from "../models/externalRecipe.model.js";

const externalRecipeController = express.Router();

externalRecipeController.get("/:searchTerm", async (req, res) => {
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

export default externalRecipeController;
