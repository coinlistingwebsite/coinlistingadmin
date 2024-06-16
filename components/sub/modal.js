import React, { useState } from "react";

import TelegramIcon from "@mui/icons-material/Telegram";
import LanguageIcon from "@mui/icons-material/Language";
import {
  Facebook,
  Instagram,
  Reddit,
  Twitter,
  YouTube,
} from "@mui/icons-material";
import {
  approveCoin,
  deleteCoinbyId,
  deleteSubmittedCoin,
} from "@/lib/editData";

const Modal = ({ coin }) => {
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const onApprove = async () => {
    setLoading2(true);

      const { error, message, id } = await approveCoin(coin);
    let URL;

    if (coin.presale) {
      URL = "/api/contact";
    } else {
      URL = "";
    }

    const resp = await fetch(URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: coin.coinName,
        logo: coin.logo,
        platform: coin.platform,
        symbol: coin.symbol,
        // id: coin.id,
        id: id,
        chart: coin.urls.chart || "https://bullishmarketcap.com",
        website: coin.urls.website || "https://bullishmarketcap.com",
        contract: coin.contract_address,
        launchpad: coin.urls.launchpad || "BullishMarketCap",
        launchpadURL: coin.urls.launchpadURL || "https://bullishmarketcap.com",
        telegram: coin.urls.telegram || "https://t.me/BullishMarktCap",
        cexname1: coin.urls.cexname1 || "BMC",
        cexlink1:
          coin.urls.cexlink1 || `https://www.bullishmarketcap.com/coins/${id}`,
        description: coin.description.substr(0, 300),
        twitter: coin.urls.twitter || "https://x.com/BullishMarktCap",
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

    alert("Alert Succesfully sent");
  };

  const onDelete = async () => {
    setLoading(true);

    const response = await deleteSubmittedCoin(coin);

    setLoading(false);

    if (!response) {
      alert("Error deleting coin from database");
      return;
    }

    alert("Coin request successfully deleted - Close Modal and Refresh Page");
    window.location.reload(true);
  };

  const convertTimestamp = (timestamp) => {
    // Create a new Date object with the timestamp
    const date = new Date(timestamp);

    // Use the Date methods to get the desired date components
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Month is zero-based, so we add 1
    const day = date.getDate();

    // You can also get hours, minutes, seconds, etc. if needed

    // Create a string representation of the date
    const dateString = `${year}-${month < 10 ? "0" : ""}${month}-${
      day < 10 ? "0" : ""
    }${day}`;

    return dateString; // Output: "2021-03-17"
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
            ) : (
              <>
                <br />
                <div className="badge badge-sm badge-secondary">Token</div>
              </>
            )}
          </span>
        </div>

        {coin.presale && (
          <>
            <div className="my-3">
              <span className="badge badge-ghost badge-lg">Date to Launch</span>{" "}
              : {convertTimestamp(coin.date_launched)}
            </div>

            <div className="my-3">
              <span className="badge badge-ghost badge-lg">End Date</span> :{" "}
              {convertTimestamp(coin.date_end)}
            </div>
          </>
        )}

        <div className="my-3">
          <span className="badge badge-ghost badge-lg">Contract Address</span> :{" "}
          {coin.contract_address}
        </div>

        <div className="my-3">
          <span className="badge badge-ghost badge-lg">Coin Chain</span> :{"  "}
          {coin.platform}
        </div>

        <div className="my-3">
          <span className="badge badge-ghost badge-lg">Coin Description</span> :{" "}
          {coin.description}
        </div>

        <div className="my-3">
          {coin.urls.telegramContact && (
            <>
              <a
                className="badge badge-accent badge-lg"
                href={coin.urls.telegramContact}
                target="_blank"
              >
                Contact via Telegram
                <TelegramIcon className="ml-2" />
              </a>{" "}
              : {coin.urls.telegramContact}
            </>
          )}
        </div>

        <div className="my-3">
          {coin.urls.website && (
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
          {coin.urls.chart && (
            <>
              <a
                className="badge badge-accent badge-lg"
                href={coin.urls.chart}
                target="_blank"
              >
                Chart URL
                <LanguageIcon className="ml-2" />
              </a>{" "}
              : {coin.urls.chart}
            </>
          )}
        </div>

        <div className="my-3">
          {coin.urls.lauchpad && (
            <>
              <a className="badge badge-accent badge-lg">LaunchPad / BUY</a>{" "}
            </>
          )}
        </div>

        <div className="my-3">
          {coin.urls.launchpadURL && (
            <>
              <a
                className="badge badge-accent badge-lg"
                href={coin.urls.launchpadURL}
                target="_blank"
              >
                BUY / LAUNCHPAD URL
              </a>{" "}
              : {coin.urls.launchpadURL}
            </>
          )}
        </div>

        <div className="my-3">
          {coin.urls.twitter && (
            <>
              <a
                className="badge badge-accent badge-lg"
                href={`https://twitter.com/${coin.urls.twitter}`}
              >
                Twitter URL
                <Twitter className="ml-2" />
              </a>{" "}
              : {coin.urls.twitter}
            </>
          )}
        </div>

        <div className="my-3">
          {coin.urls.facebook && (
            <>
              <a
                className="badge badge-accent badge-lg"
                href={`https://facebook.com/${coin.urls.facebook}`}
              >
                Facebook URL
                <Facebook className="ml-2" />
              </a>{" "}
              : {coin.facebookURL}
            </>
          )}
        </div>

        <div className="my-3">
          {coin.urls.reddit && (
            <>
              <a
                className="badge badge-accent badge-lg"
                href={`https://reddit.com/r/${coin.urls.reddit}`}
              >
                Reddit URL
                <Reddit className="ml-2" />
              </a>{" "}
              : {coin.urls.reddit}
            </>
          )}
        </div>

        <div className="my-3">
          {coin.urls.audit && (
            <>
              <a className="badge badge-accent badge-lg" href={coin.urls.audit}>
                Audit URL
                <LanguageIcon className="ml-2" />
              </a>{" "}
              : {coin.urls.audit}
            </>
          )}
        </div>

        <div className="my-3">
          {coin.urls.doxx && (
            <>
              <a className="badge badge-accent badge-lg" href={coin.urls.doxx}>
                Doxx URL
                <LanguageIcon className="ml-2" />
              </a>{" "}
              : {coin.urls.doxx}
            </>
          )}
        </div>

        <div className="my-3">
          {coin.urls.kyc && (
            <>
              <a className="badge badge-accent badge-lg" href={coin.urls.kyc}>
                KYC URL
                <LanguageIcon className="ml-2" />
              </a>{" "}
              : {coin.urls.kyc}
            </>
          )}
        </div>

        <div className="my-3">
          {coin.urls.safu && (
            <>
              <a className="badge badge-accent badge-lg" href={coin.urls.safu}>
                SAFU URL
                <LanguageIcon className="ml-2" />
              </a>{" "}
              : {coin.urls.safu}
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

export default Modal;
