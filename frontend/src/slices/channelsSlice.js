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
      state.channels.push(...payload);
    },
    setMessages: (state, { payload }) => {
      state.messages = [...state.messages, ...payload.messages ];
    },
    setCurrentChannelId: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    setStateClean: (state) => {
      return state = {...initialState};
    }
  }
});

export const { setChannels, setMessages, setCurrentChannelId, setStateClean } = channelsSlice.actions;
export const channelsReducer = channelsSlice.reducer;