import express from "express";
import { verifyAppwrite } from "../middleware/auth.middleware.js";
import { isManager } from "../middleware/role.middleware.js";

const router = express.Router();

router.get("/dashboard", verifyAppwrite, isManager, (req, res) => {
  res.json({ message: "Manager Dashboard" });
});

export default router;   // ✅ VERY IMPORTANT