import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  setTracks,
  trackInfo,
  setTrackInfo,
  currentTrack,
  tracks,
  isPlaying,
  setPlaying,
  setCurrentTrack,
  audioReference,
}) => {
  const activeTrackHandler = (nextOrPrev) => {
    const newTracks = tracks.map((track) => {
      if (track.id === nextOrPrev.id) {
        return {
          ...track,
          active: true,
        };
      } else {
        return {
          ...track,
          active: false,
        };
      }
    });

    setTracks(newTracks);
  };
  const playTrackHandler = () => {
    if (isPlaying) {
      audioReference.current.pause();
      setPlaying(!isPlaying);
    } else {
      audioReference.current.play();
      setPlaying(!isPlaying);
    }
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = (e) => {
    audioReference.current.currentTime = e.target.value;
    setTrackInfo({
      ...trackInfo,
      currentTime: e.target.value,
    });
  };

  const skipTrackHandler = async (direction) => {
    let currentIndex = tracks.findIndex(
      (track) => track.id === currentTrack.id
    );
    if (direction === "forward") {
      await setCurrentTrack(tracks[(currentIndex + 1) % tracks.length]);
      activeTrackHandler(tracks[(currentIndex + 1) % tracks.length]);
    } else if (direction === "back") {
      if (currentIndex <= 0) {
        await setCurrentTrack(tracks[tracks.length - 1]);
        activeTrackHandler(tracks[tracks.length - 1]);
      } else {
        await setCurrentTrack(tracks[(currentIndex - 1) % tracks.length]);
        activeTrackHandler(tracks[(currentIndex - 1) % tracks.length]);
      }
    }
    if (isPlaying) {
      audioReference.current.play();
    }
  };
  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(trackInfo.currentTime)}</p>
        <input
          type="range"
          value={trackInfo.currentTime}
          min={0}
          max={trackInfo.duration || 0}
          onChange={dragHandler}
        />
        <p>{trackInfo.duration ? getTime(trackInfo.duration) : "0:00"}</p>
      </div>
      <div className="player-control">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("back")}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playTrackHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("forward")}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
    </div>
  );
};
export default Player;
