import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Homepage';
import { Error } from './pages/Errorpage';
import { Login } from './pages/LoginPage';
import { MyAuthContext } from './contexts/index.jsx';
import { useState } from 'react';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const logIn = () => {
    setLoggedIn(true);
    console.log('loggedIn!!!!!!!')
  };
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <MyAuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </MyAuthContext.Provider>
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
        </Routes>
      </AuthProvider>   
    </div>
  );
}

export default App;
