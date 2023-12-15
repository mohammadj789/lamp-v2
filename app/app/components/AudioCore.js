"use client";
import useLampStore from "@/store/store";
import { useStore } from "@/store/useStore";
import { DOMAIN } from "@/utils/constant";
import { useEffect, useMemo, useRef } from "react";
export const AudioCore = () => {
  const track_id = useStore(useLampStore, (state) => state.track.id);
  const track_collection = useStore(
    useLampStore,
    (state) => state.track.collection
  );

  const lastChange = useStore(
    useLampStore,
    (state) => state.lastChange
  );

  const CurTime = useLampStore((state) => state.currentTime);
  const setCurTime = useLampStore((state) => state.updateTime);
  const setDuration = useLampStore((state) => state.setDuration);
  const togglePlay = useLampStore((state) => state.togglePlay);
  const play = useLampStore((state) => state.play);
  const volume = useLampStore((state) => state.volume);
  const mute = useLampStore((state) => state.mute);
  const QueueToNext = useLampStore((state) => state.QueueToNext);

  const audio = useRef(
    typeof window !== "undefined" ? new Audio() : null
  );

  useEffect(() => {
    try {
      audio.current.src = DOMAIN + "/track/stream/" + track_id;
      audio.current.load();
      audio.current.play().catch((e) => e);
      togglePlay();
      audio.current.currentTime = 0;
      audio.current.ontimeupdate = () =>
        setCurTime(audio.current.currentTime);
      audio.current.onended = () => {
        if (QueueToNext()) {
          audio.current.play();
        } else audio.current.pause();
      };
      audio.current.onloadedmetadata = () =>
        setDuration(audio.current.duration);
    } catch (error) {}
    return () => {
      audio.current.onended = null;
      audio.current.ontimeupdate = null;
      audio.current.onloadedmetadata = null;
    };
  }, [
    track_id,
    setCurTime,
    track_collection,
    setDuration,
    QueueToNext,
  ]);

  useEffect(() => {
    if (isFinite(volume)) {
      if (mute) audio.current.volume = 0;
      else audio.current.volume = volume;
    }
  }, [volume, mute, audio]);

  useEffect(() => {
    if (CurTime === 0) audio.current.currentTime = 0;
  }, [CurTime]);

  useEffect(() => {
    if (isFinite(lastChange)) audio.current.currentTime = lastChange;
  }, [lastChange, audio]);

  useEffect(() => {
    if (!play) audio.current.pause();
    else if (play) audio.current.play();
  }, [play, audio]);
  return null;
};
