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
import { editCoin } from "@/lib/editData";

const ModalEdit = ({ coin }) => {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const presale = formData.get("presale");
    const votes = formData.get("votes");
    const address = formData.get("address");
    const chain = formData.get("chain");
    const description = formData.get("description");
    const telegramContact = formData.get("telegramContact");
    const telegramURL = formData.get("telegramURL");
    const websiteURL = formData.get("websiteURL");
    const instagramURL = formData.get("instagramURL");
    const youtubeURL = formData.get("youtubeURL");
    const twitterURL = formData.get("twitterURL");
    const facebookURL = formData.get("facebookURL");
    const discordURL = formData.get("discordURL");
    const redditURL = formData.get("redditURL");
    const auditURL = formData.get("auditURL");
    const doxxURL = formData.get("doxxURL");
    const kycURL = formData.get("kycURL");
    const safuURL = formData.get("safuURL");

    const response = await editCoin(
      !presale ? coin.presale : presale,
      !votes ? coin.votes : votes,
      !address ? coin.contractAddress : address,
      !chain ? coin.chain : chain,
      !description ? coin.description : description,
      !telegramContact ? coin.telegramContact : telegramContact,
      !telegramURL ? coin.telegramURL : telegramURL,
      !websiteURL ? coin.websiteURL : websiteURL,
      !instagramURL ? coin.instagramURL : instagramURL,
      !youtubeURL ? coin.youtubeURL : youtubeURL,
      !twitterURL ? coin.twitterURL : twitterURL,
      !facebookURL ? coin.facebookURL : facebookURL,
      !discordURL ? coin.discordURL : discordURL,
      !redditURL ? coin.redditURL : redditURL,
      !auditURL ? coin.auditURL : auditURL,
      !doxxURL ? coin.doxxURL : doxxURL,
      !kycURL ? coin.kycURL : kycURL,
      !safuURL ? coin.safuURL : safuURL,
      coin.id
    );

    if (!response) {
      alert("Error in updating coin - Please try again");
      return;
    }

    alert("Coin Updated successfully - close modal and refresh page");

//    formData.reset();
document.getElementById("form").reset(); 
   // window.location.reload(true);
  }

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

        <form onSubmit={handleSubmit} id="form">
          <div className="my-3">
            <span className="my-auto">Presale</span>
            <select
              name="presale"
              className="select select-bordered select-sm ml-2"
            >
              <option disabled selected>
                {coin.presale ? "True" : "False"}
              </option>
              <option value={true}>True</option>
              <option value={false}>False</option>
            </select>
          </div>

          <div className="my-3">
            Contract Address :{" "}
            <input
              type="text"
              name="address"
              placeholder={coin.contractAddress}
              className="input input-bordered w-full max-w-xs input-sm"
            />
          </div>

          <div className="my-3">
            Votes :{" "}
            <input
              type="text"
              name="votes"
              placeholder={coin.votes}
              className="input input-bordered w-full max-w-xs input-sm"
            />
          </div>

          <div className="my-3">
            Coin Chain :{" "}
            <input
              type="text"
              name="chain"
              placeholder={coin.chain}
              className="input input-bordered w-full max-w-xs input-sm"
            />
          </div>

          <div className="my-3">
            <textarea
              name="description"
              className="textarea textarea-bordered h-24 w-full"
              placeholder={coin.description}
            ></textarea>
          </div>

          <div className="my-3">
            Telegram Contact :{" "}
            <input
              type="text"
              name="telegramContact"
              placeholder={coin.telegramContact}
              className="input input-bordered w-full max-w-xs input-sm"
            />
          </div>

          <div className="my-3">
            Telegram URL :{" "}
            <input
              type="text"
              name="telegramURL"
              placeholder={coin.telegramURL}
              className="input input-bordered w-full max-w-xs input-sm"
            />
          </div>

          <div className="my-3">
            Website URL :{" "}
            <input
              type="text"
              name="websiteURL"
              placeholder={coin.websiteURL}
              className="input input-bordered w-full max-w-xs input-sm"
            />
          </div>

          <div className="my-3">
            Instagram URL :{" "}
            <input
              type="text"
              name="instagramURL"
              placeholder={coin.instagramURL}
              className="input input-bordered w-full max-w-xs input-sm"
            />
          </div>

          <div className="my-3">
            Youtube URL :{" "}
            <input
              type="text"
              name="youtubeURL"
              placeholder={coin.youtubeURL}
              className="input input-bordered w-full max-w-xs input-sm"
            />
          </div>

          <div className="my-3">
            Twitter URL :{" "}
            <input
              type="text"
              name="twitterURL"
              placeholder={coin.twitterURL}
              className="input input-bordered w-full max-w-xs input-sm"
            />
          </div>

          <div className="my-3">
            Facebook URL :{" "}
            <input
              type="text"
              name="facebookURL"
              placeholder={coin.facebookURL}
              className="input input-bordered w-full max-w-xs input-sm"
            />
          </div>

          <div className="my-3">
            Discord URL :{" "}
            <input
              type="text"
              name="discordURL"
              placeholder={coin.discordURL}
              className="input input-bordered w-full max-w-xs input-sm"
            />
          </div>

          <div className="my-3">
            Reddit URL :{" "}
            <input
              type="text"
              name="redditURL"
              placeholder={coin.redditURL}
              className="input input-bordered w-full max-w-xs input-sm"
            />
          </div>

          <div className="my-3">
            Audit URL :{" "}
            <input
              type="text"
              name="auditURL"
              placeholder={coin.auditURL}
              className="input input-bordered w-full max-w-xs input-sm"
            />
          </div>

          <div className="my-3">
            Doxx URL :{" "}
            <input
              type="text"
              name="doxxURL"
              placeholder={coin.doxxURL}
              className="input input-bordered w-full max-w-xs input-sm"
            />
          </div>

          <div className="my-3">
            KYC URL :{" "}
            <input
              type="text"
              name="kycURL"
              placeholder={coin.kycURL}
              className="input input-bordered w-full max-w-xs input-sm"
            />
          </div>

          <div className="my-3">
            SAFU URL :{" "}
            <input
              type="text"
              name="safuURL"
              placeholder={coin.safuURL}
              className="input input-bordered w-full max-w-xs input-sm"
            />
          </div>

          <div>
            <button type="submit" className="btn btn-wide btn-primary">
              Update Coin
            </button>
          </div>
        </form>

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

export default ModalEdit;
