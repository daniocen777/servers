const { request, response } = require("express");

const categoriasDataAccess = require("../data_access/categorias.data_access");

class CategoriasController {
  async listar(req = request, res = response) {
    const { limite = 5, desde = 0 } = req.query;
    let result = await categoriasDataAccess.listar(limite, desde);
    return res.status(result.status).json(result);
  }

  async obtenerPorId(req = request, res = response) {
    const { id } = req.params;
    let result = await categoriasDataAccess.obtenerPorId(id);
    return res.status(result.status).json(result);
  }

  async crear(req = request, res = response) {
    const nombre = req.body.nombre.toUpperCase();
    const usuario = req.usuario._id; // Usuario logueado
    let result = await categoriasDataAccess.crear(nombre, usuario);
    return res.status(result.status).json(result);
  }

  async editar(req = request, res = response) {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;
    const usuarioLogueado = req.usuario._id; // Usuario logueado
    let result = await categoriasDataAccess.editar(id, data, usuarioLogueado);
    return res.status(result.status).json(result);
  }

  async eliminar(req = request, res = response) {
    const { id } = req.params;
    let result = await categoriasDataAccess.eliminar(id);
    return res.status(result.status).json(result);
  }
}

module.exports = CategoriasController.prototype;
