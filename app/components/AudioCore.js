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

  const setCurTime = useLampStore((state) => state.updateTime);
  const setDuration = useLampStore((state) => state.setDuration);
  const play = useStore(useLampStore, (state) => state.play);
  const volume = useStore(useLampStore, (state) => state.volume);
  const mute = useStore(useLampStore, (state) => state.mute);
  const audio = useRef(new Audio());

  useEffect(() => {
    try {
      audio.current.src = DOMAIN + "/track/stream/" + track_id;

      audio.current.load();
      audio.current.play().catch((e) => e);
      audio.current.currentTime = 0;
    } catch (error) {
      console.log(error);
    }
  }, [track_id, setCurTime, track_collection]);

  audio.current.ontimeupdate = () =>
    setCurTime(audio.current.currentTime);
  audio.current.onended = () => audio.current.pause();

  useEffect(() => {
    if (isFinite(volume)) {
      if (mute) {
        audio.current.volume = 0;
      } else audio.current.volume = volume;
    }
  }, [volume, mute, audio]);

  useEffect(() => {
    if (isFinite(lastChange)) {
      audio.current.currentTime = lastChange;
    }
  }, [lastChange, audio]);
  useEffect(() => {
    if (audio.current.duration) {
      setDuration(audio.current.duration);
    }
  }, [play, audio.current.duration, setDuration]);

  useEffect(() => {
    if (!play) {
      audio.current.pause();
    } else if (play) audio.current.play();
  }, [play, audio]);
  return null;
};
