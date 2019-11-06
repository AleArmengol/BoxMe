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

//METODO DE GONZA, SE PUEDE ELIMINAR
app.use(
  //router.get('/', (req, res) => { res.send('hello') }),

  router.get("/cajas/obtener", (req, res) => {
    //ruta , funcion (req->lo que requiere, res-> lo que responde)
    const statement = "SELECT * FROM Cajas FOR JSON PATH"; // sentencia sql seleciona todas las casas y devuelve en formato JSON
    function handleResult(err, numRows, rows) {
      //manejador de resultados, si hay error lo muestra
      if (err) return console.error("Error: ", err);
    }
    let results = "";
    let request = new tedious.Request(statement, handleResult); //crea la request con la sentencia creada y se le pasa el manejador de resultado, son los parametros que requiere
    request.on("row", function(columns) {
      //aca ya esta buscando en la bd por filas y columnas
      columns.forEach(function(column) {
        results += column.value + " ";
      });
    });
    request.on("doneProc", function(rowCount, more, returnStatus, rows) {
      //si el resultado quedo vacio es porque no encontro nada en la bd, asi que setea la respuesta en no hay cajas, sino se le pasa el resultado.
      if (results == "") {
        res.status(404).json("No hay cajas registradas");
      } else {
        res.json(results);
      }
    });
    connection.execSql(request); //para ver el orden y entenderlo agregar console.log("1,2,3...")
  })
);

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
  var query = "SELECT * FROM Cajas WHERE idMudanza =" + idMudanza;
  var request = new sql.Request();
  request.query(query, function(err, recordset) {
    if (err) {
      console.log(err);
    } else {
      res.send(recordset.recordset);
    }
  });
});

function pause(millis) {
  var date = new Date();
  var curDate = null;
  do {
    curDate = new Date();
  } while (curDate - date < millis);
}

app.delete("/api/deleteCaja", function(req, res) {
  var idCaja = req.body.idCaja;
  idCaja = "'" + idCaja + "'";

  //Primero eliminamos todos los items de esa caja
  var queryDeleteItems = "DELETE FROM Items WHERE idCaja =" + idCaja;
  var requestDeleteItems = new sql.Request();
  requestDeleteItems.query(queryDeleteItems, function(err) {
    if (err) {
      console.log(err);
    } else {
      res.send("Success");
    }
  });

  //Ahora eliminamos la caja
  pause(1000);
  var queryDeleteCaja = "DELETE FROM Cajas WHERE idCaja =" + idCaja;
  var requestDeleteCaja = new sql.Request();
  requestDeleteCaja.query(queryDeleteCaja, function(err) {
    if (err) {
      console.log(err);
    } else {
      //res.send("Success");
    }
  });
});

app.get("/api/getItems", function(req, res) {
  var idCaja = req.body.idCaja;
  idCaja = "'" + idCaja + "'"; //se le agregan las comillas simples para armar la query correctamente
  console.log(idCaja);
  var query = "SELECT * FROM Items WHERE idCaja =" + idCaja;
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

app.post("/api/insertarCaja", function(req, res) {
  var nombre = req.body.caja;
  //console.log(nombre);
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
  console.log(idCaja);
  console.log(nombre);
  console.log(cant);
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

app.delete("/api/deleteItem", function(req, res) {
  var nombre = req.body.nombre;
  console.log(nombre);
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
  var idCaja = req.body.idCaja;
  console.log(idCaja);
  var request = new Request(
    "DELETE FROM Items WHERE idCaja = @idCaja",
    function(error) {
      if (error) {
        console.log(error);
      }
    }
  );
  request.addParameter("idCaja", TYPES.VarChar, idCaja);
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
  console.log(nombre);
  console.log(idMudanza);
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
