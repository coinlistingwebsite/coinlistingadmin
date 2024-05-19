import ModalTokenEdit from "@/components/tokens-component/modal-token-edit";
import { fetchTokenByID } from "@/lib/editTokens";

export const dynamic = "force-dynamic";

export default async function TokenEditPage({ params }) {
  const tokenDetails = await fetchTokenByID(params.tokenid);

  if (!tokenDetails || tokenDetails.length == 0)
    return (
      <main className="max-w-7xl mx-auto py-40 text-center">
        <h1 className="text-3xl">404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for could not be found.</p>
      </main>
    );

  return (
    <div>
      <ModalTokenEdit coin={tokenDetails} />
    </div>
  );
}
