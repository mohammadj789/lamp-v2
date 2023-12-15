"use client";
import React, { useRef, useState } from "react";
import { InventoryItem } from "./InventoryItem";
import { DOMAIN } from "@/utils/constant";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import useUserStore from "@/store/userStore";
import { PlusSVG } from "@/svg/Play";
import Modal from "react-modal";

function NewCollectionButton() {
  const user_role = useUserStore((state) => state.user.role);
  const [modal, setModal] = useState(false);
  const queryClient = useQueryClient();
  const TOKEN = useUserStore((state) => state.token);

  const postCollection = async () => {
    const response = await axios.post(
      DOMAIN +
        "/collection/create/" +
        (selectRef?.current
          ? selectRef.current.selectedOptions["0"].text
          : "playlist"),
      { title: nameRef.current.value },
      { headers: { Authorization: "Bearer " + TOKEN } }
    );
    return response.data;
  };

  const { mutate } = useMutation({
    mutationKey: ["new collection"],
    mutationFn: postCollection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      setModal(false);
    },
  });

  const nameRef = useRef();
  const selectRef = useRef();
  return (
    <div className="flex items-center justify-between text-white m-4">
      <h2 className="lg:hidden">Your Library</h2>
      <button
        onClick={() => setModal(true)}
        className="lg:justify-center grid place-content-center lg:w-full lg:aspect-square lg:bg-slate-700 lg:rounded-lg"
      >
        <PlusSVG width={16} height={16} />
      </button>

      <Modal
        className={
          "absolute top-1/2 left-1/2 inset-[50%_auto_auto_50%] translate-x-[-50%] translate-y-[-50%]  overflow-auto  outline-none  mr-[-50%] z-30 bg-black rounded-lg p-8"
        }
        preventScroll
        overlayClassName={"bg-gray-600/50 z-20 inset-0 fixed"}
        isOpen={modal}
      >
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              mutate();
            }}
            className="flex flex-col w-full"
          >
            {user_role === "ARTIST" && (
              <select
                ref={selectRef}
                className="mb-2 text-slate-50 w-full border-[1px] text-xs border-neutral-700 rounded-sm outline-none px-3 py-2 bg-gray-900 focus:border-slate-50 hover:border-slate-50"
              >
                <option>Album</option>
                <option>Playlist</option>
              </select>
            )}
            <input
              ref={nameRef}
              placeholder="Collection name"
              className="text-slate-50 w-full mb-2 border-[1px] text-xs border-neutral-700 rounded-sm outline-none px-3 py-2 bg-gray-900 focus:border-slate-50 hover:border-slate-50"
            />
            <div className="flex items-center justify-end gap-2 text-white   rounded-md">
              <button
                type="button"
                onClick={() => setModal(false)}
                className="text-xs"
              >
                Close
              </button>
              <button className=" bg-green-500 text-xs px-2 py-1 rounded-xl font-semibold">
                Create
              </button>
            </div>
          </form>
        </div>
      </Modal>
      {/* </ClickAwayListener> */}
    </div>
  );
}

const InventoryItemList = ({ hide }) => {
  const TOKEN = useUserStore((state) => state.token);
  //collections
  const { data: CollectionData, isLoading: CollectionLoading } =
    useQuery({
      queryKey: ["collections"],
      queryFn: async () => {
        const response = await axios.get(DOMAIN + "/collection", {
          headers: {
            Authorization: "Bearer " + TOKEN,
          },
        });
        return response.data;
      },
    });
  //Artists
  const { data: ARtistData, isLoading: ArtistLoading } = useQuery({
    queryKey: ["Followed Artist"],
    queryFn: async () => {
      const response = await axios.get(DOMAIN + "/user/followings/", {
        headers: {
          Authorization: "Bearer " + TOKEN,
        },
      });
      return response.data;
    },
  });

  const playlists = CollectionData
    ? [
        ...CollectionData.collectioans.wished,
        ...CollectionData.collectioans.me,
      ]
    : [];

  return (
    <div className="h-2/3 pt-3 overflow-y-scroll overflow-x-hidden">
      <NewCollectionButton />
      <InventoryItem
        image={"/hill.jpg"}
        title="Likes"
        id={"favorites"}
        type={"favorite"}
        hide={hide}
      />
      {playlists.map((item) => (
        <InventoryItem
          hide={hide}
          key={item._id}
          // isPlaying
          image={item.image ? DOMAIN + item.image : "/hill.jpg"}
          title={item.title}
          type={item.type}
          id={item._id}
          credit="travis scott"
        />
      ))}
      {ARtistData?.artist?.map((item) => (
        <InventoryItem
          hide
          key={item._id}
          image={item.image ? DOMAIN + item.image : "/hill.jpg"}
          title={item.name}
          type={"artist"}
          id={item._id}
        />
      ))}
    </div>
  );
};
export default InventoryItemList;
