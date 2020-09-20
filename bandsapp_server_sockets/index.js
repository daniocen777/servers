const path = require("path");
// Lee las variables de entorno del archivo '.env'
require("dotenv").config();
// Express
const express = require("express");
const app = express();
// Servidor para el socket: https://socket.io/get-started/chat/
// Comunicación entre app y socket
var server = require("http").createServer(app);
// export io para usarlo en socket.js
module.exports.io = require("socket.io")(server);
/* Importando socket */
require("./sockets/socket");

/* Path de la carpeta pública */
// __dirname => http://dominio... => heroku
const publicPath = path.resolve(__dirname, "public");

/* middleware */
app.use(express.static(publicPath));

server.listen(process.env.PORT, (err) => {
  if (err) throw new Error(err);
  console.log("Servidor corriendo en puerto", process.env.PORT);
});
