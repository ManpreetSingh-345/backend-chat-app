import express from "express";
import { getNewAccessToken } from "../controllers/refreshTokenController.js";
import { verifyAuth } from "../middleware/verifyAuth.js";

const router = express.Router();

router.post("/refresh", getNewAccessToken);
router.get("/verify", verifyAuth);

export default router;
