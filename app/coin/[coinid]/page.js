import ModalEdit from "@/components/sub/modal-edit";
import { fetchCoinById } from "@/lib/fetchData";
import React from "react";

export const dynamic = "force-dynamic";
export default async function CoinEditPage({ params }) {
  const coinDetails = await fetchCoinById(params.coinid);

  if (coinDetails.length == 0 || !coinDetails)
    return (
      <main className="max-w-7xl mx-auto py-40 text-center">
        <h1 className="text-3xl">404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for could not be found</p>
      </main>
    );

  return (
    <div className="py-10">
      <ModalEdit coin={coinDetails} />
    </div>
  );
}
