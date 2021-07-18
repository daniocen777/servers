const { validationResult } = require("express-validator");
const functions = require("../utils/functions");

const validarCampos = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const respuesta = functions.responderError("Error de validación", 400, {
      errores: errors.mapped(),
    });
    return res.status(respuesta.status).json(respuesta);
  }
  next();
};

module.exports = { validarCampos };
