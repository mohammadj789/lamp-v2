import Cookies from "js-cookie";

export const storage = {
  getItem: async (name) => {
    return Cookies.get(name) || null;
  },
  setItem: async (name, value) => {
    Cookies.set(name, value, { expires: 7 });
  },
  removeItem: async (name) => {
    Cookies.remove(name);
  },
};
