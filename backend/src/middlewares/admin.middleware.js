export const isAdmin = (req, res, next) => {
  if (!req.userTeams.includes("admin")) {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};