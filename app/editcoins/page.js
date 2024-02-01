import EditCoin from "@/components/main/edit-coin";
import { fetchAllCoins } from "@/lib/fetchData";
import React from "react";

export default async function EditCoinPage() {
  const coinData = await fetchAllCoins();

  return (
    <>
      <EditCoin coinsData={coinData} />
    </>
  );
}
