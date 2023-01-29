import React from "react";
import { useState } from "react";
import { ArrowDown } from "react-bootstrap-icons";
import style from './MyDrop.module.scss';

export const MyDrop = ({isRemovable}) => {
    console.log('isremovable', isRemovable)
    const [isOpen, setIsOpen] = useState(false);
    const toggling = () => setIsOpen(!isOpen);
    return (
      <>
      {isRemovable && <div className={style.arrowBlock}>
        <ArrowDown onClick={toggling} className={style.arrowDown}/>
        {isOpen &&
          <div onClick={toggling} className={style.dropBlock}>
            <span className={style.dropBlockItem}>Delete</span>
            <span className={style.dropBlockItem}>Rename</span>
          </div>
        }  
      </div>}
      </>
    );
  };