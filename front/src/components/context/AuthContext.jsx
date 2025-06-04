import React, { createContext, useContext, useState, useEffect } from "react";
import { useCurrentUser } from "../hooks/useUser.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    return localStorage.getItem("jwtToken");
  });

  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useCurrentUser({
    enabled: !!token,
  });

  const isAuthenticated = !!user && !error && !!token;

  const login = async (newToken) => {
    localStorage.setItem("jwtToken", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    setToken(null);
  };

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "jwtToken") {
        setToken(e.newValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const contextValue = {
    token,
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
