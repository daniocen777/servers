const express = require("express");
const path = require("path");
require("dotenv").config(); // Leer archivos .env
const cors = require("cors");

// App de Express
const app = express();

// Cors
app.use(cors());

// Node Server
const server = require("http").createServer(app);

// DB config
require("./database/config").dbConecction();

// Lectura y parseo del body
app.use(express.json());

// Rutas
app.use("/api/test", require("./rutas/pueba"));
app.use("/api/usuarios", require("./rutas/usuario"));
app.use("/api/login", require("./rutas/auth"));

// Path público
const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

server.listen(process.env.PORT, (err) => {
  if (err) throw new Error(err);

  console.log("Servidor corriendo en puerto", process.env.PORT);
});
