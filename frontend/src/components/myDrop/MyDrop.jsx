import React from "react";
import { useState } from "react";
import style from './MyDrop.module.scss';
import Remove from '../../modals/removeChannel/RemoveChannel';
import Rename from "../../modals/renameChannel/RenameChannel";

export const MyDrop = ({ isActive, isRemovable, id, socket }) => {
  const [isDropOpen, setDropOpen] = useState(false);
  const [ isRemoveOpen, setRemoveOpen ] = useState(false);
  const [ isRenameOpen, setRenameOpen ] = useState(false);

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
      {isRemovable && 
        <div className={style.arrowBlock}>
          <div onClick={toggling} className={isActive ? style.arrowDownActive : style.arrowDown} />
          {isDropOpen &&
            <div>
              <div onClick={handleFadeClick} className={style.fade}></div>
              <div className={style.dropBlock}>
                <span onClick={handleClickRemove} className={style.dropBlockItem}>Remove</span>
                <span onClick={handleClickRename} className={style.dropBlockItem}>Rename</span>
              </div>
            </div>
          }
          <Rename id={id} isShownRename={isRenameOpen} setShownRename={setRenameOpen} socket={socket} />
          <Remove id={id} isShownRemove={isRemoveOpen} setShownRemove={setRemoveOpen} socket={socket} isActive={isActive} />
        </div>
      }
    </>
  );
};