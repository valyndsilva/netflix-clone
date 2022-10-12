import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { Faqs, Footer, Header, Jumbotron } from "../components";

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Head>
        <title>Netflix Clone</title>
        <meta name="description" content="Netflix Clone built for case study" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Jumbotron />
      <Faqs />
      <Footer />
    </div>
  );
};

export default Home;
