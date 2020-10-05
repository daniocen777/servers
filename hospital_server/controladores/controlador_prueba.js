const { request, response } = require("express");

const funciones = require("../utilidades/funciones");

class ControladorPrueba {
  addUser(req = request, res = response) {
    const respuesta = funciones.responderOK("Mensaje de OK", 200);
    return res.status(respuesta.status).json(respuesta);
  }
}

module.exports = ControladorPrueba.prototype;
