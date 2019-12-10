import React from 'react';
import mudanzacard from '../../photos/mudanzacard.jpg';
import { DeleteOutline, Edit } from '@material-ui/icons';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import './BodyHome.css';

function renderTooltip(props) {
    return <Tooltip {...props}>¡Abreme para ver mis cajas!</Tooltip>;
}


class MudanzaComponent extends React.Component {

    constructor(props) {
        super(props);
    }


    clickInfo(){
        sessionStorage.setItem("idMudanza", this.props.idMudanza);
        sessionStorage.setItem("nombreMudanza", this.props.nombre);
        console.log("hola1");
    };

    


    render() {
        return (
            <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip}
            >
                <div className="card mb-3" style={{ maxWidth: '540px', marginBottom: '7px', marginTop: '10px' }}>
                    <img src={mudanzacard} className="card-img" alt="..."></img>
                    <div className="card-img-overlay">
                        <div className="card-body">
                            <a className="card-title" href={this.props.link} onClick={this.clickInfo.bind(this)}>{this.props.title}</a>
                        </div>
                        <div className="padding-button">
                            <Button style={{ marginRight: '10px' }}>
                                <DeleteOutline />
                            </Button>
                            <Button>
                                <Edit />
                            </Button>
                        </div>
                    </div>
                </div>
            </OverlayTrigger>
        )
    }
}
export default MudanzaComponent;