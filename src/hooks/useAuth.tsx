"use client";

import { useSession, signOut } from "next-auth/react";
import { Session } from "next-auth.d";
export default function useAuth() {
  const { data, status } = useSession();

  return {
    user: data?.user as Session["user"],
    isLoggedIn: status === "authenticated",
    logOut: () => signOut(),
  };
}
