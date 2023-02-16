import React from 'react';
import style from './AddChannel.module.scss';
import _ from 'lodash';
import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { object, string } from 'yup';
import { useSelector } from 'react-redux';
import { useContext } from 'react';
import { MyContext } from '../../contexts/context';
// import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';

const Add = ({ isShown, setShown }) => {
  const notify = () => toast.success(t('Channel created!'));
  const state = useSelector(state => state.channelsReducer)
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
    // if (!values || values.text.length < 3 || values.text.length > 20) {
    //   setErrLength(true);
    //   return;
    // }
    // const notUnique = channels.some((channel) => channel.name === values.text);
    // if (notUnique) {
    //   setErrNameUniqueness(true);
    //   return;
    // }

    const newChannel = { name: values.text }
    await socket.emit('newChannel', newChannel, (response) => {
      if (response.status === 'ok') {
        notify();
      }
    })

    setShown(false);
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: { text: '' },
    onSubmit: async (values) => {
      await submitForm(values)
    },
    validationSchema,
  });

  const handleClose = () => {
    setShown(false);
    formik.resetForm();
  }

  return (
    <Modal className={style.modal_dialog} show={isShown} onHide={handleClose}>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{t('Add channel')}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group className="mb-0">
            <Form.Control
              name="text"
              type="text"
              autoFocus
              onChange={formik.handleChange}
              value={formik.values.text}
              isInvalid={formik.touched.text && formik.errors.text}
            />
            <Form.Control.Feedback style={{fontSize: "18px"}} type="invalid">
              {t(formik.errors.text)}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
          {t('Cancel')}
          </Button>
          <Button type="submit" variant="primary" onClick={formik.handleSubmit}>
          {t('Add')}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
  
export default Add;