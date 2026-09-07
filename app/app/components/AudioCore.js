"use client";
import { useCurrentTrack } from "@/hooks/Requests/useCurrentTrack";
import useLampStore from "@/store/store";
import { useStore } from "@/store/useStore";
import useUserStore from "@/store/userStore";
import { DOMAIN } from "@/utils/constant";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useRef } from "react";

export const AudioCore = () => {
  const TOKEN = useUserStore((state) => state.token);

  const track_id = useStore(useLampStore, (state) => state.track.id);
  const track_collection = useStore(
    useLampStore,
    (state) => state.track.collection,
  );

  const lastChange = useStore(
    useLampStore,
    (state) => state.lastChange,
  );
  const CurTime = useLampStore((state) => state.currentTime);
  const setCurTime = useLampStore((state) => state.updateTime);
  const setDuration = useLampStore((state) => state.setDuration);
  const togglePlay = useLampStore((state) => state.togglePlay);
  const play = useLampStore((state) => state.play);
  const volume = useLampStore((state) => state.volume);
  const mute = useLampStore((state) => state.mute);
  const QueueToNext = useLampStore((state) => state.QueueToNext);

  // Lazily create the Audio element once, not on every render
  const audio = useRef(null);
  if (audio.current === null && typeof window !== "undefined") {
    audio.current = new Audio();
  }

  useCurrentTrack();

  const { mutate } = useMutation({
    mutationKey: ["update track status", track_id],
    mutationFn: async () =>
      (
        await axios.get(DOMAIN + "/track/update-stats/" + track_id, {
          headers: { Authorization: "bearer " + TOKEN },
        })
      ).data,
    onSuccess: (data, _vars, context) => {
      if (!audio.current) return;

      // data.song.address is the ready-to-play URL -- no stream endpoint
      // or manual URL building needed anymore
      audio.current.src = data.song.address;
      audio.current.load();
      audio.current.currentTime = 0;

      // Don't autoplay on hydration -- only when the user actually
      // triggered a real track change
      if (!context?.isHydration) {
        audio.current
          .play()
          .then(() => togglePlay())
          .catch((e) => console.error("play() failed:", e));
      }
    },
    onError: (error) => {
      console.error("update-stats request failed:", error);
    },
  });

  // Fetch stats + load/play new track whenever track_id changes
  const hasHydratedTrack = useRef(false);
  const prevTrackId = useRef(null);

  useEffect(() => {
    if (!audio.current || !TOKEN || !track_id) return;

    // First time we see a real track_id => this is hydration from persisted
    // state, not a user action. Still fetch via the same query, just skip
    // autoplay.
    const isHydration = !hasHydratedTrack.current;
    if (isHydration) {
      hasHydratedTrack.current = true;
      prevTrackId.current = track_id;
      mutate(undefined, { context: { isHydration: true } });
    } else {
      // Ignore no-op re-renders where track_id didn't actually change
      if (prevTrackId.current === track_id) return;
      prevTrackId.current = track_id;

      mutate(undefined, { context: { isHydration: false } });
    }

    audio.current.ontimeupdate = () =>
      setCurTime(audio.current.currentTime);
    audio.current.onended = () => {
      if (QueueToNext()) {
        audio.current.play().catch((e) => console.error(e));
      } else {
        audio.current.pause();
      }
    };
    audio.current.onloadedmetadata = () =>
      setDuration(audio.current.duration);

    return () => {
      if (!audio.current) return;
      audio.current.onended = null;
      audio.current.ontimeupdate = null;
      audio.current.onloadedmetadata = null;
    };
  }, [track_id, TOKEN, setCurTime, setDuration, QueueToNext, mutate]);

  // Volume / mute
  useEffect(() => {
    if (!audio.current || !isFinite(volume)) return;
    audio.current.volume = mute ? 0 : volume;
  }, [volume, mute]);

  // Reset to start
  useEffect(() => {
    if (!audio.current) return;
    if (CurTime === 0) audio.current.currentTime = 0;
  }, [CurTime]);

  // Seek on external change
  useEffect(() => {
    if (!audio.current || !isFinite(lastChange)) return;
    audio.current.currentTime = lastChange;
  }, [lastChange]);

  // Play / pause toggle
  useEffect(() => {
    if (!audio.current) return;
    if (!play) {
      audio.current.pause();
    } else {
      audio.current
        .play()
        .catch((e) => console.error("play() failed:", e));
    }
  }, [play]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audio.current) {
        audio.current.pause();
        audio.current.src = "";
      }
    };
  }, []);

  return null;
};
