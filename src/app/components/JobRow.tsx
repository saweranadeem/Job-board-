import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
const JobRow = () => {
  return (
    <div className="bg-white p-6 rounded-md shadow-sm flex gap-2 justify-between items-center relative ">
      <div className="absolute cursor-pointer top-4 right-4">
        <FontAwesomeIcon className="size-4 text-gray-300" icon={faHeart} />
      </div>

      <div>
        <img
          src="https://www.freeiconspng.com/thumbs/spotify-icon/spotify-icon-22.png"
          alt="logo"
          className="size-12"
        />
      </div>
      <div className="grow">
        <div className="text-gray-700 text-sm capitalize">Spotify</div>
        <div className="font-bold text-lg">Product Designer</div>
        <div className="text-gray-400 text-sm capitalize">
          Remote &middot; New York, US &middot; FULL-time
        </div>
      </div>
      <div className="text-gray-700 text-sm ">2 weeks ago</div>
    </div>
  );
};

export default JobRow;
