import express from "express";
import { SERVER_PORT } from "../global/environment";
import socketIO from "socket.io";
import http from "http"; // Intermediario entre express y socket
import * as socket from "../sockets/sockets";

export default class Server {
  private static _instance: Server; // patrón singleton
  public app: express.Application;
  public port: number;
  public io: socketIO.Server;
  private httpServer: http.Server;

  private constructor() {
    this.app = express();
    this.port = SERVER_PORT;
    this.httpServer = new http.Server(this.app);
    this.io = socketIO(this.httpServer);
    this.escucharSocket();
  }

  // patrón singleton
  public static get instance() {
    // new this() => new Server()
    return this._instance || (this._instance = new this());
  }

  private escucharSocket() {
    console.log("Escuchando conexiones socket");
    // Cuando se conecta un cliente
    this.io.on("connection", (cliente) => {
      // Conectar cliente
      socket.conectarCliente(cliente, this.io);
      // Configurar usuario
      socket.configurarUsuario(cliente, this.io);
      // Obtener usuarios activos
      socket.obteberUsuarios(cliente, this.io);
      // Escuchando evento 'mensaje'
      socket.mensaje(cliente, this.io);
      // Cuando se desconecta cliente => Del archivo ../sockets/sockets.ts
      socket.desconectar(cliente, this.io);
    });
  }

  /* Levantando servidor */
  start(callback: () => void) {
    this.httpServer.listen(this.port, callback);
  }
}
