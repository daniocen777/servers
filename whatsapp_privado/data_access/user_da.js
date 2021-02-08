// const { validationResult } = require("express-validator");
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
        return funciones.responderError("Email no encontrado", 404);
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

  async renovarToken(uid) {
    const nuevoToken = await funciones.generarJWT(uid);
    try {
      const usuario = await Usuario.findById(uid);
      if (!usuario) {
        return funciones.responderError("Usuario no encontrado");
      }
      return funciones.responderOK("Token ronovado", 200, {
        usuario,
        token: nuevoToken,
      });
    } catch (error) {
      return funciones.responderError("Error al renovar token", error);
    }
  }

  /* Lista de usuarios (no mostrar los datos del que lo está pediendo) */
  async getUsuarios(uid, desde) {
    try {
      const pagina = Number(desde) || 0;
      // Ordenando descendentemente por los que están conectados
      // $ne => No exixst
      const usuarios = await Usuario.find({ _id: { $ne: uid } })
        .sort("-online")
        .skip(pagina)
        .limit(20);
      return funciones.responderOK("Lista de usuarios", 200, usuarios);
    } catch (error) {
      return funciones.responderError("Error de servidor", 500, error);
    }
  }
}

module.exports = UserDataAccess.prototype;
