import React, { createContext, ReactNode, useState } from "react";
import axiosClient from "../lib/axiosClient";
import apiConfig from "../config/apiConfig";
import YouTube from "react-youtube";
import { MovieItem, SeriesItem } from "../types/typings";

interface TmdbProviderProps {
  children: ReactNode;
}
interface Tmdb {
  //Feature
  featureItem: any;
  setFeatureItem: (featureItem: any) => void;
  //BrowseNav and Browse
  category: any;
  setCategory: (name: any) => void;
  slideRows: any;
  setSlideRows: (item: any) => void;
  //Feature
  heroBg: string;
  setHeroBg: (url: string) => void;
  movieId: any;
  setMovieId: (id: any) => void;
  fetchCredits: (mediaType: string, id: number) => void;
  fetchSimilar: (mediaType: string, id: number) => void;
  fetchGenres: (mediaType: string, id: number) => void;
  fetchFeatureRatings: (mediaType: string, id: number) => void;
  isFeatured: boolean;
  setIsFeatured: (featured: boolean) => void;
  //Controls
  fetchDetail: (mediaType: string, id: number) => void;
  seasonNo: number;
  setSeasonNo: (seasonNo: number) => void;
  episodeNo: number;
  setEpisodeNo: (episodeNo: number) => void;
  mediaTypeData: string;
  setMediaTypeData: (mediaType: string) => void;
  fetchVideo: (mediaType: string, id: number) => void;
  playTrailer: boolean;
  setPlayTrailer: (trailer: boolean) => void;
  featureRatingsData: number;
  setFeatureRatingsData: (featureRating: number) => void;
  itemId: number;
  setItemId: (id: number) => void;
  //ListItem
  trailerData: any;
  setTrailerData: (trailerData: any) => void;
  getTrailer: () => void;
  videoKey: string;
  setVideoKey: (key: string) => void;
  selectItem: (mediaType: string, id: number) => void;
  duration: number;
  setDuration: (time: number) => void;
  ratingsData: number;
  setRatingsData: (rating: number) => void;
  numOfSeasons: number;
  setNumOfSeasons: (seasonNo: number) => void;
  myTvListItems: any;
  setMyTvListItems: (items: any) => void;
  myMovieListItems: any;
  setMyMovieListItems: (items: any) => void;
  //Modal
  selectValue: string;
  setSelectValue: (selectValue: string) => void;
  fetchSeasonDetails: (mediaType: string, id: number, seasonNo: number) => void;
  isHovered: boolean;
  setIsHovered: (isHovered: boolean) => void;
  creditsData: string;
  setCreditsData: (creditsData: string) => void;
  genreData: any;
  setGenreData: (genreData: any) => void;
  similarData: MovieItem[] | undefined;
  setSimilarData: (similarData: any) => void;
  seasonsData: SeriesItem[];
  setSeasonsData: (seasonsData: any) => void;
  episodesData: any;
  setEpisodesData: (episodesData: any) => void;
  truncate: any;
  //Search
  handleSearch: any;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  searchActive: boolean;
  setSearchActive: (prev: (searchActive: boolean) => boolean) => void;
  searchResults: any;
  setSearchResults: (searchResults: any) => void;
  myMovieSearchItems: any;
  setMyMovieSearchItems: any;
  myTvSearchItems: any;
  setMyTvSearchItems: any;
}

export const TmdbContext = createContext<Tmdb>({} as Tmdb);

