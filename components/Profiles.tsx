import Image from "next/image";
import React, { useContext } from "react";
import { AddCircle } from "@mui/icons-material";
import useAuth from "../hooks/useAuth";
import GlobalContext from "../context/GlobalContext";

function Profiles() {
  const { user } = useAuth();
  console.log(user);

  const { setProfile } = useContext(GlobalContext);
  const handleClick = () => {
    setProfile({
      displayName: user?.displayName!,
      photoURL: user?.photoURL!,
    });
    localStorage.setItem("displayName", user?.displayName!);
    localStorage.setItem("photoURL", user?.photoURL!);
  };
  return (
    <div className="flex flex-col text-center px-10 z-10 w-[100vw] ">
      <div className="flex flex-col justify-center items-center m-auto fixed top-0 right-0 bottom-0 left-0 text-center bg-[#141414]">
        <div className="w-full text-white text-5xl text-center font-medium">
          Who's watching?
        </div>
        <ul className="p-0 my-8 mx-0 flex flex-row">
          <li
            className="max-h-[200px] max-w-[200px] text-center mr-10 rounded-lg  cursor-pointer"
            onClick={handleClick}
          >
            <div className="relative w-[140px] h-[140px] max-w-[150px] cursor-pointer">
              <Image
                src={`/users/${user?.photoURL}.png`}
                layout="fill"
                objectFit="cover"
                className="border-3 border-black cursor-pointer rounded-xl hover:border-white "
              />
            </div>
            <p className="text-[#808080] overflow-ellipsis text-md hover:font-bold hover:text-[#e5e5e5]">
              {user?.displayName}
            </p>
          </li>
          <li className="flex flex-col items-center justify-between max-h-[200px] max-w-[200px] text-center no-underline rounded-lg mr-0 cursor-pointer">
            <div></div>
            <AddCircle className="cursor-pointer text-grey-400 h-28 w-28 !text-[6rem] hover:bg-[#e5e5e5] hover:rounded-md" />

            <p className="text-[#808080] overflow-ellipsis text-md hover:font-bold hover:text-[#e5e5e5]">
              Add Profile
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Profiles;
