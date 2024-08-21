import SubmittedCoin from "@/components/main/submitted-coin";
import SubmittedList from "@/components/main/submitted-listings";
import { SubmittedCoins, SubmittedListings } from "@/lib/fetchData";

export const dynamic = "force-dynamic";
const SubmittedCoinPage = async () => {
  const coinData = await SubmittedListings();

  if (!coinData)
    return (
      <main className="max-w-7xl mx-auto py-40 text-center">
        <h1 className="text-3xl">404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for could not be found.</p>
      </main>
    );

  if (coinData.length == 0)
    return (
      <main className="max-w-7xl mx-auto py-40 text-center">
        <h1 className="text-3xl">No Submitted Coin</h1>
        <p>Sorry, the page you are looking for could not be found.</p>
      </main>
    );

  return (
    <>
      <SubmittedList coins={coinData} />
    </>
  );
};

export default SubmittedCoinPage;