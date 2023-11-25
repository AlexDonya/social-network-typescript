import { FC } from 'react';
import withAuthRedirect from '../hoc/withAuthRedirect';
import Login from './Login';

const LoginContainer: FC = () => {
  const LoginWithRedirect = withAuthRedirect(Login);

  return (
    <LoginWithRedirect />
  )
}

export default LoginContainer;