import { unstable_getServerSession } from "next-auth/next";

export default async function AuthStatus() {
  const session = await unstable_getServerSession();
  console.log(
    "%c session",
    "color:white; padding: 30px; background-color: darkgreen",
    session
  );

  return (
    <div className="absolute top-5 w-full flex justify-center items-center">
      {session && (
        <p className="text-stone-200 text-sm">
          Signed in as {session.user?.email}
        </p>
      )}
    </div>
  );
}
