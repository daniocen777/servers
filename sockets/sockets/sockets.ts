import { Socket } from "socket.io";
import { UsuariosLista } from "../classes/usuarios-lista";
import { Usuario } from "../classes/usuario";

export const usuariosConectados = new UsuariosLista();

export const conectarCliente = (cliente: Socket, io: SocketIO.Server) => {
  const usuario = new Usuario(cliente.id);
  usuariosConectados.agregarUsuario(usuario);
};

/* Acciones que serán disparadas */
// Escuchar evento disconnect
export const desconectar = (cliente: Socket, io: SocketIO.Server) => {
  cliente.on("disconnect", () => {
    console.log("Cliente desconectado");
    usuariosConectados.borrarUsuario(cliente.id);
    io.emit("usuarios-activos", usuariosConectados.getLista());
  });
};

// Escuchar evento mensaje
export const mensaje = (cliente: Socket, io: SocketIO.Server) => {
  cliente.on("mensaje", (payload: { de: string; cuerpo: string }) => {
    console.log("Mensaje recibido", payload);
    io.emit("nuevo-mensaje", payload);
  });
};

// Configurar usuario
export const configurarUsuario = (cliente: Socket, io: SocketIO.Server) => {
  cliente.on(
    "configurar-usuario",
    (payload: { nombre: string }, callback: Function) => {
      usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
      io.emit("usuarios-activos", usuariosConectados.getLista());

      callback({
        ok: true,
        mensaje: `Usuario ${payload.nombre}, configurado`,
      });
    }
  );
};

// Obtener usuarios
export const obteberUsuarios = (cliente: Socket, io: SocketIO.Server) => {
  cliente.on("obtener-usuarios", () => {
    // Se envía sólo a la persona que se está conectando
    io.to(cliente.id).emit("usuarios-activos", usuariosConectados.getLista());
  });
};
