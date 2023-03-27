import {
  Add,
  ArrowDropDown,
  PlayArrow,
  ThumbDownOffAlt,
  ThumbUpOffAlt,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { ModalContext } from "../context/ModalContext";

interface Props {
  index: number;
  item: any;
}

export default function FeaturedRow({ index, item }: Props) {
  const { title, poster, banner, rating, genre } = item;
  const [image, setImage] = useState<string>(poster);

  const { setModalData, setIsModal } = useContext(ModalContext);

  const onClick = (data: any) => {
    setModalData(data);
    setIsModal(true);
  };

  const onHover = () => {
    setImage(banner);
  };

  const onMouseOut = () => {
    setImage(poster);
  };

  return (
    <div className="flex flex-row items-center mr-10 ml-2 overflow-visible w-40 mt-[-3.5rem] mb-[-3.5rem]">
      <div className="font-sm font-extrabold stroke-slate-500 fill-black mr-[-2rem] mb-6 p-0 cursor-pointer">
        {index}
      </div>

      <div className="flex flex-col flex-shrink-0 w-[7.2rem] h-40 bg-[#252525] rounded-md mr-2 transition duration-300 ease-in z-30 cursor-pointer hover:transforn hover:scale-150 hover:w-56 hover:h-36 hover:rounded-md hover:z-40 hover:shadow-lg ">
        <Image
          src={image}
          alt="img"
          className="h-[85%]"
          onMouseOver={onHover}
          onMouseOut={onMouseOut}
        />

        <div className="flex flex-col shadow-md min-h-fit">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row justify-between">
              <IconButton aria-label="play">
                <PlayArrow />
              </IconButton>
              <IconButton aria-label="add">
                <Add />
              </IconButton>
              <IconButton aria-label="like">
                <ThumbUpOffAlt />
              </IconButton>{" "}
              <IconButton aria-label="dislike">
                <ThumbDownOffAlt />
              </IconButton>
            </div>
            <IconButton aria-label="dislike" onClick={() => onClick(item)}>
              <ArrowDropDown />
            </IconButton>
          </div>
          <div className="py-[2rem] px-[3rem]">
            <strong>{title}</strong>
            <div className="flex flex-row items-center flex-wrap">
              <span className="text-[#53d853] font-bold p-1 pl-0 ">
                {rating * 10}% Match
              </span>
              {/* <span className={styles.regularText}>length </span> */}
            </div>
            {/* {renderGenre(genre)} */}
          </div>
        </div>
      </div>
    </div>
  );
}

// function renderGenre(genre: Genre[]) {
//   return (
//     <div className="flex flex-row items-center flex-wrap">
//       {genre.map((item, index) => {
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
