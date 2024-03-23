"use client";

import axios from "axios";

const HomePage = ({ coins }) => {
  const approved = coins.filter((coin) => {
    return coin.verified == true;
  });
  const promoted = coins.filter((coin) => {
    return coin.promoted == true;
  });
  const submitted = coins.filter((coin) => {
    return coin.verified == false;
  });

  return (
    <div>
      <div className="block mb-5">
        <button
          className="btn btn-accent btn-active text-white btn-wide my-5"
          onClick={() => {
            window.location.reload(true);
          }}
        >
          Refresh Page
        </button>
      </div>


      <div className="stats shadow">
        <div className="stat">
          <div className="stat-figure text-green-500"></div>
          <div className="stat-title">Approved Coins</div>
          <div className="stat-value">{approved.length}</div>
          <div className="stat-desc">
            <a href="/approvedcoins" className="underline">
              navigate
            </a>
          </div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary"></div>
          <div className="stat-title">Promoted Coins</div>
          <div className="stat-value">{promoted.length}</div>
          <div className="stat-desc">
            {" "}
            <a href="/approvedcoins" className="underline">
              navigate
            </a>
          </div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary"></div>
          <div className="stat-title">Newly Submitted</div>
          <div className="stat-value">{submitted.length}</div>
          <div className="stat-desc">
            <a href="/submittedcoins" className="underline">
              navigate
            </a>
          </div>
        </div>
      </div>
      <br />
      <div className="stats shadow mt-10">
        <div className="stat">
          <div className="stat-figure"></div>
          <div className="stat-title">Total Coins on Database</div>
          <div className="stat-value">{coins.length}</div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
