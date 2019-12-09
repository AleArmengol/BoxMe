import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import box from '../../photos/box.png';
import './Menu.css';
import { Redirect } from 'react-router-dom';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        buscar: '',
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
    
    console.log(this.state.buscar);

    this.setState({ redirect: true });
}



  render() {

    const { redirect } = this.state;
    const { buscar } = this.state;

    if(redirect){
        return <Redirect to={("/busqueda/").concat(buscar)} />;
    }

    return (
      <Navbar className="navbar-style" expand="lg">
        <Navbar.Brand href="/home">
          <img
            alt=""
            src={box}
            width="35"
            height="35"
            className="d-inline-block align-top"
          />
          {'BoxMe!'}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav className="buscar-mobile">
          <Form inline>
            <FormControl name="buscar" onChange={this.handleChange} type="search" placeholder="Buscar" className="col-8 mr-2"/>
            <Button onClick={this.handleSubmit} className="col-2">Ir!</Button>
          </Form>
        </Nav>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/login">Cuenta</Nav.Link>
            {/*Cambiar con el Session/Local Storage que en lugar de que diga Cuenta diga: ¡Bienvenido y el nombre de usuario!*/}
            {/*<Nav.Link>¡Bienvenido nombre de usuario!</Nav.Link>*/}
            <Nav.Link href="/home">Mis Mudanzas</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <div className="buscar-web">
          <Form inline>
            <FormControl  name="buscar" onChange={this.handleChange} type="search" placeholder="Buscar" className="mr-sm-2" />
            <Button onClick={this.handleSubmit}>Ir!</Button>
          </Form>
        </div>
      </Navbar>
    );
  }
}

export default Menu;