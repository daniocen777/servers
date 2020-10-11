const Usuario = require("../modelos/usuario");
const funciones = require("../utilidades/funciones");

const bcrypt = require("bcryptjs");

class UsuarioDataAccess {
  async agregarUsuario(usuario) {
    try {
      const emailExist = await Usuario.findOne({ email: usuario.email });
      if (emailExist) {
        return funciones.responderError(
          "El correo ya está registrado",
          409,
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
      return funciones.responderOK("usuario creado", 200, {
        usuario: usuarioACrear,
        token,
      });
    } catch (error) {
      return funciones.responderError("Error de servidor", 500, error);
    }
  }

  async usuariosLista(desde) {
    try {
      /* const usuarios = await Usuario.find({}, "nombre email rol google")
        .skip(desde)
        .limit(5);
      const total = await Usuario.count(); */

      const [usuarios, total] = await Promise.all([
        Usuario.find({}, "nombre email rol google img").skip(desde).limit(5),
        Usuario.countDocuments(),
      ]);

      return funciones.responderOK("usuarios", 200, {
        usuarios,
        total,
      });
    } catch (error) {
      return funciones.responderError("Error de servidor", 500, error);
    }
  }

  async actualizarUsuario(uid, campos) {
    try {
      const usuario = await Usuario.findById(uid);
      if (!usuario) {
        return funciones.responderError("Usuario no encontrado", 404);
      }

      if (usuario.email === campos.email) {
        delete campos.email;
      } else {
        // Si se quiere modificar usuario, validar que no exista
        const emailExist = await Usuario.findOne({ email: campos.email });
        if (emailExist) {
          return funciones.responderError("El correo ya está registrado", 409, {
            usuario: campos,
          });
        }
      }

      // No actualizar pass y google
      delete campos.password;
      delete campos.google;
      const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {
        new: true,
      });
      return funciones.responderOK("usuario actualizado", 200, {
        usuario: usuarioActualizado,
      });
    } catch (error) {
      return funciones.responderError("Error de servidor", 500, error);
    }
  }

  async eliminarUsuario(uid) {
    try {
      const usuario = await Usuario.findById(uid);
      if (!usuario) {
        return funciones.responderError("Usuario no encontrado", 404);
      }

      const user = await Usuario.findByIdAndDelete(usuario.id);

      return funciones.responderOK("usuario eliminado", 200, user);
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
      return funciones.responderError(
        "Error en el login, hablar con administrador",
        error
      );
    }
  }
}

module.exports = UsuarioDataAccess.prototype;
