const Medico = require("../modelos/medico");
const funciones = require("../utilidades/funciones");

class MedicoDataAccess {
  async agregarMedico(medico, uid) {
    try {
      const medicoCreado = new Medico({ usuario: uid, ...medico });
      await medicoCreado.save();
      return funciones.responderOK("Médico agregado", 201, {
        medico: medicoCreado,
      });
    } catch (error) {
      return funciones.responderError("Error de servidor", 500, error);
    }
  }

  async listaMedicos() {
    try {
      const medicos = await Medico.find()
        .populate("usuario", "nombre")
        .populate("hospital", "nombre");
      return funciones.responderOK("Lista de Médicos", 200, {
        medicos,
      });
    } catch (error) {
      return funciones.responderError("Error de servidor", 500, error);
    }
  }

  async actualizarMedico(uid, campos) {
    try {
    } catch (error) {
      return funciones.responderError("Error de servidor", 500, error);
    }
  }

  async eliminarMedico(uid) {
    try {
    } catch (error) {
      return funciones.responderError("Error de servidor", 500, error);
    }
  }
}

module.exports = MedicoDataAccess.prototype;
