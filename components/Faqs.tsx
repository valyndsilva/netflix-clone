import React, { useState } from "react";
import faqsData from "../json/faqs.json";
import OptForm from "./OptForm";
import Accordion from "./Accordion";

interface Props {}

function Faqs({}: Props) {
  const [toggleShow, setToggleShow] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center border-b-8 border-[#222] pb-20">
      <div className="flex flex-col w-full max-w-5xl pt-16 px-5 md:px-11">
        <div className="justify-center flex flex-col items-center max-w-5xl my-6 mx-auto w-[90%] md:mb-10">
          <h1 className="leading-4 mt-0 mb-2 text-white text-center  font-bold text-2xl md:text-4xl">
            Frequently Asked Questions
          </h1>

          {faqsData.map((item) => (
            <Accordion key={item.id} header={item.header} body={item.body} />
          ))}
        </div>
      </div>
      <OptForm />
    </div>
  );
}

export default Faqs;
