const Connection = require("tedious").Connection; // requiere la conexion y la guarda en la variable connection.
var express = require("express"); //express es framework que permite simplificar conexiones.
var app = express(); //app es el objeto en el que se basa el "servidor"
let tedious = require("tedious"); //importa tedious, tedious es la libreria para manejar sqlServer.
var bodyParser = require("body-parser");
var Request = require("tedious").Request;
var TYPES = require("tedious").TYPES;
const router = express.Router();
var sa = require("superagent");
var sql = require("mssql");

var config = {
  //variable donde guardamos la conexion a la base de datos.
  server: "localhost",
  authentication: {
    type: "default",
    options: {
      userName: "sa",
      password: "alexis1398" //CAMBIAR A LA CONTRASEÑA DE CADA UNO
    }
  },
  options: {
    //puede que generer error, comentar encrypt si es asi
    // If you are on Microsoft Azure, you need encryption:
    encrypt: true,
    database: "BoxMeDB" //nombre de la base de datos creada en sql CADA UNO PONGA SU BD
  }
};

const connection = new Connection(config); // a la conexion se le pasa la configuracion definida arriba
connection.on("connect", function(err) {
  //para que se conecte, si no conecta tira error por consola
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to SQL");
  }
});

app.set("port", process.env.PORT || 8080); //defino valor del puerto

//Middlewares
app.use(express.json()); //para enviar y recibir usa json

