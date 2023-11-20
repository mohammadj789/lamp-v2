import { BackSVG, ForwardSVG } from "@/svg/Play";

export function FloatingHeader(props) {
  return (
    <div className="w-full bg-transparent absolute flex justify-between p-2 z-20">
      <div className="flex items-center gap-2">
        <button className="flex items-center justify-center bg-black bg-opacity-30 text-white rounded-full h-9 w-9 ">
          <BackSVG />
        </button>
        <button className="flex items-center justify-center bg-black bg-opacity-30 text-white rounded-full h-9 w-9 ">
          <ForwardSVG />
        </button>
      </div>
      <button className="h-fit">
        <img
          src="/girl.jpg"
          className="w-10 h-10 object-cover rounded-full border-[6px] border-zinc-800 border-opacity-80"
          alt="profile"
        />
      </button>
    </div>
  );
}
