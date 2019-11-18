import React from 'react';
import box from '../../photos/box.png';
import {Button} from 'react-bootstrap';
import { DeleteOutline, Edit } from '@material-ui/icons';

function CajaComponent(props) {
    return (
        <div>
            <div>
                <img src={box} alt={"Caja"} href={props.link}></img>
                <a style={{color:'#6F461F'}} href={props.link}>{props.nombre}</a>   
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
    )
}

export default CajaComponent;