//Inicializar el srv
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`); //muestra por consola que puerto usa
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

sql.connect(config, function(err) {
  if (err) {
    console.log("error a conectar la base de datos");
  } else {
    console.log("Te conectaste satisfactoriamente a la bd!");
  }
});

app.get("/api/getMudanzas", function(req, res) {
  var idUsuario = req.body.idUsuario;
  idUsuario = "'" + idUsuario + "'"; //se le agregan las comillas simples para armar la query correctamente
  console.log(idUsuario);
  var query = "SELECT * FROM UsuariosMudanza WHERE idUsuario =" + idUsuario;
  console.log("QUERY: " + query);
  var request = new sql.Request();
  request.query(query, function(err, recordset) {
    if (err) {
      console.log(err);
    } else {
      res.send(recordset.recordset);
    }
  });
});

app.get("/api/getCajas", function(req, res) {
  var idMudanza = req.body.idMudanza;
  obtenerCajas(idMudanza, res);
});

function pause(millis) {
  var date = new Date();
  var curDate = null;
  do {
    curDate = new Date();
  } while (curDate - date < millis);
}

app.delete("/api/deleteCaja", function(req, res) {
  vaciarYEliminarCaja(req, res);
});

app.delete("/api/deleteMudanza", function(req, res) {
  var idMudanza = req.body.idMudanza;
  let cajas;

  //Seleccionamos todas las cajas de esa mudanza
  var querySelectCajas = "SELECT * FROM Cajas WHERE idMudanza =" + idMudanza;
  var request = new sql.Request();
  request.query(querySelectCajas, function(err, recordset) {
    if (err) {
      console.log(err);
    } else {
      cajas = recordset.recordset;
      for (iterador in cajas) {
        idCaja = cajas[iterador].idCaja;
        vaciarYEliminarCaja(idCaja);
      }

      //Eliminamos las cajas a los usuarios en (UsuariosMudanza)
      var queryDeleteUsuariosMudanza =
        "DELETE FROM UsuariosMudanza WHERE idMudanza =" + idMudanza;
      var request = new sql.Request();
      request.query(queryDeleteUsuariosMudanza, function(err, recordset) {
        if (err) {
          console.log("Error al eliminar UsuariosMudanza");
        } else {
          // //Ahora eliminamos la mudanza
          var queryDeleteMudanza =
            "DELETE FROM Mudanzas WHERE idMudanza =" + idMudanza;
          var request = new sql.Request();
          request.query(queryDeleteMudanza, function(err, recordset) {
            if (err) {
              console.log("Error al eliminar mudanza");
            } else {
              res.send("Se elimino correctamente la mudanza");
            }
          });
        }
      });
    }
  });
});

app.get("/api/getItems", function(req, res) {
  var idCaja = req.body.idCaja;
  idCaja = "'" + idCaja + "'"; //se le agregan las comillas simples para armar la query correctamente
  var query = "SELECT * FROM Items WHERE idCaja =" + idCaja;
  var request = new sql.Request();
  request.query(query, function(err, recordset) {
    if (err) {
      console.log(err);
    } else {
      res.send(recordset.recordset);
    }
  });
});

app.get("/api/verificarLogIn", function(req, res) {
  var nombreUsuario = req.body.idUsuario;
  idUsuario = "'" + nombreUsuario + "'";
  var password = req.body.password;
  password = "'" + password + "'";
  var query =
    "SELECT * FROM Usuarios WHERE idUsuario =" +
    idUsuario +
    "AND contraseña =" +
    password;
  var request = new sql.Request();
  request.query(query, function(err, recordset) {
    if (err) {
      res.send("Error al verificar LogIn");
    } else {
      if (recordset.recordset.length === 1) {
        res.send("success");
      } else {
        res.send("El usuario o contraseña ingresados no son correctos");
      }
    }
  });
});

app.get("/api/registrarUsuario", function(req, res) {
  var nombreUsuario = req.body.idUsuario;
  idUsuario = "'" + nombreUsuario + "'";
  var password = req.body.password;
  password = "'" + password + "'";
  var query = "SELECT * FROM Usuarios WHERE idUsuario =" + idUsuario;
  var request = new sql.Request();
  request.query(query, function(err, recordset) {
    if (err) {
      console.log("Error al verificar usuario");
    } else {
      if (recordset.recordset.length === 1) {
        res.send("El usuario ingresado ya existe");
      } else {
        var queryRegistrar =
          "INSERT INTO Usuarios VALUES(" + idUsuario + "," + password + ")";
        var requestRegistrar = new sql.Request();
        requestRegistrar.query(queryRegistrar, function(err, recordset) {
          if (err) {
            res.send("Error al registrar usuario");
          } else {
            res.send("success");
          }
        });
      }
    }
  });
});

app.post("/api/insertarCaja", function(req, res) {
  var nombre = req.body.caja;
  request = new Request("INSERT Cajas (nombre) VALUES (@nombre)", function(
    error
  ) {
    if (error) {
      console.log(error);
    }
  });
  request.addParameter("nombre", TYPES.VarChar, nombre);
  connection.execSql(request);
  res.end("Success");
});

app.post("/api/insertarItem", function(req, res) {
  var idCaja = req.body.idCaja;
  var nombre = req.body.nombre;
  var cant = req.body.cant;
  var request = new Request(
    "INSERT INTO Items (idCaja,nombre, cant) VALUES (@idCaja, @nombre, @cant)",
    function(error) {
      if (error) {
        console.log(error);
      }
    }
  );
  request.addParameter("idCaja", TYPES.VarChar, idCaja);
  request.addParameter("nombre", TYPES.VarChar, nombre);
  request.addParameter("cant", TYPES.Int, cant);
  connection.execSql(request);
  res.end("Success");
});

app.delete("/api/deleteItemByNombre", function(req, res) {
  var nombre = req.body.nombre;
  request = new Request("DELETE FROM Items WHERE nombre = @nombre", function(
    error
  ) {
    if (error) {
      console.log(error);
    }
  });
  request.addParameter("nombre", TYPES.VarChar, nombre);
  connection.execSql(request);
  res.end("Success");
});

app.delete("/api/deleteItemById", function(req, res) {
  var idItem = req.body.idItem;
  console.log(idItem);
  request = new Request("DELETE FROM Items WHERE idItem = @idItem", function(
    error
  ) {
    if (error) {
      console.log(error);
    }
  });
  request.addParameter("idItem", TYPES.VarChar, idItem);
  connection.execSql(request);
  res.end("Success");
});

app.put("/api/updateNombreItem", function(req, res) {
  var nombre = req.body.nombre;
  var idItem = req.body.idItem;
  console.log(nombre);
  console.log(idItem);
  request = new Request(
    "UPDATE Items SET nombre = @nombre WHERE idItem= @idItem",
    function(error) {
      if (error) {
        console.log(error);
      }
    }
  );
  request.addParameter("nombre", TYPES.VarChar, nombre);
  request.addParameter("idItem", TYPES.VarChar, idItem);
  connection.execSql(request);
  res.end("Success");
});

app.put("/api/updateCantidadItem", function(req, res) {
  var cantidad = req.body.cantidad;
  var idItem = req.body.idItem;
  console.log(nombre);
  console.log(idItem);
  console.log(cantidad);
  request = new Request(
    "UPDATE Items SET cantidad = @cantidad WHERE idItem= @idItem",
    function(error) {
      if (error) {
        console.log(error);
      }
    }
  );
  request.addParameter("cantidad", TYPES.Int, cantidad);
  request.addParameter("idItem", TYPES.VarChar, idItem);
  connection.execSql(request);
  res.end("Success");
});

app.put("/api/updateNombreCaja", function(req, res) {
  var nombre = req.body.nombre;
  var idCaja = req.body.idCaja;
  console.log(nombre);
  console.log(idCaja);
  request = new Request(
    "UPDATE Cajas SET nombre = @nombre WHERE idCaja= @idCaja",
    function(error) {
      if (error) {
        console.log(error);
      }
    }
  );
  request.addParameter("nombre", TYPES.VarChar, nombre);
  request.addParameter("idCaja", TYPES.VarChar, idCaja);
  connection.execSql(request);
  res.end("Success");
});

app.put("/api/updateNombreMudanzas", function(req, res) {
  var nombre = req.body.nombre;
  var idMudanza = req.body.idMudanza;
  request = new Request(
    "UPDATE Mudanzas SET nombre = @nombre WHERE idMudanza= @idMudanza",
    function(error) {
      if (error) {
        console.log(error);
      }
    }
  );
  request.addParameter("nombre", TYPES.VarChar, nombre);
  request.addParameter("idMudanza", TYPES.VarChar, idCaja);
  connection.execSql(request);
  res.end("Success");
});

function obtenerCajas(idMudanza, res) {
  console.log("RES: " + res);
  var query = "SELECT * FROM Cajas WHERE idMudanza = " + idMudanza;
  var request = new sql.Request();
  console.log(query);
  request.query(query, function(err, recordset) {
    if (err) {
      console.log(err);
    } else {
      //console.log("RECORDSET CAJA " + recordset.recordset[0].nombre);
      //console.log("I am ready");
      if (res != null) {
        console.log("Cajas: " + recordset.recordset[0].nombre);
        console.log("RES2: " + res);
        res.send(recordset.recordset);
      } else {
        console.log(recordset.recordset[0].nombre);
        return recordset.recordset;
      }
    }
  });
}

app.get("/api/buscarEnCajas", function(req, res) {
  var idMudanzaAux = req.body.idMudanza;
  var idMudanza = req.body.idMudanza;
  idMudanza = "'" + idMudanza + "'";
  var busqueda = req.body.busqueda;
  busqueda = busqueda;
  var queryBuscarCaja =
    "SELECT * FROM Cajas WHERE nombre LIKE '%" +
    busqueda +
    "%' AND idMudanza =" +
    idMudanza;
  var requestBusquedaCaja = new sql.Request();
  requestBusquedaCaja.query(queryBuscarCaja, function(err, recordsetCaja) {
    if (err) {
      res.send(
        "Hubo un error al buscar las cajas, intentelo de nuevo mas tarde"
      );
    } else {
      var cajas;
      var queryCajas = "SELECT * FROM Cajas WHERE idMudanza = " + idMudanza;
      var requestCajas = new sql.Request();
      requestCajas.query(queryCajas, function(err, recordset) {
        if (err) {
          console.log(err);
        } else {
          var recordsetItemList = [];
          for (iterador in recordset.recordset) {
            idCaja = recordset.recordset[iterador].idCaja;
            idCaja = "'" + idCaja + "'";
            var queryBuscarItems =
              "SELECT * FROM Items WHERE nombre LIKE '%" +
              busqueda +
              "%' AND idCaja =" +
              idCaja;
            var requestBusquedaItems = new sql.Request();
            requestBusquedaItems.query(queryBuscarItems, function(
              err,
              recordsetItem
            ) {
              if (err) {
                res.send(
                  "Hubo un error al buscar los items, intentelo de nuevo mas tarde"
                );
              } else {
                var resultado = [
                  recordsetCaja.recordset,
                  recordsetItem.recordset
                ];
                res.send(resultado);
              }
            });
          }
        }
      });
    }
  });
});

function vaciarYEliminarCaja(idCaja) {
  idCaja = "'" + idCaja + "'";

  //Primero eliminamos todos los items de esa caja
  var queryDeleteItems = "DELETE FROM Items WHERE idCaja =" + idCaja;
  var requestDeleteItems = new sql.Request();
  requestDeleteItems.query(queryDeleteItems, function(err) {
    if (err) {
      console.log(err);
    } else {
      //Ahora eliminamos la caja
      var queryDeleteCaja = "DELETE FROM Cajas WHERE idCaja =" + idCaja;
      var requestDeleteCaja = new sql.Request();
      requestDeleteCaja.query(queryDeleteCaja, function(err) {
        if (err) {
          console.log(err);
        }
      });
    }
  });
}

//ESTA ES LA MANERA EN LA QUE SE DEBE LLAMAR A LOS METODOS DESDE EL FRONT
// sa
// 	.post('http://localhost:8080/api/insertarItem')
// 	.send({
// 		idCaja: 'AGR-891',
// 		nombre: 'Secador de pelo',
// 		cant: 1
// 	})
// 	.end(function(err, res) {
// 		if (err) {
// 			console.log('Hubo un error al insertar item');
// 		} else {
// 			console.log(res);
// 		}
// 	});

// sa.get('/obtenerCajas').end(function(err, res){
// 	if(err){
// 		console.log('Eror al obtener las cajas');
// 	} else{
// 		console.log(res);
// 	}
// })
