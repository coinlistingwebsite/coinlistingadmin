import HomePage from "@/components/main/home-page";
import { fetchAllCoins } from "@/lib/fetchData";

export default async function Home() {
  const coinData = await fetchAllCoins();

  return (
    <main>
      <HomePage coins={coinData} />
    </main>
  );
}
