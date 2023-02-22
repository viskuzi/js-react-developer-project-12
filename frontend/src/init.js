/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable object-curly-newline */
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18next from 'i18next';
import { ErrorBoundary, Provider as RollbarProvider } from '@rollbar/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import React, { useCallback, useState } from 'react';
import filter from 'leo-profanity';
import { io } from 'socket.io-client';
import { setCurrentChannelId, addChannel, renameChannel, removeChannel } from './slices/channelsSlice';
import { addMessage } from './slices/messagesSlice';
// import toast from 'react-hot-toast';
import MyContext from './contexts/context.jsx';
import myStore from './slices/store.js';
import ru from './locales/ru/ru';
import App from './App';

const runApp = async () => {
  const i18n = i18next.createInstance();
  await i18n
    .use(initReactI18next)
    .init({
      lng: 'ru',
      debug: false,
      resources: {
        ru,
      },
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
      store.dispatch(setCurrentChannelId(data.id));
    })
    .on('removeChannel', (data) => {
      store.dispatch(removeChannel(data.id));
    })
    .on('renameChannel', (data) => {
      store.dispatch(renameChannel(data));
    });

  const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(!!JSON.parse(localStorage.getItem('user'))); //! ! makes value boolean
    const userData = JSON.parse(localStorage.getItem('user'));

    const logIn = useCallback(() => {
      setLoggedIn(true);
    }, []);

    const logOut = useCallback(() => {
      localStorage.removeItem('user');
      setLoggedIn(false);
    }, []);

    return (
      <MyContext.Provider value={{
        loggedIn, logIn, logOut, userData, socket,
      }}
      >
        {children}
      </MyContext.Provider>
    );
  };

  return (
    <I18nextProvider i18n={i18n}>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <BrowserRouter>
            <Provider store={store}>
              <AuthProvider>
                <App />
              </AuthProvider>
            </Provider>
          </BrowserRouter>
        </ErrorBoundary>
      </RollbarProvider>
    </I18nextProvider>
  );
};

export default runApp;
