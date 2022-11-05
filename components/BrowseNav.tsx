import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { auth, logOut } from "../config/firebaseClient";
import { AuthContext, TmdbContext } from "../context";
import { useSubscription } from "../hooks";
import {
  ArrowDropDown,
  InfoOutlined,
  PersonOutlined,
  EditOutlined,
  NotificationsActive,
} from "@mui/icons-material";
import Search from "./Search";
import MobileMenu from "./MobileMenu";

function BrowseNav() {
  const { setCategory } = useContext(TmdbContext);
  const { user } = useContext(AuthContext);
  const subscription = useSubscription(user);
  const router = useRouter();

  return (
    <div className="flex w-full justify-between h-full">
      <MobileMenu />
      <div
        className={`${
          subscription !== undefined
            ? "invisible md:visible md:inline-flex gap-4 text-sm items-center"
            : "invisible"
        }`}
      >
        <p className="cursor-pointer" onClick={() => setCategory("home")}>
          Home
        </p>
        <p className="cursor-pointer" onClick={() => setCategory("series")}>
          Series
        </p>
        <p className="cursor-pointer" onClick={() => setCategory("movies")}>
          Films
        </p>
        <p className="cursor-pointer" onClick={() => setCategory("trending")}>
          New & Popular
        </p>
        <p className="cursor-pointer" onClick={() => setCategory("myList")}>
          My List
        </p>
        <p className="cursor-pointer">Browse By Language</p>
      </div>
      <div className="flex items-center text-white text-sm">
        {subscription !== undefined && <Search />}

        <div className="flex items-center ml-5">
          <p className="text-white no-underline mr-5 text-sm cursor-pointer hover:font-medium active:font-bold">
            Hi, {user?.displayName}!
          </p>
          {subscription !== undefined && (
            <NotificationsActive className="notificationsIcon" />
          )}
          <div className="relative ml-3 mr-2 w-8 h-8">
            <Image
              layout="fill"
              objectFit="contain"
              className={`w-8 h-8 rounded-md cursor-pointer border-0 bg-contain`}
              src={`/users/${user?.photoURL}.png`}
            />
          </div>
          <div className="group">
            <ArrowDropDown className="dropdownIcon !w-8 !h-8 cursor-pointer transition duration-200 hover:rotate-180" />
            <div className="absolute shadow-md invisible group-hover:visible bg-black py-5 px-3 w-56 top-14 right-10 ">
              <div className="flex items-center mb-2">
                <div className="relative ml-3 mr-2 w-8 h-8">
                  <Image
                    layout="fill"
                    objectFit="contain"
                    className={`rounded-md cursor-default border-0`}
                    src={`/users/${user?.photoURL}.png`}
                  />
                </div>
                <p className="text-white text-left no-underline mr-5 text-sm cursor-pointer hover:font-medium active:font-bold">
                  {user?.displayName}
                </p>
              </div>
              <div className="flex flex-col cursor-pointer mb-0 px-3 space-y-4 text-left">
                <p className="text-white no-underline mr-5 text-sm cursor-pointer hover:font-medium active:font-bold mt-2 gap-4 flex items-center">
                  <EditOutlined /> Manage Profiles
                </p>

                <Link href="/account">
                  <p className="text-white no-underline mr-5 text-sm cursor-pointer hover:font-medium active:font-bold  gap-4 flex items-center">
                    <PersonOutlined /> Account
                  </p>
                </Link>
                <p className="text-white no-underline mr-5 text-sm cursor-pointer hover:font-medium active:font-bold  gap-4 flex items-center">
                  <InfoOutlined /> Help Center
                </p>
                <hr className=" border-slate-600" />
                {/* <p
                  className="text-white no-underline mr-5 text-sm cursor-pointer hover:font-medium active:font-bold"
                  onClick={logOut}
                >
                  Sign out of Netflix
                </p> */}
                <p
                  className="text-white no-underline mr-5 text-sm cursor-pointer hover:font-medium active:font-bold"
                  onClick={async () => {
                    await auth.signOut().then(() => {
                      router.push("/");
                    });
                  }}
                >
                  Sign out of Netflix
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrowseNav;
