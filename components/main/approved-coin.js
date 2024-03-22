"use client";
import TelegramIcon from "@mui/icons-material/Telegram";
import { useEffect, useState } from "react";
import ModalApprovedCoins from "../sub/modal-approved-coins";

const ApprovedCoin = ({ coinsData }) => {
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
        <table className="table min-w-[1000px] table-zebra bg-base-300">
          {/* head */}
          <thead>
            <tr>
              <th>Coin Name / Symbol</th>
              <th>Chain/Presale</th>
              <th>Submitted by</th>
              <th>Votes</th>

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
                          src={coin.logo}
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
                  {coin.platform}

                  <br />
                  <span>
                    {coin.presale ? (
                      <>
                        <span className="badge badge-primary badge-sm">
                          Presale
                        </span>
                      </>
                    ) : (
                      <span className="badge badge-accent badge-sm">Token</span>
                    )}
                  </span>
                </td>
                <td>
                  <a
                    className="badge badge-primary badge-md"
                    href={`https://t.me/${coin.urls.telegramContact}`}
                  >
                    <TelegramIcon />
                  </a>
                </td>
                <td>{coin.votes}</td>

                <td>
                  {coin.approved ? (
                    <>
                      <span className="badge badge-primary">Promoted</span>
                    </>
                  ) : (
                    <>
                      <span className="badge badge-ghost">Unpromoted</span>
                    </>
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
