import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/homePage/HomePage';
import { Error } from './pages/errorPage/ErrorPage';
import { Login } from './pages/loginPage/LoginPage';
import { MyContext } from './contexts/context.jsx';
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
        </Routes>
      </AuthProvider>   
    </div>
  );
}

export default App;
