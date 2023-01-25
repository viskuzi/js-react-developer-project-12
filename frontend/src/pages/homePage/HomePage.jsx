import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { routes } from '../../routes';
import { setChannels, setMessages, setCurrentChannelId } from '../../slices/channelsSlice.js';
import { useFormik } from 'formik';
import { Form } from 'react-bootstrap';
import { ArrowRight } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import style from './HomePage.module.scss';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }
  return {};
};


export const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector(state => state.channelsReducer)
  const { channels, messages, currentChannelId } = state;

  const formik = useFormik({
    initialValues: {
      message: '',
    }
  });
  
  const onExitButton = () => {
    navigate('/login')
  }
  useEffect(() => {
    const fetchData = async () => {
    const userId = JSON.parse(localStorage.getItem('userId'));
    userId ? navigate('/') : navigate('/login');
    const resp = await axios.get(routes.usersPath(), { headers: getAuthHeader() });
    dispatch(setChannels(resp.data));
    dispatch(setMessages(resp.data));
    dispatch(setCurrentChannelId(resp.data));
    }
    fetchData();
  }, [dispatch, navigate]);
  
  return (
    <div className={style.homeBlock}>
      <nav className={style.nav}>
        <div className={style.navContainer}>
          <a>Hexlet Chat</a>
          <Button className={style.navBtn}onClick={onExitButton} variant="primary">Выйти</Button>
        </div>
      </nav>
      <div className={style.container}>
        <div className={style.channelsBlock}>
          <div className={style.channelsAdd}>
            <span>Каналы</span>
            <Button>+</Button>
          </div>
          <ul>{channels.map((channel) => {
            if (channel.id === currentChannelId) {
              return <li key={channel.id}><button className={style.channelBtn}>#{channel.name}</button></li>
            }
            return <li key={channel.id}><button className={style.channelActiveBtn}>#{channel.name}</button></li>
          })}</ul>
        </div>
        <div className={style.messageBlock}>
          <div className={style.info}>
            {channels.filter((channel) => channel.id === currentChannelId)
              .map((channel) => <div key={channel.id}><span><b># {channel.name}</b></span></div>)}
            <div>{messages.length} сообщений</div>
          </div>
          <div className={style.messageBox}></div>
          <Form className={style.formBlock}>
              <div className={style.form}>
                <Form.Control className={style.formInput} placeholder="Введите сообщение..." onChange={formik.handleChange} name="message" autoComplete="message" required id="message" />
                <Button className={style.formBtn}><ArrowRight /></Button>
              </div>
          </Form>
      </div>
      </div>
    </div>
  );
};
 