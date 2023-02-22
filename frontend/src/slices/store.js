import { channelsReducer } from './channelsSlice.js';
import { messagesReducer } from './messagesSlice.js';

const MyStore = {
  reducer: {
    channelsReducer,
    messagesReducer,
  },
};

export default MyStore;
