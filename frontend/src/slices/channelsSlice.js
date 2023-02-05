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
    setChannels: (state, { payload }) => {
      state.channels = payload;
    },
    setMessages: (state, { payload }) => {
      state.messages = [...state.messages, ...payload.messages ];
    },
    addMessage: (state, { payload }) => {
      console.log(payload)
      state.messages.push(payload);
    },
    setCurrentChannelId: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    setStateClean: (state) => {
      return state = {...initialState};
    },
    setRemove: (state, { payload }) => {
      // const index = state.channels.findIndex((channel) => channel.id === payload);
      // if (index !== -1) {
      //   state.channels.splice(index, 1);
      // }

      state.channels = state.channels.filter((channel) => channel.id !== payload);
    },
    setAddChannel: (state, { payload }) => {
      state.channels.push(payload)
    },
    setRenameChannel: (state, { payload } ) => {
      // const index = state.channels.findIndex((channel) => channel.id === payload.id)
      // if (index > -1) {
      //   state.channels[index] = { ...state.channels[index], name: payload.text  }
      // }
      state.channels.map((channel) => {
        if (channel.id === payload.id) {
          return Object.assign(channel, payload)
        }
      });
    }
  }
});

export const { setChannels, setMessages, setCurrentChannelId, setStateClean, setRemove, setAddChannel, setRenameChannel, addMessage } = channelsSlice.actions;
export const channelsReducer = channelsSlice.reducer;