"use client";
import useLampStore from "@/store/store";
import { useStore } from "@/store/useStore";
import { useEffect, useMemo, useRef } from "react";
export const AudioCore = () => {
  const track_id = useStore(useLampStore, (state) => state.track.id);

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
    audio.current.src =
      "http://localhost:4000/track/stream/" + track_id;
    audio.current.load();
    audio.current.play();
    audio.current.currentTime = 0;
  }, [track_id, setCurTime]);
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
