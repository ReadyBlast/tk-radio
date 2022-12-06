import React, { useCallback, useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  fetchSongnames,
  setAlbumCover,
  setStation,
} from '../../redux/slices/radioSlice';
import StationsPopup from './StationsPopup/StationsPopup';

import './radioPlayer.scss';
import { setVolumeValue } from '../../redux/slices/generalSlice';

export type TRadiostationInfo = {
  stationName: string;
  stationSrc: string;
  albumCoverUrl: string;
  stationInfo: string;
};

export interface IRadiostations {
  allIn: TRadiostationInfo;
  deepHouse: TRadiostationInfo;
}

const radiostations: IRadiostations = {
  allIn: {
    stationName: 'Всё сразу',
    stationSrc: 'https://tkofficial.ru:3080/stream-192.mp3',
    albumCoverUrl: 'https://radio.tkofficial.ru/image/logo.jpg?',
    stationInfo: 'https://radio.tkofficial.ru/library/nowplaying_title.txt',
  },
  deepHouse: {
    stationName: 'Deep House',
    stationSrc: 'https://tkofficial.ru:3080/deephouse-192.mp3',
    albumCoverUrl: 'https://radio.tkofficial.ru/leha/img/logodeep.jpg?',
    stationInfo: 'https://radio.tkofficial.ru/library/nowplaying_deep.txt',
  },
};

type TRadioProps = {
  audio: HTMLAudioElement;
};

const RadioPlayer: React.FC<TRadioProps> = ({audio}) => {
  const dispatch = useAppDispatch();
  const { src, songnamesUrl, songnames, albumCover, radiostation, popupValue } =
    useAppSelector((state) => state.radio);
  const { volumeValue } = useAppSelector((state) => state.general);

  const [isRadioPlayed, setIsRadioPlayed] = useState(false);

  const getStationInfo = useCallback(() => {
    dispatch(
      setAlbumCover(
        radiostation === 'Deep House'
          ? radiostations.deepHouse.albumCoverUrl + new Date().getTime()
          : radiostations.allIn.albumCoverUrl + new Date().getTime()
      )
    );
    dispatch(fetchSongnames(songnamesUrl));
  }, [songnamesUrl, dispatch, radiostation]);

  useEffect(() => {
    audio.volume = Number(volumeValue) / 100;
  }, [audio, volumeValue]);

  useEffect(() => {
    getStationInfo();
  }, [getStationInfo]);

  useEffect(() => {
    const timer = setInterval(() => getStationInfo(), 500);
    return () => {
      clearInterval(timer);
    };
  }, [getStationInfo]);

  const playingRadioHandler = () => {
    if (isRadioPlayed) {
      audio.pause();
      setIsRadioPlayed(false);
    } else {
      audio.src = src;
      audio.play();
      setIsRadioPlayed(true);
    }
  };

  const onChangeVolume = (e: string) => {
    audio.volume = Number(e) / 100;
    dispatch(setVolumeValue(e));
  };

  const onClickHandler = (obj: TRadiostationInfo) => {
    if (obj.stationName !== radiostation) {
      audio.pause();
      setIsRadioPlayed(false);

      dispatch(setStation(obj));
    }
  };

  const inputBgChanger = (val: number, max: number) => {
    return ((val - 0) * 100) / (max - 0) + '% 100%';
  };

  return (
    <div className="wrapper">
      <div className="container">
        <img className="album_cover" src={albumCover} alt="album_cover" />
        <div className="now_played">
          <button
            onClick={playingRadioHandler}
            className={
              isRadioPlayed === false
                ? 'now_played__button'
                : 'now_played__button paused'
            }
          ></button>
          <div style={{ width: '210px' }}>
            <Marquee gradient={false} pauseOnHover={true} delay={13} loop={1}>
              <p className="now_played__title">
                {songnames[0]?.split(' - ')[1]}
              </p>
            </Marquee>
            <Marquee gradient={false} pauseOnHover={true} delay={13} loop={1}>
              <p className="now_played__artist">
                {songnames[0]?.split(' - ')[0]}
              </p>
            </Marquee>
          </div>
        </div>
        <input
          style={
            popupValue
              ? {
                  opacity: '0',
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
        <div className="prev_track" style={popupValue ? { opacity: '0' } : {}}>
          <p className="prev_track__info">Предыдущий трек</p>
          <Marquee gradient={false} pauseOnHover={true} delay={3} loop={1}>
            <p className="prev_track__songname">{songnames[1]}</p>
          </Marquee>
        </div>
        <StationsPopup
          radiostations={radiostations}
          onClickHandler={onClickHandler}
        />
      </div>
    </div>
  );
};

export default RadioPlayer;
