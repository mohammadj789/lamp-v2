import axios from "axios";
import { DOMAIN } from "./constant";
import Cookies from "js-cookie";
const api = axios.create({
  baseURL: DOMAIN,
  headers: {},
});
//this runs before each requests
api.interceptors.request.use((request) => {
  //recieve token from cookie and set it in each request authorization header
  const access_token = Cookies.get("lamp_token");
  if (access_token) {
    request.headers["Authorization"] = `Bearer ${access_token}`;
  }

  return request;
});
export { api };
