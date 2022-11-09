import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  QuerySnapshot,
  setDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import apiConfig from "../config/apiConfig";
import { TmdbContext, ModalContext } from "../context";
import { useTimeConvert, useList } from "../hooks";
import { IconButton } from "@mui/material";
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  Check,
  KeyboardArrowDown,
} from "@mui/icons-material";
import toast from "react-hot-toast";
import { SlideRows } from "../types/typings";
import useAuth from "../hooks/useAuth";

interface Props {
  index: number;
  item: any;
  slideItem: SlideRows;
  top10: boolean | undefined;
  featuredRow: boolean | undefined;
}

export default function ListItem({
  index,
  item,
  slideItem,
  top10,
  featuredRow,
}: Props) {
  const { user } = useAuth();
  // const { user } = useContext(AuthContext);
  // console.log(user);
  const list = useList(user?.uid);
  // console.log(list);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [itemData, setItemData] = useState<DocumentData>([]);
  const [addedToList, setAddedToList] = useState(false);

  // console.log({ addedToList });
  // console.log({ itemData });

  const {
    trailerData,
    getTrailer,
    setPlayTrailer,
    playTrailer,
    selectItem,
    duration,
    ratingsData,
    setIsFeatured,
    numOfSeasons,
    setMyTvListItems,
    setMyMovieListItems,
    myTvListItems,
    myMovieListItems,
  } = useContext(TmdbContext);

  function truncate(str: string, n: number) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  const runTime = useTimeConvert(duration);
  //   console.log(runTime);

  //   const trailer =
  //     "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761";
  //   console.log(trailerData);

  // This function will be triggered when the mouse pointer is over the box
  const boxMouseOverHandler = (type: string, id: number) => {
    setIsHovered(true);
    setIsFeatured(false);
    setIsFeatured(false);
    setPlayTrailer(true);
    selectItem(type, id);
  };

  // This function will be triggered when the mouse pointer is moving out the box
  const boxMouseOutHandler = () => {
    setIsHovered(false);
    setPlayTrailer(false);
  };

  // Find all the items in the user's myList in firestore db
  useEffect(() => {
    if (user) {
      return onSnapshot(
        collection(db, "customers", user.uid, "myList"),
        (snapshot: QuerySnapshot<DocumentData>) => setItemData(snapshot.docs)
      );
    }
  }, [db, item?.id]);

  // Check if the movie is already in the user's list
  useEffect(
    () =>
      setAddedToList(
        itemData.findIndex((result: any) => result.data().id === item?.id) !==
          -1
      ),
    [itemData]
  );

  const toastStyle = {
    background: "white",
    color: "black",
    fontWeight: "bold",
    fontSize: "16px",
    padding: "15px",
    borderRadius: "9999px",
    maxWidth: "1000px",
  };

  const handleList = async () => {
    if (addedToList) {
      await deleteDoc(
        doc(db, "customers", user!.uid, "myList", item?.id.toString()!)
      );

      toast(
        `${item?.title || item?.original_name} has been removed from My List`,
        {
          duration: 8000,
          style: toastStyle,
        }
      );
    } else {
      await setDoc(
        doc(db, "customers", user!.uid, "myList", item?.id.toString()!),
        {
          ...item,
        }
      );

      toast(
        `${item?.title || item?.original_name} has been added to My List.`,
        {
          duration: 8000,
          style: toastStyle,
        }
      );
    }
  };

  useEffect(() => {
    const watchlistMovies = list.filter((result) => result.video === false);
    // console.log("watchlistMovies", watchlistMovies);
    setMyMovieListItems(watchlistMovies);

    const watchlistSeries = list.filter((result) => result.video === undefined);
    // console.log("watchlistSeries", watchlistSeries);
    setMyTvListItems(watchlistSeries);
  }, [list]);

  const { setModalData, setIsModal } = useContext(ModalContext);

  const onClick = (data: any) => {
    setModalData(data);
    setIsModal(true);
  };

  return (
    <div
      className={`${
        featuredRow === false &&
        top10 === false &&
        `w-[225px] h-[120px] relative bg-[#181818] mr-[5px] overflow-hidden cursor-pointer text-white hover:w-[325px] hover:h-[300px] hover:absolute hover:top-[-150px] hover:shadow-lg hover:rounded-lg hover:z-50 group transition duration-300 ease-in z-30 hover:transform`
      }
      ${
        featuredRow === true &&
        top10 === false &&
        `w-[225px] h-[385px] relative bg-[#181818] mr-[5px] overflow-hidden cursor-pointer text-white hover:w-[325px] hover:h-[400px] hover:absolute hover:top-0 hover:shadow-lg hover:rounded-lg hover:z-50 group transition duration-300 ease-in z-30 hover:transform`
      }
      ${
        featuredRow === false &&
        top10 === true &&
        `w-[225px] h-40 relative bg-[#181818] mr-[5px] overflow-hidden cursor-pointer text-white hover:w-[325px] hover:h-[300px] hover:absolute hover:top-[-100px]  hover:shadow-lg hover:rounded-lg hover:z-50 group transition duration-300 ease-in z-30 hover:transform`
      }
    `}
      // @ts-ignore
      style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
      key={item.id}
      onMouseOver={() => boxMouseOverHandler(slideItem.type, item.id)}
      onMouseOut={() => boxMouseOutHandler()}
    >
      {/* Default Row */}
      {featuredRow === false && top10 === false && (
        <div className="relative w-full h-full group-hover:h-[140px]">
          <Image
            className="rounded-md"
            layout="fill"
            objectFit="cover"
            src={
              item
                ? apiConfig.originalImage(item.backdrop_path)
                : apiConfig.unavailablePortrait
            }
          />
        </div>
      )}

      {/* Top 10 List */}
      {featuredRow === false && top10 === true && (
        <div className="flex rounded-md items-center">
          <span
            className={`${
              isHovered && "opacity-0"
            } text-[13rem] absolute font-extrabold cursor-pointer z-50  fontStyle `}
          >
            {index + 1}
          </span>

          <div
            className={`${
              isHovered && "opacity-0"
            } relative w-[7.2rem] h-40 ml-20 z-50`}
          >
            <Image
              layout="fill"
              objectFit="cover"
              src={
                item
                  ? apiConfig.originalImage(item.poster_path)
                  : apiConfig.unavailablePortrait
              }
            />
          </div>
        </div>
      )}

      {/* Featured Row item.poster_path.stringValue */}
      {featuredRow === true && top10 === false && (
        <div
          className={`${
            isHovered && "h-[140px]"
          } relative w-full h-full object-cover `}
        >
          <Image
            className="rounded-md"
            layout="fill"
            objectFit="cover"
            src={
              item
                ? apiConfig.originalImage(
                    item.poster_path ||
                      myMovieListItems?.poster_path ||
                      myTvListItems?.poster_path
                  )
                : apiConfig.noPicture
            }
          />
        </div>
      )}

      {isHovered && (
        <>
          {trailerData?.results?.length > 0 && playTrailer
            ? getTrailer()
            : "Sorry, No Trailer Available"}

          <div className="flex flex-col p-5 space-y-2">
            <div className="ml-2">
              {truncate(
                item.original_title ||
                  item.title ||
                  item.original_name ||
                  item.name,
                50
              )}
            </div>
            <div className="flex justify-between w-full">
              <div className="leftControls ">
                <IconButton>
                  <Link href="/watch">
                    <PlayArrow
                      className="!w-9 !h-9 bg-white text-black hover:bg-[#e6e6e6] border-2 border-white p-1 rounded-full "
                      onClick={() => {
                        setPlayTrailer(true);
                      }}
                    />
                  </Link>
                </IconButton>
                {addedToList ? (
                  <IconButton className="checkBtn" onClick={handleList}>
                    <Check className="checkIcon !w-9 !h-9 text-white border-2 border-white p-1 rounded-full " />
                  </IconButton>
                ) : (
                  <IconButton
                    className="addBtn"
                    disabled={addedToList}
                    onClick={handleList}
                  >
                    <Add className="addIcon !disabled:bg-white !disabled:text-black !disabled:border-white  !w-9 !h-9 text-white border-2 border-white p-1 rounded-full" />
                  </IconButton>
                )}

                <IconButton>
                  <ThumbUpAltOutlined className=" !w-9 !h-9 text-white border-2 border-white p-1 rounded-full" />
                </IconButton>
              </div>

              <IconButton aria-label="dislike" onClick={() => onClick(item)}>
                <KeyboardArrowDown className="checkIcon !w-9 !h-9 text-white border-2 border-white p-1 rounded-full " />
              </IconButton>
            </div>

            <div className="flex w-full space-x-4 items-center ml-2  mb-2 text-sm text-gray-500">
              <span className="percentValue text-[#45d369] font-semibold py-[1px] pr-[3px] pl-0">
                {`${item.vote_average * 10}% match`}
              </span>
              {ratingsData > 0 && (
                <span className="maturityValue bg-[#fb4f93] text-white border-[1px] border-white rounded-full  p-2 w-7 h-7 align-middle flex justify-center items-center text-center ml-2">
                  {ratingsData}
                </span>
              )}

              <span className="lengthValue text-white py-[1px] px-[3px] ml-1">
                {slideItem.type === "movie"
                  ? runTime
                  : numOfSeasons > 1
                  ? `${numOfSeasons} Seasons`
                  : `${numOfSeasons} Season`}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
