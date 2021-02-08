const { io } = require("../index");

const funciones = require("../utils/functions");
const socketController = require("../controllers/socket_controller");

// Mensajes de Sockets
io.on("connection", (client) => {
  // Cliente con JWT (token enviado desde la app => x-token)

  const [esValido, uid] = funciones.comprobarJWT(
    client.handshake.headers["x-token"]
  );

  if (!esValido) {
    return client.disconnect();
  }
  // Cliente autenticado

  socketController.usuarioConectado(uid);
  // Ingresar a usuario a una sala
  // hay 2 salas por defecto (global => todos conectados || particular => client.id )
  // Sala llamada como el uid
  client.join(uid);

  // Escuchar mensaje
  client.on("mensaje-personal", async (payload) => {
    // Grabar mensaje
    await socketController.grabarMensaje(payload);

    io.to(payload.para).emit("mensaje-personal", payload);
  });

  client.on("disconnect", () => {
    socketController.usuarioDesconectado(uid);
  });
});
