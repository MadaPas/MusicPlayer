import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faPlay, 
    faAngleLeft, 
    faAngleRight,
    faPause,
} from "@fortawesome/free-solid-svg-icons"

const Player = ({ trackInfo, setTrackInfo, currentTrack, isPlaying, setPlaying, audioReference }) => {

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
    setTrackInfo({ ...trackInfo, currentTime: e.target.value });
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
        <p>{getTime(trackInfo.duration)}</p>
      </div>
      <div className="player-control">
        <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} />
        <FontAwesomeIcon
          onClick={playTrackHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
          />
        </div>
    </div>
      );
    };

export default Player;