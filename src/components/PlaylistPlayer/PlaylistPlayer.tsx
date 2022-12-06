import React, { useCallback, useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setVolumeValue } from '../../redux/slices/generalSlice';
import {
  fetchSongs,
  setCurrentTime,
  setDurationToggle,
  setSong,
  setSongDuration,
  setSongIndex,
  TSong,
} from '../../redux/slices/playerSlice';
import ControlButtons from './ControlButtons/ControlButtons';
import Duration from './Duration/Duration';

import './playlistPlayer.scss';
import PlaylistPopup from './PlaylistPopup/PlaylistPopup';

type TPlayerProps = {
  audio: HTMLAudioElement;
};

const PlaylistPlayer: React.FC<TPlayerProps> = ({ audio }) => {
  const dispatch = useAppDispatch();
  const {
    currentSong,
    durationToggle,
    currentTime,
    songs,
    currentSongIndex,
    popupValue,
    repeatStatus,
  } = useAppSelector((state) => state.player);
  const { volumeValue } = useAppSelector((state) => state.general);

  const [isPlayed, setIsPlayed] = useState(false);

  const getSongs = useCallback(() => {
    dispatch(fetchSongs());
  }, [dispatch]);

  useEffect(() => {
    getSongs();
  }, [getSongs]);

  useEffect(() => {
    audio.volume = Number(volumeValue) / 100;

    if (audio.ended && currentSongIndex !== null) {
      if (repeatStatus === 'one') {
        audio.play();
      } else if (repeatStatus === 'all') {
        if (currentSongIndex === songs.length - 1) {
          dispatch(setSongIndex(0));
          dispatch(setSong(songs[0]));
          audio.src = songs[0].url;
          audio.play();
        } else {
          dispatch(setSongIndex(currentSongIndex + 1));
          dispatch(setSong(songs[currentSongIndex + 1]));
          audio.src = songs[currentSongIndex + 1].url;
          audio.play();
        }
      } else if (repeatStatus === 'off') {
        if (currentSongIndex !== songs.length - 1) {
          dispatch(setSongIndex(currentSongIndex + 1));
          dispatch(setSong(songs[currentSongIndex + 1]));
          audio.src = songs[currentSongIndex + 1].url;
          audio.play();
        } else {
          setIsPlayed(false);
        }
      }
    }
  });

  const playingHandler = useCallback(() => {
    if (isPlayed) {
      audio.pause();
      setIsPlayed(false);
    } else if (currentSong.url !== '#'){
      audio.play();
      setIsPlayed(true);
    }
  }, [audio, currentSong.url, isPlayed]);

  useEffect(() => {
    const durationInterval = setInterval(() => {
      dispatch(setSongDuration(audio.duration));

      if (durationToggle) {
        dispatch(setCurrentTime(audio.currentTime));
      }
    }, 200);

    return () => {
      clearInterval(durationInterval);
    };
  }, [audio.currentTime, audio.duration, dispatch, durationToggle]);

  const onClickHandler = (obj: TSong, index: number) => {
    if (isPlayed) {
      audio.pause();
      setIsPlayed(false);
    }

    dispatch(setSong(obj));
    dispatch(setSongIndex(index));
    audio.src = obj.url;

    audio.play();
    setIsPlayed(true);
  };

  const setAudCurrentTime = () => {
    dispatch(setDurationToggle(true));
    audio.currentTime = currentTime;
  };

  const onChangeVolume = (e: string) => {
    audio.volume = Number(e) / 100;
    dispatch(setVolumeValue(e));
  };

  const inputBgChanger = (val: number, max: number) => {
    return ((val - 0) * 100) / (max - 0) + '% 100%';
  };

  return (
    <div className="wrapper">
      <div className="container">
        <img
          className="album_cover_player"
          style={popupValue ? { opacity: '0.1' } : {}}
          src="https://radio.tkofficial.ru/image/logo.jpg"
          alt="album_cover"
        />
        <div className="now_played_player">
          <div
            className="now_played_player--container"
            style={popupValue ? { opacity: '0.1' } : {}}
          >
            <Marquee gradient={false} pauseOnHover={true} delay={13} loop={1}>
              <p className="now_played_player__title">{currentSong.title}</p>
            </Marquee>
            <Marquee gradient={false} pauseOnHover={true} delay={13} loop={1}>
              <p className="now_played_player__artist">{currentSong.author}</p>
            </Marquee>
          </div>
        </div>
        <Duration
          inputBgChanger={inputBgChanger}
          setAudCurrentTime={setAudCurrentTime}
        />
        <ControlButtons
          audio={audio}
          isPlayed={isPlayed}
          playingHandler={playingHandler}
        />
        <input
          style={
            popupValue
              ? {
                  opacity: '0.1',
                  backgroundSize: `${inputBgChanger(Number(volumeValue), 100)}`,
                }
              : {
                  backgroundSize: `${inputBgChanger(Number(volumeValue), 100)}`,
                }
          }
          value={volumeValue}
          type="range"
          min="0"
          max="100"
          className="slider"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            onChangeVolume(event.target.value)
          }
        />
        <PlaylistPopup onClickHandler={onClickHandler} />
      </div>
    </div>
  );
};

export default PlaylistPlayer;
