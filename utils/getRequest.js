import { api } from "./api";

export const getRequest = async (url, head) => {
  const response = await api.get(url);
  return response.data;
};
