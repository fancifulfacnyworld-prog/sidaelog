import { getHomeData } from "@/lib/home-data";
import { HomeShelf } from "@/components/HomeShelf";

export default function Home() {
  const { groups, solos, tagGroups } = getHomeData("ko");
  return (
    <HomeShelf groups={groups} solos={solos} tagGroups={tagGroups} lang="ko" />
  );
}
