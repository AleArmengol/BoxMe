import React from 'react'
import CajaComponent from './CajaComponent'
import Popup from "./Popup";
import {Container, Grid} from '@material-ui/core';

class Cajas extends React.Component{
    render() {
        return (
          <Container fixed style={{ marginTop: 100 }}>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <CajaComponent
                      link=''
                      nombre=''
                      />
                </Grid>
            </Grid>
            <Popup open={this.state.openPopup} close={this.handleClosePopup} />
          </Container>
        );
    }

}

export default Cajas;