import React from "react";
import box from "../../photos/box.png";
import { Button, Container, Row } from "react-bootstrap";
import { DeleteOutline, Edit, InfoOutlined } from "@material-ui/icons";
import "./CajaComponent.css";


class CajaComponent extends React.Component {

  constructor(props) {
    super(props);
}

clickInfo(){
  sessionStorage.setItem("idCaja", this.props.idCaja);
  sessionStorage.setItem("nombreCaja", this.props.nombre);
}

  render(){
  return (
    <Container>
      <Row className="justify-content-md-center">
        <img src={box} alt={"Caja"} href={this.props.link} onClick={this.clickInfo.bind(this)}></img>
      </Row>
      <Row className="justify-content-md-center">
        <a style={{ color: "#6F461F", fontSize: "larger" }} href={this.props.link} onClick={this.clickInfo.bind(this)}>
          {this.props.nombre}
        </a>
      </Row>
      <Row className="justify-content-md-center">
        <Button style={{ marginRight: "10px" }}>
          <DeleteOutline />
        </Button>
        <Button style={{ marginRight: "10px" }}>
          <Edit />
        </Button>
        <Button href="/info" onClick={this.clickInfo.bind(this)}>
          <InfoOutlined />
        </Button>
      </Row>
    </Container>
  );
}
}
export default CajaComponent;
