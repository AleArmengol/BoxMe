import React from 'react';
// import LogInPage from './pages/LogInPage';
// import RegistracionPage from './pages/RegistracionPage';
import HomePage from './pages/HomePage';
import CajaPage from './pages/CajaPage';
import MudanzaPage from './pages/MudanzaPage';
import loadingimage from './photos/loadingimage.png';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={HomePage} />
      <Route path="/home" component={HomePage} />
      {/*<Route path="/busqueda" component={Busqueda} />*/}
      {/* <Route path="/login" component={LogInPage} />
      <Route path="/registracion" component={RegistracionPage} /> */}
      <Route path="/mudanza" component={MudanzaPage} />
      <Route path="/caja" component={CajaPage}/>
    </div>
  </Router>
)


class App extends React.Component {
  state = {
    loading: true
  };

  componentDidMount() {
    demoAsyncCall().then(() => this.setState({ loading: false }));
  }

  render() {
    const { loading } = this.state;

    if (loading) {
      return <img scr={loadingimage}></img>; //Ver por que no esta llamando a la imagen de carga
    } else {
      return (
        routing
      );
    }
  }
}

function demoAsyncCall() {
  return new Promise((resolve) => setTimeout(() => resolve(), 2500));
}

export default App;