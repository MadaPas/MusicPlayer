import React from "react";
import LibTrack from "./LibTrack";

const Library = ({
  libStatus,
  tracks,
  setCurrentTrack,
  setLibStatus,
  audioReference,
  isPlaying,
  setTracks,
  device,
}) => {
  return (
    <div className={`library ${libStatus ? "active-library" : ""}`}>
      <h2>Library</h2>
      <div className="library-tracks">
        {tracks.map((track) => {
          return (
            <LibTrack
              device={device}
              setLibStatus={setLibStatus}
              setTracks={setTracks}
              isPlaying={isPlaying}
              audioReference={audioReference}
              track={track}
              tracks={tracks}
              setCurrentTrack={setCurrentTrack}
              key={track.id}
              id={track.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Library;
