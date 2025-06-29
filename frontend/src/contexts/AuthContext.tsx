import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {useRouter} from "next/navigation" 
import { User, AuthContextType } from "@/types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter()

  useEffect(() => {
    const savedUser = localStorage.getItem("readme-genie-user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      router.push("/")
    }
    setLoading(false);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("readme-genie-user", JSON.stringify(userData));
    router.push("/dashboard")
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("readme-genie-user");
    router.push("/")
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}