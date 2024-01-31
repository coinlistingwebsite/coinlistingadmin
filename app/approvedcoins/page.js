import ApprovedCoin from "@/components/main/approved-coin";
import { fetchVerifiedCoins } from "@/lib/fetchData";
import React from "react";

const ApprovedCoinsPage = async () => {
  const coinData = await fetchVerifiedCoins();
  return (
    <>
      <ApprovedCoin coinsData={coinData} />
    </>
  );
};

export default ApprovedCoinsPage;
