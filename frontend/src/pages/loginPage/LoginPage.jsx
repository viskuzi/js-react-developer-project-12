import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { object, string } from 'yup';
import axios from 'axios';
import { routes } from '../../routes.js'
import { useContext } from 'react';
import { MyAuthContext } from '../../contexts/index.jsx';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import style from './LoginPage.module.scss';
import loginImg from '../../assets/images/login-image.jpg'

export const Login = () => {
  const stateContext = useContext(MyAuthContext);
  const navigate = useNavigate();

  const [err, setErr] = useState(false);

  const validationSchema = object({
    username: string().required(),
    password: string().required(),
  });
  
  const onFormSubmit = async (data) => {
    try {
      const response = await axios.post(routes.loginPath(), data);
      const userId = { token: response.data.token };
      if (userId) {
        setErr('');
        window.localStorage.setItem('userId', JSON.stringify(userId));
        stateContext.logIn();
        navigate('/');
      }
    } catch (error) {
      setErr(error.message);
    }
  };
  
  return (
    <div className={style.homeBlock}>
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
                validate={values => {
                  const errors = {};
                  if (!values.password) {
                    errors.password = 'Обязательное поле';
                  } 
                  if (!values.username) {
                    errors.username = 'Обязательное поле';
                  }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  onFormSubmit(values);
                  setTimeout(() => {
                    setSubmitting(false);
                  }, 400);
                }}
                validationSchema={validationSchema}
                >
                  {({ isSubmitting }) => (  
                <Form className={style.form}>
                  <h1>Войти</h1>
                  <div className={style.inputBlock}>
                    <label htmlFor="username" className={style.inp}>
                      <Field className={style.input} name="username" id="username" placeholder="&nbsp;" />
                      <span className={style.label}>Ваш ник</span>
                      <span className={style.focus_bg}></span>
                    </label>
                    {/* <ErrorMessage name="username" component="div" /> */}
                  </div>
                  <div className={style.inputBlock} style={{marginBottom: "1.5REM"}}>
                    <label htmlFor="password" className={style.inp}>
                      <Field className={style.input} type="password" name="password" id="password" placeholder="&nbsp;" />
                      <span className={style.label}>Пароль</span>
                      <span className={style.focus_bg}></span>
                      {/* <ErrorMessage name="password" component="div" /> */}
                    </label>
                  </div>
                    {err && <div onClick={() => setErr('')}style={{color: "red"}}>{err}</div>}
                  <Button className={style.formBtn} type="submit" disabled={isSubmitting}>Войти</Button>
                </Form>
                )}
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

