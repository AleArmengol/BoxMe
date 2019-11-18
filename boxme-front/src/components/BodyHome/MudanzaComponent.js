import React from 'react';
import mudanzacard from '../../photos/mudanzacard.jpg';
import { DeleteOutline, Edit } from '@material-ui/icons';
import {Button} from 'react-bootstrap';
import './BodyHome.css';

function MudanzaComponent(props) {
    return (
        <div className="card mb-3" style={{ maxWidth: '540px', marginBottom: '7px', marginTop: '10px' }}>
            <img src={mudanzacard} className="card-img" alt="..."></img>
            <div className="card-img-overlay">
                <div className="card-body">
                    <a className="card-title" href={props.link}>{props.title}</a>
                </div>
                <div className="padding-button">
                    <Button style={{marginRight:'10px'}}>
                      <DeleteOutline/>  
                    </Button>
                    <Button>
                      <Edit/>  
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default MudanzaComponent;