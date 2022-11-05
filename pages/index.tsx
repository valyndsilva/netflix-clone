import React, { useContext, useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { Faqs, Footer, Jumbotron, Hero } from "../components";
import { AuthContext } from "../context";
import { useRouter } from "next/router";
import { DASHBOARD_PAGE_PATH, HOME_PAGE_PATH } from "../config/paths";

const Home: NextPage = () => {
  const { user } = useContext(AuthContext);
  // console.log(user);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (!user) {
      router.push(HOME_PAGE_PATH);
      //  setLoading(false);
    }
    if (user) {
      console.log("Signed in! Navigate to browse page...");
      router.push(DASHBOARD_PAGE_PATH);
      setLoading(false);
    }
  }, [user, loading]);

  if (user) {
    // user is signed out or still being checked.
    // don't render anything
    router.push(DASHBOARD_PAGE_PATH);
  }
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
