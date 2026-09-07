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
    id: null,
    collection: null,
  },
  queue: [],
  currentTime: 0,
  duration: 0,
  play: false,
  mute: false,
  volume: 0.7,
  lastChange: null,
  updateAudio: (lastChange) => set({ lastChange: lastChange }),
  setDuration: (duration) => set({ duration: duration }),
  updateTime: (time) => set({ currentTime: time }),
  setQueue: (queue, collection) => {
    const last = queue?.[0];

    set({
      queue: [...queue.slice(1)],
      track: {
        id: last._id,
        collection: collection,
      },
    });

    // set({ queue: queue });
  },
  AddToQueue: (track) => {
    set({ queue: [...get().queue, track] });
  },
  QueueToNext: () => {
    const queue = get().queue;
    const track = queue?.[0];
    if (queue.length > 0) {
      set({
        queue: [...queue.slice(1)],
        currentTime: 0,
        track: {
          id: track._id || track.id,
          collection: null,
        },
      });
      return true;
    } else {
      set({
        play: false,
        queue: [],
        currentTime: 0,
      });
      return false;
    }
  },
  chageCurrentQueue: (index) => {
    const queue = [...get().queue];
    const track = queue[index];
    queue.splice(index, 1);

    set({
      currentTime: 0,
      queue: queue,
      track: {
        id: track._id || track.id,
        collection: null,
      },
    });
  },
  setTrack: (track) =>
    set({
      track: {
        id: track.id,
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
            ["track", "queue"].includes(key),
          ),
        ),
    }),
  ),
);

export default useLampStore;
