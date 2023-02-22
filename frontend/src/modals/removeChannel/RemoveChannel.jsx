import React, { useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
// import toast from 'react-hot-toast';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import MyContext from '../../contexts/context';
import style from './RemoveChannel.module.scss';

const Remove = ({ id, isShownRemove, setShownRemove }) => {
  const { socket } = useContext(MyContext);
  const { t } = useTranslation();

  const removeItem = (ID) => {
    socket.emit('removeChannel', { id: ID }, (response) => {
      if (response.status === 'ok') {
        toast(t('Channel removed!'));
      }
    });
  };

  const handleCancel = () => {
    setShownRemove(false);
  };

  return (
    <Modal
      className={style.modal_dialog}
      show={isShownRemove}
      onHide={() => setShownRemove(false)}
      animation={false}
    >

      <Modal.Header closeButton>
        <Modal.Title>{t('Remove channel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {t('Are you sure?')}
      </Modal.Body>

      <Modal.Footer className={style.footer}>
        <Button className={style.closeBtn} variant="secondary" onClick={handleCancel}>
          {t('Cancel')}
        </Button>
        <Button variant="danger" onClick={() => removeItem(id)}>
          {t('Remove')}
        </Button>
      </Modal.Footer>

    </Modal>
  );
};

export default Remove;
