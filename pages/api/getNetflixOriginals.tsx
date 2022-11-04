// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axiosClient from "../../lib/axiosClient";
import apiConfig from "../../config/apiConfig";
import { SeriesItem } from "../../types/typings";

interface Data {
  getNetflixOriginalsList: SeriesItem[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const NetflixOriginalsList = async() => {
    const url = `discover/tv?page=1&with_networks=213`;

    return await axiosClient.get(url, {
      params: { api_key: apiConfig.apiKey },
    }); // works
  };
  // Get NetflixOriginals Movie List
  const resNetflixOriginals = await NetflixOriginalsList();
  const getNetflixOriginalsList = resNetflixOriginals.data.results;
  console.log("getNetflixOriginalsList", getNetflixOriginalsList);

  res.status(200).json({ getNetflixOriginalsList });
}
