import React from "react";
import { ChevronRight } from "@mui/icons-material";
interface Props {}

function OptForm({}: Props) {
  return (
    <div className="flex flex-col md:flex-row items-center text-center justify-center flex-wrap h-full max-w-[950px] pt-3 mx-auto">
      <p className="text-white  mb-4 py-0 px-[10%] text-md md:text-lg">
        Ready to watch? Enter your email to create or restart your membership.
      </p>
      <input
        type="email"
        placeholder="Email address"
        className="w-full max-w-[450px] border-0 p-2  h-12 md:h-14 xl:h-16 box-border outline-none focus-none"
      />
      <button
        type="submit"
        className="flex justify-center items-center h-10 md:h-14 xl:h-16 bg-[#e50914] text-white py-0 px-8 mt-5 md:mt-0 text-sm md:text-2xl md:border-0 md:border-l-[1px] md:border-[#333] cursor-pointer hover:bg-[#f40612]"
      >
        Get Started <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
}

export default OptForm;
