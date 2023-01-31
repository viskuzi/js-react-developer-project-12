import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import style from './RenameChannel.module.scss';
import { channelsReducer, setRenameChannel } from '../../slices/channelsSlice';
import { useFormik } from 'formik';
import { values } from 'lodash';

const Rename = ({ id, isShownRename, setShownRename }) => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.channelsReducer)
  const name = state.channels.filter((channel) => channel.id === id).map((channel) => channel.name)[0];
  
  console.log('name', name)
  
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
    <Modal show={isShownRename} onHide={() => setShownRename(false)} animation={false}>
      <div className={style.fade} onClick={() => setShownRename(false)}></div>
      <div className={style.modal}>
        <Modal.Header className={style.header}>
          <Modal.Title><b>Rename channel?</b></Modal.Title>
        </Modal.Header>

        <Form onSubmit={formik.handleSubmit}>
          <Modal.Body className={style.body} >
              <Form.Group>
                <Form.Control
                  autoFocus
                  onFocus={(e) => e.currentTarget.select()}
                  id="text"
                  name="text"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.text}
                />
              </Form.Group>
          </Modal.Body>

          <Modal.Footer className={style.footer}>
            <Button className={style.closeBtn} variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button className={style.saveBtn} variant="primary" type="submit">
              Rename
            </Button>
          </Modal.Footer>
        </Form>
      </div>
    </Modal>
  );
};

export default Rename;