import { channelsReducer } from './channelsSlice.js';
import { messagesReducer } from './messagesSlice.js';

export const myStore = {
  reducer: {
    channelsReducer,
    messagesReducer,
  },
};

