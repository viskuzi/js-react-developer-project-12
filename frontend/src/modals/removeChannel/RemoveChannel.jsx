import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import style from './RemoveChannel.module.scss';
import { setCurrentChannelId, setRemove } from '../../slices/channelsSlice';

const Remove = ({ id, isShownRemove, setShownRemove, isActive }) => {
  const dispatch = useDispatch();
  
  const removeItem = (id) => {
    if(isActive) {
      dispatch(setRemove(id));
      dispatch(setCurrentChannelId(1));
      setShownRemove(false);
    } else {
      dispatch(setRemove(id));
      setShownRemove(false);
    }
  };

  const handleCancel = () => {
    setShownRemove(false);
  };

  return (
    <Modal show={isShownRemove} onHide={() => setShownRemove(false)} animation={false}>
      <div className={style.fade} onClick={() => setShownRemove(false)}></div>
      <div className={style.modal}>
        <Modal.Header className={style.header}>
          <Modal.Title><b>Remove channel?</b></Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className={style.line}></div>
          <p style={{paddingLeft: "10px", fontSize: "18px"}}>You sure?</p>
        </Modal.Body>

        <Modal.Footer className={style.footer}>
          <Button className={style.closeBtn} variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button className={style.saveBtn} variant="primary" onClick={() => removeItem(id)}>
            Remove
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default Remove;