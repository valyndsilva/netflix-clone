import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  
    header: string;
    body: string;
 
}

function Accordion({ header,body }: Props) {
  const [toggleShow, setToggleShow] = useState(false);
  return (
    <div
      className="text-white m-auto w-full max-w-[589px] md:max-w-6xl mx-0 mt-0 mb-2 first-of-type:mt-6"
    >
      <div
        className="cursor-pointer flex justify-between mb-[1px] font-normal text-xl md:text-2xl bg-[#303030] py-6 px-8 items-center w-full select-none"
        onClick={() => setToggleShow((prev) => !prev)}
      >
        {header}
        {toggleShow ? <CloseIcon /> : <AddIcon />}
      </div>
      {toggleShow ? (
        <div className="max-h-[1200px] text-lg md:text-xl font-normal bg-[#303030] py-3 px-5 whitespace-pre-wrap select-none">
          {body}
        </div>
      ) : null}
    </div>
  );
}

export default Accordion;
