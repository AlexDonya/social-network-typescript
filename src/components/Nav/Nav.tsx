import { FC } from 'react';
import style from './Nav.module.css'
import { NavLink } from 'react-router-dom';

const Nav: FC<{}> = () => {
  return (
    <aside className={style.sidebar}>
      <h1>Sidebar</h1>
      <nav>
        <ul className={style.nav}>
          <li className={style.itemNavLink}>
            <NavLink className={({ isActive }) => isActive ? style.active : ''} to='/'>
              News
            </NavLink>
          </li>
          <li className={style.itemNavLink}>
            <NavLink className={({ isActive }) => isActive ? style.active : ''} to='/profile'>
              Profile
            </NavLink>
          </li>
          <li className={style.itemNavLink}>
            <NavLink className={({ isActive }) => isActive ? style.active : ''} to='/dialogs'>
              Messages
            </NavLink>
          </li>
          <li className={style.itemNavLink}>
            <NavLink className={({ isActive }) => isActive ? style.active : ''} to='/music'>
              Music
            </NavLink>
          </li >
          <li className={style.itemNavLink}>
            <NavLink className={({ isActive }) => isActive ? style.active : ''} to='/settings'>
              Settings
            </NavLink>
          </li >
          <li className={style.itemNavLink}>
            <NavLink className={({ isActive }) => isActive ? style.active : ''} to='/users'>
              Find users
            </NavLink>
          </li >
        </ul >
      </nav >
    </aside >
  );
};

export default Nav;