import express from "express";
import { pool } from "../db/index.js";
import { verifyAppwrite } from "../middleware/auth.js";

const router = express.Router();

router.get("/me", verifyAppwrite, async (req, res) => {
  try {
    const appwriteUserId = req.user.$id;

    const result = await pool.query(
      "SELECT role, name FROM users WHERE appwrite_user_id = $1",
      [appwriteUserId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
