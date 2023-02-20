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
import { toast } from 'react-toastify';

const Add = ({ isShown, setShown }) => {
  const state = useSelector(state => state.channelsReducer)
  const { channels } = state;
  const channelNames = channels.map((channel) => channel.name)
  const { socket } = useContext(MyContext);
  const { t } = useTranslation();

  const validationSchema = object({
    text: string()
    .min(3, t('From 3 to 20 characters'))
    .max(20, t('From 3 to 20 characters'))
    .required(t('Required field'))
    .notOneOf(channelNames, t('Must be unique')),
  });

  const submitForm = (values) => {
    const newChannel = { name: values.text }
    socket.emit('newChannel', newChannel, (response) => {
      if (response.status === 'ok') {
        toast.success(t('Channel created!'));
      } else {
        toast.error(t('Connection error'));
      }
    })

    setShown(false);
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: { text: '' },
    onSubmit: (values) => {
      submitForm(values)
    },
    validationSchema,
  });

  const handleClose = () => {
    setShown(false);
    formik.resetForm();
  }

  // const ref = useRef(null)
  // useEffect(() => {
  //   ref.current.focus();
  // }, [])

  return (
    <Modal className={style.modal_dialog} show={isShown} onHide={handleClose}>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{t('Add channel')}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group className="mb-0">
            <Form.Label visuallyHidden>{t('Channel name')}</Form.Label>
            <Form.Control
              autoFocus
              name="text"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.text}
              isInvalid={formik.touched.text && formik.errors.text}
              // ref={ref}
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
          {t('Send')}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
  
export default Add;