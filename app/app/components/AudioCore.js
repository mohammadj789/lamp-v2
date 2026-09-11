"use client";
import { useCurrentTrack } from "@/hooks/Requests/useCurrentTrack";
import useLampStore from "@/store/store";
import { useStore } from "@/store/useStore";
import { api } from "@/utils/api";
import { DOMAIN } from "@/utils/constant";
import { useMutation } from "@tanstack/react-query";

import { useEffect, useRef } from "react";

export const AudioCore = () => {
  const track_id = useStore(useLampStore, (state) => state.track.id);

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
    mutationFn: async () => {
      if (audio.current) {
        audio.current.pause();
        audio.current.removeAttribute("src");
        audio.current.load();
      }
      return (
        await api.get(DOMAIN + "/track/update-stats/" + track_id)
      ).data;
    },
    onSuccess: (data, _vars) => {
      if (!audio.current) return;
      audio.current.src = data.song.address;
      audio.current.currentTime = 0;
      audio.current.load();

      if (play) {
        audio.current
          .play()
          .catch((e) => console.error("play() failed:", e));
      }
    },
    onError: (error) => {
      console.error("update-stats request failed:", error);
    },
  });

  useEffect(() => {
    if (!audio.current || !track_id) return;
    mutate();
    audio.current.ontimeupdate = () =>
      setCurTime(audio.current.currentTime);
    audio.current.onended = () => {
      if (QueueToNext())
        audio.current.play().catch((e) => console.error(e));
      else audio.current.pause();
    };
    audio.current.onloadedmetadata = () =>
      setDuration(audio.current.duration);

    return () => {
      if (!audio.current) return;
      audio.current.onended = null;
      audio.current.ontimeupdate = null;
      audio.current.onloadedmetadata = null;
    };
  }, [track_id, setCurTime, setDuration, QueueToNext, mutate]);

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
    if (!play) audio.current.pause();
    else
      audio.current
        .play()
        .catch((e) => console.error("play() failed:", e));
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
