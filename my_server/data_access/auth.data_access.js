const bcrypt = require("bcryptjs");
const funciones = require("../utils/functions");
const Usuario = require("../models/usuario.model");
const { googleVerify } = require("../helpers/google-verify");

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

  async googleSignin(id_token) {
    try {
      const { nombre, img, correo } = await googleVerify(id_token);
      // verificar existencia de usuario
      let usuario = await Usuario.findOne({ correo });
      if (!usuario) {
        /* Crear usuario si no existe */
        const data = {
          nombre,
          correo,
          password: "",
          img,
          google: true,
        };
        usuario = new Usuario(data);
        await usuario.save();
      }
      // Si usuario existe en mongo, cambiar el atributo google a true
      if (!usuario.estado) {
        return funciones.responderError(
          "Usuario bloqueado. Hable con el administrador",
          401
        );
      }
      /* Generar jwt */
      const token = await funciones.generarJWT(usuario.id);

      console.log(usuario, token);

      return funciones.responderOK("OK", 200, { usuario, token });
    } catch (error) {
      return funciones.responderError(
        "Error de autenticación de google, token inválido",
        400
      );
    }
  }
}

module.exports = AuthDataAccess.prototype;
