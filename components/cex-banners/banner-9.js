"use client";
import { db } from "@/firebase_config";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";

const BannerNine = ({ banner }) => {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState("");

  const updateImage = async () => {
    if (!image || !link) return alert("Please fill an image url and link");

    setLoading(true);

    try {
      const bannerDoc = doc(
        db,
        "cexBanners",
        process.env.NEXT_PUBLIC_CEX_BANNERS
      );

      await updateDoc(bannerDoc, {
        banner_9: { logo: image, link: link },
      });
    } catch (err) {
      console.log(err);
      alert("Error updating banner");
      setLoading(false);
      return;
    }

    setLoading(false);

    alert("Banner updated successfully");
    window.location.reload(true);
  };

  return (
    <>
      <div className="bg-base-300 p-5 rounded-lg card max-w-4xl">
        <img
          src={image || banner.logo}
          alt="Advert Banner 9"
          className="w-200"
        />

        <p className="my-2">
          Advert Banner 9 & Footer Banner : This Image should be 400px X 100px
          and not exceed 1MB
        </p>

        <input
          type="text"
          placeholder="Image URL"
          className="input input-bordered input-accent w-full"
          onChange={(event) => setImage(event.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Link"
          className="input input-bordered input-accent w-full"
          onChange={(event) => setLink(event.target.value)}
        />

        <button className="btn btn-success mt-4" onClick={updateImage}>
          {loading && <span className="loading loading-spinner"></span>}
          Update Banner 9
        </button>
      </div>
    </>
  );
};

export default BannerNine;
