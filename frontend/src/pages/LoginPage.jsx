import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { object, string } from 'yup';
import axios from 'axios';
import { routes } from '../routes.js'
import { useContext } from 'react';
import { MyAuthContext } from '../contexts/index.jsx';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

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
    <div>
      <h1>Войти</h1>
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
          <Form>
            <Field  name="username" placeholder="username" />
            <ErrorMessage name="username" component="div" />
            <Field  type="password" name="password" placeholder="password" />
            <ErrorMessage name="password" component="div" />
            {err && <div onClick={() => setErr('')}style={{color: "red"}}>{err}</div>}
            <button type="submit" disabled={isSubmitting}>
              Войти
            </button>
          </Form>
        )}
     </Formik>
   </div>
  );
};