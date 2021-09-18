const { request, response } = require("express");

const productosDataAccess = require("../data_access/productos.data_access");

class ProductosController {
  async listar(req = request, res = response) {
    const { limite = 5, desde = 0 } = req.query;
    let result = await productosDataAccess.listar(limite, desde);
    return res.status(result.status).json(result);
  }

  async crear(req = request, res = response) {
    const nombre = req.body.nombre.toUpperCase();
    const usuario = req.usuario._id; // Usuario logueado
    let result = await productosDataAccess.crear(nombre, usuario);
    return res.status(result.status).json(result);
  }
}

module.exports = ProductosController.prototype;
