import React from 'react';
import MudanzaComponent from './MudanzaComponent';
import Popup from '../Popup/Popup';
import { Container, Row } from 'react-bootstrap';
import './BodyHome.css';
import { ContactSupportOutlined } from '@material-ui/icons';
import Spinner from 'react-bootstrap/Spinner';

class BodyHome extends React.Component {
    state = {
        mudanzas: [],
        loading: true,
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
        console.log("resultadoBD",resultado)
        this.setState({ mudanzas: resultado, loading: false });
        console.log("sacado de state",this.state.mudanzas[0]);
    }
    mostrarSpinner()
    {
        if(this.state.loading)
        {
            return(<Spinner animation="grow" size="sm"></Spinner>)
            
        }
        else
        {
            return(
                //ACA VA EL MAP 
            <Row className="ml-auto">
                <MudanzaComponent
                    title= {this.state.mudanzas[0].nombre}
                    link="/mudanza"
                />
            </Row>
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