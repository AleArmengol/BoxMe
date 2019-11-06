import React from 'react';
import {Paper} from '@material-ui/core';

function ItemComponent(props) {
    return (
        <div>
            <Paper style={{ backgroundColor: "#ffe8c4", border: "2px solid #FFCE8D", marginBottom:"2px" }}>{props.nombre}</Paper>
        </div>
    )
}

export default ItemComponent