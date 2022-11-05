import React from "react";
import { Footer, Reset } from "../components";

function reset() {
  return (
    <div className="flex flex-col h-[90vh] border-b-8 border-[rgb(34,34,34)] w-full text-center py-36 px-10 bg-home bg-cover bg-no-repeat bg-top-center">
      <Reset />
      <Footer />
    </div>
  );
}

export default Reset;
