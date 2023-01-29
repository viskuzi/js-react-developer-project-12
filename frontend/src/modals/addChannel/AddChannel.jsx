import React from 'react';
import style from './AddChannel.module.scss';
import _ from 'lodash';
import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { setChannels, setCurrentChannelId } from '../../slices/channelsSlice';

const Add = ({ isShown, setShown }) => {
    const dispatch = useDispatch();

    const formik = useFormik({
      initialValues: {
        text: '',
      },
      onSubmit: (values) => {
        const newChannel = [{ id: _.uniqueId('channel_'), name: `${values.text}`, removable: true }];
        dispatch(setChannels(newChannel));
        dispatch(setCurrentChannelId(newChannel[0].id));
        setShown(false);
        formik.resetForm();
      },
    });

    const closeModal = () => {
      setShown(false);
      formik.resetForm();
    }
 
    return (
      <Modal className={style.modalBlock}show={isShown} onHide={() => setShown(false)}  animation={false}>
        {isShown && <div className={style.fade} onClick={closeModal}></div>}
        <div className={style.modal}>
          <Modal.Header className={style.header}>
            <Modal.Title>Add channel</Modal.Title>
          </Modal.Header>

          <Modal.Body className={style.body} >
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group>
                <Form.Control
                  autoFocus
                  id="text"
                  name="text"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.text}
                />
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer className={style.footer}>
            <Button className={style.closeBtn} variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button className={style.saveBtn} variant="primary" onClick={formik.handleSubmit}>
              Save
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    );
  };
  
  export default Add;