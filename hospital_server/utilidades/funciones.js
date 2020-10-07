const jwt = require("jsonwebtoken");

class Funciones {
  getFechaHoyTexto() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;
    return today;
  }

  getFechaTextoDesdeDate(date) {
    var fecha = new Date(date);
    var dd = String(fecha.getDate()).padStart(2, "0");
    var mm = String(fecha.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = fecha.getFullYear();

    fecha = yyyy + "-" + mm + "-" + dd;
    return fecha;
  }

  generarJWT(uid) {
    return new Promise((resolve, reject) => {
      const payload = { uid };
      jwt.sign(
        payload,
        process.env.JWT_KEY,
        {
          expiresIn: "12H",
        },
        (err, token) => {
          if (err) {
            reject("No se pudo generar token");
          } else {
            resolve(token);
          }
        }
      );
    });
  }

  responderError(texto, status, obj = null) {
    return {
      ok: false,
      msj: texto,
      status,
      obj: obj,
    };
  }

  responderOK(texto, status, obj = null) {
    return {
      ok: true,
      msj: texto,
      status,
      obj: obj,
    };
  }
}

module.exports = Funciones.prototype;
