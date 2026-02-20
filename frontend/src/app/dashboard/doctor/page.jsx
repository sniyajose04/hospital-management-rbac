"use client";

import { useState } from "react";
import { account } from "@/lib/appwrite";

export default function Doctor() {
  const [name, setName] = useState("");
  const [appwriteId, setAppwriteId] = useState("");

  const createPatient = async () => {
    const jwt = await account.createJWT();

    await fetch("http://localhost:5000/doctor/create-patient", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt.jwt}`,
      },
      body: JSON.stringify({
        name,
        patientAppwriteId: appwriteId,
      }),
    });

    alert("Patient Created");
  };

  return (
    <div>
      <h1>Hi Doctor 👨‍⚕️</h1>

      <h2>Create Patient</h2>
      <input
        placeholder="Patient Name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Patient Appwrite ID"
        onChange={(e) => setAppwriteId(e.target.value)}
      />
      <button onClick={createPatient}>Create</button>
    </div>
  );
}