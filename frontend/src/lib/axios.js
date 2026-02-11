import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://alumni-backend-h3yc.onrender.com/api",
  withCredentials: true,
});
