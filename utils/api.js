import axios from "axios";
import Cookies from "js-cookie";
import { DOMAIN } from "./constant";

const api = axios.create({
  baseURL: DOMAIN,
  headers: {},
});

api.interceptors.request.use((request) => {
  const access_token = Cookies.get("token");
  if (access_token) {
    request.headers["Authorization"] = `Bearer ${access_token}`;
  }
  return request;
});
export { api };
