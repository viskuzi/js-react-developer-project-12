import { io } from 'socket.io-client';
import { setCurrentChannelId, addMessage, AddChannel, renameChannel, removeChannel } from '../slices/channelsSlice';

const socket = io();

export const subscribe = (dispatch) => {
        socket.on('newMessage', (data) => {
          dispatch(addMessage(data));
        });
        socket.on('newChannel', (data) => {
          dispatch(AddChannel(data));
          dispatch(setCurrentChannelId(data.id))
        });
        socket.on('removeChannel', (data) => {
          dispatch(removeChannel(data.id));
        });
        socket.on('renameChannel', (data) => {
          dispatch(renameChannel(data));
        });
}

export const unsubscribe = () => {
  socket.removeAllListeners();
}

export const emitNewChannel = (payload) => {
  socket.emit('newChannel', payload);
}

const emitNewMessage = (payload, channelId) => {
    socket.emit('newMessage', { ...payload, channelId, author: 'admin' })
};
const emitRemoveChannel = (id) => {
    socket.emit('removeChannel', { id })
};
const emitRenameChannel = (id, name) => {
    socket.emit('renameChannel', {id, name})
};