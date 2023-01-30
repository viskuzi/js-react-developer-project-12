import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import style from './RenameChannel.module.scss';
import { setChannels, setCurrentChannelId, setRenameChannel } from '../../slices/channelsSlice';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';

const Rename = ({ id, isShownRename, setShownRename }) => {
  const state = useSelector(state => state.channelsReducer)
  const { channels } = state;
  const dispatch = useDispatch();
  
  const formik = useFormik({
    initialValues: {
      text: '',
    },
    onSubmit: (values) => {    
        dispatch(setRenameChannel({id, text: values.text}));
        formik.resetForm();
        setShownRename(false);
    },
  });

  const handleCancel = () => {
    console.log('in cancel')
    setShownRename(false);
  }

  return (
    <Modal className={style.modalBlock} show={isShownRename} onHide={() => setShownRename(false)} animation={false}>
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