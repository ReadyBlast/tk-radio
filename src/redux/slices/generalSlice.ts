import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IGeneralSlice {
  volumeValue: string;
  playerStatus: 'radio' | 'playlist'
}

const initialState: IGeneralSlice = {
  volumeValue: '20',
  playerStatus: 'radio'
};

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setVolumeValue(state, action: PayloadAction<string>) {
      state.volumeValue = action.payload;
    },
    setPlayerStatus(state, action: PayloadAction<'radio' | 'playlist'>) {
      state.playerStatus = action.payload;
    },
  },
});

export const { setVolumeValue, setPlayerStatus } = generalSlice.actions;

export default generalSlice.reducer