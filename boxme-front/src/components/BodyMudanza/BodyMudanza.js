import React from "react";
import Popup from "../Popup/Popup";
import CajaComponent from "./CajaComponent";
import { Container, Row, Col } from "react-bootstrap";

class BodyMudanza extends React.Component {
  render() {
    return (
      <div>
        <div>
          <Container className="mt-3">
            <Row className="ml-auto">
              <h3>Devoto - Campana</h3>
            </Row>
            <Row className="ml-auto">
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
        <div>
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
