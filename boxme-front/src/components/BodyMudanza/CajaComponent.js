import React from "react";
import box from "../../photos/box.png";
import { Button, Container, Row } from "react-bootstrap";
import { DeleteOutline, Edit, InfoOutlined } from "@material-ui/icons";
import "./CajaComponent.css";

var clickInfo = props => {
  sessionStorage.setItem("idCaja", props.idCaja);
  sessionStorage.setItem("nombreCaja", props.nombre);
};

function CajaComponent(props) {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <img src={box} alt={"Caja"} href={props.link}></img>
      </Row>
      <Row className="justify-content-md-center">
        <a style={{ color: "#6F461F", fontSize: "larger" }} href={props.link}>
          {props.nombre}
        </a>
      </Row>
      <Row className="justify-content-md-center">
        <Button style={{ marginRight: "10px" }}>
          <DeleteOutline />
        </Button>
        <Button style={{ marginRight: "10px" }}>
          <Edit />
        </Button>
        <Button href="/info" onClick={clickInfo(props)}>
          <InfoOutlined />
        </Button>
      </Row>
    </Container>
  );
}

export default CajaComponent;
