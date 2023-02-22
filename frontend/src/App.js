import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/homePage/HomePage';
import { Error } from './pages/errorPage/ErrorPage';
import { Login } from './pages/loginPage/LoginPage';
import { Registration } from './pages/registrationPage/RegistrationPage';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Registration />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}
