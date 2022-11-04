import React, { useContext, useEffect, useState } from "react";
import type { GetServerSidePropsContext, GetServerSideProps } from "next";
import { Browse, Loading, Profiles } from "../components";
import {
  IToken,
  MovieItem,
  SeriesItem,
  TrendingMovies,
  TrendingSeries,
} from "../types/typings";
import apiConfig from "../config/apiConfig";
import fetchMovies from "../utils/fetchMovies";
import nookies from "nookies";
import { firebaseAdmin } from "../config/firebaseAdmin";
import selectFilter from "../helpers/selectFilter";
import TmdbContext from "../context/TmdbContext";
import {
  fetchNetflixOriginals,
  fetchTopRatedMovies,
  fetchTopRatedSeries,
  fetchSeries,
  fetchTrendingMovies,
  fetchTrendingSeries,
  fetchComedyMovies,
  fetchEastAsiaSeries,
  fetchEastAsiaMovies,
  fetchNewReleases,
  fetchAction,
  fetchAnimation,
} from "../utils";
import { getProducts, Product } from "@stripe/firestore-stripe-payments";
import payments from "../lib/stripe";
import useSubscription from "../hooks/useSubscription";
import Plans from "../components/Plans";
import { AuthContext } from "../context/AuthContext";

interface Props {
  listData: any;
  token: IToken;
  netflixOriginals: SeriesItem[];
  eastAsiaMovies: MovieItem[];
  eastAsiaSeries: SeriesItem[];
  newReleases: MovieItem[];
  topRatedMovies: MovieItem[];
  topRatedSeries: SeriesItem[];
  trendingMovies: TrendingMovies[];
  trendingSeries: TrendingSeries[];
  series: SeriesItem[];
  movies: MovieItem[];
  comedyMovies: MovieItem[];
  mystery: MovieItem[];
  action: MovieItem[];
  animation: SeriesItem[];
  randomMovieItem: MovieItem;
  bgImg: string;
  movieItemId: number;
  products: Product[];
}
function browse({
  netflixOriginals,
  eastAsiaMovies,
  eastAsiaSeries,
  newReleases,
  topRatedMovies,
  topRatedSeries,
  trendingMovies,
  trendingSeries,
  series,
  movies,
  comedyMovies,
  action,
  animation,
  randomMovieItem,
  bgImg,
  movieItemId,
  products,
}: Props) {
  // console.log(products);

  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);
  console.log({ user });
  const { setMovieId, setFeatureItem } = useContext(TmdbContext);
console.log(randomMovieItem);

  // const subscription = false;
  const subscription = useSubscription(user);
  // console.log({ subscription });
  // setSubscriptionData(subscription);

  const {
    setHeroBg,
    category,
    slideRows,
    setSlideRows,
    searchQuery,
    searchResults,
    setMyMovieSearchItems,
    setMyTvSearchItems,
    myTvSearchItems,
    myMovieSearchItems,
    myTvListItems,
    myMovieListItems,
  } = useContext(TmdbContext);

  useEffect(() => {
    setHeroBg(bgImg);
    setFeatureItem(randomMovieItem);
    setMovieId(movieItemId);
  }, []);

  // console.log(slides);

  useEffect(() => {
    //@ts-expect-error
    setSlideRows(slides[category]);
    console.log(slideRows);
  }, [category]);

  // Search Results Logic
  useEffect(() => {
    const results = searchResults.map((item: any) => item);
    // console.log("Results:", results);
    // setMySearchItems(results);
    const moviesSearch = results.filter(
      (result: any) => result.media_type === "movie"
    );
    // console.log("moviesSearch", moviesSearch);
    setMyMovieSearchItems(moviesSearch);
    const seriesSearch = results.filter(
      (result: any) => result.media_type === "tv"
    );
    // console.log("seriesSearch", seriesSearch);
    setMyTvSearchItems(seriesSearch);

    if (slideRows && searchQuery.length > 0 && results.length > 0) {
      //@ts-ignore
      setSlideRows(slides.mySearch);
      // console.log("mySearch triggered", slideRows);
    } else {
      //@ts-ignore
      setSlideRows(slides[category]);
      // console.log("Display slideRows from selectFilter", slideRows);
    }
    // eslint-disable-next-line
  }, [searchQuery]);

  // Get slides
  const slides = selectFilter({
    netflixOriginals,
    eastAsiaMovies,
    eastAsiaSeries,
    newReleases,
    topRatedMovies,
    topRatedSeries,
    trendingMovies,
    trendingSeries,
    series,
    movies,
    comedyMovies,
    action,
    animation,
    myTvSearchItems,
    myMovieSearchItems,
    myTvListItems,
    myMovieListItems,
  });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    //@ts-ignore
  }, [profile.displayName]);

  if (loading || subscription === null) return null;

  if (subscription === undefined) return <Plans products={products} />;

  if (user && subscription)
    //@ts-ignore
    return profile.displayName ? (
      <>
        {loading ? <Loading src={user.photoURL} /> : <Loading.ReleaseBody />}
        <div className="flex flex-col">
          <Browse />
        </div>
      </>
    ) : (
      <Profiles setProfile={setProfile} />
    );
}

export default browse;

// Server-Side Rendering:
//Authenticated Server-side rendering with Next.js and Firebase Authentication
export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  try {
    const cookies = nookies.get(ctx);

    const [
      token,
      netflixOriginals,
      eastAsiaMovies,
      eastAsiaSeries,
      newReleases,
      topRatedMovies,
      topRatedSeries,
      trendingMovies,
      trendingSeries,
      series,
      movies,
      comedyMovies,
      action,
      animation,
    ] = await Promise.all([
      firebaseAdmin.auth().verifyIdToken(cookies.token),
      fetchNetflixOriginals(),
      fetchEastAsiaMovies(),
      fetchEastAsiaSeries(),
      fetchNewReleases(),
      fetchTopRatedMovies(),
      fetchTopRatedSeries(),
      fetchTrendingMovies(),
      fetchTrendingSeries(),
      fetchSeries(),
      fetchMovies(),
      fetchComedyMovies(),
      fetchAction(),
      fetchAnimation(),
    ]);

    // Random Movie Item Image
    const randomMovieItem: any =
      movies[Math.floor(Math.random() * movies?.length - 1)];
    const bgImg = apiConfig.originalImage(randomMovieItem?.backdrop_path);
    const movieItemId = randomMovieItem?.id;

    const products = await getProducts(payments, {
      includePrices: true,
      activeOnly: true,
    })
      .then((res) => res)
      .catch((error) => console.log(error.message));

    return {
      props: {
        netflixOriginals,
        eastAsiaMovies,
        eastAsiaSeries,
        newReleases,
        topRatedMovies,
        topRatedSeries,
        trendingMovies,
        trendingSeries,
        series,
        movies,
        comedyMovies,
        action,
        animation,
        randomMovieItem,
        bgImg,
        movieItemId,
        products,
      },
    };
  } catch (err) {
    // either the `token` cookie didn't exist or token verification failed, either way: redirect to the login page
    ctx.res.writeHead(302, { Location: "/login" });
    ctx.res.end();

    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      // `as never` prevents inference issues with InferGetServerSidePropsType.
      // The props returned here don't matter because we've already redirected the user.
      props: {} as never,
    };
  }
};
