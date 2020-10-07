const { request, response } = require("express");

var usuarioDA = require("../acceso_datos/usuario_da");

class UserController {
  async login(req = request, res = response) {
    const { email, password } = req.body;
    let respuesta = await usuarioDA.login(email, password);
    return res.status(respuesta.status).json(respuesta);
  }

  async renovarToken(req = request, res = response) {
    const uid = req.uid;
    const respuesta = await usuarioDA.renovarToken(uid);
    return res.json(respuesta);
  }
}

module.exports = UserController.prototype;
