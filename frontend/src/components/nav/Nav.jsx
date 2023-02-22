import React from 'react';
import { useTranslation } from 'react-i18next';
import style from './Nav.module.scss';

export const Nav = ({ button }) => {
  const { t } = useTranslation();
  return (
    <nav className={style.nav}>
      <div className={style.navContainer}>
        <a href="/">{t('Hexlet chat')}</a>
        {button}
      </div>
    </nav>
  );
};
