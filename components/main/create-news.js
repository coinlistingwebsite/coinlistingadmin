"use client";
import { submitNews } from "@/lib/editData";
import { useState } from "react";

const CreateNews = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState();
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState("");

  // image validation
  const scanImg = (file) => {
    if (!file.name.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
      alert("Image File not Supported, Please ReUpload");
      return;
    }

    if (file.size > 5000000) {
      alert("Image File Too Large, Please ReUpload (5mb Max)");
      return;
    }

    setLogo(file);
  };

  const handleSubmit = async () => {
    if (!title || !location || !description || !logo) {
      alert("Please complete all fields");
      return;
    }

    setLoading(true);
    const response = await submitNews(title, location, description, logo, link);

    setLoading(false);

    if (!response) alert("Error in submitting News");

    alert("Successfully submitted");
    window.location.reload();
  };

  return (
    <div>
      <h1>Create News</h1>

      {/* Section */}
      <div className="block lg:flex lg:flex-row mt-5 gap-x-5">
        {/* Section 1 */}
        <div className="flex-1">
          <div className="flex flex-row mt-5">
            <span className="flex-1">Title</span>
          </div>
          <div>
            <input
              type="text"
              className="input input-bordered input-md w-full"
              data-theme="light"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="News Title"
            />
          </div>
        </div>
        {/* Section 2 */}
        <div className="flex-1">
          <div className="flex flex-row mt-5">
            <span className="flex-1">Source</span>
          </div>
          <div>
            <input
              type="text"
              className="input input-bordered input-md w-full"
              data-theme="light"
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Source of news e.g Blockchain Reporter, Forbes Digital Assets"
            />
          </div>
        </div>
      </div>

      {/* End  of Row */}

      <textarea
        className="textarea textarea-bordered h-24 w-full mt-5"
        placeholder="News description"
        data-theme="light"
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Pick a file</span>
        </div>
        <input
          type="file"
          className="file-input file-input-bordered w-full max-w-xs"
          data-theme="light"
          onChange={(event) => scanImg(event.target.files[0])}
        />
      </label>

      <div className="flex-1">
        <div className="flex flex-row mt-5">
          <span className="flex-1">Link</span>
        </div>
        <div>
          <input
            type="text"
            className="input input-bordered input-md w-full"
            data-theme="light"
            onChange={(e) => setLink(e.target.value)}
            placeholder="News Link"
          />
        </div>
      </div>

      <button className="btn btn-accent mt-5" onClick={handleSubmit}>
        {loading && <span className="loading loading-spinner"></span>}
        Submit
      </button>
    </div>
  );
};

export default CreateNews;
