import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { object, string } from 'yup';
import axios from 'axios';
import { routes } from '../routes.js'

export const Login = () => {
  const validationSchema = object({
    email: string().required(),
    password: string().required(),
  });
  
  const onFormSubmit = async (data) => {
    try {
      const response = await axios.post(routes.loginPath(), data);
      console.log('response.data', response.data)
      // const userId = { token: response.data.token };
      // if (userId) {
      //   setErr(false);
      //   window.localStorage.setItem('userId', JSON.stringify(userId));
      //   stateContext.logIn();
      //   navigate(location.state.from.pathname || '/');
      // }
    } catch (error) {
      console.log("errorrrr", error)
      // error && setErr(true);
    }
  };
  
  return (
    <div>
      <h1>Войти</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={values => {
          const errors = {};
          if (!values.password) {
            errors.password = 'Обязательное поле';
          } 
          if (!values.email) {
            errors.email = 'Обязательное поле';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
           && values.email !== 'admin') {
            errors.email = 'Invalid email address';
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
          <Form className='form'>
            <Field className="form-item" name="email" placeholder="email" />
            <ErrorMessage name="email" component="div" />
            <Field className="form-item" type="password" name="password" placeholder="password" />
            <ErrorMessage name="password" component="div" />
            <button className="but" type="submit" disabled={isSubmitting}>
              Войти
            </button>
          </Form>
        )}
     </Formik>
   </div>
  );
};