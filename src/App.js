import React, { useRef, useState } from "react";

import music from "./music";
import "./styles/app.scss";
import "input-range-scss";

import Track from "./components/Track";
import Player from "./components/Player";
import Navigation from "./components/Navigation";
import Library from "./components/Library";
import Footer from "./components/Footer";

function App({ device }) {
  const [tracks, setTracks] = useState(music());
  const [isPlaying, setPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(tracks[0]);

  const [trackInfo, setTrackInfo] = useState({
    currentTime: 0,
    duration: 0,
  });

  const [libStatus, setLibStatus] = useState(device);

  const audioReference = useRef(null);
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setTrackInfo({ ...trackInfo, currentTime: current, duration: duration });
  };

  const trackEndHandler = async (e) => {
    let currentIndex = tracks.findIndex(
      (track) => track.id === currentTrack.id
    );
    await setCurrentTrack(tracks[(currentIndex + 1) % tracks.length]);
    if (isPlaying) {
      audioReference.current.play();
    }
  };
  return (
    <div className={`App ${libStatus ? "library-active" : ""}`}>
     {/* <div  className="App"> */}
      <Navigation libStatus={libStatus} setLibStatus={setLibStatus} />
      <Track currentTrack={currentTrack} isPlaying={isPlaying} />
      <Player
        setTracks={setTracks}
        tracks={tracks}
        trackInfo={trackInfo}
        setTrackInfo={setTrackInfo}
        timeUpdateHandler={timeUpdateHandler}
        audioReference={audioReference}
        isPlaying={isPlaying}
        setPlaying={setPlaying}
        setCurrentTrack={setCurrentTrack}
        currentTrack={currentTrack}
      />
      <Library
        setLibStatus={setLibStatus}
        device={device}
        libStatus={libStatus}
        setTracks={setTracks}
        audioReference={audioReference}
        tracks={tracks}
        setCurrentTrack={setCurrentTrack}
        isPlaying={isPlaying}
      />
      <Footer/>
      <audio
        onEnded={trackEndHandler}
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        ref={audioReference}
        src={currentTrack.audio}
      ></audio>
    </div>
  );
}

export default App;
