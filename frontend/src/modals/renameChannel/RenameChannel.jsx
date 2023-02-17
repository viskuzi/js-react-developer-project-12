import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import style from './RenameChannel.module.scss';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { useContext } from 'react';
import { MyContext } from '../../contexts/context';
import { useTranslation } from 'react-i18next';
import { object, string } from 'yup';
import toast from 'react-hot-toast';

const Rename = ({ id, isShownRename, setShownRename }) => {
  const state = useSelector(state => state.channelsReducer);
  const { channels } = state;
  const channelNames = channels.map((channel) => channel.name)
  const { socket } = useContext(MyContext);
  const { t } =useTranslation();

  const validationSchema = object({
    text: string()
      .min(3, t('Must be 3 chars minimum'))
      .max(20, t('Must be 20 chars maximum'))
      .required(t('Required field'))
      .notOneOf(channelNames, t('Must be unique')),
  });
  
  const submitForm = async (values) => {
    socket.emit('renameChannel', { id, name: values.text }, (response) => {
      if (response.status === 'ok') {
        toast.success(t('Channel renamed!'));
      } else {
        toast.error(t('Connection error'));
      }
    })
    formik.resetForm();
    setShownRename(false);
  };

  const formik = useFormik({
    initialValues: {
      text: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      await submitForm(values)
    },
  });

  const handleCancel = () => {
    setErr(false);
    setShownRename(false);
  };

  return (
    <Modal className={style.modal_dialog} show={isShownRename} onHide={() => setShownRename(false)}>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{t('Rename channel?')}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group>
            <Form.Label></Form.Label>
              <Form.Control
                autoFocus
                onFocus={(e) => e.currentTarget.select()}
                id="text"
                name="text"
                type="text"
                onChange={formik.handleChange}
                isInvalid={formik.touched.text && formik.errors.text}
              />
              <Form.Control.Feedback style={{fontSize: "18px"}} type="invalid">
              {t(formik.errors.text)}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer >
          <Button variant="secondary" onClick={handleCancel}>{t('Cancel')}</Button>
          <Button variant="primary" type="submit" onClick={formik.handleSubmit}>{t('Rename')}</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default Rename;