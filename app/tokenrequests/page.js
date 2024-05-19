import SubmittedTokens from "@/components/tokens-component/submitted-tokens";
import { fetchSubmittedTokens } from "@/lib/fetchData";

export const dynamic = "force-dynamic";

export default async function TokenRequests() {
  const tokensData = await fetchSubmittedTokens();

  if (!tokensData)
    return (
      <main className="max-w-7xl mx-auto py-40 text-center">
        <h1 className="text-3xl">404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for could not be found.</p>
      </main>
    );

  if (tokensData.length == 0)
    return (
      <main className="max-w-7xl mx-auto py-40 text-center">
        <h1 className="text-3xl">No Submitted Token</h1>
        <p>Sorry, the page you are looking for could not be found.</p>
      </main>
    );

  return (
    <div>
      <SubmittedTokens coins={tokensData} />
    </div>
  );
}
