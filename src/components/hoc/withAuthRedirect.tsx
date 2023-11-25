import { ComponentType, FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { selectAuthData } from '../../redux/authSlice';
import { RootState } from '../../redux/store';

interface WithAuthRedirectProps { }

interface WrappedComponentProps { }

const withAuthRedirect = (WrappedComponent: ComponentType<WrappedComponentProps>):
  ComponentType<WithAuthRedirectProps> => {
  const RedirectComponent: FC<WithAuthRedirectProps> = (props) => {
    const navigate: NavigateFunction = useNavigate();
    const isAuth = useSelector((state: RootState) => selectAuthData(state).isAuth);

    useEffect(() => {
      if (isAuth) {
        navigate('/profile');
      }
    }, [navigate, isAuth]);

    return <WrappedComponent {...props as WrappedComponentProps} />;
  }
  return RedirectComponent;
};

export default withAuthRedirect;