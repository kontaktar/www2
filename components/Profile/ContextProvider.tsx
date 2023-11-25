"use client";
import useAuth from "hooks/useAuth";
import register from "pages/api/register";
import user from "pages/api/user";
import React, {
  createContext,
  use,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

const ProfileContext = createContext(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const { user } = useAuth();
  const {
    data: userDetail,
    mutate,
    isLoading: isLoadingUserDetail,
  } = useSWR(user?.id ? `/api/user/${user?.id}/detail` : null);

  const register = async (values) => {
    const response = await fetch(`/api/user/${user?.id}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    if (data.error) {
      toast(data.error);
      console.error("error", data.error);
    } else {
      setIsRegistered(true);
      mutate();
    }
  };

  useEffect(() => {
    setIsReady(!!user?.id);
  }, [user?.id]);

  const contextValue = {
    isReady,
    register,
    userDetail,
    isLoadingUserDetail,
  };
  return (
    <ProfileContext.Provider value={contextValue}>
      {children}
    </ProfileContext.Provider>
  );
}

// Create a custom hook to use the context
export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useMyContext must be used within a ProfileProvider");
  }
  return context;
}
