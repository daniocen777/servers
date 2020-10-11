const Hospital = require("../modelos/hospital");
const Medico = require("../modelos/medico");
const Usuario = require("../modelos/usuario");

const fs = require("fs");

const borrarImagen = (path) => {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
};

const actualizarImage = async (coleccion, id, nombre) => {
  // Ver la colección
  let pathViejo = "";
  switch (coleccion) {
    case "medicos":
      const medico = await Medico.findById(id);
      if (!medico) {
        return false;
      }
      // Si tiene imagen previa
      pathViejo = `./uploads/medicos/${medico.img}`;
      borrarImagen(pathViejo);
      medico.img = nombre;
      await medico.save();
      return true;

    case "hospitales":
      const hospital = await Hospital.findById(id);
      if (!hospital) {
        return false;
      }
      // Si tiene imagen previa
      pathViejo = `./uploads/hospitales/${hospital.img}`;
      borrarImagen(pathViejo);
      hospital.img = nombre;
      await hospital.save();
      return true;

    case "usuarios":
      const usuario = await Usuario.findById(id);
      if (!usuario) {
        return false;
      }
      // Si tiene imagen previa
      pathViejo = `./uploads/usuarios/${usuario.img}`;
      borrarImagen(pathViejo);
      usuario.img = nombre;
      await usuario.save();
      return true;

    default:
      return false;
  }
};

module.exports = { actualizarImage };
