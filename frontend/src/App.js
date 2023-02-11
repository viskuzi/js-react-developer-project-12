import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/homePage/HomePage';
import { Error } from './pages/errorPage/ErrorPage';
import { Login } from './pages/loginPage/LoginPage';
import { MyContext } from './contexts/context.jsx';
import { useCallback, useState } from 'react';
import { ChatPage } from './pages/chat/ChatPage';
import { useSocket } from './hooks/useSocket';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(!!JSON.parse(localStorage.getItem('user'))); //!! makes value boolean
  const { subscribe, unsubscribe } = useSocket();
  
  const userData = JSON.parse(localStorage.getItem('user'));

  const logIn = useCallback(() => {
    setLoggedIn(true);
    subscribe()
  }, [subscribe]);

  const logOut = useCallback(() => {
    localStorage.removeItem('user');
    setLoggedIn(false);
    unsubscribe();
  }, [unsubscribe]);

  if (loggedIn) {
    subscribe();
  }
  
  return (
    <MyContext.Provider value={{ loggedIn, logIn, logOut, userData }}>
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
