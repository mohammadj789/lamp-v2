import Image from "next/image";
import RecentlyPlayed from "./components/main/RecentlyPlayed";
import TopSongs from "./components/main/TopSongs";
import { DOMAIN } from "@/utils/constant";
import { CardRow } from "./user/[id]/profile/CardRow";
import { getRequest } from "@/utils/getRequest";

export default async function Home() {
  const ArtistData = await getRequest(
    DOMAIN + "/user/artist/popular"
  );
  const CollectionData = await getRequest(
    DOMAIN + "/collection/topcollection"
  );
  return (
    <main className="w-full text-white px-3 flex flex-col gap-3 pt-16 overflow-auto h-full sm:pb-14">
      <h1 className="text-xl font-bold mb-2">Wellcome</h1>
      <RecentlyPlayed />
      <TopSongs />
      <CardRow
        type={"collection"}
        title={"Top Collections"}
        data={CollectionData.collections}
      />
      <CardRow
        type={"artist"}
        title={"Most Popular Artists"}
        data={ArtistData.artists}
      />
    </main>
  );
}
