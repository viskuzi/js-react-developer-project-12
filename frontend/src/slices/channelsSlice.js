import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  currentChannelId: null,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: (state, { payload }) => ({ ...state, channels: payload }),
    setCurrentChannelId: (state, { payload }) => ({ ...state, currentChannelId: payload }),
    addChannel: (state, { payload }) => {
      state.channels.push(payload);
    },
    removeChannel: (state, { payload }) => {
      const newChannels = state.channels.filter((channel) => channel.id !== payload);
      return ({ ...state, channels: newChannels });
    },
    renameChannel: (state, { payload }) => {
      state.channels.map((channel) => {
        if (channel.id === payload.id) {
          return Object.assign(channel, payload);
        }
        return channel;
      });
    },
  },
});

export const {
  setChannels,
  setMessages,
  setCurrentChannelId,
  removeChannel,
  addChannel,
  renameChannel,
  addMessage,
} = channelsSlice.actions;
export const channelsReducer = channelsSlice.reducer;
