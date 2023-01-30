import React from "react";
import { useState } from "react";
import style from './MyDrop.module.scss';
import Remove from '../../modals/removeChannel/RemoveChannel';
import Rename from "../../modals/renameChannel/RenameChannel";

export const MyDrop = ({ isRemovable, id, isActive }) => {
  console.log('active' , isActive)
  const [isOpen, setIsOpen] = useState(false);
  const [ isRemoveOpen, setRemoveOpen ] = useState(false);
  const [ isRenameOpen, setRenameOpen ] = useState(false);

  const toggling = () => {
    setIsOpen(true);
  };

  const handleClickDelete = () => {
    setRemoveOpen(true);
    setIsOpen(false);
  };

  const handleClickRename = () => {
    setRenameOpen(true);
    setIsOpen(false);
  };

  const handleFadeClick = () => {
    setIsOpen(false);
    setRemoveOpen(false);
  };

  return (
    <>
      {isRemovable && 
        <div className={style.arrowBlock}>
          <div onClick={toggling} className={isActive ? style.arrowDownActive : style.arrowDown} />
          {isOpen &&
            <div>
              <div onClick={handleFadeClick} className={style.fade}></div>
              <div className={style.dropBlock}>
                <span onClick={handleClickDelete} className={style.dropBlockItem}>Remove</span>
                <span onClick={handleClickRename} className={style.dropBlockItem}>Rename</span>
              </div>
            </div>
          }
          <Rename id={id} isShownRename={isRenameOpen} setShownRename={setRenameOpen} />
          <Remove id={id} isShownRemove={isRemoveOpen} setShownRemove={setRemoveOpen} />
          
        </div>
      }
    </>
  );
};