const { request, response } = require("express");

const userDataAccess = require("../data_access/user.data_access");

class UserController {
  async getUsers(req = request, res = response) {
    const { limite = 5, desde = 0 } = req.query;
    let result = await userDataAccess.getUsers(limite, desde);
    return res.status(result.status).json(result);
  }

  async postUser(req = request, res = response) {
    const user = req.body;
    let result = await userDataAccess.postUser(user);
    return res.status(result.status).json(result);
  }

  async crearUsuario(req = request, res = response) {
    const user = req.body;
    let result = await userDataAccess.crearUsuario(user);
    return res.status(result.status).json(result);
  }

  async editarUsuario(req = request, res = response) {
    const { id } = req.params;
    const user = req.body;
    let result = await userDataAccess.editarUsuario(id, user);
    return res.status(result.status).json(result);
  }

  async eliminarUsuario(req = request, res = response) {
    const { id } = req.params;
    // usuario que viene de middleware  "validar_token"
    // const usuarioAutenticado = req.usuario;
    let result = await userDataAccess.eliminarUsuario(id);
    return res.status(result.status).json(result);
  }
}

module.exports = UserController.prototype;
