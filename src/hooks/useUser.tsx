// "use client";

// import { useSession, signOut } from "next-auth/react";
// import { useState, useEffect } from "react";
// import { Session } from "next-auth.d";
// export default function useUser() {
//   const [isRegistered, setIsRegistered] = useState(false);
//   const [details, setDetails] = useState();
//   const { data: session } = useSession();

//   const { id } = (session as Session)?.user || {};

//   useEffect(() => {
//     const fetchUserDetail = async () => {
//       console.log(
//         "%c I GO",
//         "color:white; padding: 30px; background-color: darkgreen"
//       );

//       const response = await fetch(`/api/user/${id}/detail`);
//       const user = await response.json();
//       console.log(
//         "%c user",
//         "color:white; padding: 30px; background-color: darkgreen",
//         user
//       );

//       if (user?.error) {
//         setIsRegistered(false);
//       } else {
//         setIsRegistered(true);
//         setDetails(user);
//       }
//     };
//     if (id) {
//       fetchUserDetail();
//     }
//   }, [id, isRegistered]);

//   return {
//     details,
//     isRegistered,
//     setIsRegistered,
//   };
// }
