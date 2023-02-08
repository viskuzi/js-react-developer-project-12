import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  currentChannelId: null,
  messages: [],
  users: [],
}

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setUsers: (state, { payload }) => {
      state.users = payload;
    },
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
    addMessage: (state, { payload }) => {
      state.messages.push(payload);
    },
    AddChannel: (state, { payload }) => {
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
  }
});

export const { 
  setChannels,
  setMessages,
  setCurrentChannelId,
  setStateClean,
  removeChannel,
  AddChannel,
  renameChannel,
  addMessage,
  setUsers
 } = channelsSlice.actions;
export const channelsReducer = channelsSlice.reducer;