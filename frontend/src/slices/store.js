import { configureStore } from '@reduxjs/toolkit';
import { channelsReducer } from './channelsSlice.js';

export const myStore = configureStore({
  reducer: {
    channelsReducer,
  },
});

