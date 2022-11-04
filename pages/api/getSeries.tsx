// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axiosClient from "../../lib/axiosClient";
import apiConfig from "../../config/apiConfig";
import { SeriesItem } from "../../types/typings";

interface Data {
  getSeriesList: SeriesItem[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const seriesList = async (params: { params: { page: number } }) => {
    // https://developers.themoviedb.org/3/discover/tv-discover
    // GET /discover/tv
    const url = `discover/tv`;

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
  const resSeries = await seriesList({
    params,
  });
  const getSeriesList = resSeries.data.results;
  console.log("getSeriesList", getSeriesList);

  res.status(200).json({ getSeriesList });
}
