import { storage } from "@/utils/CookieStorage";
import { DOMAIN } from "@/utils/constant";
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
        title: last.title,
        credit: last.artist.artist_name,
        image: DOMAIN + last.image,
        id: last._id,
        lyric: last.lyric,
        collection: collection,
      },
    });

    // set({ queue: queue });
  },
  AddToQueue: (track) => {
    console.log([...get().queue, track]);

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
          title: track.title,
          image: track.image,
          credit: track?.artist
            ? track.artist.artist_name
            : track.credit,
          id: track._id || track.id,
          lyric: track.lyric,
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
        title: track.title,
        image: track.image,
        credit: track?.artist
          ? track.artist.artist_name
          : track.credit,
        id: track._id || track.id,
        lyric: track.lyric,
      },
    });
  },
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
            ["track", "queue"].includes(key)
          )
        ),
    })
  )
);

export default useLampStore;
