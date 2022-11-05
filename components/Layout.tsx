import React from "react";
import Head from "next/head";
import Navbar from "./Navbar";

interface Props {
  children?: React.ReactNode;
}
const Layout = ({ children }: Props) => {
  
  return (
    <>
      <Head>
        <title>Netflix Clone</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Netflix Clone for case study" />
      </Head>
      <Navbar />
      <main className="absolute w-full h-full top-0 right-0 left-0 ">
        {children}
      </main>
    </>
  );
};

export default Layout;
