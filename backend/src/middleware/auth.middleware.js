import { Client, Account } from "node-appwrite";

export const verifyAppwrite = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const client = new Client()
      .setEndpoint("http://localhost/v1")
      .setProject("hospital-management")
      .setJWT(token);

    const account = new Account(client);
    const user = await account.get();

    req.user = user;   // attach user to request
    next();

  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};