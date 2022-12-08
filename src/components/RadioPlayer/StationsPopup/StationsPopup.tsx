import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setPopupVisible } from '../../../redux/slices/radioSlice';
import { IRadiostations, TRadiostationInfo } from '../RadioPlayer';
import styles from './StationPopup.module.scss';

interface IStationsPopuoProps {
  radiostations: IRadiostations;
  onClickHandler: (obj: TRadiostationInfo) => void;
}

const StationsPopup: React.FC<IStationsPopuoProps> = ({
  radiostations,
  onClickHandler,
}) => {
  const { radiostation, popupValue } = useAppSelector((state) => state.radio);
  const dispatch = useAppDispatch();

  const popupOpenHandler = (obj: TRadiostationInfo) => {
    onClickHandler(obj);
    dispatch(setPopupVisible(false));
  };

  return (
    <div>
      <div className="station" style={popupValue ? { opacity: '0' } : {}}>
        <button aria-label="Station Popup"
          className="station__svg"
          onClick={() => dispatch(setPopupVisible(true))}
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
        <p className="station__name">{radiostation}</p>
      </div>
      {popupValue && (
        <div className={styles.popup}>
          <h4 className={styles.popupHeader}>Список станций</h4>
          <ul className={styles.stationsList}>
            {Object.values(radiostations).map((obj, index) => {
              return (
                <li
                  className={styles.stationName}
                  key={index}
                  onClick={() => popupOpenHandler(obj)}
                >
                  {obj.stationName}
                </li>
              );
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

export default StationsPopup;
