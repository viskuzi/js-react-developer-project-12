import React, {
  useCallback, useRef, useEffect, useContext, useState,
} from 'react';
import { object, string } from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Nav from '../../components/nav/Nav.jsx';
import loginImg from '../../assets/images/login_image.jpg';
import MyContext from '../../contexts/context.jsx';
import routes from '../../routes.js';
import style from './LoginPage.module.scss';

const Login = () => {
  const { logIn } = useContext(MyContext);
  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const { t } = useTranslation();

  const validationSchema = object({
    username: string().required(t('Required field')),
    password: string().required(t('Required field')),
  });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

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
  }, [logIn, navigate, t]);

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    onSubmit: (values) => {
      onFormSubmit(values);
    },
    validationSchema,
  });

  return (
    <div className={style.loginBlock}>
      <Nav />
      <div className={style.container}>
        <div className={style.containerMid}>
          <div className={style.formBlock}>
            <div className={style.imgContainer}>
              <Image src={loginImg} className={style.loginImg} />
            </div>
            <Form onSubmit={formik.handleSubmit} className={style.form}>
              <h1>{t('Enter')}</h1>
              <Stack gap={3}>
                <FloatingLabel controlId="floatingUsername" label={t('Your nickname')}>
                  <Form.Control
                    className={style.input}
                    name="username"
                    type="text"
                    placeholder={t('Your nickname')}
                    required
                    autoComplete="current-username"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    isInvalid={formik.touched.username && formik.errors.username}
                    ref={inputRef}
                  />
                  <Form.Control.Feedback className={style.errorMessage} type="invalid" tooltip>
                    {t(formik.errors.username)}
                  </Form.Control.Feedback>
                </FloatingLabel>

                <FloatingLabel controlId="floatingPassword" label={t('Password')}>
                  <Form.Control
                    className={style.input}
                    name="password"
                    autoComplete="current-password"
                    placeholder={t('Password')}
                    type="password"
                    required
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    isInvalid={formik.touched.password && formik.errors.password}
                  />
                  <Form.Control.Feedback className={style.errorMessage} type="invalid" tooltip>
                    {t(formik.errors.password)}
                  </Form.Control.Feedback>
                </FloatingLabel>
                {err && <div className={style.errLog}>{err}</div>}
                <Button type="submit" variant="outline-primary">{t('Enter')}</Button>
              </Stack>
            </Form>
          </div>
          <div className={style.footer}>
            <span style={{ marginRight: '3px' }}>{t('Don\'t have an account?')}</span>
            <a href="/signup" style={{ color: '#0d6efd' }}>{t('Registration')}</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
