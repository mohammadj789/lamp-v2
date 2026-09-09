"use client";
import useColloctions from "@/hooks/Requests/useColloctions";
import useSearch from "@/hooks/Requests/useSearch";
import { useUploadTrack } from "@/hooks/Requests/useUploadTrack";
import useUserStore from "@/store/userStore";
import { PlusSVG } from "@/svg/Play";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import ReactSlider from "react-slider";

function FeatureArtist({ selectedFeature, setSelectedFeature }) {
  const [hasFeature, setHasFeature] = useState(false);
  const [search, setsearch] = useState("");

  const { mutate, data } = useSearch();
  useEffect(() => {
    const timer = setTimeout(() => {
      search.length > 2 && mutate(search);
    }, 800);
    return () => clearTimeout(timer);
  }, [search, mutate]);

  return (
    <>
      <div className="flex w-full justify-between mb-2 items-center">
        <label className="text-white">Feature</label>
        <button
          type="button"
          onClick={() => setHasFeature((prev) => !prev)}
        >
          <PlusSVG height={16} width={16} />
        </button>
      </div>
      {selectedFeature.length > 0 && (
        <div className="flex w-full mb-2 items-center flex-wrap gap-2">
          {selectedFeature.map((item) => (
            <div
              key={item._id}
              className="rounded-2xl border-[1px] border-green-600 text-green-600 py-1 px-2 text-xs flex gap-1"
            >
              <span>{item.username}</span>
              <button
                type="button"
                onClick={() =>
                  setSelectedFeature((prev) => {
                    return prev.filter((i) => i._id !== item._id);
                  })
                }
              >
                <PlusSVG fill={"green"} height={10} width={10} />
              </button>
            </div>
          ))}
        </div>
      )}
      {hasFeature && (
        <>
          <input
            value={search}
            onChange={(e) => setsearch(e.target.value)}
            placeholder="artist user"
            className="text-slate-50 w-full mb-2 border-[1px] text-xs border-neutral-700 rounded-sm outline-none px-3 py-2 bg-gray-900 focus:border-slate-50 hover:border-slate-50"
          />
          <div className="text-white max-h-60 overflow-auto mt-3 mb-2 text-xs flex flex-col gap-3">
            {data?.map((item) => (
              <div
                onClick={() => {
                  if (
                    selectedFeature.findIndex(
                      (feature) => feature._id === item._id,
                    ) === -1
                  ) {
                    setSelectedFeature((prev) => [...prev, item]);
                  }
                  setHasFeature(false);
                }}
                key={item._id}
                className="flex gap-3 border-[1px] rounded-lg p-2 cursor-pointer hover:bg-slate-900"
              >
                <img
                  className="w-8 h-8 rounded-lg"
                  src={item.image}
                  alt={item.name}
                />
                <div className="flex flex-col justify-between ">
                  <span>{item.username}</span>
                  <span>{item.name}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

const ArtistSection = ({ userId }) => {
  const [selectedFeature, setSelectedFeature] = useState([]);
  const [modal, setModal] = useState({ open: false, state: null });

  const [formData, setFormData] = useState({
    title: "",
    track: null,
    genre: "Blues",
    collectionId: "",
  });

  const id = useUserStore((state) => state.user.id);

  const { data } = useColloctions();

  const { mutate, error, isPending, progress } = useUploadTrack({
    onDone: () => {
      setModal({ state: null, open: false });

      // optional: reset form
      setFormData({
        title: "",
        track: null,
        genre: "Blues",
        collectionId: "",
      });
      setSelectedFeature([]);
    },
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleUpload = () => {
    mutate({
      file: formData.track,
      title: formData.title,
      genre: formData.genre,
      features: selectedFeature.map((item) => item._id),
      collectionId:
        modal.state === "exist" ? formData.collectionId : null,
    });
  };

  if (userId !== id) return null;

  return (
    <div className="text-white px-3 w-full flex sm:flex-wrap gap-10 sm:gap-5 mb-3">
      <Modal
        className="absolute top-1/2 left-1/2 inset-[50%_auto_auto_50%] translate-x-[-50%] translate-y-[-50%] overflow-auto outline-none mr-[-50%] z-30 bg-black rounded-lg p-8"
        preventScroll
        overlayClassName="bg-gray-600/50 z-20 inset-0 fixed"
        isOpen={modal.open}
      >
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpload();
            }}
            className="flex flex-col w-full"
          >
            {modal.state === "exist" && (
              <select
                name="collectionId"
                value={formData.collectionId}
                onChange={handleChange}
                className="mb-2 text-slate-50 w-full border-[1px] text-xs border-neutral-700 rounded-sm outline-none px-3 py-2 bg-gray-900 focus:border-slate-50 hover:border-slate-50"
              >
                {data?.collectioans?.me
                  ?.filter((item) => item.type === "album")
                  .map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.title}
                    </option>
                  ))}
              </select>
            )}

            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="track name"
              className="text-slate-50 w-full mb-2 border-[1px] text-xs border-neutral-700 rounded-sm outline-none px-3 py-2 bg-gray-900 focus:border-slate-50 hover:border-slate-50"
            />

            <input
              name="track"
              type="file"
              onChange={handleChange}
              className="text-slate-50 w-full mb-2 border-[1px] text-xs border-neutral-700 rounded-sm outline-none px-3 py-2 bg-gray-900 focus:border-slate-50 hover:border-slate-50"
            />

            <select
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="mb-2 text-slate-50 w-full border-[1px] text-xs border-neutral-700 rounded-sm outline-none px-3 py-2 bg-gray-900 focus:border-slate-50 hover:border-slate-50"
            >
              <option>Blues</option>
              <option>Country</option>
              <option>Electronic</option>
              <option>Folk</option>
              <option>HipHop</option>
              <option>Jazz</option>
              <option>Pop</option>
              <option>R&B</option>
              <option>Rock</option>
              <option>Metal</option>
              <option>Punk</option>
            </select>

            <FeatureArtist
              selectedFeature={selectedFeature}
              setSelectedFeature={setSelectedFeature}
            />

            {error && (
              <span className="text-center text-red-500 text-xs mb-2">
                {error?.response?.data?.errors?.message}
              </span>
            )}

            {progress !== 0 && isPending && (
              <div>
                <div className="w-full flex items-center justify-between mb-1">
                  <span className="text-white text-xs">
                    uploading ...
                  </span>

                  <span className="text-white text-xs">
                    {progress}%
                  </span>
                </div>

                <ReactSlider
                  className="w-full h-1 rounded-3xl mb-2"
                  trackClassName="bg-white bg-opacity-25 first:bg-white h-full rounded-3xl"
                  max={100}
                  min={0}
                  disabled
                  value={progress}
                />
              </div>
            )}

            <div className="flex items-center justify-end gap-2 text-white rounded-md">
              <button
                type="button"
                onClick={() => setModal({ open: false, state: null })}
                className="text-xs"
              >
                Close
              </button>

              <button
                type="submit"
                className="bg-green-500 text-xs px-2 py-1 rounded-xl font-semibold"
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      </Modal>

      <button
        onClick={() => setModal({ open: true, state: "new" })}
        className="w-1/2 sm:w-full bg-slate-700 rounded-lg py-4 font-bold text-lg"
      >
        New track
      </button>

      <button
        onClick={() => setModal({ open: true, state: "exist" })}
        className="w-1/2 sm:w-full bg-slate-700 rounded-lg py-4 font-bold text-lg"
      >
        Add to existing track
      </button>
    </div>
  );
};

export default ArtistSection;
