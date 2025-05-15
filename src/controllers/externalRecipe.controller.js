import express from "express";
import { getRecipeBySearch } from "../models/externalRecipe.model.js";

const externalRecipeController = express.Router();

externalRecipeController.get("/:searchTerm", async (req, res) => {
  const { searchTerm } = req.params;
  try {
    const result = await getRecipeBySearch(searchTerm);
    console.log(result);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500);
    res.json(":(");
  }
});

export default externalRecipeController;
