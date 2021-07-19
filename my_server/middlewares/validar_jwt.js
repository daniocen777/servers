const jwt = require("jsonwebtoken");
const { request, response } = require("express");

const Usuario = require("../models/usuario.model");

const validarJwt = async (req = request, res = response, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({ msg: "No se ha enviado token" });
  }
  try {
    const { uid } = jwt.verify(token, process.env.JWT_KEY);
    // Usuario autenticado
    const usuario = await Usuario.findById(uid);
    if (!usuario) {
      return res.status(401).json({ msg: "El usuario autenticado no existe" });
    }
    // El usuario debe estar activo (estado = true)
    if (!usuario.estado) {
      return res.status(401).json({ msg: "Token no válido" });
    }
    req.usuario = usuario;

    next();
  } catch (error) {
    return res.status(401).json({ msg: "Token no válido" });
  }
};

module.exports = { validarJwt };
