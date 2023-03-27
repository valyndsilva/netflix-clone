/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useState } from "react";
import { ModalContext } from "../context/ModalContext";
import { IconButton } from "@mui/material";
import {
  Add,
  Close,
  PlayArrow,
  ThumbUpOffAlt,
  VolumeUp,
  Check,
} from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import TmdbContext from "../context/TmdbContext";
import { useTimeConvert } from "../hooks";
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import useList from "../hooks/useList";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import { apiConfig } from "../utils/constants";

export default function Modal() {
  const [itemData, setItemData] = useState<DocumentData>([]);
  const [addedToList, setAddedToList] = useState(false);
  console.log({ addedToList });
  console.log({ itemData });
  const { user } = useAuth();
  // const { user } = useContext(AuthContext);
  // console.log(user);
  const list = useList(user?.uid);
  // console.log(list);
  const {
    selectValue,
    setSelectValue,
    setIsHovered,
    isFeatured,
    selectItem,
    setPlayTrailer,
    creditsData,
    genreData,
    ratingsData,
    featureRatingsData,
    similarData,
    mediaTypeData,
    seasonsData,
    episodesData,
    duration,
    truncate,
    setMyTvListItems,
    setMyMovieListItems,
  } = useContext(TmdbContext);

  const { modalData, setIsModal, isModal } = useContext(ModalContext);

  // console.log(modalData);
  // const [selectValue, setSelectValue] = useState("Select Season");

  function handleSelectValue(e: any) {
    setSelectValue(e.target.value);
  }

  const baseImgUrl = "https://image.tmdb.org/t/p/original/";

  const runTime = useTimeConvert(duration);
  //   console.log(runTime);

  // Find all the movies in the user's list
  useEffect(() => {
    if (user) {
      return onSnapshot(
        collection(db, "customers", user.uid, "myList"),
        (snapshot) => setItemData(snapshot.docs)
      );
    }
  }, [db, modalData?.id]);

  // Check if the movie is already in the user's list
  useEffect(
    () =>
      setAddedToList(
        itemData.findIndex(
          (result: any) => result.data().id === modalData?.id
        ) !== -1
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
        doc(db, "customers", user!.uid, "myList", modalData?.id.toString()!)
      );

      toast(
        `${
          modalData?.title || modalData?.original_name
        } has been removed from My List`,
        {
          duration: 4000,
          style: toastStyle,
        }
      );
    } else {
      await setDoc(
        doc(db, "customers", user!.uid, "myList", modalData?.id.toString()!),
        {
          ...modalData,
        }
      );

      toast(
        `${
          modalData?.title || modalData?.original_name
        } has been added to My List.`,
        {
          duration: 4000,
          style: toastStyle,
        }
      );
    }
  };

  console.log(addedToList);

  useEffect(() => {
    const watchlistMovies = list.filter((result) => result.video === false);
    console.log("watchlistMovies", watchlistMovies);
    setMyMovieListItems(watchlistMovies);

    const watchlistSeries = list.filter((result) => result.video === undefined);
    console.log("watchlistSeries", watchlistSeries);
    setMyTvListItems(watchlistSeries);
  }, [list]);

  return (
    <div
      className="flex fixed top-0 left-0 justify-center z-50 w-[100vw] h-[100vh] rounded-lg"
      style={{ display: isModal ? "flex" : "none" }}
    >
      {/* Overlay Background */}
      <div
        className="w-[100vw] h-[100vh] bg-black/50 fixed top-0 left-0 z-40"
        onClick={() => setIsModal(false)}
      ></div>
      {/* Modal Box */}
      <div className="bg-[#181818] text-white z-50 min-w-[55%] max-w-[90%] md:max-w-[70%] lg:max-w-[60%] h-[90vh] relative self-center justify-self-center rounded-md border-2 border-white overflow-y-scroll">
        <div
          className="absolute top-[5%] right-0 cursor-pointer  py-1 px-2 rounded-full z-40"
          onClick={() => setIsModal(false)}
        >
          <IconButton aria-label="close">
            <Close className=" bg-[#141414]/70 text-white p-2 rounded-full !w-10 !h-10 my-0 mr-[1.1vw] ml-0 hover:bg-[#6d6d6e]/40" />
          </IconButton>
        </div>
        {/* Feature Image */}
        <div className="relative top-0 left-0 w-full h-[60vh] z-0 object-fill bg-gradient-to-b from-[#141414] to-transparent">
          <Image
            layout="fill"
            objectFit="cover"
            key={modalData?.id}
            // onClick={() => handleClick(modalData)}
            src={`${baseImgUrl}${modalData?.backdrop_path}`}
            alt={modalData?.original_title}
          />
          <div className="h-20 absolute bottom-0 opacity-90 w-full bg-gradient bottomFade "></div>
          {/* Feature Controls */}
          <div className="flex">
            <div className="absolute bottom-[50px] z-10 w-full pl-11 mb-3 md:mb-0 mt-16 flex flex-col text-center self-end justify-center md:text-start md:self-center md:justify-end justify-self-center">
              <div className="font-semibold p-2">{modalData.title}</div>
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <Link href="/watch" className="!no-underline">
                    <div
                      className="flex items-center justify-center cursor-pointer shadow-md bg-white text-black border-0 rounded-md max-w-[210px] font-bold text-lg mr-3 py-1 pr-8 pl-4 transition ease-in duration-150 hover:bg-#c6c6c6] "
                      onMouseEnter={() => {
                        setIsHovered(true);
                        setPlayTrailer(true);
                        selectItem(mediaTypeData, modalData?.id);
                      }}
                      onMouseLeave={() => {
                        setIsHovered(false);
                        setPlayTrailer(false);
                      }}
                      onClick={() => {
                        setIsHovered(true);
                        setPlayTrailer(true);
                        selectItem(mediaTypeData, modalData?.id);
                      }}
                    >
                      <PlayArrow className="playIcon mr-1 !h-8 !w-8" />
                      Play
                    </div>
                  </Link>
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

                  <IconButton aria-label="like">
                    <ThumbUpOffAlt className=" bg-[#141414]/70 border-2 border-gray-300 text-gray-300 p-2 rounded-full !w-10 !h-10 my-0 ml-0 hover:bg-[#6d6d6e]/40 hover:border-white hover:text-white" />
                  </IconButton>
                </div>
                <div className="absolute right-[4%]">
                  <VolumeUp className=" bg-[#141414]/70 border-2 border-gray-300 text-gray-300 p-2 rounded-full !w-10 !h-10 hover:bg-[#6d6d6e]/40 hover:border-white hover:text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between py-0 px-4 pl-11 mt-5">
          {/* Left Side */}
          <div className="w-[60%] text-sm flex-1 items-end">
            <div className="flex items-center mb-2 text-sm font-semibold text-white space-x-4">
              <span className="text-[#45d369] font-semibold ">
                {`${modalData.vote_average * 10}% match`}
              </span>

              <span className="release_date">
                {parseInt(
                  modalData?.release_date || modalData?.first_air_date || "-"
                )}
              </span>
              <span className="flex bg-[#fb4f93] border-[1px] p-1 border-white rounded-full  w-7 h-7 text-center  items-center align-middle">
                {isFeatured ? featureRatingsData : ratingsData}
              </span>
              <span className="lengthValue text-white py-[1px] px-[3px]">
                {runTime}
              </span>
            </div>
            <span className="description text-sm mb-2">
              {modalData?.overview}
            </span>
          </div>
          {/* Right Side */}
          <div className="text-sm w-[40%] flex-1 items-start ml-7">
            <p className="mb-4">
              <span>
                <span className="text-[#777] whitespace-nowrap">Cast:</span>{" "}
                {creditsData}
              </span>
            </p>
            <p>
              <span>
                <span className="text-[#777] whitespace-nowrap">Genres</span>{" "}
                {genreData}
              </span>
            </p>
          </div>
        </div>

        {/* Series Episodes */}
        {mediaTypeData === "tv" && (
          <div className="p-4 flex items-center justify-center flex-col">
            <div className="flex items-center justify-between flex-1 mt-4 p-4 w-full">
              <span>Episodes</span>
              <span>
                Season:
                <select
                  value={selectValue}
                  onChange={handleSelectValue}
                  className="bg-[#141414] border-[1px] rounded-sm ml-2"
                >
                  {seasonsData.map((el: any) => (
                    <option key={el.id} value={el.name}>
                      {el.name}
                    </option>
                  ))}
                </select>
              </span>
            </div>

            <ul>
              {episodesData.map((el: any) => (
                <li
                  className="flex bg-[#333333] mt-3 py-5 w-full list-none"
                  key={el.id}
                >
                  <div className="grid grid-cols-8 gap-2 items-center ">
                    <div className="col-span-1 text-center">
                      {el.episode_number}
                    </div>
                    <div className="col-span-2">
                      <div className="relative w-[150px] h-[100px]">
                        <Image
                          layout="fill"
                          objectFit="cover"
                          src={`${baseImgUrl}${el.still_path}`}
                        />
                      </div>
                    </div>
                    <div className="col-span-4">
                      <h4>{el.name}</h4>
                      <p className="text-sm text-gray-300">{el.overview}</p>
                    </div>
                    <div className="col-span-1 text-center">{el.runtime}m</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* About Movie / Series */}
        <div className="px-11">
          <p className="title font-normal text-2xl mt-12 mb-5">
            <span>
              More About &nbsp;
              {modalData?.original_title ||
                modalData?.title ||
                modalData?.original_name ||
                modalData?.original_name}
            </span>
          </p>
          <p className="cast text-sm leading-5 m-2 ml-0 break-words">
            <span>
              <span className="text-[#777] mr-4 whitespace-nowrap">Cast: </span>{" "}
              {creditsData}
            </span>
          </p>
          <p className="genres  text-sm leading-5 m-2 ml-0 break-words">
            <span>
              <span className="text-[#777] mr-4 whitespace-nowrap">
                Genres:{" "}
              </span>{" "}
              {genreData}
            </span>
          </p>
          <p className="flex ratings  text-sm leading-5 m-2 ml-0 break-words">
            <span className="text-[#777] mr-4 whitespace-nowrap">
              Maturity rating:
            </span>
            <span className="text-sm font-semibold flex bg-[#fb4f93] border-[1px] p-1 border-white rounded-full  w-7 h-7 text-center  items-center align-middle">
              {isFeatured ? featureRatingsData : ratingsData}
            </span>
          </p>
        </div>

        {/* More Like This */}
        <div className="px-11">
          <p className="title text-2xl font-normal mt-12 mb-5">
            More Like This
          </p>
          <div className="w-full h-[15vh] mt-3 mb-7 z-90 flex flex-row flex-wrap">
            {similarData!
              .map((item: any, index: React.Key | null | undefined) => (
                <div
                  className="flex-grow basis-[25%] h-fit mr-1 bg-[#2f2f2f] m-2"
                  key={index}
                >
                  {item.backdrop_path ? (
                    <div className="relative w-full h-[200px]">
                      <Image
                        layout="fill"
                        objectFit="cover"
                        className="z-10 h-[140px]"
                        src={apiConfig.originalImage(
                          item.backdrop_path || item.poster_path
                        )}
                      />
                    </div>
                  ) : null}

                  <div className="flex flex-col p-4 relative">
                    <div className="cotentModal mb-2 flex items-center justify-between">
                      <>
                        {truncate(
                          item.original_name || item.original_title,
                          20
                        )}
                        <span className="release_date">
                          {parseInt(
                            item?.release_date || item?.first_air_date || "-"
                          )}
                        </span>
                        &nbsp;
                        <Add className="addIcon border-1 border-[#919191] bg-[#232323] text-white p-2 rounded-full mr-2 !h-10 !w-10 hover:border-white hover:bg-[#303030]" />
                      </>
                    </div>

                    <div className="flex items-center mb-2 text-sm font-semibold text-white space-x-2">
                      <span className="percentValue text-[#45d369] font-semibold">
                        {`${item.vote_average * 10}% match`}
                      </span>
                    </div>
                    <span className="description">
                      {truncate(item.overview, 80)}
                    </span>
                  </div>
                </div>
              ))
              .splice(0, 12)}
          </div>
        </div>
      </div>
    </div>
  );
}
