import React from 'react';

function MudanzaComponent(props) {
    return (
        <div class="card mb-3" style={{maxWidth: '540px', marginBottom: '7px', marginTop: '10px'}}>
            <div class="row no-gutters">
                <div class="col-md-4">
                    <img src={props.imgsrc} class="card-img" alt="..."/>
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">{props.title}</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MudanzaComponent