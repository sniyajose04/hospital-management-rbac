import { Client, Account, Teams } from "node-appwrite";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const client = new Client()
      .setEndpoint("http://localhost/v1")
      .setProject("hospital-management")
      .setJWT(token);

    const account = new Account(client);
    const teams = new Teams(client);

    const user = await account.get();
    const teamList = await teams.list();

    req.user = user;
    req.userTeams = teamList.teams.map(team => team.$id);

    next();

  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};