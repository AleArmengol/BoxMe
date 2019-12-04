import React from "react";
import Popup from "../Popup/Popup";
import CajaComponent from "./CajaComponent";
import { Container, Row, Col } from "react-bootstrap";
import Spinner from 'react-bootstrap/Spinner';

class BodyMudanza extends React.Component {
  constructor() {
    super();
    this.state = {
      cajas: [],
      loading: true,
    };
  }


  async componentDidMount() {
    const url = "http://localhost:8080/api/getCajas";
    const id = this.props.idMud;
    const data = { "idMudanza": id };
    console.log("props id", data);

    const response = await fetch(url, {
      method: 'POST',
      mode: "cors",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const resultado = await response.json();
    console.log("resultadoBD", resultado)
    this.setState({ cajas: resultado, loading: false });
    console.log("sacado de state", this.state.cajas[0]);
  }
  mostrarSpinner() {
    if (this.state.loading) {
      return (<Spinner animation="grow" size="sm"></Spinner>)

    }
    else {
      return (
        <div>
          {this.state.cajas.map((mud, index) =>
            <div key={mud.name + "-" + index}>
              <Col>
                <CajaComponent
                  link={("/caja/").concat(mud.idCaja)}
                  nombre={mud.nombre}
                />
              </Col>
            </div>)}
        </div>
      )
    }
  }





  render() {
    return (
      <div>
        <div>
          <Container className="mt-3">
            <Row className="ml-auto">
              <h3>Nombre de la mudanza</h3>
            </Row>
            <Row className="ml-auto">
              {this.mostrarSpinner()}
            </Row>
          </Container>
      </div>
      <div>
        <Popup
          title="Crear Caja"
          placeholder="Nombre de la Caja"
        />
      </div>
      </div >
    );
  }
}

export default BodyMudanza;
