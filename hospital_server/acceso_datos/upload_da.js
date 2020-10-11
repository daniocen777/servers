const fs = require("fs");
const path = require("path");

const { v4: uuidv4 } = require("uuid");

const { actualizarImage } = require("../utilidades/image_update");
const funciones = require("../utilidades/funciones");

class UploadDataAccess {
  async subirArchivo(coleccion, id, archivo) {
    const coleccionesPermitidas = ["hospitales", "medicos", "usuarios"];
    try {
      if (!coleccionesPermitidas.includes(coleccion)) {
        return funciones.responderError("Colección no existe", 400);
      }

      // Validar si existe archivo
      if (!archivo || Object.keys(archivo).length === 0) {
        return funciones.responderError("No se ha enviado archivo", 400);
      }

      // Procesar imagen
      const file = archivo.imagen;
      const nombreArchivo = file.name.split(".");
      const extensionArchivo = nombreArchivo[nombreArchivo.length - 1];
      // Validar extensión
      const extensionesValida = ["png", "jpg", "jpeg", "gif"];
      if (!extensionesValida.includes(extensionArchivo)) {
        return funciones.responderError("Extensión no permitida", 400);
      }

      // Generar nombre de archivo
      const nombre = `${uuidv4()}.${extensionArchivo}`;
      // Path
      const path = `./uploads/${coleccion}/${nombre}`;
      // Mover imagen a "uploads/colección/archivo"
      file.mv(path, function (err) {
        if (err) {
          return funciones.responderError("Error al subir imagen", 500, err);
        }

        // Actualizar
        console.log(coleccion);
        actualizarImage(coleccion, id, nombre);
      });

      return funciones.responderOK("Imagen subida", 201, {
        imagen: nombre,
      });
    } catch (error) {
      return funciones.responderError("Error de servidor", 500, error);
    }
  }

  async getImagen(coleccion, foto) {
    const pathImagen = path.join(__dirname, `../uploads/${coleccion}/${foto}`);
    // Imagen por defecto si no existe path
    if (fs.existsSync(pathImagen)) {
      return pathImagen;
    } else {
      const pathNoImage = path.join(__dirname, `../uploads/no-image.png`);
      return pathNoImage;
    }
  }
}

module.exports = UploadDataAccess.prototype;
