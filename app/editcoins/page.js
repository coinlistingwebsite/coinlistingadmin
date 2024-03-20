import EditCoin from "@/components/main/edit-coin";
import { Coins } from "@/lib/fetchData";
import React from "react";

export const dynamic = "force-dynamic";

export default async function EditCoinPage() {
  const coinData = await Coins();

  return (
    <>
      <EditCoin coinsData={coinData} />
    </>
  );
}
