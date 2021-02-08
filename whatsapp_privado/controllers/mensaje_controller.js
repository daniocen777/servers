const { request, response } = require("express");

const mesnsajeDA = require("../data_access/mensaje_da");

class MensajeController {
  async obtenerChat(req = request, res = response) {
    const uid = req.uid;
    const mensajesDe = req.params.de;
    let respuesta = await mesnsajeDA.obtenerMensajes(uid, mensajesDe);
    return res.status(respuesta.status).json(respuesta);
  }
}

module.exports = MensajeController.prototype;
