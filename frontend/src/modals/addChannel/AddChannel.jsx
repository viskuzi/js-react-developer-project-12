import React, { useState } from 'react';
import style from './AddChannel.module.scss';
import _ from 'lodash';
import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { object, string } from 'yup';
import { useSelector } from 'react-redux';

const Add = ({ isShown, setShown, onChannelCreated }) => {
  const [errLength, setErrLength ] = useState(false);
  const [errNameUniqueness, setErrNameUniqueness ] = useState(false);
  const state = useSelector(state => state.channelsReducer)
  const { channels } = state;
  
  const initialValues = {
    text: '',
  };

  const validationSchema = object({
    text: string().required('Required field'),
  });

  const onSubmit = (values) => {
    if (!values || values.text.length < 3 || values.text.length > 20) {
      setErrLength(true);
      return;
    }
    const notUnique = channels.some((channel) => channel.name === values.text);
    if (notUnique) {
      setErrNameUniqueness(true);
      return;
    }
    const newChannel = { name: values.text }
    onChannelCreated(newChannel)
    setShown(false);
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const handleClose = () => {
    setErrLength(false);
    setErrNameUniqueness(false)
    setShown(false);
    formik.resetForm();
  }

  return (
    <Modal className={style.modal_dialog} show={isShown} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errLength && <p style={{color: "red", fontSize: "18px"}}>Must be from 3 to 20 characters</p>}
        {errNameUniqueness && <p style={{color: "red", fontSize: "18px"}}>Channel name must be unique</p>}
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-0">
            <Form.Label></Form.Label>
            <Form.Control
              id="text"
              name="text"
              type="text"
              autoFocus
              onChange={formik.handleChange}
              value={formik.values.text}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" onClick={formik.handleSubmit}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
  
export default Add;