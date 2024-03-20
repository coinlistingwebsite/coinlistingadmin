import ApprovedCoin from "@/components/main/approved-coin";
import { Coins } from "@/lib/fetchData";
import React from "react";

const ApprovedCoinsPage = async () => {
  const coinData = await Coins();


  if (coinData.length == 0 || !coinData)
    return (
      <main className="max-w-7xl mx-auto py-40 text-center">
        <h1 className="text-3xl">404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for could not be found.</p>
      </main>
    );
    
  return (
    <>
      <ApprovedCoin coinsData={coinData} />
    </>
  );
};

export default ApprovedCoinsPage;
