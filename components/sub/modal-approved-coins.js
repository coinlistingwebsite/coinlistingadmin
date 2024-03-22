import React, { useState } from "react";

import {
  deleteApprovedCoinbyId,
  promotedCoinNow,
  unPromoteCoinNow,
} from "@/lib/editData";
import VerifiedIcon from "@mui/icons-material/Verified";
const ModalApprovedCoins = ({ coin }) => {
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);

  const onDelete = async () => {
    setLoading(true);

    const id = coin.id;

    const response = await deleteApprovedCoinbyId(id);

    setLoading(false);

    if (!response) {
      alert("Error deleting coin from database");
      return;
    }
    alert("Coin successfully deleted - Close Modal and Refresh Page");
    window.location.reload(true);
  };

  const promotedCoin = async (coin) => {
    setLoading2(true);

    const response = await promotedCoinNow(coin);

    setLoading2(false);

    if (!response) {
      alert("Error in promoting coin - Please try again");
      return;
    }

    alert("Coin Promoted - close modal and refresh page");
    window.location.reload(true);
  };

  const unpromoteCoin = async (coin) => {
    setLoading3(true);
    const response = await unPromoteCoinNow(coin);

    setLoading3(false);

    if (!response) {
      alert("Error in unpromoting coin - Please try again");
      return;
    }

    alert("Coin UnPromoted - close modal and refresh page");
    window.location.reload(true);
  };

  return (
    <>
      <div className="modal-box max-w-[800px]">
        <div className="flex flex-row">
          <img src={coin.logo} className="rounded-xl w-24 h-24" />

          <span className="my-auto text-2xl ml-5">
            {coin.coinName}
            <br />${coin.symbol}
            {coin.presale ? (
              <>
                <br />
                <div className="badge badge-sm badge-secondary">Presale</div>
              </>
            ) : null}
          </span>
        </div>

        <div className="my-3">
          <span className="badge badge-ghost badge-lg">Contract Address</span> :{" "}
          {coin.contract_address}
        </div>

        <div className="my-3">
          <span className="badge badge-ghost badge-lg">Coin Chain</span> :{" "}
          {coin.platform}
        </div>

        <div className="my-3">
          <span className="badge badge-ghost badge-lg">Coin Description</span> :{" "}
          {coin.description}
        </div>

        <div className="flex flex-row gap-x-5 mt-7">
          <button className="btn btn-error text-white" onClick={onDelete}>
            {loading && <span className="loading loading-spinner"></span>}
            Delete Coin From Database
          </button>

          {coin.approved ? (
            <button
              onClick={() => unpromoteCoin(coin)}
              className="btn btn-wide btn-secondary"
            >
              {loading3 && <span className="loading loading-spinner"></span>}
              Remove Promotion
            </button>
          ) : (
            <button
              onClick={() => promotedCoin(coin)}
              className="btn btn-wide btn-accent"
            >
              {loading2 && <span className="loading loading-spinner"></span>}
              <VerifiedIcon className="ml-2" />
              Promote Coin
            </button>
          )}
        </div>

        <p className="pt-4">Press ESC key or click the button below to close</p>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ModalApprovedCoins;
