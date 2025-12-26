import express from "express";
import dotenv from "dotenv";
import connectDB from "./configs/db.js";
import cors from "cors";
import userRoute from "./routes/userRoutes.js";
import authRoute from "./routes/authRoutes.js";
import chatroomRoute from "./routes/chatroomRoutes.js";
import cookieParser from "cookie-parser";
import { verifyAuth } from "./middleware/verifyAuth.js";

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.enable("trust proxy");

if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      origin: `http://localhost:5173`, // allow frontend
      credentials: true, // if cookies/auth headers are needed
    })
  );
}

app.use("/users", userRoute);
app.use("/auth", authRoute);
app.use("/chat", verifyAuth, chatroomRoute);

// Start serving only after connecting to DB
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`App started at: http://localhost:${PORT}`);
  });
});
