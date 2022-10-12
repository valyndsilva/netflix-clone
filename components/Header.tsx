import Image from "next/image";
import Link from "next/link";
import React from "react";
import OptForm from "./OptForm";

interface Props {}

function Header({}: Props) {
  return (
    <div className="flex flex-col border-b-8 border-[#222] text-center py-36 px-10 z-10 w-[100vw] bg-home bg-cover bg-no-repeat bg-top-center">
      <div className="flex justify-between items-center z-[999] w-full h-20 py-0 px-9 fixed top-0 right-0 bg-gradient-to-t from-transparent to-black ">
        <div className="relative h-10 w-24 md:w-24 md:h-20 mr-10">
          <Image src="/logo.svg" layout="fill" objectFit="contain" />
        </div>
        <div className="flex bg-[#e50914] w-20 h-fit text-white border-0 text-sm rounded-md py-2 px-4 cursor-pointer box-border hover:bg-[#f40612]">
          <Link href="/login">Sign In</Link>
        </div>
      </div>
      <h2 className="text-white max-w-[640px] text-2xl md:text-5xl font-bold m-auto">
        Unlimited films, TV programmes and more.
      </h2>
      <h3 className="text-white text-xl md:text-2xl mt-5 mx-auto mb-2 md:mb-5">
        {" "}
        Watch anywhere. Cancel at any time.
      </h3>
      <OptForm />
    </div>
  );
}

export default Header;
