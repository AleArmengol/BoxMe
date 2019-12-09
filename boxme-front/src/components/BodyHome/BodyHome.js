import React from 'react';
import MudanzaComponent from './MudanzaComponent';
import PopupHome from './PopupHome';
import { Container, Row, OverlayTrigger, Tooltip } from 'react-bootstrap';
import './BodyHome.css';
import Spinner from 'react-bootstrap/Spinner';
import mudanzacardcreate from '../../photos/mudanzacardcreate.jpg';

function renderTooltip(props) {
    return <Tooltip {...props}>¡Haz click para crear una Mudanza!</Tooltip>;
}

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
        const id = sessionStorage.getItem('idUsuario');
        console.log("id",id);
        const data = { "idUsuario": id };
        console.log("props id", data);

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
                        <Row>
                            <OverlayTrigger
                                placement="right"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltip}
                            >
                                <div className="card mb-3 popup-web" style={{ maxWidth: '540px', marginBottom: '7px', marginTop: '10px' }}>
                                    <img src={mudanzacardcreate} className="card-img" alt="..."></img>
                                    <div className="card-img-overlay">
                                        <div className="card-body row d-flex justify-content-center">
                                            <PopupHome />
                                        </div>
                                    </div>
                                </div>
                            </OverlayTrigger>
                        </Row>
                        {this.mostrarSpinner()}
                    </Container>
                </div>
                <div className="mr-2 popup-mobile position-absolute" style={{top: '90%', left: '90%'}} >
                    <PopupHome />
                </div>
            </div >
        );
    }
}

export default BodyHome;