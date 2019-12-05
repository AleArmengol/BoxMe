import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import LogoCaja from '../../photos/LogoCaja.png'
import { Container, Row, Image, Button, FormControl } from "react-bootstrap";
import './LogIn.css';

export default class Login extends React.Component {
    render() {
        return (
            <Container className="mt-3">
                <Row className="row d-flex justify-content-center">
                    <Image fluid width= "310px" height= "310px" src={LogoCaja} alt="BoxMe!" />
                </Row>
                <Row className="row d-flex justify-content-center">
                    <h3>Accede a tu cuenta</h3>
                </Row>
                <Row className="row d-flex justify-content-center mb-2">
                    <a href="/SignUp">¿Aún no tienes una cuenta? ¡Regístrate!</a>
                </Row>
                <Row className="row d-flex justify-content-center mb-2">
                    <FormControl
                        style={{maxWidth:'310px'}}
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        placeholder="Ingrese nombre de usuario"
                    />
                </Row>
                <Row className="row d-flex justify-content-center mb-2">
                    <FormControl
                        style={{maxWidth:'310px'}}
                        type="password"
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        placeholder="Ingresar contraseña"
                    />
                </Row>
                <Row className="row d-flex justify-content-center mb-2">
                    <Button href="/Home" type="submit">Ingresar</Button>
                </Row>
            </Container>
        );
    }

}