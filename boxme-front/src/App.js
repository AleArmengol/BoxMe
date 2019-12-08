import React from 'react';
import LogInPage from './pages/LogInPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import CajaPage from './pages/CajaPage';
import MudanzaPage from './pages/MudanzaPage';
import SearchPage from './pages/SearchPage';
import InfoPage from './pages/InfoPage';
import loadingimage from './photos/loadingimage.png';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const routing = (
  <Router>
    <div>
      <Route path="/home" component={HomePage} />
      <Route exact path="/" component={HomePage} />
      <Route path="/busqueda/:buscar" component={SearchPage} />
      <Route path="/login" component={LogInPage} />
      <Route path="/signup" component={SignUpPage} />
      <Route path="/mudanza/:id" component={MudanzaPage} />
      <Route path="/caja/:id" component={CajaPage}/>
      <Route path="/info" component={InfoPage}/>
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
      return <img scr={loadingimage} alt="..."></img>; //Ver por que no esta llamando a la imagen de carga
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