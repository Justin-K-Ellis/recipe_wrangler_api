import express from "express";
import testController from "./controllers/test.js";
import userController from "./controllers/user.controller.js";

const router = express.Router();

router.use("/test", testController);
router.use("/user", userController);

export default router;
