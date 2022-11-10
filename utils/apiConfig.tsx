const apiConfig = {
  apiKey: process.env.NEXT_PUBLIC_TMDB_API_KEY,
  apiToken: process.env.NEXT_PUBLIC_TMDB_API_TOKEN,
  baseURL: "https://api.themoviedb.org/3/",
  originalImage: (imgPath: string) =>
    `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath: string) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
  w300Image: (imgPath: string) => `https://image.tmdb.org/t/p/w300/${imgPath}`,
  unavailablePortrait: "/unavailablePortait.jpeg",
  unavailableLandscape: "/unavailableLandscape.png",
  noPicture: "/noPicture.jpeg",
  basePlayerURL: "https://2embed.org/embed/",
  fetchTrending: `/trending/all/week?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`,
  fetchTopRated: `/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=10749`,
  fetchMystery: `/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=9648`,
  fetchSciFi: `/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=878`,
  fetchWestern: `/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=37`,
  fetchAnimation: `/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=16`,
  fetchTV: `/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=10770`,
};

export default apiConfig;