export function TmdbProvider({ children }: TmdbProviderProps) {
  // Feature
  const [featureItem, setFeatureItem] = useState<MovieItem>();
  //BrowseNav + Browse
  const [category, setCategory] = useState("home");
  const [slideRows, setSlideRows] = useState([]);
  // Feature
  const [heroBg, setHeroBg] = useState("");
  const [movieId, setMovieId] = useState([]);
  const [isFeatured, setIsFeatured] = useState(false);
  //Controls
  const [seasonNo, setSeasonNo] = useState(0);
  const [episodeNo, setEpisodeNo] = useState(0);
  const [mediaTypeData, setMediaTypeData] = useState("");
  const [playTrailer, setPlayTrailer] = useState(false);
  const [featureRatingsData, setFeatureRatingsData] = useState(0);
  const [itemId, setItemId] = useState(0);
  //ListItem
  const [trailerData, setTrailerData] = useState([]);
  const [videoKey, setVideoKey] = useState("");
  const [duration, setDuration] = useState(0);
  const [ratingsData, setRatingsData] = useState(0);
  const [numOfSeasons, setNumOfSeasons] = useState(0);
  const [myTvListItems, setMyTvListItems] = useState([]);
  const [myMovieListItems, setMyMovieListItems] = useState([]);
  //Modal
  const [selectValue, setSelectValue] = useState("Select Season");
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [creditsData, setCreditsData] = useState("");
  const [genreData, setGenreData] = useState([]);
  const [similarData, setSimilarData] = useState([]);
  const [seasonsData, setSeasonsData] = useState([]);
  const [episodesData, setEpisodesData] = useState([]);
  //Search
  const [searchTerm, setSearchTerm] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  //  const debouncedSearchTerm: string = useDebounce<string>(searchTerm, 500);

  //browse page
  const [myTvSearchItems, setMyTvSearchItems] = useState([]);
  const [myMovieSearchItems, setMyMovieSearchItems] = useState([]);

  // console.log("itemId:", itemId);
  function truncate(str: string, n: number) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  const fetchVideo = async (mediaType: string | null, itemId: number) => {
    // console.log("fetchVideo mediaType:", mediaType);
    // console.log("fetchVideo itemId:", itemId);

    const video = async (mediaType: any, id: any) => {
      // https://developers.themoviedb.org/3/getting-started/append-to-response
      const url = `${mediaType}/${id}/videos`;
      return axiosClient.get(url, {
        params: { api_key: apiConfig.apiKey },
      }); // works
    };
    const res = await video(mediaType, itemId);
    const resData = res.data;
    // console.log("fetchVideo resData", resData);
    // const resKey = res.data.results[0].key;
    // console.log("fetchVideo resKey", resKey);
    setTrailerData(resData);
  };

  const fetchDetail = async (mediaType: string | null, itemId: number) => {
    // console.log("fetchDetail mediaType:", mediaType);
    // console.log("fetchDetail itemId:", itemId);

    const params = {
      append_to_response: "videos",
    };
    const detail = async (
      mediaType: string | null,
      id: number,
      _params: { params: { append_to_response: string } }
    ) => {
      // https://developers.themoviedb.org/3/movies/get-movie-details
      // GET  /movie/{movie_id}
      // https://developers.themoviedb.org/3/tv/get-tv-details
      // GET /tv/{tv_id}
      const url = `${mediaType}/${id}`;
      return axiosClient.get(url, {
        params: { api_key: apiConfig.apiKey },
      }); // works
    };
    const res = await detail(mediaType, itemId, {
      params,
    });
    const resData = res.data;

    // console.log("fetchDetail resData", resData);
    fetchVideo(mediaType, itemId);
    setItemId(resData.id);

    //Get Tv Shows Number of Seasons
    if (mediaType === "tv") {
      // console.log("This is a tv show type!");
      //  console.log(resData.episode_run_time[0]);
      setDuration(resData.episode_run_time[0]);
      // console.log("Total No. of Seasons:", resData.number_of_seasons);
      setNumOfSeasons(resData.number_of_seasons);
      // console.log("Seasons:", resData.seasons);
      setSeasonsData(resData.seasons);
      // let seasonNo = [];
      resData.seasons.map((el: any) => {
        // console.log("TV Show ID:", resData.id);
        // console.log("Season No:", el.season_number);
        // console.log("Season Name:", el.name);
        setSeasonNo(el.season_number);
        fetchSeasonDetails(mediaType, resData.id, el.season_number);
        return el;
      });
    }

    if (mediaType === "movie") {
      // console.log("This is a movie type!");
      // console.log(resData.runtime);
      setDuration(resData.runtime);
    }

    // Get Genres in Content Modal
    const genresArr = resData.genres.map((item: { name: any }) => item.name);
    // console.log("genresArr ", genresArr);
    const genresList = Array.from(genresArr.values()).join(", ");
    // console.log("genresList:", genresList);
    //@ts-ignore
    setGenreData(genresList);
  };

  const fetchSeasonDetails = async (
    mediaType: string,
    itemId: any,
    seasonNo: any
  ) => {
    // console.log("Season No:", seasonNo);
    const params = {
      append_to_response: "videos",
    };
    const seasonDetails = async (
      mediaType: any,
      itemId: any,
      seasonNo: any,
      _params: { params: { append_to_response: string } }
    ) => {
      // https://developers.themoviedb.org/3/movies/get-movie-details
      // GET  /movie/{movie_id}
      // https://developers.themoviedb.org/3/tv/get-tv-details
      // GET /tv/{tv_id}
      const url = `${mediaType}/${itemId}/season/${seasonNo}`;
      return axiosClient.get(url, {
        params: { api_key: apiConfig.apiKey },
      }); // works
    };
    const res = await seasonDetails(mediaType, itemId, seasonNo, {
      params,
    });
    // console.log("fetchSeasonDetail res", res);
    const resData = res.data;
    // console.log("fetchSeasonDetail resData", resData);
    // console.log("fetchSeasonDetail itemId:", resData.id);

    if (mediaType === "tv") {
      // console.log("Episodes:", resData.episodes);
      setEpisodesData(resData.episodes);
      resData.episodes.map((el: any) => {
        // console.log("Season No:", el.season_number);
        // console.log("Episode No:", el.episode_number);
        // console.log("Episode Name:", el.name);
        // console.log("Episode Overview:", el.overview);
        // console.log("Episode Img_Path:", el.still_path);
        return setEpisodeNo(el.episode_number);
      });
    }
  };

  const fetchCredits = async (mediaType: any, itemId: any) => {
    const params = {
      language: "en-US",
    };
    const getCredits = async (
      mediaType: any,
      itemId: any,
      _params: { params: { language: string } }
    ) => {
      const url = `${mediaType}/${itemId}/credits`;
      return await axiosClient.get(url, {
        params: { api_key: apiConfig.apiKey },
      }); // works
    };
    const res = await getCredits(mediaType, itemId, {
      params,
    });
    // console.log("fetchMovieCredits response data", res.data);
    const resData = res.data.cast.slice(0, 12);
    // console.log("setCreditsData Movie resData", resData);
    const cast = resData.map((item: { name: any }) => item.name);
    // console.log(cast);
    const castList = Array.from(cast.values()).join(", ");
    // console.log("castList:", castList);
    //@ts-ignore
    setCreditsData(castList);
  };

  const fetchSimilar = async (mediaType: any, itemId: any) => {
    // await fetchSimilarRatings(mediaType, itemId);

    const params = {
      page: 1,
    };
    const getSimilar = async (
      mediaType: any,
      itemId: any,
      _params: { params: { page: number } }
    ) => {
      const url = `${mediaType}/${itemId}/similar`;
      return await axiosClient.get(url, {
        params: { api_key: apiConfig.apiKey },
      }); // works
    };
    const res = await getSimilar(mediaType, itemId, {
      params,
    });
    // console.log("fetchSimilar response data", res.data.results);
    const resData = res.data.results;
    setSimilarData(resData);
  };

  const fetchRatings = async (mediaType: string | null, itemId: any) => {
    const params = {
      page: 1,
    };

    const getContentRatings = (
      mediaType: string | null,
      itemId: any,
      _params: { params: { page: number } }
    ) => {
      if (mediaType === "tv") {
        //developers.themoviedb.org/3/tv/get-tv-content-ratings
        const url = `tv/${itemId}/content_ratings`;
        return axiosClient.get(url, {
          params: { api_key: apiConfig.apiKey },
        }); // works
      }
      if (mediaType === "movie") {
        //developers.themoviedb.org/3/movies/get-movie-release-dates
        const url = `movie/${itemId}/release_dates`;
        return axiosClient.get(url, {
          params: { api_key: apiConfig.apiKey },
        }); // works
      }
    };
    const res = await getContentRatings(mediaType, itemId, {
      params,
    });
    // console.log("fetchRatings response data", res.data.results);
    const resData = res!.data.results;
    const ratings = resData.find(
      (o: { iso_3166_1: string }) => o.iso_3166_1 === "DE"
    );
    // console.log({ ratings });

    if (mediaType === "tv") {
      //console.log({ratings.rating});
      setRatingsData(ratings?.rating);
    }
    if (mediaType === "movie") {
      //     console.log({ratings.release_dates[0].certification});
      setRatingsData(ratings?.release_dates[0].certification);
    }
  };

  const fetchFeatureRatings = async (mediaType: string, itemId: any) => {
    const params = {
      page: 1,
    };
    const getContentRatings = async (
      mediaType: any,
      itemId: any,
      _params: { params: { page: number } }
    ) => {
      //developers.themoviedb.org/3/movies/get-movie-release-dates
      const url = `${mediaType}/${itemId}/release_dates`;
      return await axiosClient.get(url, {
        params: { api_key: apiConfig.apiKey },
      }); // works
    };
    const res = await getContentRatings(mediaType, itemId, {
      params,
    });
    // console.log("fetchRatings response data", res.data.results);
    const resData = res.data.results;
    const ratings = resData.find(
      (o: { iso_3166_1: string }) => o.iso_3166_1 === "DE"
    );
    // console.log({ ratings });
    if (mediaType === "movie") {
      //     console.log({ratings.release_dates[0].certification});
      setFeatureRatingsData(ratings?.release_dates[0].certification);
    }
  };

  const fetchGenres = (mediaType: string, itemId: number) => {
    fetchDetail(mediaType, itemId);
  };

  // // console.log("trailerData:", trailerData);

  const getTrailer = () => {
    // console.log(trailerData);
//@ts-ignore
    const trailer = trailerData?.results.find(
      (vid: { name: string }) =>
        // vid.name === "Official Trailer" || vid.name === "Official Teaser"
        vid.name.includes("Official Trailer") ||
        vid.name.includes("Official Teaser")
    );

    // console.log(trailer);
    // const videoSrc = "/videos/trailer.mp4";
    //@ts-ignore
    const key = trailer ? trailer.key : trailerData.results[0].key;
    // console.log("Youtube trailer key:", key);
    setVideoKey(key);
    // const trailerSrc = `https://www.youtube.com/watch?v=${videoKey}`;
    // console.log(trailerSrc);

    return (
      key && (
        <YouTube
          videoId={key}
          className={
            "video w-full h-[140px] object-cover absolute top-0 left-0"
          }
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
      )
    );
  };

  // Select Item
  const selectItem = async (
    mediaType: string | React.SetStateAction<null>,
    id: number | React.SetStateAction<null>
  ) => {
    // setPlayTrailer(true);
    // console.log("selectItem mediaType:", mediaType);
    //@ts-ignore
    setMediaTypeData(mediaType);
    // console.log("selectItem id:", id);
    //@ts-ignore
    setItemId(id);
    //@ts-ignore
    await fetchDetail(mediaType, id);
    await fetchCredits(mediaType, id);
    await fetchSimilar(mediaType, id);
    //@ts-ignore
    await fetchRatings(mediaType, id);
  };

  // Debounce search term so that it only gives us latest value ...
  // ... if searchTerm has not been updated within last 500ms.
  // The goal is to only have the API call fire when user stops typing ...
  // ... so that we aren't hitting our API rapidly.
  // We pass generic type, this case string

  // Search Functionality
  const fetchSearch = async (searchTerm: any) => {
    const params = {
      language: "en-US",
      page: 1,
      include_adult: false,
      query: searchTerm,
    };

    const search = async (_params: {
      params: {
        language: string;
        page: number;
        include_adult: boolean;
        query: any;
      };
    }) => {
      // https://developers.themoviedb.org/3/search/search-movies
      // GET /search/movie
      // https://developers.themoviedb.org/3/search/search-tv-shows
      // GET /search/tv
      const url = `search/multi?query=${searchTerm}&language=en-US&page=1&include_adult=false`;
      return axiosClient.get(url, {
        params: { api_key: apiConfig.apiKey },
      }); // works
    };
    const res = await search({
      params,
    });
    const resData = res.data;
    // console.log("fetchSearch resData", resData);
    if (!resData.errors) {
      setSearchActive(true);
      setSearchResults(resData.results);
      setSearchActive(false);
    } else {
      setSearchResults([]);
    }
  };

  // Option 1
  const handleSearch = (input: string) => {
    // console.log(input);
    setSearchTerm(input);
    fetchSearch(input);
  };

  // // Option 2
  // const handleSearch = (event: { target: { value: React.SetStateAction<string>; }; }) => {
  //   // console.log(event.target.value);
  //   setSearchTerm(event.target.value);
  //   fetchSearch(event.target.value);
  // };

  return (
    <TmdbContext.Provider
      value={{
        //Feature
        featureItem,
        setFeatureItem,
        //BrowseNav + Browse
        category,
        setCategory,
        slideRows,
        setSlideRows,
        //Feature
        heroBg,
        setHeroBg,
        movieId,
        setMovieId,
        fetchCredits,
        fetchSimilar,
        fetchGenres,
        fetchFeatureRatings,
        isFeatured,
        setIsFeatured,
        // Controls
        fetchDetail,
        seasonNo,
        setSeasonNo,
        episodeNo,
        setEpisodeNo,
        mediaTypeData,
        setMediaTypeData,
        fetchVideo,
        playTrailer,
        setPlayTrailer,
        featureRatingsData,
        setFeatureRatingsData,
        itemId,
        setItemId,
        // ListItem
        trailerData,
        setTrailerData,
        getTrailer,
        videoKey,
        setVideoKey,
        selectItem,
        duration,
        setDuration,
        ratingsData,
        setRatingsData,
        numOfSeasons,
        setNumOfSeasons,
        myTvListItems,
        setMyTvListItems,
        myMovieListItems,
        setMyMovieListItems,
        //Modal
        selectValue,
        setSelectValue,
        isHovered,
        setIsHovered,
        creditsData,
        setCreditsData,
        genreData,
        setGenreData,
        similarData,
        setSimilarData,
        seasonsData,
        setSeasonsData,
        episodesData,
        setEpisodesData,
        truncate,
        fetchSeasonDetails,
        //Search
        handleSearch,
        searchTerm,
        setSearchTerm,
        searchActive,
        setSearchActive,
        searchResults,
        setSearchResults,
        //browse page
        myTvSearchItems,
        setMyTvSearchItems,
        myMovieSearchItems,
        setMyMovieSearchItems,
      }}
    >
      {children}
    </TmdbContext.Provider>
  );
}
export default TmdbContext;
