import React from 'react';
import mudanzacard from '../../photos/mudanzacard.jpg';
import { DeleteOutline, Edit } from '@material-ui/icons';
import {Button} from 'react-bootstrap';
import './BodyHome.css';

//No se por que no funciona el href, si alguien sabe porfa corrijalo

function MudanzaComponent(props) {
    return (
        <div class="card mb-3" style={{ maxWidth: '540px', marginBottom: '7px', marginTop: '10px' }}>
            <img src={mudanzacard} class="card-img" alt="..."></img>
            <div className="card-img-overlay">
                <div class="card-body">
                    <h4 class="card-title" href={props.link}>{props.title}</h4>
                </div>
                <div style={{paddingLeft:'20px'}}>
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