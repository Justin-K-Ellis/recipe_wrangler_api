import express from "express";
import testController from "./controllers/test.js";

const router = express.Router();

router.use("/test", testController);

export default router;
