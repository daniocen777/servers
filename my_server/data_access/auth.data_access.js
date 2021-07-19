const bcrypt = require("bcryptjs");
const funciones = require("../utils/functions");
const Usuario = require("../models/usuario.model");

class AuthDataAccess {
  async login(correo, password) {
    try {
      /* Verificar correo */
      const usuario = await Usuario.findOne({ correo });
      if (!usuario) {
        return funciones.responderError(`El correo ${correo} es inválido`, 400);
      }
      /* Verificar usuario activo */
      if (!usuario.estado) {
        return funciones.responderError(
          `El usuario ${correo} está de baja`,
          400
        );
      }
      /* Verificar password => boolean */
      const validPassword = bcrypt.compareSync(password, usuario.password);
      if (!validPassword) {
        return funciones.responderError(`Contraseña incorrecta`, 400);
      }
      /* Generar jwt */
      const token = await funciones.generarJWT(usuario.id);

      return funciones.responderOK("OK", 200, { usuario, token });
    } catch (error) {
      return funciones.responderError(
        "Error de servidor. Counicarse con el administrador",
        500,
        error
      );
    }
  }
}

module.exports = AuthDataAccess.prototype;
