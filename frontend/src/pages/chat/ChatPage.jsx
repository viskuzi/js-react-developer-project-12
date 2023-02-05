/* eslint-disable functional/no-let */
import style from './ChatPage.module.scss';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';





export const ChatPage = () => {
  return (
    <div >
      <Chat />
    </div>
  );
};

const Chat = () => {
  const [wsChannel, setWsChannel] = useState();

  useEffect(() => {
    const createChannel = () => {
      let ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
      ws.addEventListener('close', () => {
        console.log('Close ')
        setTimeout(createChannel, 3000)
      })
      setWsChannel(ws);
    }
    createChannel();
  },[])

  
  return (
    <div>
      <Messages wsChannel={wsChannel} />
      <AddMessageForm wsChannel={wsChannel} />
    </div>
  );
}

const Messages = ({wsChannel}) => {
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    wsChannel && wsChannel.addEventListener('message', (e) => {
      const newMessages = JSON.parse(e.data);
      setMessages((prevMessages) => [...prevMessages, ...newMessages])
    })
  },[wsChannel])

  return (
    <div style={{height: '400px', overflowY: 'auto'}}>
      {messages.map((message, i) => <Message message={message} key={i}/>)}
      {messages.map((message, i) => <Message message={message} key={i}/>)}
      {messages.map((message, i) => <Message message={message} key={i}/>)}
    </div>
  )
}

const Message = ({message}) => {

  return (
    <div>
      <img src={message.url}/><b> {message.author}</b>
      <br/>
      {message.text}
      <hr />
    </div>
  )
}

const AddMessageForm = ({wsChannel}) => {
  const [message, setMessage] = useState('');
  const [readyStatus, setReadyStatus] = useState('')

  const sendMessage = () => {
    if (!message) {
      return;
    }
    wsChannel && wsChannel.send({message});
    setMessage('');
  };

  useEffect(() => {
    wsChannel && wsChannel.addEventListener('open', () => {
      setReadyStatus('ready')
    })
  });

  return (
    <div>
      <div><textarea onChange={(e) => setMessage(e.currentTarget.value)}></textarea></div>
      <div><button disabled={readyStatus === null && readyStatus !== 'ready'} onClick={sendMessage}>Send</button></div>
    </div>
  )
}