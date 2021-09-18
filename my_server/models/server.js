const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");
/* require("dotenv").config(); */

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    /* Paths */
    this.paths = {
      auth: "/api/auth",
      usuarios: "/api/usuarios",
      categorias: "/api/categorias",
      productos: "/api/productos",
    };
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
    /* Autenticación */
    this.app.use(this.paths.auth, require("../routes/auth.route"));
    /* Usuarios */
    this.app.use(this.paths.usuarios, require("../routes/usuario.route"));
    /* Categorias */
    this.app.use(this.paths.categorias, require("../routes/categorias.route"));
    /* Productos */
    this.app.use(this.paths.productos, require("../routes/productos.route"));

  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor en", this.port);
    });
  }
}

module.exports = Server;
