import { FC } from 'react';
import style from './Login.module.css'
import { Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { authLogin } from '../../redux/authSlice';
import { AppDispatch } from '../../redux/store';

const LoginForm: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        rememberMe: false,
      }}
      onSubmit={(values, actions) => {
        dispatch(authLogin(values));
        actions.setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form >
          <div>
            <Field type='text' id='email' name='email' placeholder='Login' />
          </div>
          <div>
            <Field type='password' id='password' name='password' placeholder='Password' />
          </div>
          <div>
            <Field type='checkbox' id='rememberMe' name='rememberMe' />
            <label htmlFor='rememberMe'>Remember me</label>
          </div>
          <div>
            <button type='submit' typeof='submit' disabled={isSubmitting}>
              Log In
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const Login: FC = () => {
  return (
    <div className={style.loginContainer}>
      <h1>LOGIN</h1>
      {<LoginForm />}
    </div>
  );
};

export default Login;