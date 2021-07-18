const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");
/* require("dotenv").config(); */

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    /* Paths */
    this.userPath = "/api/usuarios";
    /* Conectar a la BD */
    this.connectionDB();
    this.middleware();
    this.routes();
  }

  async connectionDB() {
    await dbConnection();
  }

  middleware() {
    /* CORS => para proteger envío */
    this.app.use(cors());
    /* Lectura y parseo de datos */
    this.app.use(express.json());
    /* Directorio ´público */
    this.app.use(express.static("public"));
  }

  routes() {
    /* Usuarios */
    this.app.use(this.userPath, require("../routes/usuario.route"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor en", this.port);
    });
  }
}

module.exports = Server;
