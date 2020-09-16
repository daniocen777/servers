import Server from "./classes/server";
import router from "./routes/router";
import bodyParser from "body-parser";
import cors from "cors";

const server = Server.instance;

server.start(() => {
  console.log(`Servidor corriendo en ${server.port}`);
});

/* Configurando body-parser */
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

/* Configurando CORS */
server.app.use(cors({ origin: true, credentials: true }));

/* agregando las rutas */
server.app.use("/", router);
