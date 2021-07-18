const funciones = require("../utils/functions");
const Usuario = require("../models/usuario.model");
const bcrypt = require("bcryptjs");

class UserDataAccess {
  async postUser(user) {
    return funciones.responderOK("OK", 200, user);
  }

  async getUsers(limite, desde) {
    const query = { estado: true };
    /* const usuarios = await Usuario.find(query)
      .skip(Number(desde))
      .limit(Number(limite));
    const total = await Usuario.countDocuments(query); */
    /* Cuando hay más de un await */
    const [total, usuarios] = await Promise.all([
      Usuario.countDocuments(query),
      Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
    ]);

    return funciones.responderOK("OK", 200, {
      total,
      usuarios,
    });
  }

  async crearUsuario(user) {
    /* Si existen varios campos:
    const {campoParticular, ... restoDeCampos}
    const usuario = new Usuario(restoDeCampos);
     */
    const { nombre, correo, password, rol } = user;
    const usuario = new Usuario({ nombre, correo, password, rol });
    /* Verificar correo, en la ruta */
    /*  const existeCorreo = await Usuario.findOne({ correo });
    if (existeCorreo) {
      return funciones.responderError("El correo ya está registrado", 400);
    } */

    /* Encriptar => genSaltSync(10) por defecto */
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    /* Guardar */
    await usuario.save();
    return funciones.responderOK("OK", 200, usuario);
  }

  async editarUsuario(id, user) {
    // Excluir _id, password, google, correo
    const { _id, password, google, correo, ...otherAttibutes } = user;
    /* Si viene password => usuario quiere editar contraseña */
    if (password) {
      const salt = bcrypt.genSaltSync();
      otherAttibutes.password = bcrypt.hashSync(password, salt);
    }

    const userUpdate = await Usuario.findByIdAndUpdate(id, otherAttibutes);
    return funciones.responderOK("OK", 200, userUpdate);
  }

  async eliminarUsuario(id) {
    // Eliminación física
    // const usuario = await Usuario.findByIdAndDelete(id);
    // Cambiar el estado
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    return funciones.responderOK("OK", 200, usuario);
  }
}

module.exports = UserDataAccess.prototype;
