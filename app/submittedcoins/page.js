import SubmittedCoin from "@/components/main/submitted-coin";
import { fetchUnVerifiedCoins } from "@/lib/fetchData";

const SubmittedCoinPage = async () => {
  const coinData = await fetchUnVerifiedCoins();

  return (
    <>
      <SubmittedCoin coins={coinData} />
      {/* <SubmittedCoin /> */}
    </>
  );
};

export default SubmittedCoinPage;
