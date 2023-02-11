import { configureStore } from '@reduxjs/toolkit';
import { channelsReducer } from './channelsSlice.js';
import { messagesReducer } from './messagesSlice.js';

export const myStore = configureStore({
  reducer: {
    channelsReducer,
    messagesReducer,
  },
});

