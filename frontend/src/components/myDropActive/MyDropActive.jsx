import React from "react";
import { useState } from "react";
import { ArrowDown } from "react-bootstrap-icons";
import style from './MyDropActive.module.scss';

export const MyDropActive = ({isRemovable}) => {
    console.log('isremovable', isRemovable)
    const [isOpen, setIsOpen] = useState(false);
    const toggling = () => setIsOpen(!isOpen);
    return (
      <>
        {isRemovable && 
          <div className={style.arrowBlock}>
            <ArrowDown onClick={toggling} className={style.arrowDownActive}/>
            {isOpen &&
              <div onClick={toggling} className={style.dropBlock}>
                <span className={style.dropBlockItem}>Delete</span>
                <span className={style.dropBlockItem}>Rename</span>
              </div>
            }  
          </div>
        }
      </>
    );
  };