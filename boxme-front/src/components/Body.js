import React from 'react';
import box from '../photos/box.png'

class Body extends React.Component {
    state = { nombre: 'Saavedra - Urquiza' };
    render() {
        return (
            <div>
                <h3>{this.state.nombre}</h3 >
                <img src={box} alt={'caja'}></img>
                <p>Cocina 1</p>
            </div>
         )
    }
}

export default Body