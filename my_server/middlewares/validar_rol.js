const { request, response } = require("express");

const adminRol = (req = request, res = response, next) => {
  // Tomar el usuario autenticado al pasar por "validar_jwt"
  if (!req.usuario) {
    return res
      .status(500)
      .json({ msg: "Error de servidor - validación de rol sin token" });
  }
  const { rol, nombre } = req.usuario;
  if (rol !== "ADMIN_ROLE") {
    return res
      .status(401)
      .json({ msg: `${nombre} no tiene permiso para eliminar usuarios` });
  }
  next();
};

const validarRol = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.usuario) {
      return res
        .status(500)
        .json({ msg: "Error de servidor - validación de rol sin token" });
    }
    if (!roles.includes(req.usuario.rol)) {
      return res.status(401).json({ msg: `No tiene permiso para esta acción` });
    }
    next();
  };
};

module.exports = { adminRol, validarRol };
