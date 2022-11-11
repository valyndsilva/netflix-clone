import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

import { useRouter } from "next/router";
import app, { auth, db } from "../config/firebase";

interface IAuth {
  user: User | null;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  reset: (email: string) => void;
  logout: () => Promise<void>;
  error: string | null;
  loading: boolean;
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  reset: async () => {},
  logout: async () => {},
  error: null,
  loading: false,
} as IAuth);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const router = useRouter();

  // Persisting the user
  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log(app);
          // Logged in...
          localStorage.setItem("user", JSON.stringify(user));
          // const uid = user.uid;
          setUser(user);
          setLoading(false);
          router.push("/browse");
        } else {
          // Not logged in...
          localStorage.removeItem("user");
          setUser(null);
          setLoading(true);
          router.push("/");
        }

        setInitialLoading(false);
      }),
    [auth]
  );

  const signUp = async (name: string, email: string, password: string) => {
    setLoading(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        const user = auth.currentUser;
        console.log(auth.currentUser);
        setUser(auth.currentUser);
        console.log(user);
        //  const user:User = userCredential.user;
        // setUser(user);
        updateProfile(auth.currentUser!, {
          displayName: name,
          photoURL: String(Math.floor(Math.random() * 5) + 1),
        });
        console.log(`User ${user!.displayName} registered successfully!`);
        addDoc(collection(db, "users"), {
          authProvider: "local",
          uid: user!.uid,
          name,
          email,
          displayName: name,
          photoURL: String(Math.floor(Math.random() * 5) + 1),
        });
        console.log(`Document added successfully!`);
        router.push("/browse");
        setLoading(false);
        return user;
      })
      .catch((error) => alert(`Error: ${error.message}`))
      .finally(() => setLoading(false));
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    console.log(loading);

    console.log("Signin in......");

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        userCredential.user && setUser(userCredential.user);
        router.push("/browse");
        setLoading(false);
        console.log("User has signed in successfully!");
      })
      .catch((error) => alert(`Error: ${error.message}`))
      .finally(() => setLoading(false));
  };

  const reset = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (error) {
      return error;
    }
  };

  const logout = async () => {
    setLoading(true);

    signOut(auth)
      .then(() => {
        setUser(null);
        localStorage.clear();
        router.push("/");
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false));
  };

  const memoedValue = useMemo(
    () => ({
      user,
      signUp,
      signIn,
      reset,
      loading,
      logout,
      error,
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
