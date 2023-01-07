import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { routes } from '../routes.js';
import { setChannels, setMessages, setCurrentChannelId } from '../slices/channelsSlice.js';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';

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
    <main>
      <nav>
        <div className='nav'>
          <a style={{fontSize: "18px"}}>Hexlet Chat</a>
          <Button className='but' variant="primary">Выйти</Button>{' '}
        </div>
      </nav>
      <div className='container'>
        <div className='channels'>
          <div className='chanels-add'><span>Каналы</span><Button>+</Button></div>
          {channels.map((channel) => <div style={{marginTop: "7px"}} key={channel.id}>#{channel.name}</div>)}
        </div>
        <div className='message-container'>
          <div className='info'>
            {channels.filter((channel) => channel.id === currentChannelId)
              .map((item) => <div key={item.id} className='info-channel'># {item.name}</div>)}
            <div>{messages.length} сообщений</div>
          </div>
          <div className='message-box'></div>
            <Form className='form'>
              <Form.Control placeholder="Введите сообщение..." onChange={formik.handleChange} name="message" autoComplete="message" required id="message" />
              <Button className='form-button but'>send</Button>
            </Form>
        </div>
      </div>
    </main>
  );
};
 