export const isManager = (req, res, next) => {
  if (!req.userTeams.includes("manager")) {
    return res.status(403).json({ message: "Manager access only" });
  }
  next();
};