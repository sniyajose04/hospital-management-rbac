import { Client, Users } from "node-appwrite";

const client = new Client()
  .setEndpoint("http://localhost/v1")
  .setProject("hospital-management")
  .setKey("hospital-secret-key-2026");

export const users = new Users(client);