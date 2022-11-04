// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axiosClient from "../../lib/axiosClient";
import apiConfig from "../../config/apiConfig";
import { MovieItem } from "../../types/typings";

interface Data {
  getDocumentaries: MovieItem[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const Documentaries = async() => {
    const url = `discover/movie?with_genres=99&sort_by=popularity.desc`;

    // return axios.get(`${apiConfig.baseURL}/${url}`, {
    //   params: { api_key: apiConfig.apiKey },
    // }); // works
    return await axiosClient.get(url, {
      params: { api_key: apiConfig.apiKey },
    }); // works
  };
  // Get Movie List
  const resDocumentaries = await Documentaries();
  const getDocumentaries = resDocumentaries.data.results;
  console.log("getDocumentaries", getDocumentaries);

  res.status(200).json({ getDocumentaries });
}
