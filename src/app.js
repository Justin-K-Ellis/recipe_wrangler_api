import express from "express";
import dotevn from "dotenv";
import cors from "cors";
import router from "./router.js";
import authenticateToken from "./auth/authenticateToken.js";

dotevn.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/api", authenticateToken, router);

app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
