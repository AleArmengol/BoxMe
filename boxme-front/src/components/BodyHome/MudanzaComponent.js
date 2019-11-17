import React from 'react';
import mudanzacard from '../../photos/mudanzacard.jpg';
import './BodyHome.css';

//Ver como importar imagen para background de la card

function MudanzaComponent(props) {
    return (
        <div class="card mb-3" style={{ maxWidth: '540px', marginBottom: '7px', marginTop: '10px' }}>
            <div class="row no-gutters">
                <div class="card-body">
                    <h5 class="card-title" href={props.link}>{props.title}</h5>
                </div>
            </div>
        </div>
    )
}

export default MudanzaComponent;