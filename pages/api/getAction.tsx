// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axiosClient from "../../lib/axiosClient";
import apiConfig from "../../config/apiConfig";
import { MovieItem } from "../../types/typings";

interface Data {
  getAction: MovieItem[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const Action = async() => {
    const url = `discover/movie?with_genres=28&sort_by=popularity.desc`;

    // return axios.get(`${apiConfig.baseURL}/${url}`, {
    //   params: { api_key: apiConfig.apiKey },
    // }); // works
    return await axiosClient.get(url, {
      params: { api_key: apiConfig.apiKey },
    }); // works
  };
  // Get Movie List
  const resAction = await Action();
  const getAction = resAction.data.results;
  console.log("getAction", getAction);

  res.status(200).json({ getAction });
}
