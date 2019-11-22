import React from "react";
import { Container, Row } from "react-bootstrap";
import qrcaja from '../../photos/qrcaja.png';

class BodyInfo extends React.Component {
    render() {
      return (
        <Container className="mt-3">
            <Row>
                <h4>Información de la Caja</h4>
            </Row>
            <Row>
                <img src={qrcaja} alt="qr"/>
            </Row>
        </Container>
      );
    }
}

export default BodyInfo;