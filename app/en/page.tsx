import { getHomeData } from "@/lib/home-data";
import { HomeShelf } from "@/components/HomeShelf";

export default function HomeEn() {
  const { groups, solos, tagGroups } = getHomeData("en");
  return (
    <HomeShelf groups={groups} solos={solos} tagGroups={tagGroups} lang="en" />
  );
}
