"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<{
    user: User | null;
    token: string | null;
    loading: boolean;
  }>({
    user: null,
    token: null,
    loading: true,
  });

  const router = useRouter();

  useEffect(() => {
    const initAuth = () => {
      const savedToken = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");

      setAuthState({
        token: savedToken,
        user: savedUser ? JSON.parse(savedUser) : null,
        loading: false,
      });
    };
    initAuth();
  }, []);

  const login = useCallback(
    (newToken: string, userData: User) => {
      setAuthState({
        token: newToken,
        user: userData,
        loading: false,
      });
      localStorage.setItem("token", newToken);
      localStorage.setItem("user", JSON.stringify(userData));
      Cookies.set("token", newToken, { expires: 7 });
      router.push("/"); // Redirigir al home tras login
    },
    [router],
  );

  const logout = useCallback(() => {
    setAuthState({
      token: null,
      user: null,
      loading: false,
    });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    Cookies.remove("token");
    router.push("/login");
  }, [router]);

  const value = useMemo(
    () => ({
      user: authState.user,
      token: authState.token,
      login,
      logout,
      loading: authState.loading,
    }),
    [authState, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook personalizado para usar el contexto más fácil
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  return context;
};
