"use client";
import React, { useState } from "react";

import { editCoin } from "@/lib/editData";
import { editToken } from "@/lib/editTokens";

const ModalTokenEdit = ({ coin }) => {
  const [loading, setLoading] = useState(false);
  
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const address = formData.get("address");
    const logo = formData.get("logo");
    const platform = formData.get("platform");
    const announcement = formData.get("announcement");
    const description = formData.get("description");
    const source_code = formData.get("source_code");
    const technical_doc = formData.get("technical_doc");
    const reddit = formData.get("reddit");
    const twitter = formData.get("twitter");
    const website = formData.get("website");
    const chat = formData.get("chat");
    const youtube = formData.get("youtube");
    const mobile_app = formData.get("mobile_app");
    const linkedin = formData.get("linkedin");
    const cex_name = formData.get("cex_name");
    const cex_link = formData.get("cex_link");
    const dex_name = formData.get("dex_name");
    const dex_link = formData.get("dex_link");

    setLoading(true);

    const response = await editToken(
      !address ? coin.contract_address : address,
      !logo ? coin.logo : logo,
      !platform ? coin.platform : platform,
      !announcement ? coin.urls.announcement : announcement,
      !description ? coin.full_description : description,
      !source_code ? coin.urls.source_code : source_code,
      !technical_doc ? coin.urls.technical_doc : technical_doc,
      !reddit ? coin.urls.reddit : reddit,
      !twitter ? coin.urls.twitter : twitter,
      !website ? coin.urls.website : website,
      !chat ? coin.urls.chat : chat,
      !youtube ? coin.urls.youtube : youtube,
      !mobile_app ? coin.urls.mobile_app : mobile_app,
      !linkedin ? coin.urls.linkedin : linkedin,
      !cex_name ? coin.urls.cex_name : cex_name,
      !cex_link ? coin.urls.cex_link : cex_link,
      !dex_name ? coin.urls.dex_name : dex_name,
      !dex_link ? coin.urls.dex_link : dex_link,
      coin
    );

    setLoading(false);

    if (!response) {
      alert("Error in updating coin - Please try again");
      return;
    }

    alert("Coin Updated successfully - close modal and refresh page");

    window.location.reload(true);
  }

  return (
    <>
      <div className="w-full">
        <div className="flex flex-row">
          <img src={coin.logo} className="rounded-xl w-24 h-24" />

          <span className="my-auto text-2xl ml-5">
            {coin.project_name}
            <br />${coin.symbol}
            <div className="badge badge-sm badge-secondary">Token</div>
          </span>
        </div>

        <form onSubmit={handleSubmit} id="form">
          <div className="flex flex-col md:flex-row md:gap-x-5 w-full my-5">
            <input
              type="text"
              name="address"
              placeholder={`Contract Address :  ${
                coin.contract_address || "Empty"
              }`}
              className="input input-bordered w-full"
            />

            <input
              type="text"
              name="logo"
              placeholder={`Edit Logo :  ${coin.logo || "No Logo"}`}
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex flex-col md:flex-row md:gap-x-5 w-full my-5">
            <input
              type="text"
              name="platform"
              placeholder={`Platform :  ${coin.platform || "Empty"}`}
              className="input input-bordered w-full"
            />

            <input
              type="text"
              name="announcement"
              placeholder={`Announcement :  ${
                coin.urls.announcement || "Empty"
              }`}
              className="input input-bordered w-full"
            />
          </div>
          <div className="my-3">
            <textarea
              name="description"
              className="textarea textarea-bordered h-24 w-full"
              placeholder={coin.full_description}
            ></textarea>
          </div>

          <div className="flex flex-col md:flex-row md:gap-x-5 w-full my-5">
            <input
              type="text"
              name="source_code"
              placeholder={`Source Code :  ${coin.urls.source_code || "Empty"}`}
              className="input input-bordered w-full"
            />

            <input
              type="text"
              name="technical_doc"
              placeholder={`Technical Doc :  ${
                coin.urls.technical_doc || "Empty"
              }`}
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex flex-col md:flex-row md:gap-x-5 w-full my-5">
            <input
              type="text"
              name="reddit"
              placeholder={`Reddit :  ${coin.urls.reddit || "Empty"}`}
              className="input input-bordered w-full"
            />

            <input
              type="text"
              name="twitter"
              placeholder={`Twitter :  ${coin.urls.twitter || "Empty"}`}
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex flex-col md:flex-row md:gap-x-5 w-full my-5">
            <input
              type="text"
              name="website"
              placeholder={`Website :  ${coin.urls.website || "Empty"}`}
              className="input input-bordered w-full"
            />

            <input
              type="text"
              name="chat"
              placeholder={`Telegram/Chat :  ${coin.urls.chat || "Empty"}`}
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex flex-col md:flex-row md:gap-x-5 w-full my-5">
            <input
              type="text"
              name="youtube"
              placeholder={`Youtube :  ${coin.urls.youtube || "Empty"}`}
              className="input input-bordered w-full"
            />

            <input
              type="text"
              name="mobile_app"
              placeholder={`Mobile App  :  ${coin.urls.mobile_app || "Empty"}`}
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex flex-col md:flex-row md:gap-x-5 w-full my-5">
            <input
              type="text"
              name="linkedin"
              placeholder={`Linkedin :  ${coin.urls.linkedin || "Empty"}`}
              className="input input-bordered w-full"
            />

            <input
              type="text"
              name="cex_name"
              placeholder={`CEX NAME :  ${coin.urls.cex_name || "Empty"}`}
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex flex-col md:flex-row md:gap-x-5 w-full my-5">
            <input
              type="text"
              name="cex_link"
              placeholder={`CEX LINK :  ${coin.urls.cex_link || "Empty"}`}
              className="input input-bordered w-full"
            />

            <input
              type="text"
              name="dex_name"
              placeholder={`DEX NAME :  ${coin.urls.dex_name || "Empty"}`}
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex flex-col md:flex-row md:gap-x-5 w-full my-5">
            <input
              type="text"
              name="dex_link"
              placeholder={`DEX LINK :  ${coin.urls.dex_link || "Empty"}`}
              className="input input-bordered w-full"
            />
          </div>
          {/* Start of Row */}

          <div className="mt-10">
            <button type="submit" className="btn btn-wide btn-primary">
              {loading && <span className="loading loading-spinner"></span>}
              Update Coin
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ModalTokenEdit;
