import ModalEdit from "@/components/sub/modal-edit";
import { fetchCoinById } from "@/lib/fetchData";
import React from "react";

export const dynamic = "force-dynamic";

export default async function CoinEditPage({ params }) {
  const coinDetails = await fetchCoinById(params.coinid);
  return (
    <div className="py-10">
      <ModalEdit coin={coinDetails} />
    </div>
  );
}
