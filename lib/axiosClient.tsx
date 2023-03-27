import axios from "axios";
import apiConfig from "../config/apiConfig";
// Base url to make requests to the movie database

const axiosClient = axios.create({
  baseURL: apiConfig.baseURL,
});

export default axiosClient;
