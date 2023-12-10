import { storage } from "@/utils/CookieStorage";
import Cookies from "js-cookie";
import { Cookie } from "next/font/google";
import { create } from "zustand";
import {
  persist,
  devtools,
  createJSONStorage,
} from "zustand/middleware";
const init = {
  token: null,
  isAuth: false,
  user: {
    username: null,
    name: null,
    favorite_songs: null,
    favorite_collections: null,
    tracks: null,
    collections: null,
    img: null,
    role: null,
  },
};
const store = (set, get) => ({
  ...init,
  login: (token, user) => {
    set({
      token: token,
      isAuth: true,
      user: {
        username: user.username,
        name: user.name,
        favorite_songs: user.favorit_songs,
        favorite_collections: user.favorit_collections,
        tracks: user.tracks,
        collections: user.Collections,
        img: user.image,
        role: user.role,
      },
    });
  },
  logout: () => set({ ...init }),
});
const useUserStore = create(
  devtools(
    persist(store, {
      name: "user",
      storage: createJSONStorage(() => storage),
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) =>
            ["token"].includes(key)
          )
        ),
    })
  )
);

export default useUserStore;
