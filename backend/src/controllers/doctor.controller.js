import { pool } from "../config/db.js";

export const getDoctorPatients = async (req, res) => {
  try {
    const doctorResult = await pool.query(
      "SELECT id FROM doctors WHERE appwrite_user_id = $1",
      [req.user.$id]
    );

    if (doctorResult.rows.length === 0) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const doctorId = doctorResult.rows[0].id;

    const patients = await pool.query(
      "SELECT id, name, created_at FROM patients WHERE doctor_id = $1",
      [doctorId]
    );

    res.json(patients.rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching patients" });
  }
};