"use client";
import { useSession } from "next-auth/react";
export default function AuthProvider({ children }) {
  const { status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (status === "authenticated") {
    return <>{children}</>;
  }
  return <div>Not authenticated</div>;
}
