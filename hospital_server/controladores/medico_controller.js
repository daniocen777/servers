const { request, response } = require("express");

const medicoDA = require("../acceso_datos/medico_da");

class MedicoController {
  async agregarMedico(req = request, res = response) {
    const medico = req.body;
    const uid = req.uid;
    let respuesta = await medicoDA.agregarMedico(medico, uid);
    return res.status(respuesta.status).json(respuesta);
  }

  async listaMedicos(req = request, res = response) {
    let respuesta = await medicoDA.listaMedicos();
    return res.status(respuesta.status).json(respuesta);
  }

  async actualizarMedico(req = request, res = response) {
    const uid = req.params.id;
    const campos = req.body;
    let respuesta = await medicoDA.actualizarMedico(uid, campos);
    return res.status(respuesta.status).json(respuesta);
  }

  async eliminarMedico(req = request, res = response) {
    const uid = req.params.id;    
    let respuesta = await medicoDA.eliminarMedico(uid);
    return res.status(respuesta.status).json(respuesta);
  }
}

module.exports = MedicoController.prototype;
