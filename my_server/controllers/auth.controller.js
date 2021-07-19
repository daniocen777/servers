const { request, response } = require("express");

const authDataAccess = require("../data_access/auth.data_access");

class AuthController {
  async login(req = request, res = response) {
    const { correo, password } = req.body;
    let result = await authDataAccess.login(correo, password);
    return res.status(result.status).json(result);
  }
}

module.exports = AuthController.prototype;
