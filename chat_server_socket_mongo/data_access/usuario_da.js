// Encriptar pass
const bcrypt = require("bcryptjs");

// modelo
const Usuario = require("../models/usuario");

// Utils
const funciones = require("../utils/funciones");

class UsuarioDataAccess {
  async agregarUsuario(usuario) {
    try {
      const emailExist = await Usuario.findOne({ email: usuario.email });
      if (emailExist) {
        return funciones.responderError(
          "El correo ya está registrado",
          usuario
        );
      }

      const usuarioACrear = new Usuario(usuario);
      // Encriptar contraseña antes de guardar
      const salt = bcrypt.genSaltSync();
      usuarioACrear.password = bcrypt.hashSync(usuarioACrear.password, salt);
      await usuarioACrear.save();
      // Generar token
      const token = await funciones.generarJWT(usuarioACrear.id);
      return funciones.responderOK("El usuario fue creado", {
        usuario: usuarioACrear,
        token,
      });
    } catch (error) {
      return funciones.responderError("Error al agregar usuario", error);
    }
  }

  async login(email, password) {
    try {
      const usuarioDB = await Usuario.findOne({ email: email });
      if (!usuarioDB) {
        return funciones.responderError("Email no encontrado");
      }
      // Validar el password
      const validPassword = bcrypt.compareSync(password, usuarioDB.password);
      if (!validPassword) {
        return funciones.responderError("La contraseña no es válida");
      }
      // Generar el JWT
      const token = await funciones.generarJWT(usuarioDB.id);
      return funciones.responderOK("usuario logueado", {
        usuario: usuarioDB,
        token,
      });
    } catch (error) {
      return funciones.responderError(
        "Error en el login, hablar con administrador",
        error
      );
    }
  }

  async renovarToken(uid) {
    const nuevoToken = await funciones.generarJWT(uid);
    try {
      const usuario = await Usuario.findById(uid);
      if (!usuario) {
        return funciones.responderError("Usuario no encontrado");
      }
      return funciones.responderOK("Token ronovado", {
        usuario,
        token: nuevoToken,
      });
    } catch (error) {
      return funciones.responderError("Error al renovar token", error);
    }
  }

  async getUsers() {
    try {
      const usuario = await Usuario.find();
      return funciones.responderOK("Usuario encontrados", {
        usuario,
      });
    } catch (error) {
      return funciones.responderError("Error al renovar token", error);
    }
  }
}

module.exports = UsuarioDataAccess.prototype;
