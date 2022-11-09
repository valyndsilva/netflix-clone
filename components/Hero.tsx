import React from "react";
import OptForm from "./OptForm";

function Hero() {
  return (
    <div className="flex flex-col h-[80vh] border-b-8 border-[rgb(34,34,34)] w-full text-center py-36 px-10 bg-home bg-cover bg-no-repeat bg-top-center">
      <h2 className="text-white max-w-[640px] text-2xl md:text-5xl font-bold m-auto">
        Unlimited films, TV programmes and more.
      </h2>
      <h3 className="text-white text-xl md:text-2xl mt-5 mx-auto mb-2">
        Watch anywhere. Cancel at any time.
      </h3>
      <OptForm />
    </div>
  );
}

export default Hero;
