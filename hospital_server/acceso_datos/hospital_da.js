const Hospital = require("../modelos/hospital");
const funciones = require("../utilidades/funciones");

class HospitalDataAccess {
  async agregarHospital(hospital, uid) {
    try {
      const hospitalCreado = new Hospital({ usuario: uid, ...hospital });
      await hospitalCreado.save();
      return funciones.responderOK("Hospital agregado", 201, {
        hospital: hospitalCreado,
      });
    } catch (error) {
      return funciones.responderError("Error de servidor", 500, error);
    }
  }

  async listaHospitales() {
    try {
      // populate("atributo de la BD", "campo") 
      const hospitales = await Hospital.find().populate("usuario", "nombre img");
      return funciones.responderOK("Lista de Hospitales", 200, {
        hospitales,
      });
    } catch (error) {
      return funciones.responderError("Error de servidor", 500, error);
    }
  }

  async actualizarHospital(uid, campos) {
    try {
    } catch (error) {
      return funciones.responderError("Error de servidor", 500, error);
    }
  }

  async eliminarHospital(uid) {
    try {
    } catch (error) {
      return funciones.responderError("Error de servidor", 500, error);
    }
  }
}

module.exports = HospitalDataAccess.prototype;
