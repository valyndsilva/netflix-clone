// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axiosClient from "../../lib/axiosClient";
import apiConfig from "../../config/apiConfig";
import { MovieItem } from "../../types/typings";

interface Data {
  getEastAsiaMoviesList: MovieItem[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const eastAsiaMoviesList = async() => {
    // https://developers.themoviedb.org/3/discover/movie-discover
    // GET /discover/movie
    // https://developers.themoviedb.org/3/discover/tv-discover
    // GET /discover/tv
    const url = `discover/movie?sort_by=popularity.desc&page=1&primary_release_year=2022&with_original_language=ko`;


    // return axios.get(`${apiConfig.baseURL}/${url}`, {
    //   params: { api_key: apiConfig.apiKey },
    // }); // works
    // return axiosClient.get(url, params); // does not work
    return await axiosClient.get(url, {
      params: { api_key: apiConfig.apiKey },
    }); // works
  };
  // Get Movie List
  const resEastAsiaMovies = await eastAsiaMoviesList();
  const getEastAsiaMoviesList = resEastAsiaMovies.data.results;
  console.log("getEastAsiaMoviesList", getEastAsiaMoviesList);

  res.status(200).json({ getEastAsiaMoviesList });
}
