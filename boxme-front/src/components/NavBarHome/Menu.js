import React from "react";
import { Navbar, Nav } from 'react-bootstrap';
import box from '../../photos/box.png';
import './Menu.css';

class Menu extends React.Component {
  render() {
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
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/login">Cuenta</Nav.Link>
            {/*Cambiar con el Session/Local Storage que en lugar de que diga Cuenta diga: ¡Bienvenido y el nombre de usuario!*/}
            {/*<Nav.Link>¡Bienvenido nombre de usuario!</Nav.Link>*/}
            <Nav.Link href="/home">Mis Mudanzas</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Menu;