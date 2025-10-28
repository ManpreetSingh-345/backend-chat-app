import express from "express";
import { postUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/new", postUser);

export default router;
