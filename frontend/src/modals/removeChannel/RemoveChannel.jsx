import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import style from './RemoveChannel.module.scss';
import { setChannels, setCurrentChannelId } from '../../slices/channelsSlice';
import { useSelector } from 'react-redux';

const Remove = ({ id, isShownRemove, setShownRemove }) => {
  const state = useSelector(state => state.channelsReducer)
  const { channels } = state;
  const dispatch = useDispatch();
  
  const removeItem = (id) => {
    const filtered = channels.filter((channel) => channel.id !== id);
    dispatch(setChannels(filtered));
    setShownRemove(false);
    // setShown(false);
    dispatch(setCurrentChannelId(1));
  };

  const handleCancel = () => {
    setShownRemove(false);
  }

  return (
    <Modal className={style.modalBlock} show={isShownRemove} onHide={() => setShownRemove(false)} animation={false}>
      <div className={style.fade} onClick={() => setShownRemove(false)}></div>
      <div className={style.modal}>

        <Modal.Header className={style.header}>
          <Modal.Title><b>Remove channel?</b></Modal.Title>
        </Modal.Header>

        <div className={style.line}></div>
        <p style={{paddingLeft: "10px", fontSize: "18px"}}>You sure?</p>

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