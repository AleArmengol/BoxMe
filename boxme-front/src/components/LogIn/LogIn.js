import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import LogoCaja from '../../photos/LogoCaja.png'
import { Container, Row, Image, Button, FormControl } from "react-bootstrap";
import './LogIn.css';
import { Redirect } from 'react-router-dom';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: '',
            password: '',
            isGoing: false,
            redirect: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        console.log(this.state);
    }

    handleChange(event) {
        console.log(event);
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();


        const url = "http://localhost:8080/api/verificarLogIn";
        const usu = this.state.usuario;
        const contra = this.state.password;
        const data = {
            "idUsuario": usu,
            "password": contra
        };

        console.log(data);
        const response = await fetch(url, {
            method: 'POST',
            mode: "cors",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
        const rta = await response.text();
        console.log("response", rta);

        if (rta === "success") {
            console.log("entro al if");
            sessionStorage.setItem('isLogin', true);
            sessionStorage.setItem('idUsuario',this.state.usuario);
            this.setState({ redirect: true });
        } else {
            console.log("entro al else");
            alert("Contraseña o usuario incorrectos");
        }

    }


    render() {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to='/home' />;
        }
        return (
            <Container className="mt-3">
                <Row className="row d-flex justify-content-center">
                    <Image fluid width="310px" height="310px" src={LogoCaja} alt="BoxMe!" />
                </Row>
                <Row className="row d-flex justify-content-center">
                    <h3>Accede a tu cuenta</h3>
                </Row>
                <Row className="row d-flex justify-content-center mb-2">
                    <a href="/SignUp">¿Aún no tienes una cuenta? ¡Regístrate!</a>
                </Row>
                <Row className="row d-flex justify-content-center mb-2">
                    <FormControl
                        name="usuario"
                        onChange={this.handleChange}
                        style={{ maxWidth: '310px' }}
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        placeholder="Ingrese nombre de usuario"
                    />
                </Row>
                <Row className="row d-flex justify-content-center mb-2">
                    <FormControl
                        name="password"
                        onChange={this.handleChange}
                        style={{ maxWidth: '310px' }}
                        type="password"
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        placeholder="Ingresar contraseña"
                    />
                </Row>
                <Row className="row d-flex justify-content-center mb-2">
                    <Button onClick={this.handleSubmit} type="submit">Ingresar</Button>
                </Row>
            </Container>
        );
    }

}