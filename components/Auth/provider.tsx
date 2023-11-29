"use client";
import { createContext, useContext } from "react";
import { useSession, signOut } from "next-auth/react";
import { Session } from "next-auth.d";
type Context = {
  user: Session["user"];
  isLoggedIn: boolean;
  isLoading: boolean;
  logOut: () => void;
  // logIn: () => void;
};
const AuthContext = createContext<Context>({} as Context);
export default function AuthProvider({ children }) {
  const { data, status } = useSession();

  const contextValue = {
    user: data?.user as Session["user"],
    isLoggedIn: status === "authenticated",
    isLoading: status === "loading",
    logOut: () => signOut(),
    // logIn: () => router.push("/login"),
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}
