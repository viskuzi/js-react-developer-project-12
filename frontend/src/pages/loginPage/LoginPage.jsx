import React, { useCallback } from 'react';
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
import loginImg from '../../assets/images/login_image.jpg';
import { Nav } from '../../components/nav/Nav.jsx';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';

export const Login = () => {
  const { logIn } = useContext(MyContext);
  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const { t } = useTranslation();
  
  const validationSchema = object({
    username: string().required(t('Required field')),
    password: string().required(t('Required field')),
  });
  
  const onFormSubmit = useCallback(async (values) => {
    try {
      setErr(false);
      const response = await axios.post(routes.loginPath(), values);
      const user = response.data;
      if (user) {
        window.localStorage.setItem('user', JSON.stringify(user));
        logIn();
        navigate('/');
      }
    } catch (error) {
      if (error.response.data.statusCode === 401) {
        setErr(t('Not correct name or password'));
      } else {
        toast(t('Connection error'));
      }
    }
  },[logIn, navigate, t]);
  
  return (
    <div className={style.loginBlock}>
      <Nav />
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
                  <h1>{t('Enter')}</h1>

                  <div className={style.inputBlock}>
                    <label htmlFor="username" className={style.inp}>
                      <Field className={style.input} name="username" id="username" placeholder="&nbsp;"  />
                      <span className={style.label}>{t('Your nickname')}</span>
                      <span className={style.focus_bg}></span>
                    </label>
                    <ErrorMessage className={style.errorMessage} name="username" component="div" />
                  </div>

                  <div className={style.inputBlock}>
                    <label htmlFor="password" className={style.inp}>
                      <Field className={style.input} type="password" name="password" id="password"  placeholder="&nbsp;" />
                      <span className={style.label}>{t('Password')}</span>
                      <span className={style.focus_bg}></span>
                    </label>
                    <ErrorMessage className={style.errorMessage} name="password" component="div" />
                  </div>

                  {err && <div onClick={() => setErr('')} className={style.errLog}>{err}</div>}
                  <button className={style.formBtn} type="submit">{t('Enter')}</button>
                </Form>
              </Formik>
          </div>
          <div className={style.footer}>
            <span style={{marginRight: "3px"}}>{t('Don\'t have an account?')}</span>
            <a href='/signup' style={{color: "#0d6efd"}}>{t('Registration')}</a>
          </div>
        </div>
      </div>
    </div>
  );
};

