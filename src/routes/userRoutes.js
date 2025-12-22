import express from "express";
import { addNewUser, lookUpUser } from "../controllers/userController.js";
import { verifyAuth } from "../middleware/verifyAuth.js";

const router = express.Router();

router.post("/query", lookUpUser);
router.post("/new", addNewUser);
router.get("/verify", verifyAuth);

export default router;
