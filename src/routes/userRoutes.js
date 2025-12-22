import express from "express";
import { addNewUser, lookUpUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/query", lookUpUser);
router.post("/new", addNewUser);

export default router;
