"use client";
import { data } from "@/hugs";
import TelegramIcon from "@mui/icons-material/Telegram";
import { useEffect, useState } from "react";
import { Refresh } from "@mui/icons-material";
import ModalApprovedCoins from "../sub/modal-approved-coins";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  addVotesToCoin,
  promotedCoinById,
  unPromoteCoinById,
} from "@/lib/editData";
import VerifiedIcon from "@mui/icons-material/Verified";

const ApprovedCoin = ({ coinsData }) => {
  // console.log(coins);

  const [coins, setCoins] = useState(coinsData);
  const [search, setSearch] = useState("");
  const [modalDetails, setModalDetails] = useState([]);

  const filterDataByName = () => {
    if (!search) {
      setCoins(coinsData);
      return;
    }
    const data = coinsData.filter((coin) =>
      coin.coinName.toLowerCase().includes(search.toLowerCase())
    );
    setCoins(data);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      filterDataByName();
    }, 1000);

    return () => clearTimeout(timer);
  }, [search]);

  const addVotes = async (id) => {
    const response = await addVotesToCoin(id);

    if (!response) {
      alert("Error in adding votes to coin - Please try again");
      return;
    }

    alert(
      "500 votes have been successfully added - close modal and refresh page"
    );
  };

  const promotedCoin = async (id) => {
    const response = await promotedCoinById(id);

    if (!response) {
      alert("Error in promoting coin - Please try again");
      return;
    }

    alert("Coin Promoted - close modal and refresh page");
  };

  const unpromoteCoin = async (id) => {
    const response = await unPromoteCoinById(id);

    if (!response) {
      alert("Error in promoting coin - Please try again");
      return;
    }

    alert("Coin Promoted - close modal and refresh page");
  };

  if (coins.length == 0) {
    <div>loading..</div>;
  }

  return (
    <div>
      <div className="flex flex-row gap-x-10">
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title text-primary">Approved Coins</div>
            <div className="stat-value text-secondary">{coinsData.length}</div>
            <div className="stat-desc">Approve / Delete Requests</div>
          </div>
        </div>

        <button
          className="btn btn-accent btn-active text-white btn-wide my-auto"
          onClick={() => {
            window.location.reload(true);
          }}
        >
          <Refresh />
          Refresh Page
        </button>
      </div>

      {/* Search Bar */}
      <div className="mt-5">
        <input
          type="text"
          placeholder="Search coins via coin name"
          className="input input-bordered w-full"
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <dialog id="my_modal_1" className="modal">
        <ModalApprovedCoins coin={modalDetails} />
      </dialog>

      <div className="overflow-x-auto mt-5">
        <table className="table min-w-[1000px] table-zebra bg-white">
          {/* head */}
          <thead>
            <tr>
              <th>Coin Name / Symbol</th>
              <th>Chain/Presale</th>
              <th>Submitted by</th>
              <th>Votes</th>
              <th>Add Votes to coin</th>
              <th>Promote / Unpromote Coin</th>

              <th></th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin, index) => (
              <tr key={index}>
                <td>
                  <div className="flex items-center gap-3 min-w-[200px]">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={coin.logoURL}
                          alt="Avatar Tailwind CSS Component"
                          className="rounded-xl"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">
                        {coin.promoted ? (
                          <VerifiedIcon className="text-green-600 mr-1" />
                        ) : null}

                        {coin.coinName}
                      </div>
                      <div className="text-sm opacity-50">{coin.symbol}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {coin.chain}
                  <br />
                  <span>
                    {coin.presale ? (
                      <>
                        <span className="badge badge-primary badge-sm">
                          Presale
                        </span>
                      </>
                    ) : (
                      <span className="badge badge-ghost badge-sm">
                        No Presale
                      </span>
                    )}
                  </span>
                </td>
                <td>
                  {coin.email}
                  <br />
                  <a
                    className="badge badge-secondary badge-sm"
                    href={`https://t.me/${coin.telegramContact}`}
                  >
                    Contact via <TelegramIcon />
                  </a>
                </td>
                <td>{coin.votes}</td>
                <td>
                  <button
                    className="btn btn-info btn-wide"
                    onClick={() => addVotes(coin.id)}
                  >
                    <AddCircleOutlineIcon />
                    Add 500 Votes
                  </button>
                </td>
                <td>
                  {coin.promoted ? (
                    <button
                      onClick={() => unpromoteCoin(coin.id)}
                      className="btn btn-wide btn-neutral"
                    >
                      Remove Promotion
                    </button>
                  ) : (
                    <button
                      onClick={() => promotedCoin(coin.id)}
                      className="btn btn-wide btn-success  text-white"
                    >
                      <VerifiedIcon className="ml-2" />
                      Promote Coin
                    </button>
                  )}
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

export default ApprovedCoin;
