"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [tokens, setTokens] = useState({ access: null, refresh: null });

  const login = (userData, tokenData) => {
    setUser(userData);
    setTokens(tokenData);

    // Persist tokens in local storage for session persistence
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("tokens", JSON.stringify(tokenData));
  };

  const logout = () => {
    setUser(null);
    setTokens({ access: null, refresh: null });
    localStorage.removeItem("user");
    localStorage.removeItem("tokens");
  };

  useEffect(() => {
    // Load user and tokens from localStorage on page refresh
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedTokens = JSON.parse(localStorage.getItem("tokens"));

    if (storedUser && storedTokens) {
      setUser(storedUser);
      setTokens(storedTokens);
    } else {
      // Redirect to login if no tokens are found in localStorage
      // You can also clear any stale data
      logout();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, tokens, login, logout, setUser, setTokens }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
