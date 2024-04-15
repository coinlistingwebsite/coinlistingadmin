"use client";
import { db, storage } from "@/firebase_config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import React, { useState } from "react";

const AdvertBannerFour = ({ banner }) => {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState("");

  const updateImage = async () => {
    if (!image || !link) {
      alert("Select an Image First");
      return;
    }

    if (!image.name.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
      alert("Image File not Supported, Please ReUpload");
      return;
    }

    if (image.size > 1000000) {
      alert("Image File Too Large, Please ReUpload (1mb Max)");
      return;
    }

    setLoading(true);

    // UPLOAD IMAGE
    const imageRef = ref(storage, `banners/${v4()}/${image.name + v4()}`);

    const status = await uploadBytes(imageRef, image)
      .then((snapshot) => {
        return snapshot;
      })
      .catch((error) => {
        return false;
      });

    //if their was an error in uploading
    if (!status) {
      alert("Error uploading");
      setLoading(false);
      return;
    }

    // get the image URL
    const logoURL = await getDownloadURL(status.ref).then((url) => {
      return url;
    });

    try {
      const bannerDoc = doc(db, "banners", process.env.NEXT_PUBLIC_DB_BANNERS);

      await updateDoc(bannerDoc, {
        banner_4: { logo: logoURL, link: link },
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
      <div className="bg-base-300 p-5 rounded-lg card">
        {image ? (
          <img
            src={URL.createObjectURL(image)}
            alt="Advert Banner 4"
            className="w-[700px] h-[100px]"
          />
        ) : (
          <img
            src={banner.logo}
            alt="Advert Banner 4"
            className="w-[700px] h-[100px]"
          />
        )}

        <p className="my-2">
          Advert Banner 4: This Image should be 700px X 100px and not exceed
          1MB
          <br />
          Banner Locations : Slider 2 Image
        </p>

        <input
          type="file"
          className="file-input file-input-bordered file-input-primary w-full max-w-xs my-3"
          onChange={(event) => setImage(event.target.files[0])}
        />

        <input
          type="text"
          placeholder="Link"
          className="input input-bordered input-accent w-full"
          onChange={(event) => setLink(event.target.value)}
        />

        <button className="btn btn-success mt-4" onClick={updateImage}>
          {loading && <span className="loading loading-spinner"></span>}
          Update Banner 4
        </button>
      </div>
    </>
  );
};

export default AdvertBannerFour;
