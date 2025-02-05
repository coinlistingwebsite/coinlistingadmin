"use client";
import React, { useState } from "react";

import { editCoin } from "@/lib/editData";


import TimezonePlayground from "./changeTime";

const ModalEdit = ({ coin }) => {
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [change, setChange] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const votes = formData.get("votes");
    const address = formData.get("address");
    const platform = formData.get("platform");
    const cmc_id = formData.get("cmc_id");
    const description = formData.get("description");
    const explorer = formData.get("explorer");
    const facebook = formData.get("facebook");
    const source_code = formData.get("source_code");
    const technical_doc = formData.get("technical_doc");
    const reddit = formData.get("reddit");
    const twitter = formData.get("twitter");
    const website = formData.get("website");
    const instagram = formData.get("instagram");
    const youtube = formData.get("youtube");
    const telegram = formData.get("telegram");
    const telegramContact = formData.get("telegramContact");
    const audit = formData.get("audit");
    const doxx = formData.get("doxx");
    const safu = formData.get("safu");
    const kyc = formData.get("kyc");

    // CEX 1
    const cexname1 = formData.get("cexname1");
    const cexlink1 = formData.get("cexlink1");
    // CEX 2
    const cexname2 = formData.get("cexname2");
    const cexlink2 = formData.get("cexlink2");
    // CEX 3
    const cexname3 = formData.get("cexname3");
    const cexlink3 = formData.get("cexlink3");
    // CEX 4
    const cexname4 = formData.get("cexname4");
    const cexlink4 = formData.get("cexlink4");

    setLoading(true);

    const response = await editCoin(
      !address ? coin.contract_address : address,
      !votes ? coin.votes : votes,
      !platform ? coin.platform : platform,
      !cmc_id ? coin.cmc_id : cmc_id,
      !description ? coin.description : description,
      !explorer ? coin.urls.explorer : explorer,
      !facebook ? coin.urls.facebook : facebook,
      !source_code ? coin.urls.source_code : source_code,
      !technical_doc ? coin.urls.technical_doc : technical_doc,
      !reddit ? coin.urls.reddit : reddit,
      !twitter ? coin.urls.twitter : twitter,
      !website ? coin.urls.website : website,
      !instagram ? coin.urls.instagram : instagram,
      !youtube ? coin.urls.youtube : youtube,
      !telegram ? coin.urls.telegram : telegram,
      !telegramContact ? coin.urls.telegramContact : telegramContact,
      !audit ? coin.urls.audit : audit,
      !doxx ? coin.urls.doxx : doxx,
      !safu ? coin.urls.safu : safu,
      !kyc ? coin.urls.kyc : kyc,
      !startDate ? coin.date_launched : Date.parse(startDate),
      !endDate ? coin.date_end : Date.parse(endDate),

      !cexname1 ? coin.urls.cexname1 : cexname1,
      !cexlink1 ? coin.urls.cexlink1 : cexlink1,

      !cexname2 ? coin.urls.cexname2 : cexname2,
      !cexlink2 ? coin.urls.cexlink2 : cexlink2,

      !cexname3 ? coin.urls.cexname3 : cexname3,
      !cexlink3 ? coin.urls.cexlink3 : cexlink3,

      !cexname4 ? coin.urls.cexname4 : cexname4,
      !cexlink4 ? coin.urls.cexlink4 : cexlink4,

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
            {coin.coinName}
            <br />${coin.symbol}
            {coin.presale ? (
              <>
                <br />
                <div className="badge badge-sm badge-secondary">Presale</div>
              </>
            ) : (
              <>
                <br />
                <div className="badge badge-sm badge-secondary">Token</div>
              </>
            )}
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
              name="votes"
              placeholder={`Edit Votes :  ${coin.votes || "No Votes"}`}
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
              name="cmc_id"
              placeholder={`CMC_ID :  ${coin.cmc_id || "No ID"}`}
              className="input input-bordered w-full"
            />
          </div>
          <div className="my-3">
            <textarea
              name="description"
              className="textarea textarea-bordered h-24 w-full"
              placeholder={coin.description}
            ></textarea>
          </div>
          <div className="flex flex-col md:flex-row md:gap-x-5 w-full my-5">
            <input
              type="text"
              name="explorer"
              placeholder={`Explorer :  ${coin.urls?.explorer || "Empty"}`}
              className="input input-bordered w-full"
            />

            <input
              type="text"
              name="facebook"
              placeholder={`Date Launched :  ${coin.urls.facebook || "Empty"}`}
              className="input input-bordered w-full"
            />
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
              name="instagram"
              placeholder={`Instagram :  ${coin.urls.instagram || "Empty"}`}
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
              name="telegram"
              placeholder={`Telegram :  ${coin.urls.telegram || "Empty"}`}
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex flex-col md:flex-row md:gap-x-5 w-full my-5">
            <input
              type="text"
              name="telegramContact"
              placeholder={`Telegram Contact :  ${
                coin.urls.telegramContact || "Empty"
              }`}
              className="input input-bordered w-full"
            />

            <input
              type="text"
              name="audit"
              placeholder={`Audit :  ${coin.urls.audit || "Empty"}`}
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex flex-col md:flex-row md:gap-x-5 w-full my-5">
            <input
              type="text"
              name="cexname1"
              placeholder={`CEX Name 1 :  ${coin.urls.cexname1 || "Empty"}`}
              className="input input-bordered w-full"
            />

            <input
              type="text"
              name="cexlink1"
              placeholder={`CEX Link 1 :  ${coin.urls.cexlink1 || "Empty"}`}
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex flex-col md:flex-row md:gap-x-5 w-full my-5">
            <input
              type="text"
              name="cexname2"
              placeholder={`CEX Name 2 :  ${coin.urls.cexname2 || "Empty"}`}
              className="input input-bordered w-full"
            />

            <input
              type="text"
              name="cexlink2"
              placeholder={`CEX Link 2 :  ${coin.urls.cexlink2 || "Empty"}`}
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex flex-col md:flex-row md:gap-x-5 w-full my-5">
            <input
              type="text"
              name="cexname3"
              placeholder={`CEX Name 3 :  ${coin.urls.cexname3 || "Empty"}`}
              className="input input-bordered w-full"
            />

            <input
              type="text"
              name="cexlink3"
              placeholder={`CEX Link 3 :  ${coin.urls.cexlink3 || "Empty"}`}
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex flex-col md:flex-row md:gap-x-5 w-full my-5">
            <input
              type="text"
              name="cexname4"
              placeholder={`CEX Name 4 :  ${coin.urls.cexname4 || "Empty"}`}
              className="input input-bordered w-full"
            />

            <input
              type="text"
              name="cexlink4"
              placeholder={`CEX Link 4 :  ${coin.urls.cexlink4 || "Empty"}`}
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex flex-col md:flex-row md:gap-x-5 w-full my-5">
            <input
              type="text"
              name="doxx"
              placeholder={`Doxx :  ${coin.urls.doxx || "Empty"}`}
              className="input input-bordered w-full"
            />

            <input
              type="text"
              name="Safu"
              placeholder={`SAFU :  ${coin.urls.safu || "Empty"}`}
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex flex-col md:flex-row md:gap-x-5 w-full my-5">
            <input
              type="text"
              name="kyc"
              placeholder={`KYC :  ${coin.urls.kyc || "Empty"}`}
              className="input input-bordered w-full"
            />
          </div>
          {/* Start of Row */}
          <input type="checkbox" onChange={() => setChange(!change)} /> Adjust
          Start and End Time of Presale
          {change && (
            <>
              <TimezonePlayground
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                endDate={endDate}
                startDate={startDate}
              />
            </>
          )}
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

export default ModalEdit;
