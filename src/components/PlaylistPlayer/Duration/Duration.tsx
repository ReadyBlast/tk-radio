import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import {
  setCurrentTime,
  setDurationToggle,
} from '../../../redux/slices/playerSlice';

type TProps = {
  setAudCurrentTime: () => void;
  inputBgChanger: (val: number, max: number) => string;
};

const timeFormat = (ms: number) => {
  const num = (value: number) => {
    value = Math.floor(value);
    return value < 10 ? '0' + value : value;
  };

  const sec = ms / 1000;
  const hours = (sec / 3600) % 24;
  const minutes = (sec / 60) % 60;
  const seconds = sec % 60;

  if (seconds < 3600) {
    return num(minutes) + ':' + num(seconds);
  } else {
    return num(hours) + ':' + num(minutes) + ':' + num(seconds);
  }
};

const Duration: React.FC<TProps> = ({ setAudCurrentTime, inputBgChanger }) => {
  const dispatch = useAppDispatch();
  const { songDuration, currentTime, popupValue } = useAppSelector(
    (state) => state.player
  );

  const currentTimeUTC = timeFormat(
    typeof currentTime === 'number' ? currentTime * 1000 : 0
  );
  const songDurationUTC = timeFormat(
    typeof songDuration === 'number' ? songDuration * 1000 : 0
  );

  return (
    <>
      <input
        style={{
          backgroundSize: `${inputBgChanger(currentTime, songDuration)}`,
        }}
        onMouseDown={() => dispatch(setDurationToggle(false))}
        onMouseUp={() => setAudCurrentTime()}
        value={currentTime}
        type="range"
        min="0"
        max={songDuration}
        className="play-slider"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          dispatch(setCurrentTime(Number(event.target.value)))
        }
      />
      <div
        className="song-duration"
        style={popupValue ? { opacity: '0.1' } : {}}
      >
        <div className="song-duration__text">{currentTimeUTC}</div>
        <div className="song-duration__text">{songDurationUTC}</div>
      </div>
    </>
  );
};

export default Duration;
