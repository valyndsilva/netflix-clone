import axios from "axios";
import apiConfig from "../config/apiConfig";
// Base url to make requests to the movie database

const axiosClient = axios.create({
  baseURL: apiConfig.baseURL,
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(async (config) => config);
axiosClient.interceptors.request.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    console.log("Error == ", error.response);
    console.log(error.response.data.errors);
    throw error;
  }
);

export default axiosClient;
