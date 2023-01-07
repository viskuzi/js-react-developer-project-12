import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  currentChannelId: null,
  messages: [],
}

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: (state, { payload }) => {
      state.channels = payload.channels;
    },
    setMessages: (state, { payload }) => {
      state.messages = payload.messages;
    },
    setCurrentChannelId: (state, { payload }) => {
      state.currentChannelId = payload.currentChannelId;
    }
  }
});

export const { setChannels, setMessages, setCurrentChannelId } = channelsSlice.actions;
export const channelsReducer = channelsSlice.reducer;