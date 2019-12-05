import React from "react";
import { Button, Modal, FormControl } from 'react-bootstrap';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import './Popup.css';

function Popup(props) {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <div>
        <Fab onClick={handleShow}>
          <AddIcon />
        </Fab>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{ borderBottom: 'none' }} closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl
            placeholder={props.placeholder}
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </Modal.Body>
        <Modal.Footer style={{ borderTop: 'none' }}>
          <Button variant="primary" onClick={handleClose}>
            Agregar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Popup;