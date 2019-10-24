const Connection = require("tedious").Connection; // requiere la conexion y la guarda en la variable connection.
var express = require("express"); //express es framework que permite simplificar conexiones.
var app = express(); //app es el objeto en el que se basa el "servidor"
const router = express.Router();
let tedious = require("tedious"); //importa tedious, tedious es la libreria para manejar sqlServer.
var bodyParser = require("body-parser");

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
    database: "boxme" //nombre de la base de datos creada en sql
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

var Request = require("tedious").Request;
var TYPES = require("tedious").TYPES;

// app.post('/cajas/insertar', function(req, res) {
// 	res.set('Access-Control-Allow-Origin', '*');
// 	var nombre = req.body;
// 	console.log(nombre);
// 	var connection = new sql.ConnectionPool(config, function(err) {
// 		var request = new sql.Request(connection);
// 		request.query('INSERT INTO caja (nombre) VALUES (@nombre)');
// 		request.addParameter('nombre', TYPES.VarChar, nombre);
// 		connection.execSql(request);
// 	});
// 	res.end('Success');
// });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(
  //router.get('/', (req, res) => { res.send('hello') }),

  router.post("/cajas/insertar", (req, res) => {
    //ruta , funcion (req->lo que requiere, res-> lo que responde)
    var temp = req.body;
    //console.log(req);
    console.log(temp);
    const statement = "INSERT INTO caja (nombre) VALUES (@nombre)"; // sentencia sql seleciona todas las casas y devuelve en formato JSON
    function handleResult(err, numRows, rows) {
      //manejador de resultados, si hay error lo muestra
      if (err) return console.error("Error: ", err);
    }
    let request = new tedious.Request(statement, handleResult); //crea la request con la sentencia creada y se le pasa el manejador de resultado, son los parametros que requiere
    request.addParameter("nombre", TYPES.VarChar, temp.contenido);
    connection.execSql(request); //para ver el orden y entenderlo agregar console.log("1,2,3...")
    res.end("Success");
  })
);

// app.post(
// 	router.post('/cajas/insertar', (req, res) => {
// 		request = new Request('INSERT caja (nombre) VALUES (@nombre)', function(error) {
// 			if (err) {
// 				console.log(err);
// 			}
// 		});
// 		request.addParameter('nombre', TYPES.VarChar, req.body);
// 		connection.execSql(request);
// 	})
// );
app.use(
  //router.get('/', (req, res) => { res.send('hello') }),

  router.get("/cajas/obtener", (req, res) => {
    //ruta , funcion (req->lo que requiere, res-> lo que responde)
    const statement = "SELECT * FROM caja FOR JSON PATH"; // sentencia sql seleciona todas las casas y devuelve en formato JSON
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

// function executeStatement1() {
//   request = new Request("INSERT SalesLT.Product (Name, ProductNumber, StandardCost, ListPrice, SellStartDate) OUTPUT INSERTED.ProductID VALUES (@Name, @Number, @Cost, @Price, CURRENT_TIMESTAMP);", function(err) {
//    if (err) {
//       console.log(err);}
//   });
//   request.addParameter('Name', TYPES.NVarChar,'SQL Server Express 2014');
//   request.addParameter('Number', TYPES.NVarChar , 'SQLEXPRESS2014');
//   request.addParameter('Cost', TYPES.Int, 11);
//   request.addParameter('Price', TYPES.Int,11);
//   request.on('row', function(columns) {
//       columns.forEach(function(column) {
//         if (column.value === null) {
//           console.log('NULL');
//         } else {
//           console.log("Product id of inserted item is " + column.value);
//         }
//       });
//   });
//   connection.execSql(request);
// }
