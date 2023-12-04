import axios from "axios";

export const getRequest = async (url, head) => {
  const response = await axios.get(url, { headers: head });
  return response.data;
};
