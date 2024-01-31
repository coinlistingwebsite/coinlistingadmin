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
import { approveCoinById, deleteCoinbyId } from "@/lib/editData";

const Modal = ({ coin }) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const onApprove = async () => {
    setLoading2(true);

    const id = coin.id;

    const response = await approveCoinById(id);

    setLoading2(false);

    if (!response) {
      alert("Error deleting coin from database");
      return;
    }

    alert("Coin request Approved - Close Modal and Refresh Page");
  };

  const onDelete = async () => {
    setLoading(true);

    const id = coin.id;

    const response = await deleteCoinbyId(id);

    setLoading(false);

    if (!response) {
      alert("Error deleting coin from database");
      return;
    }

    alert("Coin request successfully deleted - Close Modal and Refresh Page");
  };

  return (
    <>
      <div className="modal-box max-w-[800px]">
        <div className="flex flex-row">
          <img src={coin.logoURL} className="rounded-xl w-24 h-24" />

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
          {coin.contractAddress}
        </div>

        <div className="my-3">
          <span className="badge badge-ghost badge-lg">Coin Chain</span> :{" "}
          {coin.chain}
        </div>

        <div className="my-3">
          <span className="badge badge-ghost badge-lg">Coin Description</span> :{" "}
          {coin.description}
        </div>

        <div className="my-3">
          <a
            className="badge badge-accent badge-lg"
            href={`https://t.me/${coin.telegramContact}`}
          >
            Contact via Telegram
            <TelegramIcon className="ml-2" />
          </a>{" "}
          : {coin.telegramContact}
        </div>

        <div className="my-3">
          {coin.websiteURL && (
            <>
              <a
                className="badge badge-accent badge-lg"
                href={`${coin.websiteURL}`}
              >
                Website URL
                <LanguageIcon className="ml-2" />
              </a>{" "}
              : {coin.websiteURL}
            </>
          )}
        </div>

        <div className="my-3">
          {coin.instagramURL && (
            <>
              <a
                className="badge badge-accent badge-lg"
                href={`https://instagram.com/${coin.instagramURL}`}
              >
                Instagram URL
                <Instagram className="ml-2" />
              </a>{" "}
              : {coin.websiteURL}
            </>
          )}
        </div>

        <div className="my-3">
          {coin.youtubeURL && (
            <>
              <a
                className="badge badge-accent badge-lg"
                href={`https://youtube.com/${coin.youtubeURL}`}
              >
                Youtube URL
                <YouTube className="ml-2" />
              </a>{" "}
              : {coin.youtubeURL}
            </>
          )}
        </div>

        <div className="my-3">
          {coin.twitterURL && (
            <>
              <a
                className="badge badge-accent badge-lg"
                href={`https://twitter.com/${coin.twitterURL}`}
              >
                Twitter URL
                <Twitter className="ml-2" />
              </a>{" "}
              : {coin.twitterURL}
            </>
          )}
        </div>

        <div className="my-3">
          {coin.facebookURL && (
            <>
              <a
                className="badge badge-accent badge-lg"
                href={`https://facebook.com/${coin.facebookURL}`}
              >
                Facebook URL
                <Facebook className="ml-2" />
              </a>{" "}
              : {coin.facebookURL}
            </>
          )}
        </div>

        <div className="my-3">
          {coin.discordURL && (
            <>
              <a
                className="badge badge-accent badge-lg"
                href={`https://discord.gg/${coin.discordURL}`}
              >
                Discord URL
                <LanguageIcon className="ml-2" />
              </a>{" "}
              : {coin.discordURL}
            </>
          )}
        </div>

        <div className="my-3">
          {coin.redditURL && (
            <>
              <a
                className="badge badge-accent badge-lg"
                href={`https://reddit.com/r/${coin.redditURL}`}
              >
                Reddit URL
                <Reddit className="ml-2" />
              </a>{" "}
              : {coin.redditURL}
            </>
          )}
        </div>

        <div className="my-3">
          {coin.auditURL && (
            <>
              <a className="badge badge-accent badge-lg" href={coin.auditURL}>
                Audit URL
                <LanguageIcon className="ml-2" />
              </a>{" "}
              : {coin.auditURL}
            </>
          )}
        </div>

        <div className="my-3">
          {coin.doxxURL && (
            <>
              <a className="badge badge-accent badge-lg" href={coin.doxxURL}>
                Doxx URL
                <LanguageIcon className="ml-2" />
              </a>{" "}
              : {coin.doxxURL}
            </>
          )}
        </div>

        <div className="my-3">
          {coin.kycURL && (
            <>
              <a className="badge badge-accent badge-lg" href={coin.kycURL}>
                KYC URL
                <LanguageIcon className="ml-2" />
              </a>{" "}
              : {coin.kycURL}
            </>
          )}
        </div>

        <div className="my-3">
          {coin.safuURL && (
            <>
              <a className="badge badge-accent badge-lg" href={coin.safuURL}>
                SAFU URL
                <LanguageIcon className="ml-2" />
              </a>{" "}
              : {coin.safuURL}
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
