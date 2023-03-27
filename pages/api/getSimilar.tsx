// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import axiosClient from "../../lib/axiosClient";
import apiConfig from "../../config/apiConfig";

interface Data {
  getData: any;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const category = {
    movie: "movie",
    tv: "tv",
  };

  // const similarList = async(cate: string, id) => {
  //   // https://developers.themoviedb.org/3/movies/get-similar-movies
  //   // GET  /movie/{movie_id}/similar
  //   // https://developers.themoviedb.org/3/tv/get-similar-tv-shows
  //   // GET /tv/{tv_id}/similar
  //   const url = `${category[cate]}/${id}/similar`;

  //   // return axios.get(`${apiConfig.baseURL}/${url}`, {
  //   //   params: { api_key: apiConfig.apiKey },
  //   // }); // works
  //   // return axiosClient.get(url, params); // does not work
  //   return axiosClient.get(url, {
  //     params: { api_key: apiConfig.apiKey },
  //   }); // works
  // };

    const similarList = async (cate: string, id:any) => {
      // https://developers.themoviedb.org/3/movies/get-similar-movies
      // GET  /movie/{movie_id}/similar
      // https://developers.themoviedb.org/3/tv/get-similar-tv-shows
      // GET /tv/{tv_id}/similar
      const url = `movie/${id}/similar`;

      // return axios.get(`${apiConfig.baseURL}/${url}`, {
      //   params: { api_key: apiConfig.apiKey },
      // }); // works
      // return axiosClient.get(url, params); // does not work
      return axiosClient.get(url, {
        params: { api_key: apiConfig.apiKey },
      }); // works
    };
  const params = { page: 1 };
  // Get Movie List
  const resSimilar = await similarList(category.movie, {
    params,
  });
  const getData = resSimilar.data.results;
  console.log("getData", getData);

  res.status(200).json({ getData });
}
