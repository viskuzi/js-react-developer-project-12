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
    <div className='main'>
      <nav className='nav'>
        <a style={{fontSize: "18px"}}>Hexlet Chat</a>
        <Button onClick={onExitButton} variant="primary">Выйти</Button>
      </nav>
      <div className='container'>
        <div className='channels'>
          <div className='chanels-add'><span><b>Каналы</b></span><Button>+</Button></div>
          {channels.map((channel) => {
            if (channel.id === currentChannelId) {
              return <div style={{marginTop: "8px", backgroundColor: "darkgrey", padding: "6px"}} key={channel.id}>#{channel.name}</div>
            }
            return <div style={{marginTop: "8px", padding: "6px"}} key={channel.id}>#{channel.name}</div>
          })}
        </div>
        <div className='message-container'>
          <div className='info'>
            {channels.filter((channel) => channel.id === currentChannelId)
              .map((channel) => <div key={channel.id} className='info-channel'># {channel.name}</div>)}
            <div>{messages.length} сообщений</div>
          </div>
          <div className='message-box'></div>
            <Form className='form'>
              <div className='form-box'>
                <Form.Control placeholder="Введите сообщение..." onChange={formik.handleChange} name="message" autoComplete="message" required id="message" />
                <Button className='form-button'><ArrowRight /></Button>
              </div>
            </Form>
        </div>
      </div>
    </div>
  );
};
 