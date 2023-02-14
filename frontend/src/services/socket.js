import { io } from 'socket.io-client';
import { setCurrentChannelId, addChannel, renameChannel, removeChannel } from '../slices/channelsSlice';
import { addMessage } from '../slices/messagesSlice';
import { toast as toast2}  from 'react-toastify';
import toast from 'react-hot-toast';

const socket = io();

export const subscribe = (dispatch) => {
  console.log('subscribing right now')
  socket
    .on('connect_error', () => {
      console.log('socket "connect_error"');
    })
    .on('disconnect', (reason) => {
      console.log(`socket "disconnect" (${reason})`);
    })
    .on('newMessage', (data) => {
      dispatch(addMessage(data));
    })
    .on('newChannel', (data) => {
      dispatch(addChannel(data));
      dispatch(setCurrentChannelId(data.id))
    })
    .on('removeChannel', (data) => {
      dispatch(removeChannel(data.id));
    })
    .on('renameChannel', (data) => {
      dispatch(renameChannel(data));
    })
};

export const unsubscribe = () => {
  socket.removeAllListeners();
};

export const emitNewChannel = (payload) => {
  socket.emit('newChannel', payload, (response) => {
    if (response.status === 'ok') {
      toast.success('Channel created!');
      setTimeout(toast2("New Channel!"), 600) 
    }
  });
};
export const emitNewMessage = (payload, channelId, username) => {
  socket.emit('newMessage', { ...payload, channelId, author: username }, (response) => {
  })
};
export const emitRemoveChannel = (id) => {
  socket.emit('removeChannel', { id }, (response) => {
    if (response.status === 'ok') {
      toast.success('Channel deleted!');
    }
  })
};
export const emitRenameChannel = (id, name) => {
  socket.emit('renameChannel', { id, name })
};