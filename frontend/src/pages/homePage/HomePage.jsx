/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { routes } from '../../routes';
import { setChannels, setCurrentChannelId, setStateClean } from '../../slices/channelsSlice.js';
import { setMessages } from '../../slices/messagesSlice.js';
import { ArrowRight } from 'react-bootstrap-icons';
import style from './HomePage.module.scss';
import { useContext } from 'react';
import { MyContext } from '../../contexts/context';
import { Formik, Form, Field } from 'formik';
import _ from 'lodash';
import Add from '../../modals/addChannel/AddChannel';
import { MyDrop } from '../../components/myDrop/MyDrop';
import { Button } from 'react-bootstrap';
// import { useCallback } from 'react';
// import { emitNewChannel, emitNewMessage, emitRemoveChannel, emitRenameChannel } from '../../services/socket';
import { Toaster } from 'react-hot-toast';
import { Nav } from '../../components/nav/Nav';
import { useTranslation } from 'react-i18next'; 
import filter from 'leo-profanity';
// import Scroll from 'react-scroll';
import { animateScroll } from 'react-scroll';

export const Home = () => {
  // var scroll = Scroll.animateScroll;
  const { t } = useTranslation();
  // const [username, setUsername] = useState('')
  const [ shownAdd, setShownAdd ] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stateChannels = useSelector(state => state.channelsReducer)
  const stateMessages = useSelector(state => state.messagesReducer)
  const { channels, currentChannelId } = stateChannels;
  const { messages } = stateMessages;
  const { logOut, loggedIn, userData, socket } = useContext(MyContext);
  const messagesNumber = messages.filter((message) => message.channelId === currentChannelId).length;
  console.log('messagesNumber', messagesNumber)

  const getAuthHeader = () => {
    if (userData.username && userData.token) {
      return { Authorization: `Bearer ${userData.token}` };
    }
    return {};
  };

  const onExitButton = () => {
    localStorage.removeItem('user');
    // dispatch(setStateClean());   спросить про setstateclean, блокировка кнопок
    logOut();
    navigate('/login');
  };

  const makeChannelActive = (id) => {
    dispatch(setCurrentChannelId(id));
  };

  const generateChannelsList = (channelsList) => {
    return <ul>{channelsList.map((channel) => {
      const isChannelActive = channel.id === currentChannelId;
      return <li className={isChannelActive ? style.channelActive : style.channelNotActive} key={`${channel.id}`}>
        <button onClick={() => makeChannelActive(channel.id)} className={isChannelActive ? style.channelActiveBtn : style.channelBtn }># {channel.name}</button>
        <MyDrop isActive={isChannelActive} isRemovable={channel.removable} id={channel.id} />
      </li>
      })}
    </ul>
  };
  
  useEffect(() => {
    animateScroll.scrollToBottom({ containerId: 'messageBlock', delay: 0, duration: 0 });
  
    if (!loggedIn) {
      // dispatch(setStateClean());
      navigate('/login');
    } else {
    const fetchData = async () => {
      const { data } = await axios.get(routes.dataPath(), { headers: getAuthHeader() });
      dispatch(setChannels(data.channels));
      dispatch(setMessages(data.messages));
    }
    // const username = JSON.parse(localStorage.getItem('user')).username;
    // setUsername(username);
    fetchData();
    }
  }, [dispatch, messagesNumber]);

  useEffect(() => {
    if (!channels.some((channel) => channel.id === currentChannelId)) {
      dispatch(setCurrentChannelId(1));
    }
  }, [channels.length]);

  return (
    <div className={style.homeBlock}>
      <Nav button={<Button variant="primary" onClick={onExitButton}>{t('Logout')}</Button>}/>
      <div className={style.container}>
        <div className={style.channelsBlock}>
          <div className={style.channelsAdd}>
            <span>{t('Channels')}</span>
            <button className={style.addChannelBtn} onClick={() => setShownAdd(true)}>+</button>
            <Add isShown={shownAdd} setShown={setShownAdd} />
          </div>
          {generateChannelsList(channels)}
        </div>
        <div id='messageBlock' className={style.messageBlock}>
          <div className={style.info}>
            {channels.filter((channel) => channel.id === currentChannelId).map((channel) => 
            <div key={channel.id}><span style={{whiteSpace: "nowrap"}}><b># {channel.name}</b></span></div>)}
            <div>{t('messagesCount',{ count: messagesNumber })}</div>
          </div>
          <div className={style.messageBox}>
           <ul>{messages.filter((message) => message.channelId === currentChannelId).map((mess) => {
            return <li key={mess.id}>{mess.author}: {mess.message}</li>
           })}</ul> 
          </div>
          <Formik
            initialValues={{ message: ''}}
            onSubmit={(values, { resetForm }) => {
              const cleanMessage = filter.clean(values.message);
              socket.emit('newMessage', { message: cleanMessage, channelId: currentChannelId, author: userData.username });
              resetForm();
            }}
          >
            <Form  className={style.formBlock}>
              <div className={style.form}>
                <Field className={style.formInput}
                  name="message"
                  placeholder={t('Enter your message...')}
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
        <Toaster />
      </div>
    </div>
  );
};


  // const onChannelCreated = useCallback((payload) => {
  //   socket.emit('newChannel', payload, (response) => {
  //     if (response.status === 'ok') {
  //       toast.success('Channel created!');
  //       toast2("New Channel!")
  //     }
  //   });
  // }, []);

  // const onMessageCreated = useCallback((payload, id, username) => {
  //   emitNewMessage(payload, id, username);
  // }, []);

  // const onChannelRename = useCallback((id, text) => {
  //   emitRenameChannel(id, text);
  // }, []);

  // const onChannelRemove = useCallback((id) => {
  //   emitRemoveChannel(id);
  // }, []);
 