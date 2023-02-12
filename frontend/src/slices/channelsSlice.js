import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  currentChannelId: null,
}

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: (state, { payload }) => {
      state.channels = payload;
    },
    setCurrentChannelId: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    setStateClean: (state) => {
      return state = {...initialState};
    },
    addChannel: (state, { payload }) => {
      state.channels.push(payload)
    },
    removeChannel: (state, { payload }) => {
      state.channels = state.channels.filter((channel) => channel.id !== payload);
    },
    renameChannel: (state, { payload } ) => {
      state.channels.map((channel) => {
        if (channel.id === payload.id) {
          return Object.assign(channel, payload)
        }
      });
    }
  },
});

export const { 
  setChannels,
  setMessages,
  setCurrentChannelId,
  setStateClean,
  removeChannel,
  addChannel,
  renameChannel,
  addMessage,
} = channelsSlice.actions;
export const channelsReducer = channelsSlice.reducer;