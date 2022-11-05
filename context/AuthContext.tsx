import React, { useState, useEffect, createContext, ReactNode } from "react";
import nookies from "nookies";
import { auth } from "../config/firebaseClient";
import { User } from "firebase/auth";

interface AuthProviderProps {
  children: ReactNode;
}
interface AuthContextState {
  user: User | null;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: any) => void;
  firstName: string;
  setFirstName: (firstName: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
}
// export const AuthContext = createContext<{ user: User | null }>({
export const AuthContext = createContext<AuthContextState>(
  {} as AuthContextState
);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).nookies = nookies;
    }
    return auth.onIdTokenChanged(async (user) => {
      // console.log(user);
      // console.log(`token changed!`);
      if (!user) {
        // console.log(`no token found...`);
        setUser(null);
        nookies.destroy(null, "token");
        nookies.set(null, "token", "", { path: "/" });
        return;
      }

      // console.log(`updating token...`);
      const token = await user.getIdToken();

      setUser(user);
      nookies.destroy(null, "token");
      nookies.set(null, "token", token, { path: "/" });
    });
  }, []);

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      // console.log(`refreshing token...`);
      const user = auth.currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);
    return () => clearInterval(handle);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        setLoading,
        error,
        setError,
        firstName,
        setFirstName,
        email,
        setEmail,
        password,
        setPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
