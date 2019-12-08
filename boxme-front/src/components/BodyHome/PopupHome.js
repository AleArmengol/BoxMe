import React from "react";
import { Button, Modal, FormControl } from 'react-bootstrap';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import './PopupHome.css';


class PopupHome extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      show:false,
    }

  }


  handleClose(){
    this.setState({show:false});
  }

  handleShow(){
    this.setState({show:true});
  }

  render() {
    var popup;

    if(this.state.show){
      popup=(
        <Modal show={true} onHide={this.handleClose.bind(this)}>
          <Modal.Header style={{ borderBottom: 'none' }} closeButton>
            <Modal.Title>Crear Mudanza</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormControl
              placeholder="Nombre de la Mudanza"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </Modal.Body>
          <Modal.Footer style={{ borderTop: 'none' }}>
            <Button variant="primary" onClick={this.handleClose.bind(this)}>
              Agregar
          </Button>
          </Modal.Footer>
        </Modal>
      )
    }

    return (
      <div>
        <div>
          <Fab onClick={this.handleShow.bind(this)}>
            <AddIcon />
          </Fab>
        </div>
        {popup}
      </div>
    );
  }
}
export default PopupHome;