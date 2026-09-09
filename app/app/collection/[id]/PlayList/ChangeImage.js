"use client";
import useUserStore from "@/store/userStore";
import { PenSVG, TrashSVG } from "@/svg/Play";
import { DOMAIN } from "@/utils/constant";
import Modal from "react-modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { useUpdateThumbnail } from "@/hooks/Requests/useUpdateThumbnail";

const ChangeImage = ({ collection, ownerId, profile }) => {
  const userId = useUserStore((state) => state.user.id);

  const { mutate } = useUpdateThumbnail({
    onDone: () => setModal(false),
  });

  const handleUpdateThumbnail = () => {
    mutate({
      file: imageRef.current.files[0],
      profile,
      collectionId: collection,
    });
  };
  const [modal, setModal] = useState(false);
  const imageRef = useRef();

  if (userId === ownerId) {
    return (
      <>
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
                handleUpdateThumbnail();
              }}
              className="flex flex-col w-full"
            >
              <input
                ref={imageRef}
                type="file"
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
                  Change
                </button>
              </div>
            </form>
          </div>
        </Modal>
        <button
          onClick={() => setModal(true)}
          className="absolute z-10 top-1/2 left-1/2 transition-opacity -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100"
        >
          <PenSVG />
        </button>
      </>
    );
  }
};

export default ChangeImage;
