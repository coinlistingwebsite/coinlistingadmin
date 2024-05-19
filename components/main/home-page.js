"use client";
import { deleteEndedPresales } from "@/lib/editData";
import { useEffect, useState } from "react";

const HomePage = ({ coins }) => {
  const [loading, setLoading] = useState(false);

  const approved = coins.filter((coin) => {
    return coin.verified == true;
  });
  const presales = coins.filter((coin) => {
    return coin.presale == true;
  });
  const tokens = coins.filter((coin) => {
    return coin.presale == false;
  });

  var currentDate = new Date();
  var time = currentDate.getTime();

  const ended_presale = coins.filter((coin) => {
    return coin.date_end < time;
  });

  const deleteCompeletedPresale = async () => {
    setLoading(true);

    const response = await deleteEndedPresales();

    if (!response) {
      alert("Error Deleting -  Please Re-try");
      return;
    }
    alert("Successfully deleted");
    setLoading(false);
    window.location.reload();
  };

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
          <div className="stat-title">Approved Presales</div>
          <div className="stat-value">{approved.length}</div>
          <div className="stat-desc">
            <a href="/approvedcoins" className="underline">
              navigate
            </a>
          </div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary"></div>
          <div className="stat-title">Presales</div>
          <div className="stat-value">{presales.length}</div>
          <div className="stat-desc">
            {" "}
            <a href="/approvedcoins" className="underline">
              navigate
            </a>
          </div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary"></div>
          <div className="stat-title">Tokens</div>
          <div className="stat-value">{tokens.length}</div>
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
          <div className="stat-title">Ended Presales</div>
          <div className="stat-value">{ended_presale.length}</div>
        </div>
      </div>
      <br />
      <button className="btn btn-error" onClick={deleteCompeletedPresale}>
        {loading && <span className="loading loading-spinner"></span>}
        Delete Ended Presale
      </button>
    </div>
  );
};

export default HomePage;
