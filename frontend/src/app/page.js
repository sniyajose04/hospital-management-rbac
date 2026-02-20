"use client";

import { useEffect } from "react";
import { account } from "@/lib/appwrite";

export default function Home() {
  useEffect(() => {
    account.get().then(
      res => console.log("Connected:", res),
      err => console.log("Not logged in yet")
    );
  }, []);

  return <h1>Hospital App Connected 🚀</h1>;
}