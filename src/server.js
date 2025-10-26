import express from "express";
import dotenv from "dotenv";
import connectDB from "./configs/db.js";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // allow frontend
    credentials: true, // if cookies/auth headers are needed
  })
);

app.get("/", (req, res) => {
  console.log(`A ${req.method} request was sent`);
  res.json({ message: "Successful" });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`App started at: http://localhost:${PORT}`);
  });
});
