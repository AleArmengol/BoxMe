import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

// import axios from 'axios';
import fondo from '../LogIn/fondo.png'
import logo from '../LogIn/LogoCaja.png'
import { Container, Row, Image, Button, FormControl} from "react-bootstrap";
import './LogIn.css';

export default class Registracion extends React.Component {
    render() {
        return (
            <Container className="mt-3">
                <Image className="Fondo" src= {fondo} alt="El fondo"/>
            <Row className="mx-auto">
                <Image className="Logo" src={logo} alt="El logo" />
            </Row>
            <Row className = "Label-LogIn">
                <h3>Accede a tu cuenta</h3>
                </Row>
            <Row className="mx-auto">
            <FormControl
                className = "idusuario"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                placeholder="Ingrese nombre de usuario"
            />
            </Row>
            <Row className="mx-auto">
                <FormControl
                type="password"
                className = "Contraseña"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                placeholder="Ingresar contraseña"
                />
            </Row>
            <Row className="mx-auto">
            <Button href= "/Home" type="submit" variant="secondary" className="btn-ingresar">Ingresar</Button>
            </Row>
            <Row>
            <Button href= "/Registracion" type="button" variant="secondary" className="btn-registrarme">Registrarme</Button>
            </Row>
          </Container>
        );
    }

    }