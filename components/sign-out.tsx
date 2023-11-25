"use client";
import { signOut, useSession } from "next-auth/react";

export default function SignOut() {
  const data = useSession();
  console.log(
    "%c data",
    "color:white; padding: 30px; background-color: darkgreen",
    data
  );
  return (
    <button
      className="text-stone-400 hover:text-stone-200 transition-all"
      onClick={() => signOut()}
    >
      Goddammit, sign me out!
    </button>
  );
}
