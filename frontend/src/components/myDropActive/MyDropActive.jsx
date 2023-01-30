import React from "react";
import { useState } from "react";
import style from './MyDropActive.module.scss';
import Remove from '../../modals/removeChannel/RemoveChannel';

export const MyDropActive = ({ isRemovable, id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [ isRemoveOpen, setRemoveOpen ] = useState(false);
  const [ isRenameOpen, setRenameOpen ] = useState(false);

  const toggling = () => {
    setIsOpen(true);
  };

  const handleClickDelete = () => {
    setRemoveOpen(true);
    setIsOpen(false)
  }

  const handleFadeClick = () => {
    setIsOpen(false);
    setRemoveOpen(false);
  };
    
  return (
    <>
      {isRemovable && 
        <div className={style.arrowBlock}>
          <div onClick={toggling} className={style.arrowDownActive} />
          {isOpen &&
            <div>
              <div onClick={handleFadeClick} className={style.fade}></div>
              <div className={style.dropBlock}>
                <span onClick={handleClickDelete} className={style.dropBlockItem}>Remove</span>
                <span className={style.dropBlockItem}>Rename</span>
              </div>
            </div>
          }
          <Remove id={id} isShownRemove={isRemoveOpen} setShown={setIsOpen} setShownRemove={setRemoveOpen} />
        </div>
      }
    </>
  );
};