import React from "react";
import { Container, Row } from "react-bootstrap";
var QRCode = require("qrcode.react");

class BodyInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      link: "http://localhost:3000/caja/" + sessionStorage.getItem("idCaja")
    };
  }
  render() {
    return (
      <Container className="mt-3">
        <Row>
          <h4>{sessionStorage.getItem("nombreCaja")}</h4>
        </Row>
        <Row>
          <QRCode value={this.state.link}></QRCode>
        </Row>
      </Container>
    );
  }
}

export default BodyInfo;
