"use client";

import VerifiedIcon from "@mui/icons-material/Verified";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import LinkIcon from "@mui/icons-material/Link";
import { useEffect, useState } from "react";
import { Refresh } from "@mui/icons-material";

const HomePage = ({ coins }) => {
  const [approved, setApproved] = useState([]);
  const [promoted, setPromoted] = useState([]);
  const [submitted, setSubmitted] = useState([]);

  const arrangeCoins = () => {
    const results = coins.filter((coin) => {
      return coin.verified == true;
    });
    const resultsOne = coins.filter((coin) => {
      return coin.promoted == true;
    });
    const resultsThree = coins.filter((coin) => {
      return coin.verified == false;
    });

    setApproved(results);
    setPromoted(resultsOne);
    setSubmitted(resultsThree);
  };

  useEffect(() => {
    arrangeCoins();
  });

  return (
    <div>
      <div className="block">
        <button
          className="btn btn-accent btn-active text-white btn-wide my-5"
          onClick={() => {
            window.location.reload(true);
          }}
        >
          <Refresh />
          Refresh Page
        </button>
      </div>

      <br />

      <div className="stats shadow">
        <div className="stat">
          <div className="stat-figure text-green-500">
            <ThumbUpIcon className="text-blue-500" />
          </div>
          <div className="stat-title">Approved Coins</div>
          <div className="stat-value">{approved.length}</div>
          <div className="stat-desc">
            <a href="/approvedcoins" className="underline">
              <LinkIcon className="text-green-400" /> navigate
            </a>
          </div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <VerifiedIcon className="text-green-500" />
          </div>
          <div className="stat-title">Promoted Coins</div>
          <div className="stat-value">{promoted.length}</div>
          <div className="stat-desc">
            {" "}
            <a href="/approvedcoins" className="underline">
              <LinkIcon className="text-green-400" /> navigate
            </a>
          </div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <AppRegistrationIcon />
          </div>
          <div className="stat-title">Newly Submitted</div>
          <div className="stat-value">{submitted.length}</div>
          <div className="stat-desc">
            {" "}
            <a href="/submittedcoins" className="underline">
              <LinkIcon className="text-green-400" /> navigate
            </a>
          </div>
        </div>
      </div>

      <br />
      <br />
      <br />

      <div className="stats shadow">
        <div className="stat">
          <div className="stat-figure">
            <CurrencyBitcoinIcon className="text-yellow-400 text-4xl" />
          </div>
          <div className="stat-title">Total Coins on Database</div>
          <div className="stat-value">{coins.length}</div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
