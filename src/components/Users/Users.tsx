import { FC } from 'react';
import style from './Users.module.css';
import userPhoto from '../../assets/images/user-icon.png';
import Preloader from '../common/Preloader';
import { NavLink } from 'react-router-dom';
import { User } from '../api/usersAPI';

interface UsersProps {
  users: User[];
  pageSize: number;
  currentPage: number;
  onPageChanged: (pageNumber: number) => void;
  follow: (id: number) => void;
  unfollow: (id: number) => void;
  isFetching: boolean;
  followingInProgress: number[];
  toogleIsFollowingProgress: (fetching: boolean, id: number) => void;
}

const Users: FC<UsersProps> = ({ users, currentPage, onPageChanged, follow, unfollow,
  isFetching, followingInProgress }) => {
  // const pagesCount = Math.ceil(users.length / pageSize);
  let pages: number[] = [];
  for (let i = 1; i <= 20; i++) {
    pages = [...pages, i];
  }

  return (
    <div className={style.usersContainer}>
      <h1>Users</h1>
      <div className={style.pagesContainer}>
        <div className={style.pages}>
          {pages.map(p => {
            return (
              <span key={p}
                className={currentPage === p ? style.currentPage : ''}
                onClick={() => onPageChanged(p)}>
                {p}
              </span>
            )
          })}
        </div>
      </div>
      {isFetching ? <Preloader /> :
        <div className={style.users}>
          {users.map(u => {
            return (
              <div key={u.id} className={style.userContainer}>
                <div className={style.user}>
                  <div className={style.userInfoFirstPart}>
                    <NavLink to={'/profile/' + u.id}>
                      <img src={u.photos.large ? u.photos.large : userPhoto}
                        alt="user-photo"
                        className={style.userPhoto} />
                    </NavLink>
                    <div className={style.btnContainer}>
                      {u.followed
                        ?
                        <button disabled={followingInProgress.some(id => id === u.id)}
                          className={style.btn}
                          onClick={() => unfollow(u.id)}>
                          Unfollow
                        </button>
                        :
                        <button disabled={followingInProgress.some(id => id === u.id)}
                          className={style.btn}
                          onClick={() => follow(u.id)}>
                          Follow
                        </button>}
                    </div>
                  </div>
                  <div className={style.userInfoSecondPart}>
                    <p>{u.name}</p>
                    <p>{u.status ? u.status : 'User status: null'}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>}
    </div>
  );
};

export default Users;