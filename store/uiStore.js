import { create } from "zustand";

const store = (set, get) => ({
  fullPlayer: false,
  toggleFullPlayer: () => set({ fullPlayer: !get().fullPlayer }),
});
const useUiStore = create(store);

export default useUiStore;
