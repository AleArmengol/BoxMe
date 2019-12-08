import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import LogoCaja from '../../photos/LogoCaja.png'
import { Container, Row, Image, Button, FormControl } from "react-bootstrap";

export default class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            password: '',
            repeatPassword: '',
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

    handleSubmit(event) {
        event.preventDefault();
        const url = "http://localhost:8080/api/registrarUsuario";
        const nombre = this.state.nombre;
        const pass = this.state.password;
        const pass2 = this.state.repeatPassword;
        alert('usu:' + nombre + ', pass:' + pass + ', pass2:' + pass2);
        if (pass === pass2) {
            const data = {
                "idUsuario": nombre,
                "password": pass
            }
            console.log(data);
            fetch(url, {
                method: 'POST',
                mode: "cors",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            
        } else{
            alert('Las contraseñas ingresadas no coinciden');
        }
    }




    render() {
        return (
            <Container className="mt-3">
                <Row className="row d-flex justify-content-center">
                    <Image fluid width="310px" height="310px" src={LogoCaja} alt="BoxMe!" />
                </Row>
                <Row className="row d-flex justify-content-center">
                    <h3>Crea tu cuenta</h3>
                </Row>
                <Row className="row d-flex justify-content-center mb-2">
                    <FormControl
                        name="nombre"
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
                    <FormControl
                        name="repeatPassword"
                        onChange={this.handleChange}
                        style={{ maxWidth: '310px' }}
                        type="password"
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        placeholder="Repetir contraseña"
                    />
                </Row>
                <Row className="row d-flex justify-content-center mt-2">
                    <Button onClick={this.handleSubmit} type="submit">Crear</Button>
                </Row>
            </Container>
        );
    }

}

