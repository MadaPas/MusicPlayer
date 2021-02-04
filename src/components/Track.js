import React from "react";

const Track = ({ currentTrack, isPlaying }) => {
  return (
    <div className="track-container">
      <img
        src={currentTrack.cover}
        alt={currentTrack.name}
        className={`${isPlaying ? "rotate-track-img" : ""}`}
      ></img>
      <h2>{currentTrack.name}</h2>
      <h3>{currentTrack.artist}</h3>
    </div>
  );
};

export default Track;
