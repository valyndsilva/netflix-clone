// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axiosClient from "../../lib/axiosClient";
import apiConfig from "../../config/apiConfig";
import { SeriesItem } from "../../types/typings";

interface Data {
  getAnimation: SeriesItem[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const Animation = async() => {
    const url = `discover/tv?with_genres=16&sort_by=popularity.desc`;

    // return axios.get(`${apiConfig.baseURL}/${url}`, {
    //   params: { api_key: apiConfig.apiKey },
    // }); // works
    return await axiosClient.get(url, {
      params: { api_key: apiConfig.apiKey },
    }); // works
  };
  // Get Movie List
  const resAnimation = await Animation();
  const getAnimation = resAnimation.data.results;
  console.log("getAnimation", getAnimation);

  res.status(200).json({ getAnimation });
}
