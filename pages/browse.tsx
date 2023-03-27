import React, { useContext, useEffect} from "react";
import type { GetStaticProps } from "next";
import useFilter from "../hooks/useFilter";
import TmdbContext from "../context/TmdbContext";
import { getProducts, Product } from "@stripe/firestore-stripe-payments";
import payments from "../lib/stripe";
import useSubscription from "../hooks/useSubscription";
import Plans from "../components/Plans";
import useAuth from "../hooks/useAuth";
import GlobalContext from "../context/GlobalContext";
import { Browse, Loading, Profiles } from "../components";
import { apiConfig, requests } from "../utils/constants";
import { fetchAxios } from "../utils";

interface Props {
  listData: any;
  netflixOriginals: SeriesItem[];
  // eastAsiaMovies: MovieItem[];
  // eastAsiaSeries: SeriesItem[];
  newReleases: MovieItem[];
  topRatedMovies: MovieItem[];
  topRatedSeries: SeriesItem[];
  trendingMovies: TrendingMovies[];
  trendingSeries: TrendingSeries[];
  series: SeriesItem[];
  movies: MovieItem[];
  // comedyMovies: MovieItem[];
  mystery: MovieItem[];
  action: MovieItem[];
  animation: SeriesItem[];
  randomMovieItem: MovieItem | null;
  bgImg: string;
  movieItemId: number;
  products: Product[];
}
function browse({
  netflixOriginals,
  // eastAsiaMovies,
  // eastAsiaSeries,
  newReleases,
  topRatedMovies,
  topRatedSeries,
  trendingMovies,
  trendingSeries,
  series,
  movies,
  action,
  // comedyMovies,
  animation,
  randomMovieItem,
  bgImg,
  movieItemId,
  products,
}: Props) {
  const { profile } = useContext(GlobalContext);
  // console.log(profile);
  const { user, loading } = useAuth();
  // console.log(user);
  const {
    setHeroBg,
    category,
    slideRows,
    setSlideRows,
    searchTerm,
    searchResults,
    setMyMovieSearchItems,
    setMyTvSearchItems,
    myTvSearchItems,
    myMovieSearchItems,
    myTvListItems,
    myMovieListItems,
    setMovieId,
    setFeatureItem,
  } = useContext(TmdbContext);
  // console.log(category);
  // Get slides
  const slides = useFilter({
    netflixOriginals,
    // eastAsiaMovies,
    // eastAsiaSeries,
    newReleases,
    topRatedMovies,
    topRatedSeries,
    trendingMovies,
    trendingSeries,
    // series,
    // movies,
    // comedyMovies,
    action,
    animation,
    myTvSearchItems,
    myMovieSearchItems,
    myTvListItems,
    myMovieListItems,
  });
  // console.log(slides);

  useEffect(() => {
    setHeroBg(bgImg);
    setFeatureItem(randomMovieItem);
    setMovieId(movieItemId);
  }, []);

  // useEffect(() => {
  //   if (profile.displayName !== null && profile.photoURL !== null) {
  //     setProfile({
  //       displayName: localStorage.getItem("displayName"),
  //       photoURL: localStorage.getItem("photoURL"),
  //     });
  //   }
  // }, []);

  useEffect(() => {
    //@ts-expect-error
    setSlideRows(slides[category]);
    // console.log(slides[category]);
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

    if (slideRows && searchTerm.length > 0 && results.length > 0) {
      //@ts-ignore
      setSlideRows(slides.mySearch);
      // console.log("mySearch triggered", slideRows);
    } else {
      //@ts-ignore
      setSlideRows(slides[category]);
      // console.log("Display slideRows from useFilter", slideRows);
    }
    // eslint-disable-next-line
  }, [searchTerm]);

  const subscription = useSubscription(user);
  if (loading || subscription === null) return null;
  if (!subscription) return <Plans products={products} />;

  if (loading || subscription === null) return null;

  if (subscription === undefined) return <Plans products={products} />;

  if (user && subscription)
    return profile?.displayName === null && profile?.photoURL === null ? (
      <Profiles />
    ) : (
      <>
        {loading ? <Loading src={user.photoURL} /> : <Loading.ReleaseBody />}
        <div className="flex flex-col">
          <Browse />
        </div>
      </>
    );
}

export default browse;

//ISR
export const getStaticProps: GetStaticProps = async () => {
  // const action = await fetchAxios(requests.fetchAction);

  const [
    netflixOriginals,
    // eastAsiaMovies,
    // eastAsiaSeries,
    newReleases,
    topRatedMovies,
    topRatedSeries,
    trendingMovies,
    trendingSeries,
    series,
    movies,
    // comedyMovies,
    action,
    animation,
  ] = await Promise.all([
    fetchAxios(requests.fetchNetflixOriginals),
    // fetchAxios(requests.fetchEastAsiaMovies),
    // fetchAxios(requests.fetchEastAsiaSeries),
    fetchAxios(requests.fetchNewReleases),
    fetchAxios(requests.fetchTopRatedMovies),
    fetchAxios(requests.fetchTopRatedSeries),
    fetchAxios(requests.fetchTrendingMovies),
    fetchAxios(requests.fetchTrendingSeries),
    fetchAxios(requests.fetchSeries),
    fetchAxios(requests.fetchMovies),
    // fetchAxios(requests.fetchComedyMovies),
    fetchAxios(requests.fetchAction),
    fetchAxios(requests.fetchAnimation),
  ]);

  // Random Movie Item Image
  // const randomMovieItem =
  //   movies[Math.floor(Math.random() * movies?.length - 1)];
  const randomMovieItem = movies[1];
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
      // eastAsiaMovies,
      // eastAsiaSeries,
      newReleases,
      topRatedMovies,
      topRatedSeries,
      trendingMovies,
      trendingSeries,
      series,
      movies,
      // comedyMovies,
      action,
      animation,
      randomMovieItem,
      bgImg,
      movieItemId,
      products,
    },
    revalidate: 60,
  };
};
