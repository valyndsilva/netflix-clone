import React, { useContext} from "react";
import Link from "next/link";
import { ModalContext, TmdbContext } from "../context";
import { InfoOutlined, PlayArrow, VolumeUpOutlined } from "@mui/icons-material";
import { MovieItem, SeriesItem } from "../types/typings";

interface Props {
  item: MovieItem | SeriesItem | undefined;
}

function Controls({ item }: Props) {
  const {
    fetchDetail,
    setMediaTypeData,
    fetchVideo,
    setPlayTrailer,
    setIsFeatured,
    fetchFeatureRatings,
    featureRatingsData,
    setItemId,
  } = useContext(TmdbContext);
  // console.log({ item });

  const selectItem = (mediaType: string, id: number) => {
    setIsFeatured(true);
    setPlayTrailer(true);
    console.log("selectItem mediaType:", mediaType);
    setMediaTypeData(mediaType);
    setItemId(id);
    fetchDetail(mediaType, id);
    fetchVideo(mediaType, id);
    fetchFeatureRatings(mediaType, id);
  };

  // This function will be triggered when the mouse pointer is over the box
  const boxMouseOverHandler = (type: string, id: number) => {
    selectItem(type, id);
  };

  // This function will be triggered when the mouse pointer is moving out the box
  const boxMouseOutHandler = () => {
    setIsFeatured(false);
    setPlayTrailer(false);
  };

  const { setModalData, setIsModal } = useContext(ModalContext);

  const onClick = (data: MovieItem | SeriesItem) => {
    console.log(data);
    setModalData(data);
    setIsModal(true);
  };

  return (
    <div className="items-center w-full">
      <div className="flex relative items-center px-0 py-14 my-0 mr-0 justify-between ">
        <div className="flex items-center ml-14">
          <Link href="/watch">
            <div
              className="flex items-center justify-center cursor-pointer shadow-md bg-white text-black border-0 rounded-md max-w-[210px] font-bold text-md mr-3 py-3 pr-6 pl-3 transition ease-in duration-150 hover:bg-#c6c6c6]"
              onMouseOver={() => boxMouseOverHandler("movie", item!.id)}
              onMouseOut={() => boxMouseOutHandler()}
              onClick={() => {
                setIsFeatured(true);
                setPlayTrailer(true);
                selectItem("movie", item!.id);
              }}
            >
              <PlayArrow className="playIcon mr-1 h-9 w-9" />
              Play
            </div>
          </Link>
          <button
            className="flex items-center justify-center cursor-pointer shadow-md border-0 rounded-md max-w-[210px] font-bold text-md  mr-3 py-3 pr-6  pl-5 transition ease-in duration-150 hover:bg-#c6c6c6] bg-[#6d6d6e] text-[#f9f9f9] no-underline"
            onMouseEnter={() => {
              selectItem("movie", item!.id);
            }}
            onClick={() => {
              onClick(item!);
              setIsFeatured(true);
              selectItem("movie", item!.id);
            }}
          >
            <InfoOutlined className="moreIcon mr-1" />
            <span>More Info</span>
          </button>
        </div>
        <div className="flex h-fit justify-center items-center absolute right-0">
          <VolumeUpOutlined className="volumeUpIcon border-[1px] border-white p-2 rounded-full !w-10 !h-10 my-0 mr-[1.1vw] ml-0 hover:bg-[#6d6d6e]/40" />
          <span className=" border-[#dcdcdc] border-l-2 bg-[#333]/60 text-sm py-[0.5vw] px-2 flex items-center h-[3vw] w-full border-box">
            {featureRatingsData > 0 && (
              <span className="flex text-sm font-semibold bg-[#fb4f93] border-[1px] p-1 border-white rounded-full  mr-[3.25rem] w-7 h-7 text-center  items-center align-middle">
                {featureRatingsData}
              </span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Controls;
