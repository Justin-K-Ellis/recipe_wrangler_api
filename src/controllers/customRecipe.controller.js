import express from "express";
import customRecipeModel from "../models/customRecipe.model.js";
import knex from "../knex.js";

const customRecipeController = express.Router();

// == Create ==
customRecipeController.post("/", async (req, res) => {
  const email = req.user.email;
  const { name, cuisine, ingredients, steps, notes } = req.body;
  try {
    const rows = await knex
      .select("id")
      .from("user_data")
      .where("email", email);
    const user_id = rows[0].id;
    console.log("user id:", user_id);

    const recipe = await customRecipeModel.createRecipe(
      {
        name,
        cuisine,
        ingredients,
        steps,
        notes,
      },
      user_id
    );
    console.log("recipe:", recipe);

    res.json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500);
    res.json({ message: "An error occured when trying to create recipe." });
  }
});

// == Read ==

// == Update ==

// == Delete ==

export default customRecipeController;
