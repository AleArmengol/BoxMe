import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
// import {Button} from 'react-bootstrap';
import axios from 'axios';
import fondo from '../../photos/fondo.png';
import logo from '../../photos/LogoCaja.png';
import './Registracion.css';

export default class Registracion extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            idusuario: "",
            contraseña:"",
            confirmacion_contraseña:"",
            erroresRegistracion:""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({
        [event.target.className]: event.target.value
    });
}
    handleSubmit(event) {
        const{
            idusuario, 
            contraseña,
            confirmacion_contraseña
        } = this.state;

        axios
        .post("https://localhost:3001/Registracion", 
        {
            user: {
                idusuario: idusuario,
                contraseña: contraseña,
                confirmacion_contraseña: confirmacion_contraseña
            }
        },

        { withCredentials: true }

        )
        .then(Response => {
            console.log("LogIn res", Response);
        })
        .catch(error => {
            console.log("registracion error", error);
        });
        event.preventDefault();
    }
    render() {
        return (
            <form>
                <div onSubmit={this.handleSubmit} ></div>
                <img src= {fondo} alt="El fondo"/>
                <img className="Logo" src= {logo} alt="El logo"/>
                <label className = "Label-Registracion">Crea tu cuenta</label>
            
                    <input
                        type="usuario" 
                        className="idusuario" 
                        placeholder="Ingrese nombre de usuario"
                        value={this.state.idusuario} onChange={this.handleChange} required
                    />

                <input 
                    type="password" 
                    className="Password"
                    placeholder="Ingresar contraseña" 
                    // value={this.state.contraseña} onChange={this.handleChange} required
                />
            
                <input 
                    type="password" 
                    className="repetirContraseña" 
                    placeholder="Repetir contraseña"
                    // value={this.state.contraseña} onChange={this.handleChange} required  
                />
        
                <button type="submit" className="btn-registrar">Crear</button>

            </form>
        );
    }

    }