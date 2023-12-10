"use client";
import useUserStore from "@/store/userStore";
import { BackSVG, ForwardSVG } from "@/svg/Play";
import { DOMAIN } from "@/utils/constant";
import { useRouter } from "next/navigation";

export function FloatingHeader(props) {
  const router = useRouter();
  const img = useUserStore((state) => state.user.img);
  return (
    <div className="w-full bg-transparent absolute flex justify-between px-5 py-2 z-20">
      <div className="flex items-center gap-2">
        <button
          onClick={() => router.back()}
          className="flex items-center justify-center bg-black bg-opacity-30 text-white rounded-full h-9 w-9 "
        >
          <BackSVG />
        </button>
        <button
          onClick={() => router.forward()}
          className="flex items-center justify-center bg-black bg-opacity-30 text-white rounded-full h-9 w-9 "
        >
          <ForwardSVG />
        </button>
      </div>
      <button className="h-fit">
        <img
          src={DOMAIN + img}
          className="w-10 h-10 object-cover rounded-full border-[6px] border-zinc-800 border-opacity-80"
          alt="profile"
        />
      </button>
    </div>
  );
}
