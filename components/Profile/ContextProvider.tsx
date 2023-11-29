"use client";
import { useAuth } from "@/components/Auth/provider";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

const ProfileContext = createContext(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const { user } = useAuth();
  const {
    data: userDetail,
    mutate: mutateDetails,
    isLoading: isLoadingUserDetail,
  } = useSWR(user?.id ? `/api/user/${user?.id}/detail` : null);

  const {
    data: experience,
    isLoading: isLoadingExperience,
    mutate: setExperience,
  } = useSWR(user?.id ? `/api/user/${user?.id}/experience` : null);

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
      mutateDetails();
    }
  };

  useEffect(() => {
    setIsReady(!!user?.id);
  }, [user?.id]);

  const contextValue = {
    isReady,
    register,
    userDetail,
    experience,
    isLoadingUserDetail,
    setExperience,
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
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
}
