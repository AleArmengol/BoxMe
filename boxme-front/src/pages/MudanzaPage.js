import React from 'react';
import Menu from '../components/Menu'
import MudanzaComponent from '../components/MudanzaComponent'

function MudanzaPage() {
    return (
      <div>
        <Menu/>
        <MudanzaComponent
        title='Saavedra - Urquiza'
        />
        <MudanzaComponent
        title='Olivos - Caballito'
        />
        <MudanzaComponent
        title='Flores - Devoto'
        />
      </div>   
    );
  }
  
  export default MudanzaPage