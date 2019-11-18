import React from 'react';
import MudanzaComponent from './MudanzaComponent';
import Popup from '../Popup/Popup';
import { Container, Row } from 'react-bootstrap';
import './BodyHome.css';

class BodyHome extends React.Component {
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