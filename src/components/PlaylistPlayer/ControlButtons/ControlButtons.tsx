import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setSong, setSongIndex } from '../../../redux/slices/playerSlice';

type TControlButtonsProps = {
  audio: HTMLAudioElement;
  playingHandler: () => void;
  isPlayed: boolean;
};

const ControlButtons: React.FC<TControlButtonsProps> = ({
  audio,
  playingHandler,
  isPlayed,
}) => {
  const dispatch = useAppDispatch();
  const { popupValue, currentSongIndex, songs } = useAppSelector(
    (state) => state.player
  );

  const onClickSetPrevious = () => {
    if (currentSongIndex !== null) {
      if (currentSongIndex !== 0) {
        dispatch(setSongIndex(currentSongIndex - 1));
        dispatch(setSong(songs[currentSongIndex - 1]));
        audio.src = songs[currentSongIndex - 1].url;
        if (isPlayed) {
          audio.play();
        }
      }
    }
  };

  const onClickSetNext = () => {
    if (currentSongIndex !== null) {
      if (currentSongIndex !== songs.length - 1) {
        dispatch(setSongIndex(currentSongIndex + 1));
        dispatch(setSong(songs[currentSongIndex + 1]));
        audio.src = songs[currentSongIndex + 1].url;
        if (isPlayed) {
          audio.play();
        }
      }
    }
  };

  return (
    <div className="control" style={popupValue ? { opacity: '0.1' } : {}}>
      <svg
        className="control__pnb"
        width="27"
        height="27"
        viewBox="0 0 27 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => onClickSetPrevious()}
        style={
          currentSongIndex === null || currentSongIndex === 0
            ? { opacity: '0.3' }
            : {}
        }
      >
        <path
          d="M2.75 24.25V2.75H6.33333V24.25H2.75ZM9.02083 13.5L24.25 2.75V24.25L9.02083 13.5Z"
          fill="white"
        />
      </svg>
      <button
        onClick={playingHandler}
        className={
          isPlayed === false ? 'control__play' : 'control__play paused'
        }
        aria-label="Play-Pause Button"
      ></button>
      <svg
        className="control__pnb"
        width="27"
        height="27"
        viewBox="0 0 27 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => onClickSetNext()}
        style={
          currentSongIndex === songs.length - 1
            ? { opacity: '0.3' }
            : { opacity: '1' }
        }
      >
        <path
          d="M24.25 2.75L24.25 24.25L20.6667 24.25L20.6667 2.75L24.25 2.75ZM17.9792 13.5L2.75 24.25L2.75 2.75L17.9792 13.5Z"
          fill="white"
        />
      </svg>
    </div>
  );
};

export default ControlButtons;
