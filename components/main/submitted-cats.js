"use client";
import { data } from "@/hugs";
import TelegramIcon from "@mui/icons-material/Telegram";
import { useState } from "react";
import Modal from "../sub/modal";
import { Message, Refresh, Twitter, YouTube } from "@mui/icons-material";
import ListingModal from "../sub/listing-modal";
import CatsModal from "../sub/cats-modal";

const SubmittedCats = ({ coins }) => {
  const [modalDetails, setModalDetails] = useState(coins[0]);

  if (coins.length == 0) {
    <div>loading..</div>;
  }

  return (
    <div>
      <div className="flex flex-row gap-x-10">
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title text-primary">Newly Submitted Cats</div>
            <div className="stat-value text-secondary">{coins.length}</div>
            <div className="stat-desc">Approve / Delete Requests</div>
          </div>
        </div>

        <button
          className="btn btn-accent btn-active text-white btn-wide my-auto"
          onClick={() => {
            window.location.reload(true);
          }}
        >
          Refresh Page
        </button>
      </div>

      <dialog id="my_modal_1" className="modal">
        <CatsModal coin={modalDetails} />
      </dialog>

      <div className="overflow-x-auto mt-10">
        <table className="table min-w-[1000px] bg-base-300 table-zebra">
          <thead>
            <tr>
              <th>Coin Name / Symbol</th>
              <th>Youtube link</th>
              <th>telegram link</th>
              <th>Twitter link</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin, index) => (
              <tr key={index}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={coin.logo}
                          alt="Avatar Tailwind CSS Component"
                          className="rounded-xl"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{coin.catName}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <a href={coin.youtubeURL}>
                    <YouTube className="text-red-500" />
                  </a>
                </td>
                <td>
                  <a href={coin.telegramURL}>
                    <TelegramIcon className="text-blue-400" />
                  </a>
                </td>
                <td>
                  <a href={coin.tweetURL}>
                    <Twitter className="text-blue-500" />
                  </a>
                </td>
                <th>
                  <button
                    onClick={() => {
                      setModalDetails(coin);
                      document.getElementById("my_modal_1").showModal();
                    }}
                    className="btn btn-active btn-primary"
                  >
                    View Details
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubmittedCats;