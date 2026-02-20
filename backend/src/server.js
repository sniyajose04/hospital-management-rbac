import express from "express";
import doctorRoutes from "./routes/doctor.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import managerRoutes from "./routes/manager.routes.js";
import patientRoutes from "./routes/patient.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(express.json());
app.use(errorHandler);

app.use("/doctor", doctorRoutes);
app.use("/admin", adminRoutes);
app.use("/manager", managerRoutes);
app.use("/patient", patientRoutes);

app.listen(5000, () => {
  console.log("Backend running on 5000");
});