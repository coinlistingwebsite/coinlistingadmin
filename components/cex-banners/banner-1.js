"use client";
import { db, storage } from "@/firebase_config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import React, { useState } from "react";

const BannerOne = ({ banner }) => {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState("");

  const updateImage = async () => {
    if (!image || !link) return alert("Please fill an image url and link");

    setLoading(true);

    try {
      const bannerDoc = doc(db, "banners", process.env.NEXT_PUBLIC_CEX_BANNERS);

      await updateDoc(bannerDoc, {
        banner_1: { logo: image, link: link },
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
      <div className="bg-base-300 p-5 rounded-lg card max-w-2xl">
        <img
          src={image || banner.logo}
          alt="Advert Banner 1"
          className="w-96"
        />

        <p className="my-2">
          Advert Banner 1 : This Image should be 100px X 50px and not exceed 1MB
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
          Update Banner 1
        </button>
      </div>
    </>
  );
};

export default BannerOne;
