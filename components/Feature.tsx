import React, { useContext, useEffect } from "react";
import TmdbContext from "../context/TmdbContext";
import Controls from "./Controls";

function Feature() {
  function truncate(str: string | undefined, n: number) {
    return str?.length! > n ? str!.substr(0, n - 1) + "..." : str;
  }
  const {
    heroBg,
    movieId,
    fetchCredits,
    fetchSimilar,
    fetchGenres,
    fetchFeatureRatings,
    setIsFeatured,
    featureItem,
  } = useContext(TmdbContext);

  useEffect(() => {
    fetchCredits("movie", movieId);
    fetchSimilar("movie", movieId);
    fetchGenres("movie", movieId);
    fetchFeatureRatings("movie", movieId);
    setIsFeatured(true);
  }, []);

  return (
    <div
      className="flex flex-col w-full pt-28 pb-80 bg-cover bg-no-repeat bg-top-center relative z-10"
      style={{ backgroundImage: `url(${heroBg}) ` }}
    >
      <div className="bottomFade flex flex-col w-full pt-28 pb-80 bg-gradient-to-b h-[80vh] from-transparent to-black absolute z-20"></div>
      <div className="hidden md:inline-flex flex-col my-3 md:my-0 h-14 py-36 px-0 mt-5 justify-between z-30">
        <div className=" w-[36vw] mx-14">
          <h2 className="text-white h-20 leading-normal text-5xl m-0 mb-5">
            {truncate(featureItem?.title, 20)}
          </h2>
          <p
            className="text-white h-12 leading-normal text-md m-0"
            // id="hideMeAfter10Seconds"
          >
            <span>{truncate(featureItem?.overview, 150)}</span>
          </p>
        </div>
        <Controls item={featureItem} />
      </div>
    </div>
  );
}

export default Feature;
