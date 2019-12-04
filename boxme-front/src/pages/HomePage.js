import React from 'react';
import Menu from '../components/Navbar/Menu';
import BodyHome from '../components/BodyHome/BodyHome';

class HomePage extends React.Component {
  render() {
    const id = this.props.match.params.id;
    console.log("id usuario", this.props.match.params.id);
    return (
      <div>
        <Menu />
        <BodyHome
        idUsu={id} />
      </div>
    );
  }
}

export default HomePage;