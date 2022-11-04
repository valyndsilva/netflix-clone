// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axiosClient from "../../lib/axiosClient";
import apiConfig from "../../config/apiConfig";
import { MovieItem } from "../../types/typings";

interface Data {
  getComedyMovies: MovieItem[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const comedyMovies = async() => {
    const url = `discover/movie?with_genres=35&sort_by=popularity.desc`;

    // return axios.get(`${apiConfig.baseURL}/${url}`, {
    //   params: { api_key: apiConfig.apiKey },
    // }); // works
    // return axiosClient.get(url, params); // does not work
    return await axiosClient.get(url, {
      params: { api_key: apiConfig.apiKey },
    }); // works
  };

  // Get Movie List
  const resMovie = await comedyMovies();
  const getComedyMovies = resMovie.data.results;
  console.log("getComedyMovies", getComedyMovies);

  res.status(200).json({ getComedyMovies });
}
