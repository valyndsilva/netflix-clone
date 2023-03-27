import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";
import React, { useRef, useState } from "react";
import ListItem from "./ListItem";

interface Props {
  slideItem: SlideRows;
}

export default function ListRow({ slideItem }: Props) {
  const [isMoved, setIsMoved] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);
  // console.log(slideItem);
  const listItemRef = useRef<HTMLDivElement>(null);

  const handleClick = (direction: string) => {
    if (listItemRef.current !== null) {
      setIsMoved(true);
      const distance = listItemRef.current.getBoundingClientRect().x - 50;
      if (direction === "left" && slideNumber > 0) {
        setSlideNumber(slideNumber - 1);
        listItemRef.current.style.transform = `translateX(${230 + distance}px)`;
      }
      if (direction === "right" && slideNumber < 5) {
        setSlideNumber(slideNumber + 1);
        listItemRef.current.style.transform = `translateX(${
          -230 + distance
        }px)`;
      }
    }
  };

  return (
    <div className="w-[100vw] mt-2 mb-7">
      <span className="text-white text-xl font-medium mt-0 ml-12 mb-2">
        {slideItem.title}
      </span>
      <div className="relative group">
        <span
          className={`${
            !isMoved && "hidden"
          } flex h-full w-[50px] bg-black/60 text-white absolute top-0 bottom-0 left-0 m-auto cursor-pointer items-center justify-center z-50 opacity-0 transition  group-hover:opacity-100`}
          onClick={() => handleClick("left")}
        >
          <ArrowBackIosOutlined className="w-[50px]" />
        </span>
        <div
          className="ml-[50px] flex mt-[10px] w-max transform translate-x-0 transition duration-200  ease-in z-40"
          ref={listItemRef}
        >
          {slideItem?.data?.map((item, index) => (
            <ListItem
              index={index}
              key={index}
              item={item}
              slideItem={slideItem}
              top10={slideItem.top10}
              featuredRow={slideItem.featuredRow}
            />
          ))}
        </div>
        <span
          className="flex h-full w-[50px] bg-black/60 text-white absolute top-0 bottom-0 right-[15px] m-auto cursor-pointer items-center justify-center z-50 md:opacity-0 transition  md:group-hover:opacity-100"
          onClick={() => handleClick("right")}
        >
          <ArrowForwardIosOutlined className="w-[50px]" />
        </span>
      </div>
    </div>
  );
}
