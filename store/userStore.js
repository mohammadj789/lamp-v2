import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
const store = (set, get) => ({
  token: null,
  login: (token) => set({ token: token }),
  logout: () => set({ token: null }),
});
const useUserStore = create(
  devtools(
    persist(store, {
      name: "user",
    })
  )
);

export default useUserStore;
