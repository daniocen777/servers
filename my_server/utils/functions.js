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

  generarJWT(uid = "") {
    return new Promise((resolve, reject) => {
      const payload = { uid }; // Sólo guardar el uid del usuario
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

  /* comprobarJWT(token = "") {
    try {
      // Extaer uid
      const { uid } = jwt.verify(token, process.env.JWT_KEY);
      return [true, uid];
    } catch (error) {
      return [false, null];
    }
  } */

  /* Obtener los datos de un jwt */
  parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }

  responderError(texto, status, obj = null) {
    return {
      ok: false,
      msj: texto,
      status,
      obj,
    };
  }

  responderOK(texto, status, obj = null) {
    return {
      ok: true,
      msj: texto,
      status,
      obj,
    };
  }
}

module.exports = Funciones.prototype;
