
import React, { useRef, useState } from "react";

import music from "./music";
import "./styles/app.scss";

import Track from "./components/Track";
import Player from "./components/Player";
import Navigation from "./components/Navigation";
import Library from "./components/Library";

function App() {

  const [tracks, setTracks] = useState(music());
  const [isPlaying, setPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(tracks[0]);
 
  const [trackInfo, setTrackInfo] = useState({
    currentTime: 0,
    duration: 0,
  });

  const [libraryStatus, setLibraryStatus]=useState(false);

  const audioReference = useRef(null);
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setTrackInfo({ ...trackInfo, currentTime: current, duration: duration });
  };
  return (
    <div className="App">
    <Navigation libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} /> 
      <Track currentTrack={currentTrack} />
      <Player
        trackInfo={trackInfo}
        setTrackInfo={setTrackInfo}
        timeUpdateHandler={timeUpdateHandler}
        audioReference={audioReference}
        isPlaying={isPlaying}
        setPlaying={setPlaying}
        currentTrack={currentTrack}
      />
      <Library
      libraryStatus={libraryStatus}
        setTracks={setTracks}
        audioReference={audioReference}
        tracks={tracks}
        setCurrentTrack={setCurrentTrack}
        isPlaying={isPlaying}
      />
      <audio
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        ref={audioReference}
        src={currentTrack.audio}
      ></audio>
    </div>
  );
}

export default App;