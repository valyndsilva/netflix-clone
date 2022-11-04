// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axiosClient from "../../lib/axiosClient";
import apiConfig from "../../config/apiConfig";
import { MovieItem } from "../../types/typings";

interface Data {
  getMovieList: MovieItem[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const moviesList = async( params: { params: { page: number; }; }) => {
    // https://developers.themoviedb.org/3/discover/movie-discover
    // GET /discover/movie
    const url = `discover/movie`;

    // return axios.get(`${apiConfig.baseURL}/${url}`, {
    //   params: { api_key: apiConfig.apiKey },
    // }); // works
    // return axiosClient.get(url, params); // does not work
    return await axiosClient.get(url, {
      params: { api_key: apiConfig.apiKey },
    }); // works
  };
  const params = { page: 1 };
  // Get Movie List
  const resMovie = await moviesList( {
    params,
  });
  const getMovieList = resMovie.data.results;
  console.log("getMovieList", getMovieList);

  res.status(200).json({ getMovieList });
}
