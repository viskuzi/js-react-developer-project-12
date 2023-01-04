import React, { useEffect } from 'react';
// import { routes } from '../routes.js';
// import axios from 'axios';
import { useState } from 'react';
import { useContext } from 'react';
import { MyAuthContext } from '../contexts/index.jsx';
import { useNavigate } from 'react-router-dom';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }
  return {};
};


export const Home = () => {
  const navigate = useNavigate();
  const StateContext = useContext(MyAuthContext);
  // const [resp, setResp] = useState('')

  // const IsLoggedIn = ({ children }) => {
  //   return (
  //     StateContext.loggedIn && 
  //   )
  // }

  useEffect(() => {
    // const fetchData = async () => {
    //   const response = await axios.get(routes.usersPath(), { headers: getAuthHeader() });
    //   setResp(response.data);
    // };
    const fetchData = async () => {
      const userId = JSON.parse(localStorage.getItem('userId'));
      console.log('StateContext', StateContext)
      userId ? navigate('/') : navigate('/login')
    }
    fetchData();
  }, [StateContext, navigate]);
  
  return (
    <div>
      <h1>Home</h1>
   </div>
  );
};
 