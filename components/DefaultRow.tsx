import {
  Add,
  ArrowDropDown,
  PlayArrow,
  ThumbDownOffAlt,
  ThumbUpOffAlt,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Image from "next/image";
import React, { useContext } from "react";
import { ModalContext } from "../context/ModalContext";

interface Props {
  defaultRow?: boolean;
  item: any;
}

export default function DefaultRow({ defaultRow = true, item }: Props) {
  const card =
    "group flex flex-col flex-shrink-0 w-56 h-36 bg-[#252525] rounded-md mr-2 transition duration-300 ease-in z-10 cursor-pointer hover:transform hover:z-50  hover:scale-150 hover:shadow-lg";
  const longCard =
    "group flex flex-col flex-shrink-0 w-56 h-36 bg-[#252525] rounded-md mr-2 transition duration-400 ease-in-out z-10 cursor-pointer hover:transform hover:z-50  hover:scale-105 hover:shadow-lg";
  const style = defaultRow ? card : longCard;
  const infoStyle = defaultRow
    ? "min-h-fit bg-[#141414] hidden p-2"
    : "hidden w-full absolute bottom-0 p-2 z-50";
  console.log(item);
  const { title, poster, banner, rating, genre } = item;
  const image = defaultRow ? banner : poster;

  const { setModalData, setIsModal } = useContext(ModalContext);

  const onClick = (data:any) => {
    setModalData(data);
    setIsModal(true);
  };

  return (
    <div className={style}>
      <Image src={image} alt="img" className="group-hover:h-[85%] " />
      {/* <div className=" w-full h-full object-cover rounded-md group-hover:flex group-hover:flex-col group-hover:shadow-md group-hover:min-h-fit"> */}
      <div className={infoStyle}>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row justify-between">
            <IconButton aria-label="play">
              <PlayArrow />
            </IconButton>
            <IconButton aria-label="add">
              <Add />
            </IconButton>
            {defaultRow && (
              <>
                <IconButton aria-label="like">
                  <ThumbUpOffAlt />
                </IconButton>
                <IconButton aria-label="dislike">
                  <ThumbDownOffAlt />
                </IconButton>
              </>
            )}
          </div>
          <IconButton aria-label="dislike" onClick={() => onClick(item)}>
            <ArrowDropDown />
          </IconButton>
        </div>
        <div className="py-[2rem] px-[3rem]">
          <strong>{title}</strong>
          <div className="flex flex-row items-center flex-wrap">
            <span className="text-[#53d853] font-bold p-1 pl-0 ">{`${
              rating * 10
            }% match`}</span>
            {/* <span className={styles.regularText}>length </span> */}
          </div>
          {/* {renderGenre(genre)} */}
        </div>
      </div>
    </div>
  );
}

// function renderGenre(genre: Genre[]) {
//   return (
//     <div className="flex flex-row items-center flex-wrap">
//       {genre?.map((item, index) => {
//         const isLast = index === genre.length - 1;
//         return (
//           <div key={index} className="flex flex-row items-center flex-wrap">
//             <span className="font-normal">{item.name}</span>
//             {!isLast && <div className="text-white/80 py-0 px-1">&bull;</div>}
//           </div>
//         );
//       })}
//     </div>
//   );
// }
