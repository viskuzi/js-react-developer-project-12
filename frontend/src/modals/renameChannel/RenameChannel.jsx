import React, { useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { object, string } from 'yup';
// import toast from 'react-hot-toast';
import { toast } from 'react-toastify';
import style from './RenameChannel.module.scss';
import MyContext from '../../contexts/context';

const Rename = ({ id, isShownRename, setShownRename }) => {
  const { channels } = useSelector((state) => state.channelsReducer);
  const channelNames = channels.map((channel) => channel.name);
  const { socket } = useContext(MyContext);
  const { t } = useTranslation();

  const validationSchema = object({
    text: string()
      .min(3, t('From 3 to 20 characters'))
      .max(20, t('From 3 to 20 characters'))
      .required(t('Required field'))
      .notOneOf(channelNames, t('Must be unique')),
  });

  const formik = useFormik({
    initialValues: {
      text: '',
    },
    validationSchema,
    onSubmit: (values) => {
      socket.emit('renameChannel', { id, name: values.text }, (response) => {
        if (response.status === 'ok') {
          toast(t('Channel renamed!'));
        } else {
          toast(t('Connection error'));
        }
      });
      formik.resetForm();
      setShownRename(false);
    },
  });

  const handleCancel = () => {
    setShownRename(false);
  };

  return (
    <Modal className={style.modal_dialog} show={isShownRename} onHide={() => setShownRename(false)}>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{t('Rename channel')}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group>
            <Form.Label htmlFor="text" visuallyHidden>{t('Channel name')}</Form.Label>
            <Form.Control
              autoFocus
              id="text"
              name="text"
              type="text"
              onChange={formik.handleChange}
              isInvalid={formik.touched.text && formik.errors.text}
            />
            <Form.Control.Feedback style={{ fontSize: '18px' }} type="invalid">
              {t(formik.errors.text)}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>{t('Cancel')}</Button>
          <Button variant="primary" type="submit" onClick={formik.handleSubmit}>{t('Send')}</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default Rename;
