"use client";
import { ProgressBar } from "../ui/ProgressBar";
import useLampStore from "@/store/store";
import { useStore } from "@/store/useStore";
import useUserStore from "@/store/userStore";
import {
  HighVolumeSVG,
  LowVolumeSVG,
  MediumVolumeSVG,
  MenuSVG,
  MicSVG,
  MuteVolumeSVG,
  PeopleSVG,
} from "@/svg/Play";
import { DOMAIN } from "@/utils/constant";
import Link from "next/link";
import { useEffect, useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import { io } from "socket.io-client";

function FriendStatus() {
  const user_id = useUserStore((state) => state.user.id);
  const setTrack = useLampStore((state) => state.setTrack);

  const [status, setStatus] = useState([]);
  const [open, setOpen] = useState(false);

  const updateuserHandller = (data) => {
    setStatus((prv) => [
      ...prv.filter(
        (item) =>
          item.user.username !== data.user.username &&
          item.expire - Date.now() > 0
      ),
      data,
    ]);
  };

  const expireHandller = (data) => {
    setStatus((prv) =>
      prv.filter(
        (item) =>
          item.song.id !== data.song && item.user.id !== data.user
      )
    );
  };

  useEffect(() => {
    const socket = io(DOMAIN + "/socket", {
      extraHeaders: {
        id: user_id,
      },
    });
    socket.on("log", updateuserHandller);
    socket.on("expire", expireHandller);
    return () => {
      socket.disconnect();
    };
  }, [user_id]);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(true)}
        className={`text-gray-400 rounded-full flex items-center h-8 w-8 p-1 relative hover:text-white`}
      >
        {status.length > 0 && (
          <span className="h-2 w-2 bg-green-600 absolute top-1 right-2 rounded-full"></span>
        )}
        <PeopleSVG />
      </button>
      {open && (
        <ClickAwayListener onClickAway={() => setOpen(false)}>
          <div className="flex flex-col gap-2 absolute w-[30vw] max-w-[290px] p-3 translate-y-[calc(-100%-30px)] -translate-x-full border-2 border-zinc-600 bg-slate-950 rounded-sm shadow-2xl">
            {status.length > 0 ? (
              <>
                {status.map((item) => (
                  <div
                    onClick={() =>
                      setTrack({
                        title: item.song.title,
                        credit: item.song.credit,
                        image: DOMAIN + item.song.image,
                        id: item.song.id,
                        lyric: item.song.lyric,
                        collection: null,
                      })
                    }
                    className="w-full h-10 flex flex-col"
                    key={item.user.id}
                  >
                    <span className="text-green-600 line-clamp-1">
                      {item.user.username}
                    </span>
                    <span className="text-xs line-clamp-1">
                      <span className="font-bold">
                        {item.song.title}
                      </span>{" "}
                      by {item.song.credit}
                    </span>
                  </div>
                ))}
              </>
            ) : (
              <div className="w-full h-24 grid place-content-center">
                <p>your friends are offline</p>
              </div>
            )}
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
}

export function Optioans(props) {
  const volume = useStore(useLampStore, (state) => state.volume);
  const lyric = useStore(useLampStore, (state) => state.track.lyric);
  const track = useLampStore((state) => state.track.id);
  const mute = useStore(useLampStore, (state) => state.mute);
  const toggleMute = useLampStore((state) => state.toggleMute);
  const changeVolume = useLampStore((state) => state.changeVolume);

  let volumeState;
  if (volume === 0 || mute) volumeState = <MuteVolumeSVG />;
  else if (volume > 0.66) volumeState = <HighVolumeSVG />;
  else if (volume > 0.33) volumeState = <MediumVolumeSVG />;
  else if (volume > 0) volumeState = <LowVolumeSVG />;

  return (
    <div className="w-full max-w-[17rem] gap-1 cursor-pointer sm:hidden flex items-center">
      <Link
        href={"/app/queue"}
        className={`text-gray-400 rounded-full flex items-center h-8 w-8 p-1 hover:text-white`}
      >
        <MenuSVG />
      </Link>
      {lyric ? (
        <Link
          href={"/app/lyric/" + lyric}
          className={`text-gray-400 rounded-full flex items-center h-8 w-8 p-1 hover:text-white`}
        >
          <MicSVG />
        </Link>
      ) : (
        <Link
          href={"/app/lyric/new/" + track}
          className={`text-gray-400 rounded-full flex items-center h-8 w-8 p-1 hover:text-white`}
        >
          <MicSVG />
        </Link>
      )}
      <button
        className={`text-gray-400 rounded-full flex items-center h-8 w-8 p-1 hover:text-white`}
        onClick={toggleMute}
      >
        {volumeState}
      </button>

      <ProgressBar
        current={volume * 100}
        max={100}
        ProgressClickHandlerr={(value) => changeVolume(value / 100)}
      />
      <FriendStatus />
    </div>
  );
}
