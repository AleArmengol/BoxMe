import React from 'react';
import MudanzaComponent from './MudanzaComponent';
import Popup from '../Popup/Popup';
import { Container, Row } from 'react-bootstrap';
import './BodyHome.css';
import { ContactSupportOutlined } from '@material-ui/icons';

class BodyHome extends React.Component {
    state = {
        loading: true,
        mudanzas: [],
    };


    async componentDidMount() {
        const url = "http://localhost:8080/api/getMudanzas";
        const data = { "idUsuario": "Ernesto98" };
       
        const response = await fetch(url, {
                method: 'POST',
                mode: "cors",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const resultado = await response.json();
            this.setState({mudanzas: resultado});
            console.log(this.state.mudanzas);
    }


    render() {
        return (
            <div>
                <div>
                    <Container className="mt-3">
                        <Row className="ml-auto">
                            <h3>Mis Mudanzas</h3>
                        </Row>
                        <Row className="ml-auto">
                            <MudanzaComponent
                                title="Altillo"
                                link="/mudanza"
                            />
                        </Row>
                        <Row className="ml-auto">
                            <MudanzaComponent
                                title="Saavedra-Urquiza"
                                link="/mudanza"
                            />
                        </Row>
                        <Row className="ml-auto">
                            <MudanzaComponent
                                title="Devoto-Campana"
                                link="/mudanza"
                            />
                        </Row>
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