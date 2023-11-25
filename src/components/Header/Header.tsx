import { FC } from 'react';
import style from './Header.module.css'
import iconReact from '../../assets/images/React-icon.png'
import { NavLink } from 'react-router-dom';

interface HeaderProps {
  isAuth: boolean;
  login: string | null;
  authLogout: () => void;
}

const Header: FC<HeaderProps> = ({ isAuth, login, authLogout }) => {
  return (
    <header className={style.header}>
      <a href="">
        <img className={style.icon} src={iconReact} alt="react-icon" />
      </a>
      <div className={style.loginBlock}>
        {isAuth ? <p>{login}</p> : <NavLink to={'/login'}>Log in</NavLink>}
        {isAuth ? <button onClick={() => authLogout()}>Log out</button> : null}
      </div>
    </header>
  );
};

export default Header;