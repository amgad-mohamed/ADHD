"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { User, authAPI, authStorage } from "@/lib/auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    role: "user" | "doctor" | "parent"
  ) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for existing token and user on app load
    const token = authStorage.getToken();
    const savedUser = authStorage.getUser();

    if (token && savedUser) {
      // Verify token is still valid
      authAPI
        .getCurrentUser(token)
        .then((currentUser) => {
          setUser(currentUser);
          authStorage.setUser(currentUser);
        })
        .catch(() => {
          // Token is invalid, clear storage
          authStorage.clear();
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authAPI.login({ email, password });
      authStorage.setToken(response.token);
      authStorage.setUser(response.user);
      setUser(response.user);
      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login failed");
      throw error;
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    role: "user" | "doctor" | "parent"
  ) => {
    try {
      const response = await authAPI.register({ name, email, password, role });
      authStorage.setToken(response.token);
      authStorage.setUser(response.user);
      setUser(response.user);
      toast.success("Registration successful!");
      router.push("/dashboard");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Registration failed"
      );
      throw error;
    }
  };

  const logout = () => {
    authStorage.clear();
    setUser(null);
    toast.success("Logged out successfully");
    router.push("/");
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      authStorage.setUser(updatedUser);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
