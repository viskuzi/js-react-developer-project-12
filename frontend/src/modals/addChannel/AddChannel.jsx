import React, { useState } from 'react';
import style from './AddChannel.module.scss';
import _ from 'lodash';
import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { object, string } from 'yup';

const Add = ({ isShown, setShown, onChannelCreated }) => {
  const [err, setErr ] = useState(false);
  
  const initialValues = {
    text: '',
  };

  const validationSchema = object({
    text: string().required('Required field'),
  });

  const onSubmit = (values) => {
    if (!values || values.text.length < 3 || values.text.length > 20) {
      setErr(true);
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
    setErr(false);
    setShown(false);
    formik.resetForm();
  }

  return (
    <Modal className={style.modal_dialog} show={isShown} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {err && <p style={{color: "red", fontSize: "18px"}}>Must be from 3 to 20 characters</p>}
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