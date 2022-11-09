import React, { useContext, useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { Faqs, Footer, Jumbotron, Hero } from "../components";
const Home: NextPage = () => {

  return (
    <div className="flex flex-col ">
      <Head>
        <title>Netflix Clone</title>
        <meta name="description" content="Netflix Clone built for case study" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative">
        <Hero />
        <Jumbotron />
        <Faqs />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
