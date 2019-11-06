import React, { Component } from 'react';
import Popup from './Popup';
import { Container, Grid } from '@material-ui/core';
import ItemComponent from './ItemComponent';

class BodyItem extends React.Component {
    state = {
        openPopup: false
    };

    handleOpenPopup = () => {
        this.setState({ openPopup: true });
    };

    handleClosePopup = () => {
        this.setState({ openPopup: false });
    };

    render() {
        return (
            <div>
                <Container fixed style={{ marginTop: '50px' }}>
                    <Grid direction="row">
                        <ItemComponent
                            nombre='Libro'
                        />
                        <ItemComponent
                            nombre='Sábanas'
                        />
                        <ItemComponent
                            nombre='Platos y Vasos'
                        />
                        <ItemComponent
                            nombre='Rompezabezas Big Ben'
                        />
                    </Grid>
                    <Popup open={this.state.openPopup} close={this.handleClosePopup} />
                </Container>
            </div>
        );
    }
}

export default BodyItem;