import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { routes } from '../../routes';
import { setChannels, setCurrentChannelId, setMessages, setStateClean } from '../../slices/channelsSlice.js';
import { ArrowRight } from 'react-bootstrap-icons';
import style from './HomePage.module.scss';
import { useContext } from 'react';
import { MyContext } from '../../contexts/context';
import { Formik, Form, Field } from 'formik';
import _ from 'lodash';
import Add from '../../modals/addChannel/AddChannel';
import { MyDrop } from '../../components/myDrop/MyDrop';
import { MyDropActive } from '../../components/myDropActive/MyDropActive'

export const Home = () => {
  // const [ isActive, setActive ] = useState(false);
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

  const onExitButton = () => {
    dispatch(setStateClean())
    logOut();
    navigate('/login');
  };

  const changeChannel = (id) => {
    dispatch(setCurrentChannelId(id));
  };
  
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(routes.dataPath(), { headers: getAuthHeader() });
      dispatch(setChannels(data.channels));
      dispatch(setMessages(data));
      dispatch(setCurrentChannelId(data.currentChannelId));
    }

    fetchData();
  }, [dispatch]);

  const userId = JSON.parse(localStorage.getItem('userId'));
  if (!userId) {
    dispatch(setStateClean());
    navigate('/login');
  }

  return (
    <div className={style.homeBlock}>
      <nav className={style.nav}>
        <div className={style.navContainer}>
          <a href='/'>Hexlet Chat</a>
          <button className={style.navBtn} onClick={onExitButton}>Выйти</button>
        </div>
      </nav>
      <div className={style.container}>
        <div className={style.channelsBlock}>
          <div className={style.channelsAdd}>
            <span>Каналы</span>
            <button className={style.addChannelBtn} onClick={() => setShownAdd(true)}>+</button>
            <Add isShown={shownAdd} setShown={setShownAdd} />
          </div>
          <ul>{channels.map((channel) => {
            
              return (
                <li className={channel.id === currentChannelId ? style.channelActive : style.channelNotActive}  key={`${channel.id}${channel.name}`}>
                  <button onClick={() => changeChannel(channel.id)} className={channel.id === currentChannelId ? style.channelActiveBtn :style.channelBtn }>#{channel.name}</button>
                  <MyDrop isActive={channel.id === currentChannelId} isRemovable={channel.removable} id={channel.id} />
                </li>
              )
            })}
            </ul>
        </div>
        <div className={style.messageBlock}>
          <div className={style.info}>
            {channels.filter((channel) => channel.id === currentChannelId)
              .map((channel) => <div key={channel.id}><span><b># {channel.name}</b></span></div>)}
            <div>{messages.length} сообщений</div>
          </div>
          <div className={style.messageBox}></div>
          <Formik
            initialValues={{ message: ''}}
            onSubmit={(values, { resetForm }) => {
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
 