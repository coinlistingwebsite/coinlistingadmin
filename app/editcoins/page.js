import EditCoin from "@/components/main/edit-coin";
import { Coins } from "@/lib/fetchData";
import React from "react";

export default async function EditCoinPage() {
  const coinData = await Coins();

  return (
    <>
      <EditCoin coinsData={coinData} />
    </>
  );
}
