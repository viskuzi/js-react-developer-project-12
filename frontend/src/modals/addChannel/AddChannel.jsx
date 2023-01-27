import React from 'react';
import style from './AddChannel.module.scss';
import _ from 'lodash';
import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { setChannels } from '../../slices/channelsSlice';


const Add = ({ isShown, setShown }) => {
    const dispatch = useDispatch();
    const formik = useFormik({
      initialValues: {
        text: '',
      },
      onSubmit: (values) => {
        console.log('input', values.text)
        const newChannel = [{ id: _.uniqueId('channel_'), name: `${values.text}`, removable: true }];
        dispatch(setChannels(newChannel));
        setShown(false);
        formik.resetForm();
      },
    });
 
    return (
      <Modal className={style.modalBlock}show={isShown} onHide={() => setShown(false)}  animation={false}>
        <div className={style.fade}></div>
        <div className={style.modal}>
          <Modal.Header closeButton>
            <Modal.Title>Add</Modal.Title>
          </Modal.Header>

          <Modal.Body>
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

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShown(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={formik.handleSubmit}>
              Save
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    );
  };
  
  export default Add;