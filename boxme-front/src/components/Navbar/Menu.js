import React from "react";
import {Navbar, Nav, Form, FormControl} from 'react-bootstrap';
import './Menu.css';

class Menu extends React.Component {
  render() {
    return (
      <Navbar className="navbar-style" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav className="buscar-mobile">
          <Form inline>
            <FormControl type="text" placeholder="Buscar" className="mr-auto" />
          </Form>
        </Nav>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">BoxMe!</Nav.Link>
            <Nav.Link href="#link">Mi Cuenta</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <div className="buscar-web">
          <Form inline>
            <FormControl type="text" placeholder="Buscar" className="mr-auto" />
          </Form>
        </div>
      </Navbar>
    );
  }
}

export default Menu;