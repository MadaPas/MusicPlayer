import React from "react";

const LibTrack = ({ track, tracks, setCurrentTrack, audioRef, isPlaying, id, setTracks }) => {
  const trackSelectHandler = (e) => {
        setCurrentTrack(track);

    const newTracks = tracks.map((track) => {
            if (track.id === id) {
                return {
                    ...track, 
                    active:true,
                };
            } else {
                    return {
                        ...track,
                        active:false,
                    };
                }
        });
    
   
    setTracks(newTracks);
    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          audioRef.current.play();
        });
      }
    }
  };

  return (
    <div className={`library-track ${track.active?"selected":""}`} onClick={trackSelectHandler}>
      <img src={track.cover} alt={track.name}></img>
      <div className="track-description">
        <h3>{track.name}</h3>
        <h4>{track.artist}</h4>
      </div>
    </div>
  );
};

export default LibTrack;