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
    following: null,
    followers: null,
  },
};
const store = (set, get) => ({
  ...init,
  login: (token, user) => {
    set({
      token: token,
      isAuth: true,
      user: {
        id: user._id,
        following: user.followings,
        followers: user.followers,
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
  updateProfile: (image) => {
    set({
      user: {
        ...get().user,
        img: image,
      },
    });
  },

  toogleFollowings: (id) => {
    console.log(...get().user.following, id, "sdsdsd");

    const followings = [...get().user.following];
    const index = followings.indexOf(id);
    if (index > -1) followings.splice(index, 1);
    else followings.push(id);
    console.log(followings);

    set({
      user: {
        ...get().user,
        following: followings,
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
