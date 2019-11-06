import React from 'react';
import Menu from '../components/Menu'
import MudanzaComponent from '../components/MudanzaComponent'
import Popup from '../components/Popup';

class MudanzaPage extends React.Component {
  state = {
    openPopup: false
  };

  handleOpenPopup = () => {
    this.setState({ openPopup: true });
  };

  handleClosePopup = () => {
    this.setState({ openPopup: false });
  };

  render(){  
  return (
    <div>
      <Menu />
      <MudanzaComponent
        title='Saavedra - Urquiza'
        link='/Mudanza'
      />
      <MudanzaComponent
        title='Olivos - Caballito'
        link='/Mudanza'
      />
      <MudanzaComponent
        title='Flores - Devoto'
        link='/Mudanza'
      />
      <Popup open={this.state.openPopup} close={this.handleClosePopup} />
    </div>
  );
}
}

export default MudanzaPage