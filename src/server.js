import express from "express";
import dotenv from 'dotenv';
import connectDB from './configs/db.js';

dotenv.config();

const app = express();

app.get("/", (req, res) => {
    res.send("API Load Successfully")
})

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("App started at: http://localhost:8080")
    })
})