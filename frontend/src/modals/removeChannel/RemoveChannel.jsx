import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import style from './RemoveChannel.module.scss';
import { useContext } from 'react';
import { MyContext } from '../../contexts/context';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const Remove = ({ id, isShownRemove, setShownRemove }) => {
  const { socket } = useContext(MyContext);
  const { t } =useTranslation();

  const removeItem = (id) => {
    socket.emit('removeChannel', { id }, (response) => {
      if (response.status === 'ok') {
        toast.success(t('Channel removed!'));
      }
    })
  };

  const handleCancel = () => {
    setShownRemove(false);
  };

  return (
    <Modal className={style.modal_dialog} show={isShownRemove} onHide={() => setShownRemove(false)} animation={false}>
     
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
        <Button className={style.saveBtn} variant="primary" onClick={() => removeItem(id)}>
        {t('Remove')}
        </Button>
      </Modal.Footer>

    </Modal>
  );
};

export default Remove;