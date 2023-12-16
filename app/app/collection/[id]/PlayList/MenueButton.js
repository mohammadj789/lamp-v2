"use client";
import { MenuSVG } from "@/svg/Play";
import useLampStore from "@/store/store";
import React, { useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import Modal from "react-modal";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { DOMAIN } from "@/utils/constant";
import useUserStore from "@/store/userStore";
import { getRequest } from "@/utils/getRequest";
import axios from "axios";
import { useRouter } from "next/navigation";

const CollectionItem = ({ image, title, onClick }) => {
  const unselectedStyle =
    "transition-colors duration-300 transform rounded-md text-gray-200 hover:bg-gray-800 hover:text-gray-200";
  return (
    <div
      onClick={onClick}
      className={`flex items-center p-2 ${unselectedStyle} cursor-pointer`}
    >
      <img
        className={`sm:w-14 sm:h-14 w-28 h-28 object-cover flex-shrink-0 rounded-md`}
        src={image ?? "/montain.jpg"}
        alt="inventory item"
      />
      <div className={`mx-4 flex flex-col `}>
        <p className={`whitespace-nowrap font-[700] text-2xl`}>
          {title}
        </p>
      </div>
    </div>
  );
};

function AddToCollectionButton({ id }) {
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const queryClient = useQueryClient();
  const TOKEN = useUserStore((state) => state.token);
  const {
    data: {
      collectioans: { me },
    },
  } = useQuery({
    queryKey: ["collections"],
    queryFn: () =>
      getRequest(DOMAIN + "/collection", {
        Authorization: "Bearer " + TOKEN,
      }),
  });
  const AddToCollection = async ({ playlist, track }) => {
    const response = await axios.post(
      DOMAIN + "/collection/add/",
      { trackID: track, playlistID: playlist },
      { headers: { Authorization: "Bearer " + TOKEN } }
    );
    return response.data;
  };

  const { mutate } = useMutation({
    mutationKey: ["add to collection"],
    mutationFn: AddToCollection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      setModal(false);
      router.refresh();
    },
  });

  return (
    <>
      <button onClick={() => setModal(true)}>Add To Playlist</button>
      <Modal
        className={
          "absolute top-1/2 left-1/2  inset-[50%_auto_auto_50%] translate-x-[-50%] translate-y-[-50%]  overflow-auto  outline-none  mr-[-50%] z-30 bg-black rounded-lg p-8"
        }
        preventScroll
        overlayClassName={"bg-gray-600/50 z-20 inset-0 fixed"}
        isOpen={modal}
      >
        <div className="w-full flex items-center justify-between text-white pb-2">
          <h3 className="font-bold">select a playlist</h3>
          <button onClick={() => setModal(false)}>Close</button>
        </div>
        <div className="min-w-[400px] md:min-w-[80vw] max-h-[70vh] overflow-auto">
          {me?.map((item) => (
            <CollectionItem
              key={item._id}
              image={item.image ? DOMAIN + item.image : "/girl.jpg"}
              title={item.title}
              onClick={() =>
                mutate({ playlist: item._id, track: id })
              }
            />
          ))}
        </div>
      </Modal>
    </>
  );
}
function RemoveFromCollectionButton({ id, collection }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const TOKEN = useUserStore((state) => state.token);
  const {
    data: {
      collectioans: { me },
    },
  } = useQuery({
    queryKey: ["collections"],
    queryFn: () =>
      getRequest(DOMAIN + "/collection", {
        Authorization: "Bearer " + TOKEN,
      }),
  });
  const isYours = me.some((item) => item._id === collection);
  const RemoveFromCollection = async ({ playlist, track }) => {
    const response = await axios.delete(
      DOMAIN + "/collection/remove-track",

      {
        headers: { Authorization: "Bearer " + TOKEN },
        data: { trackID: track, playlistID: playlist },
      }
    );
    return response.data;
  };

  const { mutate } = useMutation({
    mutationKey: ["remove fromcollection"],
    mutationFn: RemoveFromCollection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      router.refresh();
    },
  });
  if (isYours) {
    return (
      <li className="whitespace-nowrap hover:bg-neutral-700 rounded-lg px-3 py-2">
        <button
          onClick={() => mutate({ playlist: collection, track: id })}
        >
          Remove from this playlist
        </button>
      </li>
    );
  }
}
export function MenueButton({
  title,
  image,
  credit,
  id,
  lyric,
  queue,
  collection,
}) {
  const [open, setopen] = useState(false);
  const AddToQ = useLampStore((state) => state.AddToQueue);
  return (
    <span className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setopen(true);
        }}
        className=""
      >
        <MenuSVG />
      </button>
      {open && (
        <ClickAwayListener onClickAway={() => setopen(false)}>
          <ul className="absolute top-full text-sm -translate-x-full bg-neutral-800 p-3 z-[1] rounded-lg flex flex-col">
            <li className="whitespace-nowrap hover:bg-neutral-700 rounded-lg px-3 py-2">
              <button
                onClick={() =>
                  AddToQ({
                    title,
                    image,
                    credit,
                    id,
                    lyric,
                  })
                }
              >
                Add To Queue
              </button>
            </li>
            <li className="whitespace-nowrap hover:bg-neutral-700 rounded-lg px-3 py-2">
              <AddToCollectionButton id={id} />
            </li>
            {!queue && (
              <RemoveFromCollectionButton
                id={id}
                collection={collection}
              />
            )}
          </ul>
        </ClickAwayListener>
      )}
    </span>
  );
}
