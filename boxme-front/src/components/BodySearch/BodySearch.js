import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CajaComponent from '../BodyMudanza/CajaComponent';
import TableCaja from '../BodyCaja/TableCaja';
import './BodySearch.css';

class BodySearch extends React.Component {
    render() {
        return (
            <div>
                <Container className="mt-3">
                    <Row className="ml-auto">
                        <h3>Resultados de la Busqueda</h3>
                    </Row>
                    <Row className="ml-auto">
                        <h4>Cajas</h4>
                    </Row>
                    <Row className="ml-auto">
                        <Col>
                            <CajaComponent
                                link="/caja"
                                nombre="Varios"
                            />
                        </Col>
                        <Col>
                            <CajaComponent
                                link="/caja"
                                nombre="Utiles"
                            />
                        </Col>
                    </Row>
                    <Row className="ml-auto">
                        <h4>Items</h4>
                    </Row>
                    <Row className="ml-auto">
                        <TableCaja
                            item="Autito de Coleccion"
                        />
                        <TableCaja
                            item="Vinilo de los Beatles"
                        />
                        <TableCaja
                            item="Vajilla de la Abuela"
                        />
                    </Row>
                </Container>
            </div>
        );
    }
}

export default BodySearch;