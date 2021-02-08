const Usuario = require("../models/usuario");
const Mensaje = require("../models/mensaje");

class SocketController {
  async usuarioConectado(uid = "") {
    const usuario = await Usuario.findById(uid);
    usuario.online = true;

    await usuario.save();

    return usuario;
  }

  async usuarioDesconectado(uid = "") {
    const usuario = await Usuario.findById(uid);
    usuario.online = false;

    await usuario.save();

    return usuario;
  }

  /* 
  payload => {de: '', para: ´´, texto: ''}
   */

  async grabarMensaje(payload) {
    try {
      const mensaje = new Mensaje(payload);
      await mensaje.save();
      return true;
    } catch (error) {
      console.log("ERROR", e);
      return false;
    }
  }
}

module.exports = SocketController.prototype;
