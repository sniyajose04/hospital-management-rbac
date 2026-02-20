import express from "express";
import { verifyAppwrite } from "../middleware/auth.middleware.js";
import { isPatient } from "../middleware/role.middleware.js";

const router = express.Router();

router.get("/me", verifyAppwrite, isPatient, (req, res) => {
  res.json({
    message: "Patient Dashboard",
    user: req.user
  });
});

export default router;   // ✅ VERY IMPORTANT