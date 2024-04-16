import express from "express";
import { getMessage, sendeMessage } from "../controllers/messageController.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:id", protectRoute, getMessage);
router.post("/send/:id", protectRoute, sendeMessage);


export default router;