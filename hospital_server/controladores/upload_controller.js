const { request, response } = require("express");

const busquedaDA = require("../acceso_datos/upload_da");

class BusquedaController {
  async subirArchivo(req = request, res = response) {
    const coleccion = req.params.coleccion;
    const id = req.params.id;
    const archivo = req.files;

    let respuesta = await busquedaDA.subirArchivo(coleccion, id, archivo);
    return res.status(respuesta.status).json(respuesta);
  }

  async getImagen(req = request, res = response) {
    const coleccion = req.params.coleccion;
    const foto = req.params.foto;
    const respuesta = await busquedaDA.getImagen(coleccion, foto);
    return res.sendFile(respuesta);
  }
}

module.exports = BusquedaController.prototype;
