import React from "react";
import box from "../photos/box.png";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Popup from "./Popup";
import CajaComponent from "./CajaComponent";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  container: {
    margin: "auto",
    marginTop: 200
  }
}));

class Body extends React.Component {
  state = {
    nombre: "Saavedra - Urquiza",
    openPopup: false, //estado del popup si se tiene que abrir o no
    cajas: null, //cajas que poseemos, es un array
    existenCajas: false,
    msj: ""
  };

  componentDidMount() {
    //cuando llamo al componente primero realiza esto y despues renderiza
    fetch("/cajas/obtener")
      .then(response => {
        if (response.status === 200) {
          // si es 200 respuesta satisfactoria
          this.setState({ existenCajas: true }); // seteo que existen cajas, se usa como flags
          return response.json();
        } else {
          this.setState({ existenCajas: false });
          return response.json();
        }
      })
      .then(result => {
        if (this.state.existenCajas) {
          var cajas;
          cajas = JSON.parse(result); //transformo el json a un objeto
          this.setState({ cajas: cajas }); //la respuesta me va a devolver cajas y las guardo en la variable cajas del estado
        } else {
          this.setState({ msj: result });
        }
      });
  }

  handleOpenPopup = () => {
    this.setState({ openPopup: true });
  };

  handleClosePopup = () => {
    this.setState({ openPopup: false });
  };

  render() {
    const classes = useStyles;
    const { cajas, msj } = this.state; //busca en el componente el estado, y trae las cajas y el mensaje

    return (
      <Container fixed style={{ marginTop: 100 }}>
        <Grid container spacing={3}>
          {/*Espacio entre cajas leer de la doc https://material-ui.com/api/grid/ */}
          {cajas /*Si cajas es != null entro al ? else :     , .map recorre el array de cajas y adentro de los () defino una funcion donde el item es cada caja, y por cada item se van a visualizar en la interfaz */ ? (
            cajas.map(item => (
              <Grid item xs={4}>
               {/*El CajaComponent debe recibir el link y el nombre del json y estar dentro de un for each por la coleccion de jsons*/}
                <CajaComponent
                  link='/caja'
                  nombre='Caja Cocina'
                  />
              </Grid>
            ))
          ) : (
            <text>{msj}</text>
          )}
        </Grid>
        <Popup open={this.state.openPopup} close={this.handleClosePopup} />
      </Container>
    );
  }
}

export default Body;
