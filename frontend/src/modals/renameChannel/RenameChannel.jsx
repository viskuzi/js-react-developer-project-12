import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import style from './RenameChannel.module.scss';
import { channelsReducer, setRenameChannel } from '../../slices/channelsSlice';
import { useFormik } from 'formik';

const Rename = ({ id, isShownRename, setShownRename }) => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.channelsReducer)
  const name = state.channels.filter((channel) => channel.id === id).map((channel) => channel.name)[0];
  
  const formik = useFormik({
    initialValues: {
      text: name,
    },
    onChange: (values) => {
      values.text = name;
    },
    onSubmit: (values) => {    
        dispatch(setRenameChannel({id, name: values.text}));
        formik.resetForm();
        setShownRename(false);
    },
  });

  const handleCancel = () => {
    setShownRename(false);
  };

  return (
    <Modal className={style.modal_dialog} show={isShownRename} onHide={() => setShownRename(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Rename channel?</Modal.Title>
      </Modal.Header>

      <Modal.Body  >
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Label></Form.Label>
              <Form.Control
                autoFocus
                onFocus={(e) => e.currentTarget.select()}
                id="text"
                name="text"
                type="text"
                onChange={formik.handleChange}
              />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer >
        <Button  variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button  variant="primary" type="submit" onClick={formik.handleSubmit}>
          Rename
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Rename;