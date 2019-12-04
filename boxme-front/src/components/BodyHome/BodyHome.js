import React from 'react';
import MudanzaComponent from './MudanzaComponent';
import Popup from '../Popup/Popup';
import { Container, Row } from 'react-bootstrap';
import './BodyHome.css';
import Spinner from 'react-bootstrap/Spinner';

class BodyHome extends React.Component {
    constructor() {
        super();
        this.state = {
            mudanzas: [],
            loading: true,
        };
    }


    async componentDidMount() {
        const url = "http://localhost:8080/api/getMudanzas";
        const id = this.props.idUsu;
        const data = { "idUsuario": id };
        console.log("props id",data);

        const response = await fetch(url, {
            method: 'POST',
            mode: "cors",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        const resultado = await response.json();
        console.log("resultadoBD", resultado)
        this.setState({ mudanzas: resultado, loading: false });
        console.log("sacado de state", this.state.mudanzas[0]);
    }
    mostrarSpinner() {
        if (this.state.loading) {
            return (<Spinner animation="grow" size="sm"></Spinner>)

        }
        else {
            return (
                <div>
                    {this.state.mudanzas.map((mud, index) =>
                        <div key={mud.name + "-" + index}>
                            <Row className="ml-auto">
                                <MudanzaComponent
                                    title={mud.nombre}
                                    link={("/mudanza/").concat(mud.idMudanza[0])}
                                />
                            </Row>
                        </div>)}
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <div>
                    <Container className="mt-3">
                        <Row className="ml-auto">
                            <h3>Mis Mudanzas</h3>
                        </Row>
                        {this.mostrarSpinner()}
                    </Container>
                </div>
                <div>
                    <Popup
                        title="Crear Mudanza"
                        placeholder="Nombre de la Mudanza"
                    />
                </div>
            </div>
        );
    }
}

export default BodyHome;