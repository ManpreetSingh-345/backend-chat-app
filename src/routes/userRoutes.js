import express from "express";
import { addNewUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/new", addNewUser);

export default router;
