import React from "react";
import Head from "next/head";

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
      <div className="flex flex-col h-screen  overflow-y-scroll overflow-x-hidden z-0 scrollbar-thin  scrollbar-track-slate-500/20 scrollbar-thumb-teal-400/80 snap-y snap-mandatory">
        <main className="flex-grow">{children}</main>
      </div>
    </>
  );
};

export default Layout;
