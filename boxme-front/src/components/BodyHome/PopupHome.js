import React from "react";
import { Button, Modal, FormControl } from 'react-bootstrap';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import './PopupHome.css';


class PopupHome extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      show: false,
      nombre: '',
      isGoing: false,
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

    console.log("Submit",this.state.nombre);

    var url = "http://localhost:8080/api/insertarMudanza";
    const nombre = this.state.nombre;
    var data = {
      "nombreMudanza": nombre,
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


    if (rta === "Success") {
      console.log("entro al if success 1");

      url = "http://localhost:8080/api/obteneridMudanza";

      const response2 = await fetch(url, {
        method: 'POST',
        mode: "cors",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const rta2 = await response2.json();
      console.log("response", rta2);

      if (rta2 != "err") {
        console.log("entro al if no error2");

        url = "http://localhost:8080/api/insertarUsuariosMudanza";
        const idUsu = sessionStorage.getItem('idUsuario');
        const idMud = rta2[0].idMudanza;
        console.log("idmud",idMud);
        data = {
          "idUsuario": idUsu,
          "idMudanza": idMud,
        };
        console.log(data);

        const response3 = await fetch(url, {
          method: 'POST',
          mode: "cors",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
        const rta3 = await response3.text();
        console.log("response", rta3);

        if(rta3==="Success"){
          console.log("entro al if refresh");
           this.refreshPage();
        }
      }
    }
    else{
      alert("Hubo un error");
    }

    this.handleClose();

  }

  refreshPage() {
    window.location.reload();
  }


  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    var popup;

    if (this.state.show) {
      popup = (
        <Modal show={true} onHide={this.handleClose.bind(this)}>
          <Modal.Header style={{ borderBottom: 'none' }} closeButton>
            <Modal.Title>Crear Mudanza</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormControl
              name="nombre"
              onChange={this.handleChange}
              placeholder="Nombre de la Mudanza"
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
export default PopupHome;