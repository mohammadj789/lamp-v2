import { Header } from "./components/header/Header";
import { MobileNavBar } from "./components/header/MobileNavBar";
import { Player } from "./components/Player/Player";
import { AudioCore } from "./components/AudioCore";
import MobilePlayer from "./components/Player/MobilePlayer";
import MobileFullPlayer from "./components/Player/MobileFullPlayer";
import { FloatingHeader } from "./components/header/FloatingHeader";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/auth");
  return (
    <>
      <AudioCore />
      <div className="grid box-border font-medium grid-cols-[16rem_1fr] lg:grid-cols-[5rem_1fr] h-screen min-h-screen  sm:h-[100dvh] sm:min-h-[100dvh] bg-black w-screen relative  ">
        <Header />
        <div className="overflow-hidden relative sm:h-[calc(100dvh-70px)] h-[calc(100dvh-80px)]  rounded-md sm:col-span-full">
          <FloatingHeader />
          {children}
        </div>
        <MobileNavBar />
        <Player />

        <MobilePlayer />
        <MobileFullPlayer />
      </div>
    </>
  );
}
