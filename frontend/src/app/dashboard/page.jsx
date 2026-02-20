"use client";

import { useEffect } from "react";
import { account, teams } from "@/lib/appwrite";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const checkRole = async () => {
      try {
        const user = await account.get();
        console.log("User:", user);

        const memberships = await teams.list();
        console.log("Teams:", memberships);

        if (memberships.total === 0) {
          console.log("No team assigned");
          return;
        }

        const role = memberships.teams[0].$id;
        console.log("Detected role:", role);

        if (role === "admin") router.push("/dashboard/admin");
        if (role === "manager") router.push("/dashboard/manager");
        if (role === "doctor") router.push("/dashboard/doctor");
        if (role === "patient") router.push("/dashboard/patient");

      } catch (error) {
        console.log("Error:", error);
        router.push("/login");
      }
    };

    checkRole();
  }, []);

  return <p>Checking role...</p>;
}