import React, { useState } from "react";

import TelegramIcon from "@mui/icons-material/Telegram";
import LanguageIcon from "@mui/icons-material/Language";
import {
  Email,
  Facebook,
  GitHub,
  Instagram,
  Reddit,
  Twitter,
  YouTube,
} from "@mui/icons-material";
import { approveCoin, deleteCoinbyId } from "@/lib/editData";
import { approveToken, deleteSubmittedToken } from "@/lib/editTokens";

const SubmittedModal = ({ coin }) => {
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const onApprove = async () => {
    setLoading2(true);

    let id = coin.request_id;

    const { error, message } = await approveToken(coin);

    if (error) {
      alert(message);
      return;
    }

    // let URL = "/api/token";

    // const resp = await fetch(URL, {
    //   method: "POST",
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     name: coin.project_name,
    //     logo: coin.logo,
    //     platform: coin.platform,
    //     symbol: coin.symbol,
    //     id: id,
    //     twitter: coin.urls.twitter,
    //     website: coin.urls.website,
    //     contract: coin.contract_address,
    //     description: coin.full_description,
    //     telegram: coin.urls.telegram || "https://t.me/BullishMarktCap",
    //     cexname1: coin.urls.cex_name_1,
    //     cexname2: coin.urls.cex_name_2,
    //     cexname3: coin.urls.cex_name_3,
    //     targetname1: coin.urls.cex_target_1,
    //     targetname2: coin.urls.cex_target_2,
    //     targetname3: coin.urls.cex_target_3,
    //   }),
    // });

    setLoading2(false);

    // alert(message);

    window.location.reload(true);

    // if (!resp) {
    //   alert("Error in sending alert");
    //   return;
    // }

    //   alert("Alert Succesfully sent");
  };

  const onDelete = async () => {
    setLoading(true);

    const response = await deleteSubmittedToken(coin);

    setLoading(false);

    if (!response) {
      alert("Error deleting Token Request");
      return;
    }

    alert("Token Deleted!");
    window.location.reload(true);
  };

  console.log(coin);

  return (
    <>
      <div className="modal-box max-w-[800px]">
        <div className="flex flex-row">
          <img src={coin.logo} className="rounded-xl w-24 h-24" />

          <span className="my-auto text-2xl ml-5">
            {coin.project_name}
            <br />${coin.symbol}
            <br />
            <div className="badge badge-lg badge-secondary">Token</div>
          </span>
        </div>

        <div className="my-3">
          <span className="badge badge-lg badge-accent"> Request ID</span> :{" "}
          {coin.request_id}
        </div>

        <div className="my-3">
          <span className="badge badge-lg badge-accent">Contract Address</span>{" "}
          : {coin.contract_address}
        </div>

        <div className="my-3">
          <span className="badge badge-lg badge-accent">Coin Chain</span> :
          {"  "}
          {coin.chain}
        </div>

        <div className="my-3">
          <span className="badge badge-lg badge-accent">Platform</span> :{"  "}
          {coin.platform}
        </div>


        <div className="my-3">
          <span className="badge badge-lg badge-accent">Description</span>
          <span className="text-md">{coin.full_description}</span>
        </div>

      

        <div className="my-3">
          {coin?.urls?.chat && (
            <>
              <a
                className="badge badge-accent badge-lg"
                href={coin.urls.chat}
                target="_blank"
              >
                Contact via Chat
                <TelegramIcon className="ml-2" />
              </a>{" "}
              : {coin.urls.chat}
            </>
          )}
        </div>

        <div className="my-3">
          {coin?.urls?.website && (
            <>
              <a
                className="badge badge-accent badge-lg"
                href={coin.urls.website}
                target="_blank"
              >
                Website URL
                <LanguageIcon className="ml-2" />
              </a>{" "}
              : {coin.urls.website}
            </>
          )}
        </div>

        <div className="my-3">
          {coin?.email && (
            <>
              <a
                className="badge badge-accent badge-lg"
                href={coin.email}
                target="_blank"
              >
                Email
                <Email className="ml-2" />
              </a>{" "}
              : {coin.email}
            </>
          )}
        </div>


      

        <div className="my-3">
          {coin.urls.twitter && (
            <>
              <a
                className="badge badge-accent badge-lg"
                href={coin.urls.twitter}
                target="_blank"
              >
                Twitter
                <Twitter className="ml-2" />
              </a>{" "}
              : {coin.urls.twitter}
            </>
          )}
        </div>

      

        <div className="my-3">
          {coin.urls.public_verification_post && (
            <>
              <a
                className="badge badge-accent badge-lg"
                target="_blank"
                href={coin.urls.public_verification_post}
              >
                Public Verification Post
                <Twitter className="ml-2" />
              </a>{" "}
              : {coin.urls.public_verification_post}
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

export default SubmittedModal;
