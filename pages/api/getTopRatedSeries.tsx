// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axiosClient from "../../lib/axiosClient";
import apiConfig from "../../config/apiConfig";
import { SeriesItem } from "../../types/typings";

interface Data {
  getTopRatedSeriesList: SeriesItem[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const TopRatedSeriesList = async(params: {
    params: { page: number; language: string };
  }) => {
    // https://developers.themoviedb.org/3/discover/movie-discover
    // GET /discover/movie
    // https://developers.themoviedb.org/3/discover/tv-discover
    // GET /discover/tv
    const url = `tv/top_rated`;

    // return axios.get(`${apiConfig.baseURL}/${url}`, {
    //   params: { api_key: apiConfig.apiKey },
    // }); // works
    // return axiosClient.get(url, params); // does not work
    return await axiosClient.get(url, {
      params: { api_key: apiConfig.apiKey },
    }); // works
  };
  const params = { page: 1, language: "en-US" };
  // Get Movie List
  const resTopRatedSeries = await TopRatedSeriesList({
    params,
  });
  const getTopRatedSeriesList = resTopRatedSeries.data.results;
  console.log("getTopRatedSeriesList", getTopRatedSeriesList);

  res.status(200).json({ getTopRatedSeriesList });
}
