import React from "react";
import { Button, Modal, FormControl } from 'react-bootstrap';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import './PopupMudanza.css';


class Popup extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
        show: false,
        nombre:'',
        isGoing:false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    console.log(this.state);

}

handleChange(event) {
    console.log(this.state);
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
        [name]: value
    });
}

async handleSubmit(event) {
    event.preventDefault();
    
    console.log(this.state.nombre);

    const url = "http://localhost:8080/api/insertarCaja";
    const nombre = this.state.nombre;
    const idMud = sessionStorage.getItem('idMudanza');
    const data = {
        "idMudanza": idMud,
        "nombre": nombre,
    };
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        mode: "cors",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    const rta = await response.text();
    console.log("response", rta);


    if(rta === "Success"){
      console.log("entro al if refresh");
     this.refreshPage();
  }

    this.handleClose();

}

refreshPage() {
  window.location.reload();
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
            <Modal.Title>Crear Caja</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormControl
              name="nombre"
              onChange={this.handleChange}
              placeholder="Nombre de la Caja"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </Modal.Body>
          <Modal.Footer style={{ borderTop: 'none' }}>
            <Button variant="primary" onClick={this.handleSubmit}>
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
export default Popup;