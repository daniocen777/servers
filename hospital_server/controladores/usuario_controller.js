const { request, response } = require("express");

const usuarioDA = require("../acceso_datos/usuario_da");

class UsuarioController {
  async agregarUsuario(req = request, res = response) {
    const usuario = req.body;
    let respuesta = await usuarioDA.agregarUsuario(usuario);
    return res.status(respuesta.status).json(respuesta);
  }

  async usuariosLista(req = request, res = response) {
    let respuesta = await usuarioDA.usuariosLista();
    return res.status(respuesta.status).json(respuesta);
  }

  async actualizarUsuario(req = request, res = response) {
    const uid = req.params.id;
    const campos = req.body;
    let respuesta = await usuarioDA.actualizarUsuario(uid, campos);
    return res.status(respuesta.status).json(respuesta);
  }

  async eliminarUsuario(req = request, res = response) {
    const uid = req.params.id;    
    let respuesta = await usuarioDA.eliminarUsuario(uid);
    return res.status(respuesta.status).json(respuesta);
  }
}

module.exports = UsuarioController.prototype;
