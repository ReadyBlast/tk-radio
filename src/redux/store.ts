import { configureStore } from '@reduxjs/toolkit';
import generalSlice from './slices/generalSlice';
import playerSlice from './slices/playerSlice';
import radioSlice from './slices/radioSlice';

export const store = configureStore({
  reducer: {
    radio: radioSlice,
    player: playerSlice,
    general: generalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
