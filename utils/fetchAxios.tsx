import axiosClient from "../lib/axiosClient";

export const fetchAxios = async (url:string) => {
  const response = await axiosClient.get(url);
  const data = response.data.results;
  return data;
};

