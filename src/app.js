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

app.get("/api/auth-test", authenticateToken, (req, res) => {
  const user = req.user;
  console.log(user);
  if (user) {
    return res.json({
      message: `Welcome to the protected router, ${user.email}.`,
    });
  }

  res.status(401);
  res.json({ message: "not the magic word" });
});

app.use("/", router);

app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
