import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

enum eStatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type TSong = {
  title: string;
  author: string;
  url: string;
};

interface IPlayer {
  defaultSongs: TSong[]
  songs: TSong[];
  currentSong: TSong;
  currentSongIndex: number | null;
  currentTime: number;
  songDuration: number;
  durationToggle: boolean;
  popupValue: boolean;
  repeatStatus: 'off' | 'all' | 'one';
  shuffleStatus: 'off' | 'on';
  status: eStatus;
}

export const fetchSongs = createAsyncThunk('player/fetchSongs', async () => {
  await axios.post<string>('https://radio.tkofficial.ru/player/audio.php');
  const { data } = await axios.get<TSong[]>(
    'https://radio.tkofficial.ru/player/audio.json'
  );
  return data;
});

const initialState: IPlayer = {
  defaultSongs: [],
  songs: [],
  currentSong: { title: 'Песня не выбрана', author: 'Не исполяется', url: '#' },
  currentSongIndex: null,
  currentTime: 0,
  songDuration: 0,
  durationToggle: true,
  popupValue: false,
  repeatStatus: 'off',
  shuffleStatus: 'off',
  status: eStatus.LOADING,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setPopupVisible(state, action: PayloadAction<boolean>) {
      state.popupValue = action.payload;
    },
    setSong(state, action: PayloadAction<TSong>) {
      state.currentSong = action.payload;
    },
    setSongIndex(state, action: PayloadAction<number>) {
      state.currentSongIndex = action.payload;
    },
    setSongDuration(state, action: PayloadAction<number>) {
      if (action.payload) {
        state.songDuration = action.payload;
      }
    },
    setCurrentTime(state, action: PayloadAction<number>) {
      state.currentTime = action.payload;
    },
    setDurationToggle(state, action: PayloadAction<boolean>) {
      state.durationToggle = action.payload;
    },
    setRepeatStatus(state, action: PayloadAction<'off' | 'all' | 'one'>) {
      state.repeatStatus = action.payload;
    },
    setShuffleStatus(state, action: PayloadAction<'off' | 'on'>) {
      state.shuffleStatus = action.payload;
    },
    setSongsArray(state, action: PayloadAction<TSong[]>) {
      state.songs = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSongs.pending, (state) => {
      state.status = eStatus.LOADING;
      state.defaultSongs = [];
      state.songs = [];
    });

    builder.addCase(fetchSongs.fulfilled, (state, action) => {
      state.status = eStatus.SUCCESS;
      state.songs = action.payload;
      state.defaultSongs = action.payload;
    });

    builder.addCase(fetchSongs.rejected, (state) => {
      state.status = eStatus.ERROR;
      state.defaultSongs = [];
      state.songs = [];
    });
  },
});

export const {
  setPopupVisible,
  setSong,
  setSongDuration,
  setCurrentTime,
  setDurationToggle,
  setSongIndex,
  setRepeatStatus,
  setShuffleStatus,
  setSongsArray,
} = playerSlice.actions;

export default playerSlice.reducer;
