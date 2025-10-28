import express from "express";
import dotenv from "dotenv";
import connectDB from "./configs/db.js";
import cors from "cors";
import bcrypt from "bcrypt";
import usersRoute from "./routes/userRoutes.js";

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(express.json()); // Middleware --> handles JSON parsing

if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      origin: "http://localhost:5173", // allow frontend
      credentials: true, // if cookies/auth headers are needed
    })
  );
}

app.use("/users", usersRoute);

// Start serving only after connecting to DB
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`App started at: http://localhost:${PORT}`);
  });
});
