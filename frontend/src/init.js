import { I18nextProvider } from 'react-i18next';
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { ru } from './locales/ru/ru';
import App from './App';
import {  BrowserRouter } from 'react-router-dom';
import { myStore } from './slices/store.js';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MyContext } from './contexts/context.jsx';
import { useCallback, useState } from 'react';
// import { useSocket } from './hooks/useSocket';
import filter from 'leo-profanity';
import { io } from 'socket.io-client';
import { setCurrentChannelId, addChannel, renameChannel, removeChannel } from './slices/channelsSlice';
import { addMessage } from './slices/messagesSlice';
// import toast from 'react-hot-toast';
import React from 'react';
import { ErrorBoundary, Provider as RollbarProvider } from '@rollbar/react';

export const runApp = async () => {
  const i18n = i18next.createInstance();
  await i18n
  .use(initReactI18next)
  .init({
    lng: 'ru',
    debug: false,
    resources: {
      ru,
    }
  });

  const store = configureStore(myStore);
  window.store = store;

  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));
  
  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
    environment: 'production',
  };
  
  const socket = io();
  socket
    .on('connect_error', () => {
      console.log('socket "connect_error"');
    })
    .on('disconnect', (reason) => {
      console.log(`socket "disconnect" (${reason})`);
    })
    .on('newMessage', (data) => {
      store.dispatch(addMessage(data));
    })
    .on('newChannel', (data) => {
      store.dispatch(addChannel(data));
      store.dispatch(setCurrentChannelId(data.id))
    })
    .on('removeChannel', (data) => {
      store.dispatch(removeChannel(data.id));
    })
    .on('renameChannel', (data) => {
      store.dispatch(renameChannel(data));
    })


  const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(!!JSON.parse(localStorage.getItem('user'))); //!! makes value boolean
    // const { subscribe, unsubscribe } = useSocket();
    
    const userData = JSON.parse(localStorage.getItem('user'));
  
    const logIn = useCallback(() => {
      setLoggedIn(true);
      // subscribe()
    }, []);

    const logOut = useCallback(() => {
      localStorage.removeItem('user');
      setLoggedIn(false);
      socket.removeAllListeners();
      // unsubscribe();
    }, []);
  
    // if (loggedIn) {
    //   subscribe();
    // }
    
    return (
      <MyContext.Provider value={{ loggedIn, logIn, logOut, userData, socket }}>
        {children}
      </MyContext.Provider>
    );
  };
  
  function TestError() {
    const a = null;
    return a.hi();
  }

  return (
    <I18nextProvider i18n={i18n}>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <BrowserRouter>
            <Provider store={store}>
              <AuthProvider>
                <TestError />
                <App />
              </AuthProvider>
            </Provider>
          </BrowserRouter>
        </ErrorBoundary>
      </RollbarProvider>
    </I18nextProvider>
  )
};