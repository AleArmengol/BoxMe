import React from 'react';
import box from '../../photos/box.png';

function CajaComponent(props) {
    return (
        <div>
            <img src={box} alt={"Caja"} href={props.link}></img>
            <a style={{color:'#6F461F'}} href={props.link}>{props.nombre}</a>
        </div>
    )
}

export default CajaComponent;