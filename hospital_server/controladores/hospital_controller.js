const { request, response } = require("express");

const hospitalDA = require("../acceso_datos/hospital_da");

class HospitalController {
  async agregarHospital(req = request, res = response) {
    const hospital = req.body;
    const uid = req.uid;
    let respuesta = await hospitalDA.agregarHospital(hospital, uid);
    return res.status(respuesta.status).json(respuesta);
  }

  async listaHospitales(req = request, res = response) {
    let respuesta = await hospitalDA.listaHospitales();
    return res.status(respuesta.status).json(respuesta);
  }

  async actualizarHospital(req = request, res = response) {
    const uid = req.params.id;
    const campos = req.body;
    let respuesta = await hospitalDA.actualizarHospital(uid, campos);
    return res.status(respuesta.status).json(respuesta);
  }

  async eliminarHospital(req = request, res = response) {
    const uid = req.params.id;
    let respuesta = await hospitalDA.eliminarHospital(uid);
    return res.status(respuesta.status).json(respuesta);
  }
}

module.exports = HospitalController.prototype;
