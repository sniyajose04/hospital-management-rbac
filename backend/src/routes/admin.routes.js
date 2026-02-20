import express from "express";
import { verifyAppwrite } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/role.middleware.js";

const router = express.Router();

router.get("/dashboard", verifyAppwrite, isAdmin, (req, res) => {
  res.json({ message: "Welcome Admin" });
});

export default router;