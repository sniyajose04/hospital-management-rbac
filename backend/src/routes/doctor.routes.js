import { pool } from "../config/db.js";

export const initDoctor = async (req, res) => {
  try {
    const existing = await pool.query(
      "SELECT * FROM doctors WHERE appwrite_user_id = $1",
      [req.user.$id]
    );

    if (existing.rows.length > 0) {
      return res.json({ message: "Doctor already exists" });
    }

    await pool.query(
      "INSERT INTO doctors (appwrite_user_id, name) VALUES ($1, $2)",
      [req.user.$id, req.user.name]
    );

    res.json({ message: "Doctor record created" });

  } catch (error) {
    res.status(500).json({ message: "Error initializing doctor" });
  }
};

export const createPatient = async (req, res) => {
  try {
    const { name, patientAppwriteId } = req.body;

    const doctor = await pool.query(
      "SELECT id FROM doctors WHERE appwrite_user_id = $1",
      [req.user.$id]
    );

    if (doctor.rows.length === 0) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    await pool.query(
      "INSERT INTO patients (appwrite_user_id, doctor_id, name) VALUES ($1, $2, $3)",
      [patientAppwriteId, doctor.rows[0].id, name]
    );

    res.json({ message: "Patient created successfully" });

  } catch (error) {
    res.status(500).json({ message: "Error creating patient" });
  }
};

export const getDoctorPatients = async (req, res) => {
  try {
    const doctor = await pool.query(
      "SELECT id FROM doctors WHERE appwrite_user_id = $1",
      [req.user.$id]
    );

    if (doctor.rows.length === 0) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const patients = await pool.query(
      "SELECT * FROM patients WHERE doctor_id = $1",
      [doctor.rows[0].id]
    );

    res.json(patients.rows);

  } catch (error) {
    res.status(500).json({ message: "Error fetching patients" });
  }
};