import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { TRadiostationInfo } from '../../components/RadioPlayer/RadioPlayer';

enum eStatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

type TInitialState = {
  radiostation: string;
  albumCover: string;
  songnamesUrl: string;
  songnames: string[];
  popupValue: boolean;
  src: string;
  status: eStatus;
};

export const fetchSongnames = createAsyncThunk(
  'radio/fetchSongnameStatus',
  async (arg: string) => {
    const { data } = await axios.get<string>(arg);
    return data;
  }
);

const initialState: TInitialState = {
  radiostation: 'Всё сразу',
  src: 'https://tkofficial.ru:3080/stream-192.mp3',
  albumCover: 'https://radio.tkofficial.ru/image/logo.jpg?',
  songnamesUrl: 'https://radio.tkofficial.ru/library/nowplaying_title.txt',
  songnames: [],
  popupValue: false,

  status: eStatus.LOADING,
};

const radioSlice = createSlice({
  name: 'radio',
  initialState,
  reducers: {
    setStation(state, action: PayloadAction<TRadiostationInfo>) {
      state.radiostation = action.payload.stationName;
      state.src = action.payload.stationSrc;
      state.albumCover = action.payload.albumCoverUrl;
      state.songnamesUrl = action.payload.stationInfo;
    },
    setAlbumCover(state, action: PayloadAction<string>) {
      state.albumCover = action.payload;
    },
    setPopupVisible(state, action: PayloadAction<boolean>) {
      state.popupValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSongnames.pending, (state) => {
      state.status = eStatus.LOADING;
    });

    builder.addCase(fetchSongnames.fulfilled, (state, action: PayloadAction<string>) => {
      state.status = eStatus.SUCCESS;
      state.songnames = action.payload?.split('\n', 2);
    });

    builder.addCase(fetchSongnames.rejected, (state) => {
      state.status = eStatus.ERROR;
      state.songnames = [];
    });
  },
});

export const { setStation, setAlbumCover, setPopupVisible } = radioSlice.actions;

export default radioSlice.reducer;
