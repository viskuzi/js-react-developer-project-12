import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/homePage/HomePage';
import { Error } from './pages/errorPage/ErrorPage';
import { Login } from './pages/loginPage/LoginPage';
import { MyContext } from './contexts/context.jsx';
import { useCallback, useState } from 'react';
import { ChatPage } from './pages/chat/ChatPage';
import { subscribe, unsubscribe } from './services/socket';
import { useDispatch } from 'react-redux';


const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const dispatch = useDispatch();

  const logIn = useCallback(() => {
    setLoggedIn(true);
    console.log('loggedIn!!!!!!!')
    subscribe(dispatch);
  }, [dispatch]);

  const logOut = useCallback(() => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
    unsubscribe();
  }, []);

  return (
    <MyContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </MyContext.Provider>
  );
};

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </AuthProvider>   
    </div>
  );
}

export default App;
