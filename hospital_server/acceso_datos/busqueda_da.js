const Hospital = require("../modelos/hospital");
const Medico = require("../modelos/medico");
const Usuario = require("../modelos/usuario");

const funciones = require("../utilidades/funciones");

class BusquedaDataAccess {
  async buscar(busqueda) {
    try {
      //  RegExp(expresión, "i => insensible");
      const regex = new RegExp(busqueda, "i");
      // Buscar usuarios
      /*  const usuarios = await Usuario.find({ nombre: regex });
      // Buscar médicos
      const medicos = await Medico.find({ nombre: regex });
      // Buscar hospitales
      const hospitales = await Hospital.find({ nombre: regex }); */

      const [usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Hospital.find({ nombre: regex }),
      ]);

      return funciones.responderOK("Resultado de búsqueda", 200, {
        usuarios,
        medicos,
        hospitales,
      });
    } catch (error) {
      return funciones.responderError("Error de servidor", 500, error);
    }
  }

  async buscarColeccion(coleccion, busqueda) {
    try {
      const regex = new RegExp(busqueda, "i");
      let data = [];

      switch (coleccion) {
        case "medicos":
          data = await Medico.find({ nombre: regex })
            .populate("usuario", "nombre img")
            .populate("hospital", "nombre img");
          break;

        case "hospitales":
          data = await Hospital.find({ nombre: regex }).populate(
            "usuario",
            "nombre img"
          );
          break;

        case "usuarios":
          data = await Usuario.find({ nombre: regex });
          break;
        default:
          return funciones.responderError("Datos no encontrados", 400);
      }

      return funciones.responderOK("Resultado de búsqueda", 200, {
        resultado: data,
      });
    } catch (error) {
      return funciones.responderError("Error de servidor", 500, error);
    }
  }
}

module.exports = BusquedaDataAccess.prototype;
