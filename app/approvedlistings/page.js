import ApprovedCoin from "@/components/main/approved-coin";
import ApprovedList from "@/components/main/approved-listing";
import { CoinListing, Coins } from "@/lib/fetchData";
import React from "react";

export const dynamic = "force-dynamic";

const ApprovedListingPage = async () => {
  const coinData = await CoinListing();

  if (coinData.length == 0 || !coinData)
    return (
      <main className="max-w-7xl mx-auto py-40 text-center">
        <h1 className="text-3xl">404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for could not be found.</p>
      </main>
    );

  return (
    <>
      <ApprovedList coins={coinData} />
    </>
  );
};

export default ApprovedListingPage;
