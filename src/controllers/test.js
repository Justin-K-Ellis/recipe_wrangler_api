import express from "express";
const testController = express.Router();

testController.get("/", (_req, res) => {
  res.json({
    isTest: true,
    message: "This is a test.",
  });
});

export default testController;
