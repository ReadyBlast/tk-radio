import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import {
  setPopupVisible,
  setRepeatStatus,
  setShuffleStatus,
  setSongIndex,
  setSongsArray,
  TSong,
} from '../../../redux/slices/playerSlice';
import styles from './PlaylistPopup.module.scss';

interface IPlaylistPopupProps {
  onClickHandler: (obj: TSong, index: number) => void;
}

const shuffle = (arr: TSong[]): TSong[] => {
  let j, temp;
  for (let i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
};

const PlaylistPopup: React.FC<IPlaylistPopupProps> = ({ onClickHandler }) => {
  const {
    songs,
    popupValue,
    currentSong,
    repeatStatus,
    shuffleStatus,
    defaultSongs,
  } = useAppSelector((state) => state.player);
  const dispatch = useAppDispatch();

  const popupOpenHandler = () => {
    dispatch(setPopupVisible(false));
  };

  const selectSongHandler = (obj: TSong, index: number) => {
    onClickHandler(obj, index);
    popupOpenHandler();
  };

  const repeatStatusChanger = () => {
    switch (repeatStatus) {
      case 'off':
        dispatch(setRepeatStatus('all'));
        break;
      case 'all':
        dispatch(setRepeatStatus('one'));
        break;
      case 'one':
        dispatch(setRepeatStatus('off'));
        break;
    }
  };

  const shuffleHandler = () => {
    if (shuffleStatus === 'off') {
      const res = defaultSongs.map((el) => el);
      dispatch(setShuffleStatus('on'));
      dispatch(setSongsArray(shuffle(res)));
      const index = res.indexOf(currentSong);
      dispatch(setSongIndex(index));
    } else if (shuffleStatus === 'on') {
      dispatch(setShuffleStatus('off'));
      dispatch(setSongsArray(defaultSongs));
      const index = defaultSongs.indexOf(currentSong);
      dispatch(setSongIndex(index));
    }
  };

  const shuffler = () => {
    shuffleHandler();
  };

  return (
    <div>
      <div className="playlist">
        <button
          className="playlist__svg"
          onClick={() => dispatch(setPopupVisible(true))}
          style={popupValue ? { opacity: '0' } : {}}
          aria-label="Playlist Button"
        >
          <svg
            width="28"
            height="20"
            viewBox="0 0 28 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.91472 4.9315C3.8588 4.9315 4.62413 4.16617 4.62413 3.2221C4.62413 2.27802 3.8588 1.5127 2.91472 1.5127C1.97065 1.5127 1.20532 2.27802 1.20532 3.2221C1.20532 4.16617 1.97065 4.9315 2.91472 4.9315Z"
              fill="white"
            />
            <path
              d="M2.91472 11.7691C3.8588 11.7691 4.62413 11.0038 4.62413 10.0597C4.62413 9.11567 3.8588 8.35034 2.91472 8.35034C1.97065 8.35034 1.20532 9.11567 1.20532 10.0597C1.20532 11.0038 1.97065 11.7691 2.91472 11.7691Z"
              fill="white"
            />
            <path
              d="M2.91472 18.6068C3.8588 18.6068 4.62413 17.8415 4.62413 16.8974C4.62413 15.9533 3.8588 15.188 2.91472 15.188C1.97065 15.188 1.20532 15.9533 1.20532 16.8974C1.20532 17.8415 1.97065 18.6068 2.91472 18.6068Z"
              fill="white"
            />
            <path
              d="M26.1711 3.07699C26.1711 2.85031 26.0811 2.63291 25.9208 2.47263C25.7605 2.31234 25.5431 2.22229 25.3164 2.22229H7.00873V3.93169H25.3164C25.5431 3.93169 25.7605 3.84164 25.9208 3.68136C26.0811 3.52107 26.1711 3.30367 26.1711 3.07699Z"
              fill="white"
            />
            <path
              d="M25.3164 9.05981H7.00873V10.7692H25.3164C25.5431 10.7692 25.7605 10.6792 25.9208 10.5189C26.0811 10.3586 26.1711 10.1412 26.1711 9.91452C26.1711 9.68783 26.0811 9.47044 25.9208 9.31015C25.7605 9.14986 25.5431 9.05981 25.3164 9.05981Z"
              fill="white"
            />
            <path
              d="M25.3164 15.8975H7.00873V17.6069H25.3164C25.5431 17.6069 25.7605 17.5168 25.9208 17.3565C26.0811 17.1962 26.1711 16.9788 26.1711 16.7522C26.1711 16.5255 26.0811 16.3081 25.9208 16.1478C25.7605 15.9875 25.5431 15.8975 25.3164 15.8975Z"
              fill="white"
            />
          </svg>
        </button>
        <button
          className={
            repeatStatus === 'off' ? 'playlist__svg-disabled' : 'playlist__svg'
          }
          onClick={() => repeatStatusChanger()}
          style={popupValue ? { opacity: '0.1' } : {}}
          aria-label="Repeat Button"
        >
          {repeatStatus !== 'one' && (
            <svg
              width="23"
              height="23"
              viewBox="0 0 23 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.15614 11.4999C2.15852 9.78505 2.84081 8.14108 4.05342 6.92847C5.26603 5.71586 6.91 5.03357 8.62489 5.03119H18.3909L17.4565 4.1058C17.3419 3.96615 17.2833 3.78886 17.2922 3.60842C17.3011 3.42797 17.3767 3.25728 17.5045 3.12953C17.6322 3.00178 17.8029 2.92612 17.9834 2.91726C18.1638 2.9084 18.3411 2.96697 18.4808 3.08158L20.637 5.23783C20.772 5.3741 20.8477 5.55815 20.8477 5.74994C20.8477 5.94174 20.772 6.12578 20.637 6.26205L18.4808 8.4183C18.3434 8.55114 18.1597 8.6254 17.9686 8.6254C17.7775 8.6254 17.5939 8.55114 17.4565 8.4183C17.3216 8.28203 17.2458 8.09799 17.2458 7.90619C17.2458 7.7144 17.3216 7.53035 17.4565 7.39408L18.3909 6.46869H8.62489C7.29052 6.46869 6.0108 6.99877 5.06726 7.94231C4.12372 8.88585 3.59364 10.1656 3.59364 11.4999C3.59364 11.6906 3.51792 11.8734 3.38313 12.0082C3.24833 12.143 3.06552 12.2187 2.87489 12.2187C2.68427 12.2187 2.50145 12.143 2.36666 12.0082C2.23187 11.8734 2.15614 11.6906 2.15614 11.4999ZM20.1249 10.7812C19.9343 10.7812 19.7515 10.8569 19.6167 10.9917C19.4819 11.1265 19.4061 11.3093 19.4061 11.4999C19.4061 12.8343 18.8761 14.114 17.9325 15.0576C16.989 16.0011 15.7093 16.5312 14.3749 16.5312H4.60888L5.54325 15.6058C5.65787 15.4662 5.71644 15.2889 5.70758 15.1084C5.69871 14.928 5.62305 14.7573 5.4953 14.6295C5.36756 14.5018 5.19686 14.4261 5.01642 14.4173C4.83597 14.4084 4.65868 14.467 4.51903 14.5816L2.36278 16.7378C2.22782 16.8741 2.1521 17.0581 2.1521 17.2499C2.1521 17.4417 2.22782 17.6258 2.36278 17.7621L4.51903 19.9183C4.65642 20.0511 4.84004 20.1254 5.03114 20.1254C5.22225 20.1254 5.40587 20.0511 5.54325 19.9183C5.67822 19.782 5.75394 19.598 5.75394 19.4062C5.75394 19.2144 5.67822 19.0304 5.54325 18.8941L4.60888 17.9687H14.3749C16.0898 17.9663 17.7338 17.284 18.9464 16.0714C20.159 14.8588 20.8413 13.2148 20.8436 11.4999C20.8436 11.3093 20.7679 11.1265 20.6331 10.9917C20.4983 10.8569 20.3155 10.7812 20.1249 10.7812Z"
                fill="white"
              />
            </svg>
          )}
          {repeatStatus === 'one' && (
            <svg
              width="23"
              height="23"
              viewBox="0 0 23 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.15614 11.4999C2.15852 9.78505 2.84081 8.14108 4.05342 6.92847C5.26603 5.71586 6.91 5.03357 8.62489 5.03119H18.3909L17.4565 4.1058C17.3419 3.96615 17.2833 3.78886 17.2922 3.60842C17.3011 3.42797 17.3767 3.25728 17.5045 3.12953C17.6322 3.00178 17.8029 2.92612 17.9834 2.91726C18.1638 2.9084 18.3411 2.96697 18.4808 3.08158L20.637 5.23783C20.772 5.3741 20.8477 5.55815 20.8477 5.74994C20.8477 5.94174 20.772 6.12578 20.637 6.26205L18.4808 8.4183C18.3434 8.55114 18.1597 8.6254 17.9686 8.6254C17.7775 8.6254 17.5939 8.55114 17.4565 8.4183C17.3216 8.28203 17.2458 8.09799 17.2458 7.90619C17.2458 7.7144 17.3216 7.53035 17.4565 7.39408L18.3909 6.46869H8.62489C7.29052 6.46869 6.0108 6.99877 5.06726 7.94231C4.12372 8.88585 3.59364 10.1656 3.59364 11.4999C3.59364 11.6906 3.51792 11.8734 3.38313 12.0082C3.24833 12.143 3.06552 12.2187 2.87489 12.2187C2.68427 12.2187 2.50145 12.143 2.36666 12.0082C2.23187 11.8734 2.15614 11.6906 2.15614 11.4999ZM20.1249 10.7812C19.9343 10.7812 19.7515 10.8569 19.6167 10.9917C19.4819 11.1265 19.4061 11.3093 19.4061 11.4999C19.4061 12.8343 18.8761 14.114 17.9325 15.0576C16.989 16.0011 15.7093 16.5312 14.3749 16.5312H4.60888L5.54325 15.6058C5.65787 15.4662 5.71644 15.2889 5.70758 15.1084C5.69871 14.928 5.62305 14.7573 5.4953 14.6295C5.36756 14.5018 5.19686 14.4261 5.01642 14.4173C4.83597 14.4084 4.65868 14.467 4.51903 14.5816L2.36278 16.7378C2.22782 16.8741 2.1521 17.0581 2.1521 17.2499C2.1521 17.4417 2.22782 17.6258 2.36278 17.7621L4.51903 19.9183C4.65642 20.0511 4.84004 20.1254 5.03114 20.1254C5.22225 20.1254 5.40587 20.0511 5.54325 19.9183C5.67822 19.782 5.75394 19.598 5.75394 19.4062C5.75394 19.2144 5.67822 19.0304 5.54325 18.8941L4.60888 17.9687H14.3749C16.0898 17.9663 17.7338 17.284 18.9464 16.0714C20.159 14.8588 20.8413 13.2148 20.8436 11.4999C20.8436 11.3093 20.7679 11.1265 20.6331 10.9917C20.4983 10.8569 20.3155 10.7812 20.1249 10.7812ZM11.8593 14.3749C12.0499 14.3749 12.2327 14.2992 12.3675 14.1644C12.5023 14.0296 12.578 13.8468 12.578 13.6562V9.34369C12.5787 9.22104 12.5477 9.10029 12.4879 8.99322C12.428 8.88615 12.3415 8.79641 12.2366 8.73275C12.1326 8.66738 12.0136 8.62975 11.8909 8.62346C11.7682 8.61716 11.646 8.64242 11.5358 8.69682L10.0983 9.41557C9.92929 9.50396 9.80112 9.65448 9.74079 9.83545C9.68047 10.0164 9.69269 10.2137 9.77489 10.3859C9.86314 10.555 10.0143 10.6827 10.1957 10.7415C10.3772 10.8004 10.5745 10.7856 10.7452 10.7003L11.1405 10.5027V13.6562C11.1405 13.8468 11.2162 14.0296 11.351 14.1644C11.4858 14.2992 11.6686 14.3749 11.8593 14.3749Z"
                fill="white"
              />
            </svg>
          )}
        </button>
        <button
          className="playlist__svg"
          style={popupValue ? { opacity: '0.1' } : {}}
          onClick={() => shuffler()}
          aria-label="Shuffle Button"
        >
          <svg
            width="24"
            height="20"
            viewBox="0 0 24 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={shuffleStatus === 'off' ? { opacity: '0.3' } : {}}
          >
            <g clipPath="url(#clip0_609_2)">
              <path
                d="M23.7992 15.1338C23.9598 15.2893 24.05 15.4994 24.05 15.7182C24.05 15.9371 23.9598 16.1472 23.7992 16.3027L21.2331 18.7636C21.0696 18.9152 20.8511 19 20.6236 19C20.3962 19 20.1777 18.9152 20.0142 18.7636C19.8536 18.6081 19.7634 18.3981 19.7634 18.1792C19.7634 17.9603 19.8536 17.7502 20.0142 17.5947L21.1262 16.5386H19.8645C18.6388 16.5365 17.4312 16.2545 16.3416 15.7161C15.2521 15.1776 14.3119 14.398 13.5988 13.4419L9.14019 7.4639C8.5869 6.72079 7.85711 6.11467 7.01114 5.69566C6.16518 5.27665 5.22736 5.05678 4.27523 5.05424H1.80533C1.57847 5.05424 1.3609 4.96782 1.20049 4.81398C1.04007 4.66014 0.949951 4.4515 0.949951 4.23394C0.949951 4.01638 1.04007 3.80773 1.20049 3.65389C1.3609 3.50005 1.57847 3.41363 1.80533 3.41363H4.27523C5.50096 3.41569 6.70856 3.69764 7.79811 4.23612C8.88766 4.77461 9.82784 5.55417 10.5409 6.51029L14.9995 12.4883C15.5528 13.2314 16.2826 13.8375 17.1286 14.2565C17.9745 14.6755 18.9124 14.8954 19.8645 14.8979H21.1262L20.0142 13.8418C19.8778 13.6824 19.8081 13.4801 19.8186 13.2741C19.8292 13.0682 19.9192 12.8734 20.0712 12.7276C20.2233 12.5818 20.4264 12.4954 20.6412 12.4853C20.8559 12.4752 21.0669 12.542 21.2331 12.6729L23.7992 15.1338ZM13.6737 7.82278C13.7655 7.88583 13.8694 7.93083 13.9794 7.95517C14.0895 7.97951 14.2034 7.98271 14.3148 7.9646C14.4261 7.94649 14.5326 7.90742 14.6281 7.84964C14.7236 7.79186 14.8062 7.71652 14.8712 7.62796L14.9995 7.4639C15.5528 6.72079 16.2826 6.11467 17.1286 5.69566C17.9745 5.27665 18.9124 5.05678 19.8645 5.05424H21.1262L20.0142 6.11039C19.8536 6.26592 19.7634 6.47596 19.7634 6.69486C19.7634 6.91376 19.8536 7.1238 20.0142 7.27933C20.1777 7.43094 20.3962 7.51569 20.6236 7.51569C20.8511 7.51569 21.0696 7.43094 21.2331 7.27933L23.7992 4.81841C23.9598 4.66288 24.05 4.45283 24.05 4.23394C24.05 4.01504 23.9598 3.80499 23.7992 3.64947L21.2331 1.18854C21.0669 1.05773 20.8559 0.990886 20.6412 1.001C20.4264 1.01112 20.2233 1.09747 20.0712 1.24327C19.9192 1.38906 19.8292 1.58388 19.8186 1.78982C19.8081 1.99576 19.8778 2.1981 20.0142 2.35748L21.1262 3.41363H19.8645C18.6388 3.41569 17.4312 3.69764 16.3416 4.23612C15.2521 4.77461 14.3119 5.55417 13.5988 6.51029L13.4812 6.67435C13.4149 6.76178 13.3673 6.8609 13.3411 6.96603C13.3149 7.07116 13.3106 7.18022 13.3285 7.28694C13.3464 7.39366 13.3861 7.49594 13.4453 7.5879C13.5046 7.67986 13.5822 7.75968 13.6737 7.82278ZM10.466 12.1294C10.3742 12.0664 10.2703 12.0214 10.1603 11.997C10.0502 11.9727 9.93627 11.9695 9.82494 11.9876C9.71361 12.0057 9.60712 12.0448 9.51162 12.1025C9.41612 12.1603 9.33349 12.2357 9.2685 12.3242L9.14019 12.4883C8.5869 13.2314 7.85711 13.8375 7.01114 14.2565C6.16518 14.6755 5.22736 14.8954 4.27523 14.8979H1.80533C1.57847 14.8979 1.3609 14.9844 1.20049 15.1382C1.04007 15.292 0.949951 15.5007 0.949951 15.7182C0.949951 15.9358 1.04007 16.1445 1.20049 16.2983C1.3609 16.4521 1.57847 16.5386 1.80533 16.5386H4.27523C5.50096 16.5365 6.70856 16.2545 7.79811 15.7161C8.88766 15.1776 9.82784 14.398 10.5409 13.4419L10.6585 13.2778C10.7248 13.1904 10.7724 13.0913 10.7986 12.9862C10.8248 12.881 10.8291 12.772 10.8112 12.6652C10.7933 12.5585 10.7536 12.4562 10.6944 12.3643C10.6351 12.2723 10.5575 12.1925 10.466 12.1294Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_609_2">
                <rect width="24" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>
      {popupValue && (
        <div className={styles.popup}>
          <h4 className={styles.popupHeader}>На очереди</h4>
          <ul className={styles.stationsList}>
            {songs.map((obj, index) => {
              if (currentSong.title !== obj.title) {
                return (
                  <li
                    className={styles.stationName}
                    key={index}
                    onClick={() => selectSongHandler(obj, index)}
                  >
                    {obj.author + ' - ' + obj.title}
                  </li>
                );
              } else if (currentSong.title === obj.title) {
                return (
                  <li
                    className={styles.stationName}
                    key={index}
                    onClick={() => selectSongHandler(obj, index)}
                  >
                    <svg
                      width="12"
                      height="16"
                      viewBox="0 0 27 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ marginRight: '5px' }}
                    >
                      <path
                        d="M25.2798 17.25L0.0989521 0.846491L0.0989505 33.6535L25.2798 17.25Z"
                        fill="white"
                      />
                    </svg>
                    {obj.author + ' - ' + obj.title}
                  </li>
                );
              } else {
                return [];
              }
            })}
          </ul>
          <svg
            onClick={() => dispatch(setPopupVisible(false))}
            className={styles.icon}
            width="29"
            height="21"
            viewBox="0 0 29 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_318_112)">
              <path
                d="M2.91472 5.9315C3.8588 5.9315 4.62413 5.16617 4.62413 4.2221C4.62413 3.27802 3.8588 2.5127 2.91472 2.5127C1.97065 2.5127 1.20532 3.27802 1.20532 4.2221C1.20532 5.16617 1.97065 5.9315 2.91472 5.9315Z"
                fill="#C4C4C4"
              />
              <path
                d="M2.91472 12.7691C3.8588 12.7691 4.62413 12.0038 4.62413 11.0597C4.62413 10.1157 3.8588 9.35034 2.91472 9.35034C1.97065 9.35034 1.20532 10.1157 1.20532 11.0597C1.20532 12.0038 1.97065 12.7691 2.91472 12.7691Z"
                fill="#C4C4C4"
              />
              <path
                d="M2.91472 19.6068C3.8588 19.6068 4.62413 18.8415 4.62413 17.8974C4.62413 16.9533 3.8588 16.188 2.91472 16.188C1.97065 16.188 1.20532 16.9533 1.20532 17.8974C1.20532 18.8415 1.97065 19.6068 2.91472 19.6068Z"
                fill="#C4C4C4"
              />
              <path
                d="M26.1711 4.07687C26.1711 3.85019 26.0811 3.63279 25.9208 3.4725C25.7605 3.31222 25.5431 3.22217 25.3164 3.22217H7.00873V4.93157H25.3164C25.5431 4.93157 25.7605 4.84152 25.9208 4.68123C26.0811 4.52095 26.1711 4.30355 26.1711 4.07687Z"
                fill="#C4C4C4"
              />
              <path
                d="M25.3164 10.0598H7.00873V11.7692H25.3164C25.5431 11.7692 25.7605 11.6792 25.9208 11.5189C26.0811 11.3586 26.1711 11.1412 26.1711 10.9145C26.1711 10.6878 26.0811 10.4704 25.9208 10.3101C25.7605 10.1499 25.5431 10.0598 25.3164 10.0598Z"
                fill="#C4C4C4"
              />
              <path
                d="M25.3164 16.8975H7.00873V18.6069H25.3164C25.5431 18.6069 25.7605 18.5168 25.9208 18.3565C26.0811 18.1962 26.1711 17.9788 26.1711 17.7522C26.1711 17.5255 26.0811 17.3081 25.9208 17.1478C25.7605 16.9875 25.5431 16.8975 25.3164 16.8975Z"
                fill="#C4C4C4"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M23.2202 4.47323C22.9266 4.76684 22.9266 5.24287 23.2202 5.53648C23.5138 5.83009 23.9899 5.83009 24.2835 5.53648L25.8783 3.94166L27.4733 5.53668C27.7669 5.83029 28.2429 5.83029 28.5366 5.53668C28.8302 5.24307 28.8302 4.76704 28.5366 4.47343L26.9415 2.87841L28.5365 1.28346C28.8301 0.989852 28.8301 0.513817 28.5365 0.220207C28.2429 -0.0734027 27.7668 -0.0734022 27.4732 0.220208L25.8783 1.81515L24.2835 0.220408C23.9899 -0.0732018 23.5139 -0.0732019 23.2203 0.220408C22.9267 0.514018 22.9267 0.990053 23.2203 1.28366L24.815 2.87841L23.2202 4.47323Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_318_112">
                <rect width="29" height="21" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      )}
    </div>
  );
};

export default PlaylistPopup;
