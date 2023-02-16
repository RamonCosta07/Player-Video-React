import { useState, useRef, useEffect } from "react";
import "./Player.css";
import { BsFillPlayFill } from 'react-icons/bs';
import { BsPause } from 'react-icons/bs';

function usePlayerState($videoPlayer) {
  const [playerState, setPlayerState] = useState({
    playing: false,
    percentage: 0,
    playbackRate: 1,
  });

  const toogleVideoPlay = () => {
    setPlayerState({
      ...playerState,
      playing: !playerState.playing,
    });
  };

  function handleTimeUpdate() {
    const currentPorcentage =
      ($videoPlayer.current.currentTime / $videoPlayer.current.duration) * 100;
    setPlayerState({
      ...playerState,
      percentage: currentPorcentage,
    });
  }

  const handleChangeVideoPercentage = (e) => {
    const currentPercentageValue = e.target.value;
    $videoPlayer.current.currentTime =
      ($videoPlayer.current.duration / 100) * currentPercentageValue;

    setPlayerState({
      ...playerState,
      percentage: currentPercentageValue,
    });
  };

  const handleSpeed = (e) => {
    const currentSpeed = e.target.value;
    setPlayerState({
      ...playerState,
      playbackRate: currentSpeed,
    });
  };

  return {
    playerState,
    toogleVideoPlay,
    handleTimeUpdate,
    handleChangeVideoPercentage,
    handleSpeed,
  };
}

const videoURL =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

const Player = () => {
  const $videoPlayer = useRef(null);
  const {
    toogleVideoPlay,
    playerState,
    handleTimeUpdate,
    handleChangeVideoPercentage,
    handleSpeed,
    selectValue,
  } = usePlayerState($videoPlayer);

  useEffect(() => {
    playerState.playing
      ? $videoPlayer.current.play()
      : $videoPlayer.current.pause();
  }, [playerState.playing, $videoPlayer]);

  useEffect(() => {
    $videoPlayer.current.playbackRate = playerState.playbackRate;
  }, [playerState.playbackRate]);

  return (
    <div className="videoWrapper">
      <div>
        <video
          ref={$videoPlayer}
          src={videoURL}
          onTimeUpdate={handleTimeUpdate}
          poster="https://peach.blender.org/wp-content/uploads/bbb-splash.png"
        ></video>
      </div>

      <div className="controls">
        <button onClick={toogleVideoPlay}>
          {playerState.playing ? <BsPause /> : <BsFillPlayFill />}
        </button>
        <input
          type="range"
          min="0"
          max="100"
          onChange={handleChangeVideoPercentage}
          value={playerState.percentage}
        />

        <select value={playerState.playbackRate} onChange={handleSpeed}>
          {[1, 1.5, 1.75, 2].map((speed) => (
            <option key={`speedChange_${speed}`}>{speed}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Player;
