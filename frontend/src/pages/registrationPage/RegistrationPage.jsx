import React, { useCallback } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { object, string } from 'yup';
import * as Yup from 'yup';
import axios from 'axios';
import { routes } from '../../routes.js'
import { useContext } from 'react';
import { MyContext } from '../../contexts/context.jsx';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Image from 'react-bootstrap/Image'
import style from './RegistrationPage.module.scss';
import regImg from '../../assets/images/reg_image.jpg';
import { Nav } from '../../components/nav/Nav.jsx';


export const Registration = () => {
  const { logIn } = useContext(MyContext);
  const navigate = useNavigate();
  const [err, setErr] = useState(false);

  const validationSchema = object({
    username: string().required('обязательное поле').min(3, 'Too short - must be 3 chars minimum').max(20, 'Too long - must be 20 chars maximum'),
    password: string().required('обязательное поле').min(6, 'Too short - must be 6 chars minimum'),
    confirm: string().required('обязательное поле').oneOf([Yup.ref('password'), null], 'Passwords must match')
  });
  
  const onFormSubmit = useCallback(async (values) => {
    try {
      const response = await axios.post(routes.signupPath(), values);
      const user = response.data;
      if (user) {
        setErr('');
        window.localStorage.setItem('user', JSON.stringify(user));
        logIn();
        navigate('/');
      }
    } catch (error) {
      setErr(error.message);
    }
  },[logIn, navigate]);
  
  return (
    <div className={style.regBlock}>
      <Nav />
      <div className={style.container}>
        <div className={style.containerMid}>
          <div className={style.formBlock}>
            <div className={style.imgContainer}>
              <Image src={regImg} className={style.loginImg}/>
            </div>
            <Formik
                initialValues={{ username: '', password: '', confirm: '' }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  onFormSubmit(values);
                }}
              >
                <Form className={style.form}>
                  <h1>Регистрация</h1>

                  <div className={style.inputBlock}>
                    <label htmlFor="username" className={style.inp}>
                      <Field className={style.input} name="username" id="username" placeholder="&nbsp;"  />
                      <span className={style.label}>Ваш ник</span>
                      <span className={style.focus_bg}></span>
                    </label>
                    <ErrorMessage className={style.errorMessage} name="username" component="div" />
                  </div>

                  <div className={style.inputBlock}>
                    <label htmlFor="password" className={style.inp}>
                      <Field className={style.input} type="password" name="password" id="password"  placeholder="&nbsp;" />
                      <span className={style.label}>Пароль</span>
                      <span className={style.focus_bg}></span>
                    </label>
                    <ErrorMessage className={style.errorMessage} name="password" component="div" />
                  </div>

                  <div className={style.inputBlock}>
                    <label htmlFor="confirm" className={style.inp}>
                      <Field className={style.input} type="password" name="confirm" id="confirm"  placeholder="&nbsp;" />
                      <span className={style.label}>Подтвердите пароль</span>
                      <span className={style.focus_bg}></span>
                    </label>
                    <ErrorMessage className={style.errorMessage} name="confirm" component="div" />
                  </div>

                  {err && <div onClick={() => setErr('')} className={style.errReg} >{err}</div>}
                  <button className={style.formBtn} type="submit">Зарегистрироваться</button>
                </Form>
              </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

