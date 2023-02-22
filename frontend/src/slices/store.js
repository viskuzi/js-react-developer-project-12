import { channelsReducer } from './channelsSlice.js';
import { messagesReducer } from './messagesSlice.js';

const myStore = {
  reducer: {
    channelsReducer,
    messagesReducer,
  },
};

export default myStore;
