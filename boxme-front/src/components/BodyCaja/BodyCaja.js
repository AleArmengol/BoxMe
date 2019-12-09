import React from 'react';
import PopupCaja from './PopupCaja';
import { Container, Button } from 'react-bootstrap';
import TableCaja from './TableCaja';
import Spinner from 'react-bootstrap/Spinner';


class BodyCaja extends React.Component {

    constructor() {
        super();
        this.state = {
            items: [],
            loading: true,
        };
    }


    async componentDidMount() {
        const url = "http://localhost:8080/api/getItems";
        const id = this.props.idCaja;
        const data = { "idCaja": id };
        console.log("props id", data);

        const response = await fetch(url, {
            method: 'POST',
            mode: "cors",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        const resultado = await response.json();
        console.log("resultadoBD", resultado)
        this.setState({ items: resultado, loading: false });
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
                <div>
                    <Container className="mt-3">
                        {this.mostrarSpinner()}
                    </Container>
                </div>
                <div>
                    <div>
                        <PopupCaja
                        className="mr-2 popup-mobile position-absolute" style={{top: '90%', left: '90%'}}
                        id={this.props.idCaja}/>
                    </div>
                    <div>
                        <Button style={{ marginTop: '5px', marginLeft: '5px' }} href="/mudanza">Volver a Mis Cajas</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default BodyCaja;