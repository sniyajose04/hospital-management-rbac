export const isPatient = (req, res, next) => {
  if (!req.userTeams.includes("patient")) {
    return res.status(403).json({ message: "Patient access only" });
  }
  next();
};