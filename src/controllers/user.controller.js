import express from "express";
import { createUser } from "../models/user.model.js";

const userController = express.Router();

userController.get("/", async (req, res) => {
  res.json({ message: "this is a test" });
});

userController.post("/", async (req, res) => {
  const email = req.user.email;
  const displayName = req.user.displayName || email.split("@")[0];
  const firebaseId = req.user.uid;

  try {
    const newUser = createUser(email, displayName, firebaseId);
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
