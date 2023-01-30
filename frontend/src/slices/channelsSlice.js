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
      state.channels = payload;
    },
    setMessages: (state, { payload }) => {
      state.messages = [...state.messages, ...payload.messages ];
    },
    setCurrentChannelId: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    setStateClean: (state) => {
      return state = {...initialState};
    },
    setRemove: (state, {payload}) => {
      return state = {...initialState};
    },
    setAddChannel: (state, { payload }) => {
      state.channels.push(payload)
    },
    setRenameChannel: (state, { payload } ) => {
      const index = state.channels.findIndex((channel) => channel.id === payload.id)
      console.log('index', index);
      if (index > -1) {
        state.channels[index] = { ...state.channels[index], name: payload.text  }
      }
    }
  }
});

export const { setChannels, setMessages, setCurrentChannelId, setStateClean, setRemove, setAddChannel, setRenameChannel } = channelsSlice.actions;
export const channelsReducer = channelsSlice.reducer;