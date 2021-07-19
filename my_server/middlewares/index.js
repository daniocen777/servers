const validarCampos = require("../middlewares/validar_campos");
const validarJwt = require("../middlewares/validar_jwt");
const validarRol = require("../middlewares/validar_rol");

module.exports = { ...validarCampos, ...validarJwt, ...validarRol };
