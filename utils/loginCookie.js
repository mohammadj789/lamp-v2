import Cookies from "js-cookie";
export const getLoginCookie = () => {
  return Cookies.get("lamp_token");
};
export const setLoginCookie = (token) => {
  return Cookies.set("lamp_token", token);
};
export const removeLoginCookie = () => {
  return Cookies.remove("lamp_token");
};
