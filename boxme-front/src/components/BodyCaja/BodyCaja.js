import React from 'react';
import Popup from '../Popup/Popup';
import { Container} from 'react-bootstrap';
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
                <div style={{ display: 'flex', justifyContent: 'right', marginRight: '50px' }}>
                    <Popup
                        title="Crear Item"
                        placeholder="Nombre del Item"
                    />
                </div>
            </div>
        );
    }
}

export default BodyCaja;