import express from "express";
import { getDoctorPatients } from "../controllers/doctor.controller.js";
import { verifyAppwrite } from "../middleware/auth.middleware.js";
import { isDoctor } from "../middleware/role.middleware.js";

const router = express.Router();

router.get(
  "/patients",
  verifyAppwrite,
  isDoctor,
  getDoctorPatients
);

export default router;