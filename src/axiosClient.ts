import axios from "axios";

const BASE_URL = "http://localhost:7777";

const axiosClient = axios.create({
  baseURL: BASE_URL,
});

export default axiosClient;
