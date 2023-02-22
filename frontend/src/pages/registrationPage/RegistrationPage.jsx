import React, {
  useCallback, useState, useEffect, useRef, useContext,
} from 'react';
import { object, string } from 'yup';
import * as Yup from 'yup';
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
import routes from '../../routes.js';
import MyContext from '../../contexts/context.jsx';
import style from './RegistrationPage.module.scss';
import Nav from '../../components/nav/Nav.jsx';
import regImg from '../../assets/images/reg_image.jpg';

const Registration = () => {
  const { logIn } = useContext(MyContext);
  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const { t } = useTranslation();

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const validationSchema = object({
    username: string()
      .required(t('Required field'))
      .min(3, t('From 3 to 20 characters'))
      .max(20, t('From 3 to 20 characters')),
    password: string()
      .required(t('Required field'))
      .min(6, t('At least 6 characters')),
    passwordConfirmation: string()
      .required(t('Required field'))
      .oneOf([Yup.ref('password'), null], t('Passwords must match')),
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
  }, [logIn, navigate, t]);

  const formik = useFormik({
    initialValues: { username: '', password: '', passwordConfirmation: '' },
    onSubmit: (values) => {
      onFormSubmit(values);
    },
    validationSchema,
  });

  return (
    <div className={style.regBlock}>
      <Nav />
      <div className={style.container}>
        <div className={style.containerMid}>
          <div className={style.formBlock}>
            <div className={style.imgContainer}>
              <Image src={regImg} className={style.loginImg} />
            </div>
            <Form onSubmit={formik.handleSubmit} className={style.form}>
              <h1>{t('Registration')}</h1>
              <Stack gap={3}>
                <FloatingLabel controlId="floatingUsername" label={t('Username')}>
                  <Form.Control
                    className={style.input}
                    name="username"
                    type="text"
                    placeholder={t('Username')}
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

                <FloatingLabel controlId="floatingPasswordConfirmation" label={t('Confirm password')}>
                  <Form.Control
                    className={style.input}
                    type="password"
                    name="passwordConfirmation"
                    autoComplete="current-passwordConfirmation"
                    placeholder={t('Confirm password')}
                    required
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.passwordConfirmation}
                    isInvalid={formik.touched.passwordConfirmation
                      && formik.errors.passwordConfirmation}
                  />
                  <Form.Control.Feedback className={style.errorMessage} type="invalid" tooltip>
                    {t(formik.errors.passwordConfirmation)}
                  </Form.Control.Feedback>
                </FloatingLabel>
                {err && <div className={style.errReg}>{err}</div>}
                <Button type="submit" variant="outline-primary">{t('Register')}</Button>
              </Stack>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
