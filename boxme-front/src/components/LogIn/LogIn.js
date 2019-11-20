import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
// import {Button} from 'react-bootstrap';
import axios from 'axios';
import fondo from '../../photos/fondo.png';
import logo from '../../photos/LogoCaja.png'
import './LogIn.css';

export default class LogIn extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            idusuario: "",
            contraseña:"",
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({
        [event.target.className]: event.target.value
    });
}
    handleSubmit(event){
        const{
            idusuario, 
            contraseña
        } = this.state;

        axios
        .post("https://localhost:3000/LogIn", 
        {
            user: {
                idusuario: idusuario,
                contraseña: contraseña,
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
                <label className = "Label-LogIn">Accede a tu cuenta</label>
            
                <input
                    type="usuario" 
                    className="idusuario" 
                    placeholder="Ingrese nombre de usuario" 
                    value={this.state.idusuario} onChange={this.handleChange} required 
                 />

                <input
                    type="password" 
                    pattern=".{8,}"
                    className="password"
                    placeholder="Ingresar contraseña" 
                    id="myInput"
                    // value={this.state.contraseña} onChange={this.handleChange} 
                 />
                <input 
                type="checkbox"
                onclick="myFunction()">
                </input>
                <button type="submit" variant="primary" className="btn-ingresar">Ingresar</button>
                <button type="button" className="btn-registro">Registrarme</button>
                
            </form>
        );
    }
    myFunction() {
        var x = document.getElementById("myInput");
        if (x.type === "password") {
          x.type = "text";
        } else {
          x.type = "password";
        }
      }
}
