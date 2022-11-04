import React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { AuthProvider } from "../context/AuthContext";
import { TmdbProvider } from "../context/TmdbContext";
import { ModalProvider } from "../context/ModalContext";

function MyApp({ Component, pageProps }: AppProps) {
  // To fix hydration UI mismatch issues
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <AuthProvider>
      <ModalProvider>
        <TmdbProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </TmdbProvider>
      </ModalProvider>
    </AuthProvider>
  );
}

export default MyApp;
