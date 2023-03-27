export const apiConfig = {
  baseURL: "https://api.themoviedb.org/3",
  apiKey: process.env.NEXT_PUBLIC_TMDB_API_KEY,
  apiToken: process.env.NEXT_PUBLIC_TMDB_API_TOKEN,
  originalImage: (imgPath: string) =>
    `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath: string) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
  w300Image: (imgPath: string) => `https://image.tmdb.org/t/p/w300/${imgPath}`,
  unavailablePortrait: "/unavailablePortait.jpeg",
  unavailableLandscape: "/unavailableLandscape.png",
  noPicture: "/noPicture.jpeg",
};

export const requests = {
  fetchNetflixOriginals: `/discover/tv?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=1&with_networks=213`,
  fetchEastAsiaMovies: `/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&sort_by=popularity.desc&page=1&primary_release_year=2022&with_original_language=ko`,
  fetchEastAsiaSeries: `/discover/tv?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&sort_by=popularity.desc&page=1&primary_release_year=2022&with_original_language=ko`,
  fetchNewReleases: `/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&sort_by=popularity.desc&page=1&primary_release_year=2022`,
  fetchTopRatedMovies: `/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=1&language=en-US&region=GB`,
  fetchTopRatedSeries: `/tv/top_rated?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=1&language=en-US&region=GB`,
  fetchTrendingMovies: `/trending/movie/week?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=1&language=en-US`,
  fetchTrendingSeries: `/trending/tv/week?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=1&language=en-US`,
  fetchSeries: `/discover/tv?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=1`,
  fetchMovies: `/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=1`,
  fetchComedyMovies: `/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=35&sort_by=popularity.desc`,
  fetchAction: `/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=28&sort_by=popularity.desc`,
  fetchAnimation: `/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=16&sort_by=popularity.desc`,
  fetchTrending: `/trending/all/week?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`,
  fetchHorrorMovies: `/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=10749`,
  fetchMystery: `/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=9648&sort_by=popularity.desc`,
  fetchSciFi: `/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=878`,
  fetchWestern: `/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=37`,
  fetchTV: `/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=10770`,
  fetchDocumentaries: `/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=99&sort_by=popularity.desc`,
  fetchPopular: `/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=1&language=en-US&region=GB`,
};

export const paths = {
  HOME_PAGE_PATH: `/`,
  RESET_PAGE_PATH: `/reset`,
  DASHBOARD_PAGE_PATH: `/browse`,
  SIGN_IN_PAGE_PATH: `/login`,
  SIGN_UP_PAGE_PATH: `/signup`,
};