import React from 'react';
import box from '../../photos/box.png';
import { Button, Container, Row } from 'react-bootstrap';
import { DeleteOutline, Edit } from '@material-ui/icons';

function CajaComponent(props) {
  return (
    <Container> 
      <Row className="justify-content-md-center">
        <img src={box} alt={"Caja"} href={props.link}></img>
      </Row>
      <Row className="justify-content-md-center">
        <a style={{ color: '#6F461F', fontSize:'larger' }} href={props.link}>{props.nombre}</a>
      </Row>
      <Row className="justify-content-md-center">
        <Button style={{ marginRight: '10px' }}>
          <DeleteOutline />
        </Button>
        <Button>
          <Edit />
        </Button>
      </Row>
    </Container>
  )
}

export default CajaComponent;