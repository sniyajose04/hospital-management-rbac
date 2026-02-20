"use client";

import { account } from "@/lib/appwrite";

export default function LogoutButton() {
  return (
    <button onClick={() => account.deleteSession("current")}>
      Logout
    </button>
  );
}
