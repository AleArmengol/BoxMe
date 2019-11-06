import React from 'react';
import MudanzaPage from './pages/MudanzaPage';
import CajaPage from './pages/CajaPage';
import ItemPage from './pages/ItemPage';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={MudanzaPage} />
      <Route path="/home" component={MudanzaPage} />
      {/*<Route path="/busqueda" component={Busqueda} />*/}
      {/*<Route path="/login" component={LogIn} />*/}
      {/*<Route path="/signup" component={SignUp} />*/}
      <Route path="/caja" component={ItemPage} />
      <Route path="/mudanza" component={CajaPage}/>
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
      return <div className="loader"></div>;
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