import React, { useState } from "react";

import { Telegram, Twitter } from "@mui/icons-material";
import {
  approveCatsListing,
  approveListing,
  deleteSubmittedCat,
} from "@/lib/editData";

const CatsModal = ({ coin }) => {
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const onApprove = async () => {
    setLoading2(true);

    const { error, message } = await approveCatsListing(coin);
    let URL = "/api/contactCats";

    const resp = await fetch(URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: coin.catName,
        logo: coin.logo,
        date_launched: coin.date_launched,
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

    const response = await deleteSubmittedCat(coin);
    setLoading(false);

    if (!response) {
      alert("Error deleting cat from database");
      return;
    }

    alert("Cat request successfully deleted - Close Modal and Refresh Page");
    window.location.reload(true);
  };

  return (
    <>
      <div className="modal-box max-w-[800px]">
        <div className="flex flex-col">
          <img src={coin.logo} className="rounded-xl w-84 h-84" />

          <span className="my-auto text-2xl ml-5">{coin.catName}</span>
        </div>

        <div className="my-3">
          {coin.youtubeURL && (
            <>
              <a
                className="badge badge-accent badge-lg"
                href={coin.youtubeURL}
                target="_blank"
              >
                Youtube URL
              </a>{" "}
              : {coin.youtubeURL}
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
          {coin.telegramURL && (
            <>
              <a
                className="badge badge-accent badge-lg"
                href={coin.telegramURL}
              >
                Telegram URL
                <Telegram className="ml-2" />
              </a>{" "}
              : {coin.telegramURL}
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

export default CatsModal;
