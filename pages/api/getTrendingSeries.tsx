// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axiosClient from "../../lib/axiosClient";
import apiConfig from "../../config/apiConfig";
import { TrendingSeries } from "../../types/typings";

interface Data {
  getTrendingSeries: TrendingSeries[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const trendingSeries = async (params: { params: { page: number } }) => {
    // https://developers.themoviedb.org/3/trending/get-trending
    // GET /trending/{media_type}/{time_window}
    const url = `trending/tv/week`;

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
  const resSeries = await trendingSeries({
    params,
  });
  const getTrendingSeries = resSeries.data.results;
  console.log("getTrendingSeries", getTrendingSeries);

  res.status(200).json({ getTrendingSeries });
}
