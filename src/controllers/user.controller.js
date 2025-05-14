import express from "express";
import { createUser } from "../models/user.model.js";

const userController = express.Router();

userController.get("/", async (req, res) => {
  res.json({ message: "this is a test" });
});

userController.post("/", async (req, res) => {
  const { email } = req.body;
  const displayName = req.body.displayName || email.split("@")[0];

  try {
    const newUser = createUser(email, displayName);
    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500);
    res.json({
      message: "There was an error when creating user.",
    });
  }
});

export default userController;
