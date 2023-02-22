import React from "react";
import { useState } from "react";
import style from './MyDrop.module.scss';
import Remove from '../../modals/removeChannel/RemoveChannel';
import Rename from "../../modals/renameChannel/RenameChannel";
import { useTranslation } from 'react-i18next';
import Dropdown from 'react-bootstrap/Dropdown';

export const MyDrop = ({ isActive, isRemovable, id }) => {
  const [isDropOpen, setDropOpen] = useState(false);
  const [ isRemoveOpen, setRemoveOpen ] = useState(false);
  const [ isRenameOpen, setRenameOpen ] = useState(false);
  const { t } = useTranslation();

  const toggling = () => {
    setDropOpen(!isDropOpen);
  };

  const handleClickRemove = () => {
    setRemoveOpen(true);
    setDropOpen(false);
  };

  const handleClickRename = () => {
    setRenameOpen(true);
    setDropOpen(false);
  };

  const handleFadeClick = () => {
    setRemoveOpen(false);
    setDropOpen(false);
  };

  return (
    <>
      {isRemovable && (
        <Dropdown>
          <Dropdown.Toggle variant={isActive && 'secondary'} id="dropdown-basic">
            <span className="visually-hidden">{t('Channel management')}</span>
          </Dropdown.Toggle>
  
          <Dropdown.Menu>
            <Dropdown.Item onClick={handleClickRemove}>{t('Remove')}</Dropdown.Item>
            <Dropdown.Item onClick={handleClickRename}>{t('Rename')}</Dropdown.Item>
          </Dropdown.Menu>
          <Rename id={id} isShownRename={isRenameOpen} setShownRename={setRenameOpen} />
          <Remove id={id} isShownRemove={isRemoveOpen} setShownRemove={setRemoveOpen} />
        </Dropdown>
        // <div className={style.arrowBlock}>
        //   <span className="visually-hidden">{t('Channel management')}</span>
        //   <div onClick={toggling} className={isActive ? style.arrowDownActive : style.arrowDown}></div>
        //   {isDropOpen &&
        //     <div>
        //       <div onClick={handleFadeClick} className={style.fade}></div>
        //       <div className={style.dropBlock}>
        //         <span onClick={handleClickRemove} className={style.dropBlockItem}>{t('Remove')}</span>
        //         <span onClick={handleClickRename} className={style.dropBlockItem}>{t('Rename')}</span>
        //       </div>
        //     </div>
        //   }
          
        // </div>
      )}
    </>
  );
};