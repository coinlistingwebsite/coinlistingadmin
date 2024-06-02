import EditToken from "@/components/tokens-component/edit-token";
import { fetchTokens } from "@/lib/fetchData";
import React from "react";


export const dynamic = "force-dynamic";

export default async function EditTokens() {
  const tokens = await fetchTokens();

  if (!tokens)
    return (
      <main className="max-w-7xl mx-auto py-40 text-center">
        <h1 className="text-3xl">404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for could not be found.</p>
      </main>
    );

  if (tokens.length == 0)
    return (
      <main className="max-w-7xl mx-auto py-40 text-center">
        <h1 className="text-3xl">No Tokens Found</h1>
        <p>Sorry, the page you are looking for could not be found.</p>
      </main>
    );

  return (
    <div>
      <EditToken coinsData={tokens} />
    </div>
  );
}
