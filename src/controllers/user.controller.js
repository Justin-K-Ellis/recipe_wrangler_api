import express from "express";
import { createUser } from "../models/user.model";

const userController = express.Router();

userController.post("/", async (req, res) => {
  try {
    const newUser = createUser(req.user);
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
