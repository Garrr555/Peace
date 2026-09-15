import axios from "axios";
import Cookies from "js-cookie";

const ApiURI = import.meta.env.VITE_API_URI;

const CustomFetch = axios.create({
  baseURL: ApiURI + "/api",
});

CustomFetch.interceptors.request.use((config) => {
  const token = Cookies.get("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default CustomFetch;
