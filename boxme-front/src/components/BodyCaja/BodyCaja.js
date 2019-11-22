import React from 'react';
import Popup from '../Popup/Popup';
import { Container, Button } from 'react-bootstrap';
import TableCaja from './TableCaja';

class BodyCaja extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <Container className="mt-3">
                        <TableCaja
                            item="Autito de Coleccion"
                        />
                        <TableCaja
                            item="Vinilo de los Beatles"
                        />
                        <TableCaja
                            item="Vajilla de la Abuela"
                        />
                    </Container>
                </div>
                <div>
                    <div>
                        <Popup
                            title="Crear Item"
                            placeholder="Nombre del Item"
                        />
                    </div>
                    <div>
                        <Button style={{marginTop:'5px', marginLeft:'5px'}} href="/mudanza">Volver a Mis Cajas</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default BodyCaja;