import React, { useEffect } from 'react';
import { routes } from '../routes.js';
import axios from 'axios';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }
  return {};
};


export const Home = () => {
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(routes.usersPath(), { headers: getAuthHeader() });
      setResp(response.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Home</h1>
   </div>
  );
};
 