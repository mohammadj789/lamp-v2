import { storage } from "@/utils/CookieStorage";
import { create } from "zustand";
import {
  persist,
  devtools,
  createJSONStorage,
} from "zustand/middleware";
const store = (set, get) => ({
  audio: null,
  track: {
    title: null,
    Image: null,
    credit: null,
    id: null,
    lyric: null,
    collection: null,
  },

  currentTime: 0,
  duration: 0,
  play: false,
  mute: false,
  volume: 0.7,
  lastChange: null,
  updateAudio: (lastChange) => set({ lastChange: lastChange }),
  setDuration: (duration) => set({ duration: duration }),
  updateTime: (time) => set({ currentTime: time }),
  setTrack: (track) =>
    set({
      track: {
        title: track.title,
        image: track.image,
        credit: track.credit,
        id: track.id,
        lyric: track.lyric,
        collection: track.collection,
      },
      currentTime: 0,
      play: true,
    }),
  togglePlay: () => set({ play: true }),
  togglePause: () => set({ play: false }),
  toggleMute: () => set({ mute: !get().mute }),
  changeVolume: (volume) => set({ volume: volume }),
});

const useLampStore = create(
  devtools(
    persist(store, {
      name: "lamp",
      storage: createJSONStorage(() => storage),
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) =>
            ["track"].includes(key)
          )
        ),
    })
  )
);

export default useLampStore;
