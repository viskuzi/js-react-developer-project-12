/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { routes } from '../../routes';
import { setChannels, setCurrentChannelId, setMessages, setStateClean, addMessage, setUsers, AddChannel, renameChannel, removeChannel } from '../../slices/channelsSlice.js';
import { ArrowRight } from 'react-bootstrap-icons';
import style from './HomePage.module.scss';
import { useContext } from 'react';
import { MyContext } from '../../contexts/context';
import { Formik, Form, Field } from 'formik';
import _ from 'lodash';
import Add from '../../modals/addChannel/AddChannel';
import { MyDrop } from '../../components/myDrop/MyDrop';
import { io } from "socket.io-client";
import { Button } from 'react-bootstrap';

const socket = io();

export const Home = () => {
  const [ shownAdd, setShownAdd ] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector(state => state.channelsReducer)
  const { channels, messages, currentChannelId } = state;
  const { logOut } = useContext(MyContext);

  const getAuthHeader = () => {
    const userId = JSON.parse(localStorage.getItem('userId'));
    if (userId && userId.token) {
      return { Authorization: `Bearer ${userId.token}` };
    }
    return {};
  };

  const sendMessage = (values) => {
    socket.emit('newMessage', { ...values, channelId: currentChannelId, author: 'admin' })
  };

  const onExitButton = () => {
    dispatch(setStateClean());
    logOut();
    navigate('/login');
  };

  const makeChannelActive = (id) => {
    dispatch(setCurrentChannelId(id));
    
  };

  const generateChannelsList = (channelsList) => {
    console.log('cha', channelsList);
    return <ul>{channelsList.map((channel) => {
      const isChannelActive = channel.id === currentChannelId;
      return <li className={isChannelActive ? style.channelActive : style.channelNotActive} key={`${channel.id}`}>
        <button onClick={() => makeChannelActive(channel.id)} className={isChannelActive ? style.channelActiveBtn : style.channelBtn }>#{channel.name}</button>
        <MyDrop isActive={isChannelActive} isRemovable={channel.removable} id={channel.id} socket={socket}  />
      </li>
      })}
    </ul>
  };
  
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(routes.dataPath(), { headers: getAuthHeader() });
      dispatch(setChannels(data.channels));
      dispatch(setMessages(data));
      dispatch(setCurrentChannelId(data.currentChannelId));
      dispatch(setUsers(data.users));
    }
    fetchData();
  }, [dispatch]);

  useEffect(() => {
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
  }, [])

  const userId = JSON.parse(localStorage.getItem('userId'));
  if (!userId) {
    dispatch(setStateClean());
    navigate('/login');
  };
  
  console.log('current', currentChannelId)
  if (!channels.some((channel) => channel.id === currentChannelId)) {
    dispatch(setCurrentChannelId(1));
  }

  return (
    <div className={style.homeBlock}>
      <nav className={style.nav}>
        <div className={style.navContainer}>
          <a href='/'>Hexlet Chat</a>
          <Button variant="primary" onClick={onExitButton}>Выйти</Button>
        </div>
      </nav>
      <div className={style.container}>
        <div className={style.channelsBlock}>
          <div className={style.channelsAdd}>
            <span>Каналы</span>
            <button className={style.addChannelBtn} onClick={() => setShownAdd(true)}>+</button>
            <Add isShown={shownAdd} setShown={setShownAdd} socket={socket} />
          </div>
          {generateChannelsList(channels)}
        </div>
        <div className={style.messageBlock}>
          <div className={style.info}>
            {channels.filter((channel) => channel.id === currentChannelId).map((channel) => 
            <div key={channel.id}><span><b>#{channel.name}</b></span></div>)}
            <div>{messages.filter((message) => message.channelId === currentChannelId).length} сообщений</div>
          </div>
          <div className={style.messageBox}>
           <ul>{messages.filter((message) => message.channelId === currentChannelId).map((mess) => {
            return <li key={mess.id}>{mess.author}: {mess.message}</li>
           })}</ul> 
          </div>
          <Formik
            initialValues={{ message: ''}}
            onSubmit={(values, { resetForm }) => {
              sendMessage(values)
              resetForm();
            }}
          >
            <Form  className={style.formBlock}>
              <div className={style.form}>
                
                <Field className={style.formInput}
                  name="message"
                  placeholder="Введите сообщение..." 
                  id="message"
                  autoComplete="message"
                  autoFocus
                  required
                />
                <button type="submit" className={style.formBtn}><ArrowRight /></button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};
 