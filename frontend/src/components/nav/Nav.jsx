import React from "react";
import style from './Nav.module.scss';

export const Nav = ({ button }) => {
  return (
    <nav className={style.nav}>
      <div className={style.navContainer}>
        <a href='/'>Hexlet Chat</a>
        {button ? button : ''}
      </div>
    </nav>
  );
};