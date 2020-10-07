const { validationResult } = require("express-validator");
const funciones = require("../utilidades/funciones");

const validarCampos = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return funciones.responderError("Error de validación", 400, {
      errores: errors.mapped(),
    });
  }
  next();
};

module.exports = { validarCampos };
