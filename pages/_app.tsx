import "../styles/globals.css";
import React, { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import useAuth, { AuthProvider } from "../hooks/useAuth";
import { TmdbProvider } from "../context/TmdbContext";
import { ModalProvider } from "../context/ModalContext";
import { GlobalProvider } from "../context/GlobalContext";


function MyApp({ Component, pageProps }: AppProps) {
  const { user, loading } = useAuth();
  // console.log(user);
  // To fix hydration UI mismatch issues
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <GlobalProvider>
      <AuthProvider>
        <ModalProvider>
          <TmdbProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </TmdbProvider>
        </ModalProvider>
      </AuthProvider>
    </GlobalProvider>
  );
}

export default MyApp;
