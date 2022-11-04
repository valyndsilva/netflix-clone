import {
  MovieItem,
  SeriesItem,
  TrendingMovies,
  TrendingSeries,
} from "../types/typings";

interface Props {
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
  action: MovieItem[];
  animation: SeriesItem[];
  myTvSearchItems: any;
  myMovieSearchItems: any;
  myTvListItems: any;
  myMovieListItems: any;
}

export default function selectFilter({
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
}: Props) {
  return {
    home: [
      {
        title: "East Asia",
        data: eastAsiaMovies,
        type: "movie",
        top10: false,
        featuredRow: false,
      },
      {
        title: "Netflix Originals",
        data: netflixOriginals,
        type: "tv",
        top10: false,
        featuredRow: false,
      },
      {
        title: "Top 10 Films in the UK Today",
        data: topRatedMovies,
        type: "movie",
        top10: true,
        featuredRow: false,
      },
      {
        title: "Trending Now",
        data: trendingSeries,
        type: "tv",
        top10: false,
        featuredRow: false,
      },
      {
        title: "Animation",
        data: animation,
        type: "tv",
        top10: false,
        featuredRow: false,
      },
      {
        title: "Comedies",
        data: comedyMovies,
        type: "movie",
        top10: false,
        featuredRow: false,
      },
      {
        title: "New Releases",
        data: newReleases,
        type: "movie",
        top10: false,
        featuredRow: true,
      },
      {
        title: "Action",
        data: action,
        type: "movie",
        top10: false,
        featuredRow: false,
      },
      {
        title: "Korean TV Dramas",
        data: eastAsiaSeries,
        type: "tv",
        top10: false,
        featuredRow: false,
      },
      {
        title: "Top 10 Programmes in the UK Today",
        data: topRatedSeries,
        type: "tv",
        top10: true,
        featuredRow: false,
      },
      {
        title: "Trending Movies",
        data: trendingMovies,
        type: "movie",
        top10: false,
        featuredRow: false,
      },
    ],
    series: [
      {
        title: "Top 10 Programmes in the UK Today",
        data: topRatedSeries,
        type: "tv",
        top10: true,
        featuredRow: false,
      },

      {
        title: "Korean TV Dramas",
        data: eastAsiaSeries,
        type: "tv",
        top10: false,
        featuredRow: false,
      },
      {
        title: "Trending Now",
        data: trendingSeries,
        type: "tv",
        top10: false,
        featuredRow: false,
      },
      {
        title: "Netflix Originals",
        data: netflixOriginals,
        type: "tv",
        top10: false,
        featuredRow: true,
      },
      {
        title: "Animation",
        data: animation,
        type: "tv",
        top10: false,
        featuredRow: false,
      },

      {
        title: "Series",
        data: series,
        type: "tv",
        top10: false,
        featuredRow: false,
      },
    ],
    movies: [
      {
        title: "Top 10 Films in the UK Today",
        data: topRatedMovies,
        type: "movie",
        top10: true,
        featuredRow: false,
      },
      {
        title: "East Asia",
        data: eastAsiaMovies,
        type: "movie",
        top10: false,
        featuredRow: false,
      },
      {
        title: "Comedies",
        data: comedyMovies,
        type: "movie",
        top10: false,
        featuredRow: false,
      },
      {
        title: "New Releases",
        data: newReleases,
        type: "movie",
        top10: false,
        featuredRow: true,
      },
      {
        title: "Action",
        data: action,
        type: "movie",
        top10: false,
        featuredRow: false,
      },
      {
        title: "Movies",
        data: movies,
        type: "movie",
        top10: false,
        featuredRow: false,
      },
    ],
    trending: [
      {
        title: "Trending Movies",
        data: trendingMovies,
        type: "movie",
        top10: false,
        featuredRow: false,
      },
      {
        title: "Trending Series",
        data: trendingSeries,
        type: "tv",
        top10: false,
        featuredRow: false,
      },
    ],
    myList: [
      {
        title: "Series Watch List",
        data: myTvListItems,
        type: "tv",
        top10: false,
        featuredRow: true,
      },
      {
        title: "Movies Watch List",
        data: myMovieListItems,
        type: "movie",
        top10: false,
        featuredRow: true,
      },
    ],
    mySearch: [
      {
        title: "TV Search Results",
        data: myTvSearchItems,
        type: "tv",
        top10: false,
        featuredRow: true,
      },
      {
        title: "Films Search Results",
        data: myMovieSearchItems,
        type: "movie",
        top10: false,
        featuredRow: true,
      },
    ],
  };
}
