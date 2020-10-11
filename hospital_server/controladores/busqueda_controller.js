const { request, response } = require("express");

const busquedaDA = require("../acceso_datos/busqueda_da");

class BusquedaController {
  async buscar(req = request, res = response) {
    const busqueda = req.params.busqueda;
    let respuesta = await busquedaDA.buscar(busqueda);
    return res.status(respuesta.status).json(respuesta);
  }

  async buscarColeccion(req = request, res = response) {
    const coleccion = req.params.tabla;
    const busqueda = req.params.busqueda;
    let respuesta = await busquedaDA.buscarColeccion(coleccion, busqueda);
    return res.status(respuesta.status).json(respuesta);
  }

}

module.exports = BusquedaController.prototype;
