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
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';

export const Registration = () => {
  const { logIn } = useContext(MyContext);
  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const { t } = useTranslation();

  const validationSchema = object({
    username: string().required(t('Required field')).min(3, t('From 3 to 20 characters')).max(20, t('From 3 to 20 characters')),
    password: string().required(t('Required field')).min(6, t('At least 6 characters')),
    confirm: string().required(t('Required field')).oneOf([Yup.ref('password'), null], t('Passwords must match'))
  });
  
  const onFormSubmit = useCallback(async (values) => {
    try {
      setErr(false);
      const response = await axios.post(routes.signupPath(), values);
      const user = response.data;
      if (user) {
        
        window.localStorage.setItem('user', JSON.stringify(user));
        logIn();
        navigate('/');
      }
    } catch (error) {
      if (error.response.data.statusCode === 409) {
        setErr(t('This user already exists'));
      } else {
        toast(t('Connection error'));
      }
    }
  },[logIn, navigate, t]);
  
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
                  <h1>{t('Registration')}</h1>

                  <div className={style.inputBlock}>
                    <label htmlFor="username" className={style.inp}>
                      <Field className={style.input} name="username" id="username" placeholder="&nbsp;"  />
                      <span className={style.label}>{t('Username')}</span>
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

                  <div className={style.inputBlock}>
                    <label htmlFor="confirm" className={style.inp}>
                      <Field className={style.input} type="password" name="confirm" id="confirm"  placeholder="&nbsp;" />
                      <span className={style.label}>{t('Confirm password')}</span>
                      <span className={style.focus_bg}></span>
                    </label>
                    <ErrorMessage className={style.errorMessage} name="confirm" component="div" />
                  </div>

                  {err && <div onClick={() => setErr('')} className={style.errReg}>{err}</div>}
                  <button className={style.formBtn} type="submit">{t('Register')}</button>
                </Form>
              </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

