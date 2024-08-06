import React, { useState } from "react";

import TelegramIcon from "@mui/icons-material/Telegram";
import LanguageIcon from "@mui/icons-material/Language";
import {
  Facebook,
  Instagram,
  Message,
  Reddit,
  Twitter,
  YouTube,
} from "@mui/icons-material";
import {
  approveCoin,
  approveListing,
  deleteCoinbyId,
  deleteSubmittedCoin,
  deleteSubmittedListing,
} from "@/lib/editData";

const ListingModal = ({ coin }) => {
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const onApprove = async () => {
    setLoading2(true);

    const { error, message, id } = await approveListing(coin);
    let URL = "/api/contactListing";

    const resp = await fetch(URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: coin.coinName,
        symbol: coin.symbol,
        buy_link: coin.launchpadURL,
        logo: coin.logo,
        tweet: coin.tweetURL,
        id: id,
        date_launched: coin.date_launched,
        chat: coin.chatURL,
      }),
    });

    setLoading2(false);

    if (error) {
      alert(message);
      return;
    }

    alert(message);

    if (!resp) {
      alert("Error in sending alert");
      return;
    }

    alert("Alert Successfully sent");
      window.location.reload(true);
  };

  const onDelete = async () => {
    setLoading(true);

    const response = await deleteSubmittedListing(coin);
    setLoading(false);

    if (!response) {
      alert("Error deleting coin from database");
      return;
    }

    alert("Coin request successfully deleted - Close Modal and Refresh Page");
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
          </span>
        </div>

        <div className="my-3">
          {coin.launchpadURL && (
            <>
              <a
                className="badge badge-accent badge-lg"
                href={coin.launchpadURL}
                target="_blank"
              >
                BUY / LAUNCHPAD URL
              </a>{" "}
              : {coin.launchpadURL}
            </>
          )}
        </div>
        <div className="my-3">
          {coin.tweetURL && (
            <>
              <a className="badge badge-accent badge-lg" href={coin.tweetURL}>
                Twitter URL
                <Twitter className="ml-2" />
              </a>{" "}
              : {coin.tweetURL}
            </>
          )}
        </div>
        <div className="my-3">
          {coin.chatURL && (
            <>
              <a className="badge badge-accent badge-lg" href={coin.chatURL}>
                Chat URL
                <Message className="ml-2" />
              </a>{" "}
              : {coin.chatURL}
            </>
          )}
        </div>

        <div className="flex flex-row gap-x-5 mt-7">
          <button className="btn btn-info" onClick={onApprove}>
            {loading2 && <span className="loading loading-spinner"></span>}
            Approve Request
          </button>
          <button className="btn btn-error text-white" onClick={onDelete}>
            {loading && <span className="loading loading-spinner"></span>}
            Delete Request
          </button>
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

export default ListingModal;
