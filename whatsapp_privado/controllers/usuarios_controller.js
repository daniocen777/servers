const { request, response } = require("express");

var userDA = require("../data_access/user_da");

class UsuariosController {
  async getUsuarios(req = request, res = response) {
    const uid = req.uid;
    const desde = req.query.desde;
    let respuesta = await userDA.getUsuarios(uid, desde);
    return res.status(respuesta.status).json(respuesta);
  }
}

module.exports = UsuariosController.prototype;
