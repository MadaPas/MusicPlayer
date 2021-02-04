import React from "react";
import LibTrack from "./LibTrack";

const Library = ({ libraryStatus, tracks, setCurrentTrack, audioReference, isPlaying, setTracks }) => {
  return (
    <div className={`library ${libraryStatus?"active-library":""}`}>
      <h2>Library</h2>
      <div className="library-tracks">
        { tracks.map((track) => {
          return (
            <LibTrack
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