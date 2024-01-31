import PromotedCoin from "@/components/main/promoted-coin";
import { fetchPromotedCoins, fetchVerifiedCoins } from "@/lib/fetchData";
import React from "react";

const PromotedCoinsPage = async () => {
  const coinData = await fetchPromotedCoins();

  return (
    <>
      <PromotedCoin coins={coinData} />
    </>
  );
};

export default PromotedCoinsPage;
