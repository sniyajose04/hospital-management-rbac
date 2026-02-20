import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { verifyToken } from "./middlewares/auth.middleware.js";
import { isDoctor } from "./middlewares/doctor.middleware.js";
import { isAdmin } from "./middlewares/admin.middleware.js";
import { isManager } from "./middlewares/manager.middleware.js";
import { isPatient } from "./middlewares/patient.middleware.js";
import { pool } from "./config/db.js";


const app = express();


app.get("/admin-data", verifyToken, isAdmin, (req, res) => {
  res.json({ message: "Admin full access" });
});

app.get("/manager-data", verifyToken, isManager, (req, res) => {
  res.json({ message: "Manager sees doctors only" });
});

app.get("/doctor-data", verifyToken, isDoctor, (req, res) => {
  res.json({ message: "Doctor sees assigned patients" });
});

app.get("/patient-data", verifyToken, isPatient, (req, res) => {
  res.json({ message: "Patient sees own details only" });
});


pool.query("SELECT NOW()")
  .then(res => console.log("DB Connected:", res.rows[0]))
  .catch(err => console.error("DB Error:", err));
app.listen(5000, () => {
  console.log("Backend running on 5000");
});