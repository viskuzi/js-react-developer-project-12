import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { object, string } from 'yup';
import axios from 'axios';
import { routes } from '../../routes.js'
import { useContext } from 'react';
import { MyContext } from '../../contexts/context.jsx';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Image from 'react-bootstrap/Image'
import style from './LoginPage.module.scss';
import loginImg from '../../assets/images/login-image.jpg';

export const Login = () => {
  const { logIn } = useContext(MyContext);
  const navigate = useNavigate();
  const [err, setErr] = useState(false);

  const validationSchema = object({
    username: string().required('обязательное поле'),
    password: string().required('обязательное поле'),
  });
  
  const onFormSubmit = async (data) => {
    try {
      console.log('data', data)
      const response = await axios.post(routes.loginPath(), data);
      const userId = { token: response.data.token };
      if (userId && userId.token) { //here!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        setErr('');
        window.localStorage.setItem('userId', JSON.stringify(userId));
        logIn();
        navigate('/');
      }
    } catch (error) {
      setErr(error.message);
    }
  };
  
  return (
    <div className={style.loginBlock}>
      <nav className={style.nav}>
        <div className={style.navContainer}>
          <a>Hexlet Chat</a>
        </div>
      </nav>
      <div className={style.container}>
        <div className={style.containerMid}>
          <div className={style.formBlock}>
            <div className={style.imgContainer}>
              <Image src={loginImg} className={style.loginImg}/>
            </div>
            <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  onFormSubmit(values);
                }}
              >
                <Form className={style.form}>
                  <h1>Войти</h1>

                  <div className={style.inputBlock}>
                    <label htmlFor="username" className={style.inp}>
                      <ErrorMessage style={{color: "red"}} name="username" component="div" />
                      <Field className={style.input} name="username" id="username" placeholder="&nbsp;"  />
                      <span className={style.label}>Ваш ник</span>
                      <span className={style.focus_bg}></span>
                    </label>
                  </div>

                  <div className={style.inputBlock}>
                    <label htmlFor="password" className={style.inp}>
                      <ErrorMessage style={{color: "red"}} name="password" component="div" />
                      <Field className={style.input} type="password" name="password" id="password"  placeholder="&nbsp;" />
                      <span className={style.label}>Пароль</span>
                      <span className={style.focus_bg}></span>
                    </label>
                  </div>

                  {err && <div onClick={() => setErr('')} style={{color: "red"}}>{err}</div>}
                  <button className={style.formBtn} type="submit">Войти</button>
                </Form>
              </Formik>
          </div>
          <div className={style.footer}>
            <span style={{marginRight: "3px"}}>Нет аккаунта?</span>
            <a href='/errorPage' style={{color: "#0d6efd"}}>Регистрация</a>
          </div>
        </div>
      </div>
    </div>
  );
};

