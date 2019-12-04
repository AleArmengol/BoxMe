import React from 'react';
import Menu from '../components/Navbar/Menu.js'
import BodyCaja from '../components/BodyCaja/BodyCaja';

class CajaPage extends React.Component {
  render() {
    const id = this.props.match.params.id;
    console.log("id caja", this.props.match.params.id);
    return (
      <div>
        <Menu />
        <BodyCaja
          idCaja={id} />
      </div>
    );
  }
}

export default CajaPage;