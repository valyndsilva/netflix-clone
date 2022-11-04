import React, { useContext } from "react";
import { ArrowBackOutlined } from "@mui/icons-material";
import TmdbContext from "../context/TmdbContext";
import YouTube from "react-youtube";
import Link from "next/link";

export default function Watch() {
  const { trailerData, playTrailer, setVideoKey } = useContext(TmdbContext);

  const getWatchTrailer = () => {
    const trailer = trailerData?.results.find(
      (vid: any) =>
        vid.name === "Official Trailer" || vid.name === "Official Teaser"
    );

    // console.log(trailer);
    // const videoSrc = "/videos/trailer.mp4";
    const key = trailer ? trailer.key : trailerData.results[0].key;
    // console.log("Youtube trailer key:", key);
    setVideoKey(key);
    // const trailerSrc = `https://www.youtube.com/watch?v=${videoKey}`;
    // console.log(trailerSrc);

    return (
      <YouTube
        videoId={key}
        className={"w-full h-full object-cover z-20 absolute top-0 left-0"}
        opts={{
          width: "100%",
          height: "100%",
          playerVars: {
            autoplay: 0,
            controls: 0,
            cc_load_policy: 0,
            fs: 0,
            iv_load_policy: 0,
            loop: 0,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            origin: "http://www.localhost.com",
          },
        }}
      />
    );
  };
  return (
    <div className="w-full h-full">
      <Link href="/browse">
        <div className="flex space-x-4 z-50 items-center absolute top-[10px] left-[10px] cursor-pointer text-white font-bold bg-black/80 p-[15px]">
          <ArrowBackOutlined className="!w-10 !h-10 " />
          <span>Home</span>
        </div>
      </Link>
      {trailerData?.results?.length > 0 && playTrailer ? (
        getWatchTrailer()
      ) : (
        <div className="w-full z-20 absolute top-1/2 text-center text-4xl">
          Sorry, No Trailer Available!
        </div>
      )}
    </div>
  );
}
