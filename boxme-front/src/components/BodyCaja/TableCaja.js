import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { DeleteOutline, Edit } from '@material-ui/icons';

function TableCaja(props) {
    return (
        <Table responsive>
            <tr>
                <td>{props.item}</td>
                <td>
                    <Button>
                        <Edit />
                    </Button>
                </td>
                <td>
                    <Button>
                        <DeleteOutline />
                    </Button>
                </td>
            </tr>
        </Table>
    );
}

export default TableCaja;