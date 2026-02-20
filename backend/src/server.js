import dotenv from "dotenv";
dotenv.config();

import express from "express";
import doctorRoutes from "./routes/doctor.routes.js";

const app = express();

app.use(express.json());

app.use("/doctor", doctorRoutes);

app.listen(5000, () => {
  console.log("Backend running on 5000");
});