"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface UserContextType {
  userId: string | null;
  role: string | null;
  setUser: (id: string, role: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  const setUser = (id: string, role: string) => {
    setUserId(id);
    setRole(role);
  };

  const logout = () => {
    setUserId(null);
    setRole(null);
    console.log("log out function called\n");
  };

  return (
    <UserContext.Provider value={{ userId, role, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
