import express from "express";
import {
  addNewUser,
  lookUpUser,
  logoutUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/query", lookUpUser);
router.post("/new", addNewUser);
router.post("/logout", logoutUser);

export default router;
