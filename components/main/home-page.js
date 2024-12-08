"use client";
import { deleteEndedPresales } from "@/lib/editData";
import { useEffect, useState } from "react";

const HomePage = ({ approved, requests }) => {
  return (
    <>
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
            <div className="stat-title">Approved Tokens</div>
            <div className="stat-value">{approved.length}</div>
            <div className="stat-desc">
              <a href="/edittokens" className="underline">
                navigate
              </a>
            </div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary"></div>
            <div className="stat-title">Submitted Tokens</div>
            <div className="stat-value">{requests.length}</div>
            <div className="stat-desc">
              <a href="/tokenrequests" className="underline">
                navigate
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
