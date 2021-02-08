const { request, response } = require("express");

var userDA = require("../data_access/user_da");

class UserController {
  async agregarUsuario(req = request, res = response) {
    const user = req.body;
    let respuesta = await userDA.agregarUsuario(user);
    return res.status(respuesta.status).json(respuesta);
  }

  async login(req = request, res = response) {
    const { email, password } = req.body;
    let respuesta = await userDA.login(email, password);
    return res.status(respuesta.status).json(respuesta);
  }

  async renewToken(req = request, res = response) {
    const uid = req.uid;
    const respuesta = await userDA.renovarToken(uid);
    return res.json(respuesta);
  }
}

module.exports = UserController.prototype;
