import axiosClient from "../lib/axiosClient";

const fetchAxios = async (url: string) => {
  const response = await axiosClient.get(url);
  const data = response.data.results;
  return data;
};

export default fetchAxios;
