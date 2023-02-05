import React, { useState } from 'react';
import style from './AddChannel.module.scss';
import _ from 'lodash';
import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { setAddChannel, setCurrentChannelId } from '../../slices/channelsSlice';
import { object, string } from 'yup';

const Add = ({ isShown, setShown }) => {
  const [err, setErr ] = useState(false);
  const dispatch = useDispatch();

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
      console.log('values', values)
      const newChannel = { id: _.uniqueId('channel_'), name: `${values.text}`, removable: true };
      dispatch(setAddChannel(newChannel));
      dispatch(setCurrentChannelId(newChannel.id));
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
      // <Modal className={style.modalBlock} show={isShown} onHide={() => setShown(false)}  animation={false}>
      //   <div className={style.fade} onClick={closeModal}></div>
      //   <div className={style.modal}>
      //     <Modal.Header className={style.header}>
      //       <Modal.Title>Add channel</Modal.Title>
      //     </Modal.Header>
      //     <Form onSubmit={formik.handleSubmit}>
      //       <Modal.Body className={style.body} >
      //         <Form.Group>
      //           <Form.Control
      //             autoFocus
      //             id="text"
      //             name="text"
      //             type="text"
      //             onChange={formik.handleChange}
      //             value={formik.values.text}
      //           />
      //         </Form.Group>
      //       </Modal.Body>
      //       <Modal.Footer className={style.footer}>
      //         <Button className={style.closeBtn} variant="secondary" onClick={closeModal}>
      //           Close
      //         </Button>
      //         <Button className={style.saveBtn} variant="primary" type="submit">
      //           Save
      //         </Button>
      //       </Modal.Footer>
      //     </Form>
      //   </div>
      // </Modal>
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