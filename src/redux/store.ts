import { configureStore } from '@reduxjs/toolkit';
import radioSlice from './slices/radioSlice';

export const store = configureStore({
  reducer: {
    radio: radioSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
