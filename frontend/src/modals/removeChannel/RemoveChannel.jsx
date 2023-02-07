import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import style from './RemoveChannel.module.scss';

const Remove = ({ id, isShownRemove, setShownRemove, socket }) => {
  
  const removeItem = (id) => {
    socket.emit('removeChannel', { id });
    // if(isActive) {
    //   dispatch(setRemove(id));
    //   dispatch(setCurrentChannelId(1));
    //   setShownRemove(false);
    // } else {
    //   dispatch(setRemove(id));
    //   setShownRemove(false);
    // }
  };

  const handleCancel = () => {
    setShownRemove(false);
  };

  return (
    <Modal className={style.modal_dialog} show={isShownRemove} onHide={() => setShownRemove(false)} animation={false}>
     
      <Modal.Header closeButton>
        <Modal.Title>Remove channel?</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        You sure?
      </Modal.Body>

      <Modal.Footer className={style.footer}>
        <Button className={style.closeBtn} variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button className={style.saveBtn} variant="primary" onClick={() => removeItem(id)}>
          Remove
        </Button>
      </Modal.Footer>

    </Modal>
  );
};

export default Remove;