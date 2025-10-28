import express from "express";
import dotenv from "dotenv";
import connectDB from "./configs/db.js";
import cors from "cors";
import bcrypt from "bcrypt";
import usersRoute from "./routes/userRoutes.js";

dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(express.json());

app.use("/users", usersRoute);

app.use(
  cors({
    origin: "http://localhost:5173", // allow frontend
    credentials: true, // if cookies/auth headers are needed
  })
);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`App started at: http://localhost:${PORT}`);
  });
});
