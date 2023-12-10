export const LoadingDots = ({ ClassName, color, style }) => {
  return (
    <div className="flex gap-1 w-fit-content">
      <div className="loading relative w-[6.5px] h-[6.5px] rounded-full bg-white animate-[bounceFade_ease_1s_infinite_100ms]  loading-0 delay-100"></div>
      <div className="loading relative w-[6.5px] h-[6.5px] rounded-full bg-white animate-[bounceFade_ease_1s_infinite_300ms] loading-1 delay-300"></div>
      <div className="loading relative w-[6.5px] h-[6.5px] rounded-full bg-white animate-[bounceFade_ease_1s_infinite_500ms] loading-2 delay-500"></div>
    </div>
  );
};
