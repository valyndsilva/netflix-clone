import axios from "axios";
import { apiConfig } from "../utils/constants";
// Base url to make requests to the movie database

const axiosClient = axios.create({
  baseURL: apiConfig.baseURL,
});

export default axiosClient;
