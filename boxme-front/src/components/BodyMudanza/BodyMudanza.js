import React from "react";
import Popup from "../Popup/Popup";
import CajaComponent from "./CajaComponent";
import { Container, Row, Col } from "react-bootstrap";

class BodyMudanza extends React.Component {
  render() {
    return (
      <div>
        <div>
          <Container fixed style={{ marginTop: 100 }}>
            <Row>
              <Col>
                <CajaComponent
                  link="/caja"
                  nombre="Varios"
                />
              </Col>
              <Col>
                <CajaComponent
                  link="/caja"
                  nombre="Utiles"
                />
              </Col>
            </Row>
          </Container>
        </div>
        <div style={{ display: 'flex', justifyContent: 'right', marginRight: '50px' }}>
          <Popup
            title="Crear Caja"
            placeholder="Nombre de la Caja"
          />
        </div>
      </div>
    );
  }
}

export default BodyMudanza;
