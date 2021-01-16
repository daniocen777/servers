const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const Usuario = require("../models/usuario");
const funciones = require("../utils/functions");

class UserDataAccess {
  async agregarUsuario(usuario) {
    try {
      const { email, password } = usuario;
      const existeEmail = await Usuario.findOne({ email });
      if (existeEmail) {
        return funciones.responderError(
          "El correo ya está registrado",
          400,
          usuario
        );
      }

      const usuarioACrear = new Usuario(usuario);
      // Encriptar contraseña
      const salt = bcrypt.genSaltSync();
      usuarioACrear.password = bcrypt.hashSync(password, salt);

      await usuarioACrear.save();

      // Generar token
      const token = await funciones.generarJWT(usuarioACrear.id);

      return funciones.responderOK("usuario creado", 200, {
        usuario: usuarioACrear,
        token,
      });
    } catch (error) {
      return funciones.responderError("Error de servidor", 500, error);
    }
  }

  async login(email, password) {
    try {
      const usuarioDB = await Usuario.findOne({ email: email });
      if (!usuarioDB) {
        return funciones.responderError("Email no encontrado", 404, email);
      }
      // Validar el password
      const validPassword = bcrypt.compareSync(password, usuarioDB.password);
      if (!validPassword) {
        return funciones.responderError("La contraseña no es válida", 404);
      }
      // Generar el JWT
      const token = await funciones.generarJWT(usuarioDB.id);
      return funciones.responderOK("usuario logueado", 200, {
        usuario: usuarioDB,
        token,
      });
    } catch (error) {
      return funciones.responderError("Error de servidor", 500, error);
    }
  }
}

module.exports = UserDataAccess.prototype;
