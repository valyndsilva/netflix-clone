// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axiosClient from "../../lib/axiosClient";
import apiConfig from "../../config/apiConfig";
import { MovieItem } from "../../types/typings";

interface Data {
  getTopRatedMoviesList: MovieItem[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const TopRatedMoviesList = async ( params: { params: { page: number; language: string; region:string; }; }) => {
    // https://developers.themoviedb.org/3/discover/movie-discover
    // GET /discover/movie
    // https://developers.themoviedb.org/3/discover/tv-discover
    // GET /discover/tv
    const url = `movie/top_rated`;

    // return axios.get(`${apiConfig.baseURL}/${url}`, {
    //   params: { api_key: apiConfig.apiKey },
    // }); // works
    // return axiosClient.get(url, params); // does not work
    return await axiosClient.get(url, {
      params: { api_key: apiConfig.apiKey },
    }); // works
  };
  const params = { page: 1, language:"en-US" ,region:"GB"};
  // Get Movie List
  const resTopRatedMovies = await TopRatedMoviesList( {
    params,
  });
  const getTopRatedMoviesList = resTopRatedMovies.data.results;
  console.log("getTopRatedMoviesList", getTopRatedMoviesList);

  res.status(200).json({ getTopRatedMoviesList });
}
