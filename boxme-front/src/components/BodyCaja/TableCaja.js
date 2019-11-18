import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { DeleteOutline, Edit } from '@material-ui/icons';
import './TableCaja.css';

function TableCaja(props) {
    return (
        <div>
            <ListGroup>
                <ListGroup.Item style={{display: 'flex'}}>
                    {props.item}
                    <div className="ml-auto">
                        <Button style={{marginRight:'10px'}}>
                          <DeleteOutline/>  
                        </Button>
                        <Button>
                          <Edit/>  
                        </Button>
                    </div>
                </ListGroup.Item>
            </ListGroup>
        </div>
    );
}

export default TableCaja;