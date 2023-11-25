import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authMe, authLogout, selectAuthData, isAuthUser } from '../../redux/authSlice';
import Header from './Header';
import { AppDispatch, RootState } from '../../redux/store';

const HeaderContainer: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const data = useSelector((state: RootState) => selectAuthData(state));
  const { isAuth, login } = data;

  useEffect(() => {
    dispatch(isAuthUser());
    dispatch(authMe());
  }, [dispatch, isAuth]);

  const handleUserLogout = () => {
    dispatch(authLogout());
  };

  return (
    <Header isAuth={isAuth} login={login} authLogout={handleUserLogout} />
  );
};

export default HeaderContainer;