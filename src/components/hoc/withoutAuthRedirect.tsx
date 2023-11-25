import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { selectAuthData } from '../../redux/authSlice';
import { RootState } from '../../redux/store';
import { UserProfileType } from '../../types/types';
import { User } from '../api/usersAPI';

export interface PorfileContainerProps {
  profile?: UserProfileType | null;
}

export interface UsersContainerProps {
  users?: User[];
  pageSize?: number;
  currentPage?: number;
  onPageChanged?: (pageNumber: number) => void;
  follow?: (id: number) => void;
  unfollow?: (id: number) => void;
  isFetching?: boolean;
  followingInProgress?: number[];
  toogleIsFollowingProgress?: (fetching: boolean, id: number) => void;
}

export interface DialogsContainerProps {
  dialogs?: { id: number; name: string }[];
}

export interface WithoutAuthRedirectProps extends PorfileContainerProps, UsersContainerProps, DialogsContainerProps { }

export interface WrappedComponentProps {
  profile: UserProfileType | null;

  users: User[];
  pageSize: number;
  currentPage: number;
  onPageChanged: (pageNumber: number) => void;
  follow: (id: number) => void;
  unfollow: (id: number) => void;
  isFetching: boolean;
  followingInProgress: number[];
  toogleIsFollowingProgress: (fetching: boolean, id: number) => void;

  dialogs: { id: number; name: string }[];
}

const withoutAuthRedirect = (WrappedComponent: FC<WrappedComponentProps>): FC<WithoutAuthRedirectProps> => {
  const RedirectComponent: FC<WithoutAuthRedirectProps> = (props) => {
    const navigate: NavigateFunction = useNavigate();
    const isAuth = useSelector((state: RootState) => selectAuthData(state).isAuth);

    useEffect(() => {
      if (!isAuth) {
        navigate('/login');
      }
    }, [navigate, isAuth]);

    return <WrappedComponent {...props as WrappedComponentProps} />;
  }

  return RedirectComponent;
};

export default withoutAuthRedirect;