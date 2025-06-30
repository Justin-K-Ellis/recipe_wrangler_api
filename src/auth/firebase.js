import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import dotenv from "dotenv";

dotenv.config();

// const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);
const serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS;

const app = initializeApp({
  credential: cert(serviceAccount),
});

const auth = getAuth(app);
export default auth;
