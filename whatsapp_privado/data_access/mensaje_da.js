const funciones = require("../utils/functions");

const Mensaje = require("../models/mensaje");

class MensajeDataAccess {
  async obtenerMensajes(uid, mensajesDe) {
    try {
      // Últimos 30 mensajes
      const last30 = await Mensaje.find({
        $or: [
          { de: uid, para: mensajesDe },
          { de: mensajesDe, para: uid },
          /* { para: mensajesDe },
          { de: mensajesDe },
          { para: uid }, */
        ],
      })
        .sort({ createdAt: "desc" })
        .limit(30);

      return funciones.responderOK("Mensajes", 200, {
        mensajes: last30,
      });
    } catch (error) {
      return funciones.responderError("Error de servidor", 500, error);
    }
  }
}

module.exports = MensajeDataAccess.prototype;
