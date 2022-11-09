import "../styles/globals.css";
import React, { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { AuthProvider } from "../hooks/useAuth";
import { TmdbProvider } from "../context/TmdbContext";
import { ModalProvider } from "../context/ModalContext";
import { GlobalProvider } from "../context/GlobalContext";
import app from "../config/firebase";

function MyApp({ Component, pageProps }: AppProps) {
  // To fix hydration UI mismatch issues
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  console.log("app :", app);
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
