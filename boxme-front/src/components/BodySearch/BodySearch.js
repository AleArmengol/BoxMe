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
        const data = {
            "idMudanza": id,
            "busqueda": busq,
        };
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
    }
    mostrarSpinner() {
        if (this.state.loading) {
            return (<Spinner animation="grow" size="sm"></Spinner>)

        }
        else {
            return (
                <div>
                    <div>
                        <Row className="ml-auto">
                            <h4>Cajas</h4>
                        </Row>
                        {this.state.encontrados[0].map((caj, index) =>
                            <div key={caj.name + "-" + index}>
                                <Row className="ml-auto">
                                    <Col>
                                        <CajaComponent
                                            link={("/caja/").concat(caj.idCaja)}
                                            nombre={caj.nombre}
                                        />
                                    </Col>
                                </Row>
                            </div>)}
                    </div>
                    <div>
                        <Row className="ml-auto">
                            <h4>Items</h4>
                        </Row>
                        {this.state.encontrados[1].map((it, index) =>
                            <div key={it.name + "-" + index}>
                                <Row className="ml-auto">
                                    <TableCaja
                                        item={it.nombre}
                                    />
                                </Row>
                            </div>)}
                    </div>
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
                    {this.mostrarSpinner()}
                </Container>
            </div>
        );
    }
}

export default BodySearch;