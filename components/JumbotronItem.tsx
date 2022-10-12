import Image from "next/image";
import React from "react";

interface Props {
  direction: string;
  className: string;
  item: {
    id: number;
    className: string;
    title: string;
    subTitle: string;
    image: string;
    alt: string;
    animationVideo: string;
    animationImage: string;
    animationIcon: string;
    animationText1: string;
    animationText2: string;
    direction: string;
  };
}

function JumbotronItem({ item, direction, className }: Props) {
  return (
    <div className="flex flex-col lg:flex-row overflow-hidden border-b-8 border-[#222] py-28 px-[5%] relative jumbotronItem ">
      <div
        className={`${className} flex items-center justify-between max-w-[1100px] my-0 mx-auto flex-col md:flex-${direction} `}
        key={item.id}
      >
        <div className="h-full w-full py-0 pr-11 justify-center flex flex-col text-center lg:text-left md:w-1/2 z-30">
          <h1 className="leading-4 font-bold mb-2 text-2xl md:text-4xl xl:text-5xl ">
            {item.title}
          </h1>
          <h2 className="font-normal text-xl md:text-2xl  last-of-type:mb-14">
            {item.subTitle}
          </h2>
        </div>

        <div className="w-full md:w-1/2  border-box  h-full relative ">
          <div className="jumbotron_animationContainer mt-[-10%] mr-[-5%] mb-[-5%] ml-0 h-[100%] ">
            <div className="relative max-w-full z-20 h-[400px]">
              <Image
                src={item.image}
                alt={item.alt}
                objectFit="cover"
                layout="fill"
                className="border-0"
              />
            </div>
            <div className="jumbotron_animation">
              {item.animationVideo && (
                <video
                  className="jumbotron_animationVideo h-full w-full"
                  autoPlay
                  playsInline
                  muted
                  loop
                >
                  <source src={item.animationVideo} type="video/mp4" />
                </video>
              )}
              {item.animationImage && (
                <div className="h-[100%] w-[20%] jumbotron_animationImage ">
                  <Image
                    src={item.animationImage}
                    alt={item.alt}
                    layout="fill"
                    objectFit="contain"
                    className=""
                  />
                </div>
              )}
              {item.animationText1 && (
                <div className="flex-grow-1 flex-shrink-1 my-1 mx-0 jumbotron_animationText">
                  <div className="font-semibold text-sm">
                    {item.animationText1}
                  </div>
                  <div className="font-normal text-xs text-[#0071eb] ">
                    {item.animationText2}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JumbotronItem;
