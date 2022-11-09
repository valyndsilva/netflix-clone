import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useScrollPosition } from "../hooks/useScrollPosition";
import BrowseNav from "./BrowseNav";
import { useAuth } from "../hooks";

function Navbar() {
  const scrollPosition = useScrollPosition();
  // console.log("Scroll position: ", scrollPosition);
  const router = useRouter();
  const path = router?.asPath; // URL from router
  // console.log(path);

  const { user } = useAuth();
  // console.log(user);
  const showSignIn = () => {
    if (path === "/login" || path === "/signup") return null;
    if (path === "/" || path === "/reset")
      return (
        <Link href="/login">
          <div className="flex bg-[#e50914] w-20 h-fit text-white border-0 text-sm rounded-md py-2 px-4 cursor-pointer box-border hover:bg-[#f40612]">
            Sign In
          </div>
        </Link>
      );
    if (path === "/dashboard" || path === "/browse" || path === "/account")
      return <BrowseNav />;
  };

  const showLogo = () => {
    if (
      (!user && path === "/") ||
      (!user && path === "/login") ||
      (!user && path === "/reset") ||
      (!user && path === "/signup") ||
      (!user && path === "/browse") ||
      (!user && path === "/account")
    )
      return (
        <Link href="/">
          <div className="cursor-pointer relative h-10 w-24 md:w-24 md:h-20 mr-10 ml-5">
            <Image src="/logo.svg" layout="fill" objectFit="contain" />
          </div>
        </Link>
      );
    if (
      (user && path === "/") ??
      (user && path === "/login") ??
      (user && path === "/reset") ??
      (user && path === "/signup") ??
      (user && path === "/browse") ??
      (user && path === "/account")
    )
      return (
        <Link href="/browse">
          <div className="cursor-pointer relative h-10 w-24 md:w-24 md:h-20 mr-10 ml-5">
            <Image src="/logo.svg" layout="fill" objectFit="contain" />
          </div>
        </Link>
      );
    if (path === "/watch") return null;
  };

  return (
    <nav
      className={`${
        scrollPosition > 0 ? "bg-black shadow-md" : "bg-transparent"
      } fixed top-0 flex  w-full h-20 py-0 px-9  justify-between items-center  bg-gradient-to-t from-transparent to-black z-50`}
    >
      <>
        {showLogo()}
        {showSignIn()}
      </>
    </nav>
  );
}

export default Navbar;
