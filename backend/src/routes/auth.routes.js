import express from "express";
import { pool } from "../db/index.js";
import { verifyAppwrite } from "../middleware/auth.js";

const router = express.Router();

router.post("/sync", verifyAppwrite, async (req, res) => {
  const { $id, name } = req.user;

  const role = "patient"; // default role

  const user = await pool.query(
    `INSERT INTO users (appwrite_user_id, name, role)
     VALUES ($1,$2,$3)
     ON CONFLICT (appwrite_user_id) DO NOTHING
     RETURNING *`,
    [$id, name, role]
  );

  res.json(user.rows[0] || { message: "User exists" });
});

export default router;
