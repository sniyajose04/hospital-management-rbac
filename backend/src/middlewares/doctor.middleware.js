export const isDoctor = (req, res, next) => {
  if (!req.userTeams.includes("doctor")) {
    return res.status(403).json({ message: "Doctor access only" });
  }
  next();
};