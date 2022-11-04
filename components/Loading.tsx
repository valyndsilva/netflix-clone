import Image from "next/image";
import React from "react";

interface Props {
  src: any;
}
export default function Loading({ src }: Props) {
  return (
    <div className="relative overflow-hidden">
      <div className="spinner">
        <div className="relative w-[50px] h-[50px] top-1/2 left-1/2 mt-[-100px] ml-[-22px]">
          <Image
            className="absolute"
            src={`/users/${src}.png`}
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
    </div>
  );
}

Loading.ReleaseBody = function LoadingReleaseBody() {
  return <div className="overflow-visible" />;
};
