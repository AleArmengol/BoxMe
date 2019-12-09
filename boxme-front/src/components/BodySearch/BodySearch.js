import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CajaComponent from '../BodyMudanza/CajaComponent';
import TableCaja from '../BodyCaja/TableCaja';
import './BodySearch.css';
import Spinner from 'react-bootstrap/Spinner';

class BodySearch extends React.Component { 
    constructor() {
        super();
        this.state = {
            encontrados: [],
            loading: true,
        };
    }


    async componentDidMount() {
        const url = "http://localhost:8080/api/buscarEnCajas";
        const id = sessionStorage.getItem('idMudanza');
        const busq = this.props.busqueda;
        const data = { "idMudanza": id,
                        "busqueda": busq,};
        console.log("data busqueda", data);

        const response = await fetch(url, {
            method: 'POST',
            mode: "cors",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        const resultado = await response.json();
        console.log("resultadoBD", resultado)
        this.setState({ encontrados: resultado, loading: false });
        console.log("sacado de state", this.state.items[0]);
    }
    mostrarSpinner() {
        if (this.state.loading) {
            return (<Spinner animation="grow" size="sm"></Spinner>)

        }
        else {
            return (
                <div>
                    {this.state.items.map((it, index) =>
                        <div key={it.name + "-" + index}>
                            <TableCaja
                                item={it.nombre}
                            />
                        </div>)}
                </div>
            )
        }
    }



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