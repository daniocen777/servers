const { request, response } = require("express");

var usuarioDA = require("../data_access/usuario_da");

class UserController {
  async addUser(req = request, res = response) {
    const usuario = req.body;
    let respuesta = await usuarioDA.agregarUsuario(usuario);
    return res.json(respuesta);
  }

  async login(req = request, res = response) {
    const { email, password } = req.body;
    let respuesta = await usuarioDA.login(email, password);
    return res.json(respuesta);
  }

  async renewToken(req = request, res = response) {
    const uid = req.uid;
    const respuesta = await usuarioDA.renovarToken(uid);
    return res.json(respuesta);
  }
}

module.exports = UserController.prototype;
