import React from 'react';
import Menu from '../components/Navbar/Menu'
import BodySearch from '../components/BodySearch/BodySearch';

class SearchPage extends React.Component {
  render() {
    const buscar = this.props.match.params.buscar;
    console.log("buscar", this.props.match.params.buscar);
    return (
      <div>
        <Menu />
        <BodySearch
          busqueda={buscar} />
      </div>
    );
  }
}

export default SearchPage;