import express from "express";
import testController from "./controllers/test.js";
import userController from "./controllers/user.controller.js";
import customRecipeController from "./controllers/customRecipe.controller.js";
import externalRecipeController from "./controllers/externalRecipe.controller.js";

const router = express.Router();

router.use("/test", testController);
router.use("/user", userController);
router.use("/custom-recipe", customRecipeController);
router.use("/external-recipe", externalRecipeController);

export default router;
