import { Usuario } from "./usuario";

export class UsuariosLista {
  private lista: Usuario[] = [];

  constructor() {}

  public agregarUsuario(usuario: Usuario) {
    this.lista.push(usuario);
    return usuario;
  }

  public actualizarNombre(id: string, nombre: string) {
    for (let usuario of this.lista) {
      if (usuario.id == id) {
        usuario.nombre = nombre;
        break;
      }
    }
  }

  public getLista() {
    return this.lista.filter((usuario) => usuario.nombre !== "sin-nombre");
  }

  public getUsuario(id: string) {
    return this.lista.find((usuario) => {
      return usuario.id === id;
    });
  }

  // Obtener usuarios de una sala
  public getUsuariosEnSala(sala: string) {
    return this.lista.filter((usuario) => {
      return usuario.sala === sala;
    });
  }

  public borrarUsuario(id: string) {
    const usuarioTemporal = this.getUsuario(id);
    this.lista = this.lista.filter((usuario) => {
      return usuario.id !== id;
    });
    return usuarioTemporal; // usuario borrado
  }
}
