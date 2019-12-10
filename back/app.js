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
var cors = require("cors");

var config = {
  //variable donde guardamos la conexion a la base de datos.
  server: "localhost",
  authentication: {
    type: "default",
    options: {
      userName: "sa2",
      password: "1234" //CAMBIAR A LA CONTRASEÑA DE CADA UNO
    }
  },
  options: {
    //puede que generer error, comentar encrypt si es asi
    // If you are on Microsoft Azure, you need encryption:
    encrypt: true,
    database: "BoxMe" //nombre de la base de datos creada en sql CADA UNO PONGA SU BD
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
app.use(cors());

sql.connect(config, function(err) {
  if (err) {
    console.log("error a conectar la base de datos");
  } else {
    console.log("Te conectaste satisfactoriamente a la bd!");
  }
});

app.post("/api/getMudanzas", function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  var idUsuario = req.body.idUsuario;
  idUsuario = "'" + idUsuario + "'"; //se le agregan las comillas simples para armar la query correctamente
  console.log(idUsuario);
  var query =
    "SELECT * FROM (UsuariosMudanza INNER JOIN Mudanzas ON UsuariosMudanza.idMudanza=Mudanzas.idMudanza) WHERE idUsuario =" +
    idUsuario;
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

app.post("/api/getCajas", function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
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
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  vaciarYEliminarCaja(req, res);
});

app.delete("/api/deleteMudanza", function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
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

app.post("/api/getItems", function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
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

app.post("/api/insertarMudanza", function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  var nombreMudanza = req.body.nombreMudanza;
  nombreMudanza = "'" + nombreMudanza + "'";
  var queryInsertarMudanza =
    "INSERT INTO Mudanzas VALUES (" + nombreMudanza + ")";
  console.log(queryInsertarMudanza);
  var request = new sql.Request();
  request.query(queryInsertarMudanza, function(err, recordset) {
    if (err) {
      console.log(err);
    } else {
      res.send("Success");
    }
  });
});

app.post("/api/obteneridMudanza", function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  var nombreMudanza = req.body.nombreMudanza;
  nombreMudanza = "'" + nombreMudanza + "'";
  var queryObtenerIdMud =
    "SELECT * FROM Mudanzas WHERE nombre = " + nombreMudanza;
  console.log(queryObtenerIdMud);
  var requestObtenerMud = new sql.Request();
  requestObtenerMud.query(queryObtenerIdMud, function(err, recorset) {
    if (err) {
      console.log(err);
    } else {
      res.send(recorset.recordset);
    }
  });
});

app.post("/api/insertarUsuariosMudanza", function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  var idUsuario = req.body.idUsuario;
  var idMudanza = req.body.idMudanza;
  idUsuario = "'" + idUsuario + "'"; //se le agregan las comillas simples para armar la query correctamente
  var queryInsertarUM =
    "INSERT INTO UsuariosMudanza VALUES (" + idMudanza + "," + idUsuario + ")";
  var requestInsertarUM = new sql.Request();
  requestInsertarUM.query(queryInsertarUM, function(err, recorset) {
    if (err) {
      console.log(err);
    } else {
      res.send("Success");
    }
  });
});

app.post("/api/verificarLogIn", function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  var nombreUsuario = req.body.idUsuario;
  nombreUsuario = "'" + nombreUsuario + "'";
  var password = req.body.password;
  password = "'" + password + "'";
  var query =
    "SELECT * FROM Usuarios WHERE idUsuario = " +
    nombreUsuario +
    " AND contraseña = " +
    password;
  console.log(query);
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

app.post("/api/registrarUsuario", function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  var nombreUsuario = req.body.idUsuario;
  nombreUsuario = "'" + nombreUsuario + "'";
  var password = req.body.password;
  password = "'" + password + "'";
  var query = "SELECT * FROM Usuarios WHERE idUsuario =" + nombreUsuario;
  console.log(query);
  var request = new sql.Request();
  request.query(query, function(err, recordset) {
    if (err) {
      console.log("err");
    } else {
      if (recordset.recordset.length === 1) {
        res.send("errexists");
      } else {
        var queryRegistrar =
          "INSERT INTO Usuarios VALUES(" + nombreUsuario + "," + password + ")";
        console.log(queryRegistrar);
        var requestRegistrar = new sql.Request();
        requestRegistrar.query(queryRegistrar, function(err, recordset) {
          if (err) {
            res.send("err");
          } else {
            res.send("success");
          }
        });
      }
    }
  });
});

/*
app.post("/api/insertarCaja", function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  var codcaja = req.body.codigocaja;
  var nombre = req.body.caja;
  var idmud = req.body.idmudanza;
  request = new Request("INSERT INTO Cajas VALUES (@codcaja, @nombre, @idmud)", function(
    error
  ) {
    if (error) {
      console.log(error);
    }
  });
  request.addParameter("codcaja", TYPES.VarChar, codcaja);
  request.addParameter("nombre", TYPES.VarChar, nombre);
  request.addParameter("idmud", TYPES.Int, idmud);
  connection.execSql(request);
  res.end("Success");
});
*/

//nuevo insertar caja con alfanumerico
app.post("/api/insertarCaja", function(req, res) {
  var nombre = req.body.nombre;
  var idMudanza = req.body.idMudanza;
  var rLetter = randomString(3, "ABCDEFGHIJKLMNOPQRSTUVWXYZ");
  var rNumbers = randomString(3, "0123456789");
  var idCaja = rLetter + "-" + rNumbers;
  idCaja = "'" + idCaja + "'"; //se le agregan las comillas simples para armar la query correctamente
  var query = "SELECT * FROM Cajas WHERE idCaja = " + idCaja;
  console.log("QUERY: " + query);
  var request1 = new sql.Request();
  request1.query(query, function(err, recordset) {
    if (err) {
      //Si falla el select con el idCaja significa que no existe dicha clave entonces intentamos hacer el insert
      console.log("no existe dicha clave, voy a insertarla");
      idCaja = idCaja.replace(/'/g, ""); //se le sacan las comillas simples para hacer el insert a la db
      console.log(idCaja);
      var request2 = new Request(
        "INSERT Cajas (idCaja, nombre, idMudanza) VALUES (@idCaja, @nombre, @idMudanza)",
        function(error) {
          if (error) {
            console.log(error);
          }
        }
      );
      request2.addParameter("idCaja", TYPES.VarChar, idCaja);
      request2.addParameter("nombre", TYPES.VarChar, nombre);
      request2.addParameter("idMudanza", TYPES.VarChar, idMudanza);
      connection.execSql(request2);
      res.end("Success");
    } else {
      //si encuentra la clave, tenemos que generar una nueva y volver hacer el insert
      console.log(
        "dicha clave ya existe, voy a regenerarla y luego insertarla (las probabilidades de una nueva ocurrencia son muy bajas)"
      );
      rLetter = randomString(3, "ABCDEFGHIJKLMNOPQRSTUVWXYZ");
      rNumbers = randomString(3, "0123456789");
      idCaja = rLetter + "-" + rNumbers;
      idCaja = "'" + idCaja + "'"; //se le agregan las comillas simples para armar la query correctamente
      query = "SELECT * FROM Cajas WHERE idCaja =" + idCaja;
      console.log("QUERY: " + query);
      var request3 = new sql.Request();
      request3.query(query, function(err, recordset) {
        idCaja = idCaja.replace(/'/g, ""); //se le sacan las comillas simples para hacer el insert a la db
        console.log(idCaja);
        var request4 = new Request(
          "INSERT Cajas (idCaja, nombre, idMudanza) VALUES (@idCaja, @nombre, @idMudanza)",
          function(error) {
            if (error) {
              console.log(error);
            }
          }
        );
        request4.addParameter("idCaja", TYPES.VarChar, idCaja);
        request4.addParameter("nombre", TYPES.VarChar, nombre);
        request4.addParameter("idMudanza", TYPES.VarChar, idMudanza);
        connection.execSql(request4);
        res.end("Success");
      });
    }
  });
});

//metodo para el random alfanumerico
function randomString(length, chars) {
  var result = "";
  for (var i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

app.post("/api/insertarItem", function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
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
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
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
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
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
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
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
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
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
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
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
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
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
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
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
        //console.log("Cajas: " + recordset.recordset[0].nombre);
        console.log("RES2: " + res);
        res.send(recordset.recordset);
      } else {
        console.log(recordset.recordset[0].nombre);
        return recordset.recordset;
      }
    }
  });
}

app.post("/api/buscarEnCajas", function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
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
