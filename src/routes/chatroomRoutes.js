import express from "express";
import { addNewMessage } from "../controllers/chatroomController.js";

const router = express.Router();

router.post("/addMessage", addNewMessage);

export default router;
