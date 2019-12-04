import React from 'react';
import Menu from '../components/Navbar/Menu'
import BodyMudanza from '../components/BodyMudanza/BodyMudanza';


class MudanzaPage extends React.Component {
  render() {
    const id = this.props.match.params.id;
    console.log("id mudanza", this.props.match.params.id);
    return (
      <div>
        <Menu />
        <BodyMudanza
        idMud = {id} />
      </div>
    );
  }
}

export default MudanzaPage;