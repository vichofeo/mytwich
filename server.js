var express = require("express");
var app = express();

var bodyParser = require("body-parser");
var path = require("path");

var webpack = require("webpack");
var webPMiddleware = require("webpack-dev-middleware");
var wconfig = require("./webpack.config");
var compiler = webpack(wconfig);

//mongosse
const mongoose = require("mongoose");
var configuration = require("./src/utils/config");

//virtual host y api
var vhost = require('vhost')
var api = require('./api/api')

//conexion remota a bd mongose atlas
var opts = {
  useNewUrlParser: true,
  appname: "Mini Twitter",
  poolSize: 10,
  autoIndex: false,
  bufferMaxEntries: 0,
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500,
  autoReconnect: true,
  loggerLevel: "error", //error / warn / info / debug
  keepAlive: 120,
  validateOptions: true,
  useUnifiedTopology: true,
};

let connectString = configuration.mongodb.development.connectionString;
const uri =
  "mongodb+srv://vichofeo:bottyfeo02@mytwiter.dhdxm.mongodb.net/myTwiter?retryWrites=true&w=majority";
/* //te es el bueno
connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (MongoError) => {
    if (MongoError) {
      console.error(MongoError);
      process.exit(1);
    }
    console.log("Conexión establecida con MongoDB Altas");
    console.log("Servidor listo");
  }
);*/

mongoose.connect(
  connectString,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err) {
    if (err) {
      console.log(`!!!!!!!!!!!! error de conexion ${  err}`);
      process.exit(1);
    }
    console.log("===> Conexion exitosa con el MATlas");
  }
);


/*
mongoose
  .connect(connectString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => {
    console.log("MONGO dB CONECTADO....");
  })
  .catch((error) => {
    console.log("error de conexion....");
  });
  */
//recursos externos arzacion pro headers
// Access-Control-Allow-Origin: *
app.use('*', require('cors')());



//middlewares
app.use("/public", express.static( `${__dirname  }/public`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "10mb" }));

if (process.env.NODE_ENV !== 'production') {
app.use(
  webPMiddleware(compiler, {
    publicPath: wconfig.output.publicPath,
  })
);
}

//virtual host
app.use(vhost('api.*', api))
app.use(vhost('minitwitterapi.reactiveprogramming.io', api));

//ruteos
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(8080, function () {
  console.log("servidro node escuchando por el pueto 8080");
});
