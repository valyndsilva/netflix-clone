import React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  // To fix hydration UI mismatch issues
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
