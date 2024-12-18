import HomePage from "@/components/main/home-page";
import { editDatabase } from "@/lib/editData";

import {
  Coins,
  fetchAllCoins,
  fetchSubmittedTokens,
  fetchTokens,
} from "@/lib/fetchData";
import { ConnectingAirportsOutlined } from "@mui/icons-material";

export const dynamic = "force-dynamic";

export default async function Home() {
  const approved = await fetchTokens();
  const requested = await fetchSubmittedTokens();

  // const response = await editDatabase();

  // if (coinData.length == 0 || !coinData)
  //   return (
  //     <main className="max-w-7xl mx-auto py-40 text-center">
  //       <h1 className="text-3xl">404 - Page Not Found</h1>
  //       <p>Sorry, the page you are looking for could not be found.</p>
  //     </main>
  //   );

  return (
    <main>
      <HomePage approved={approved} requests={requested} />
    </main>
  );
}
