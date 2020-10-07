const funciones = require("../utilidades/funciones");
const jwt = require("jsonwebtoken");

const validarJWT = (req, res, next) => {
  // leer token del header
  const token = req.header("x-token");
  if (!token) {
    const respuesta = funciones.responderError("No se ha enviado token", 401);
    return res.status(respuesta.status).json(respuesta);
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWT_KEY);
    req.uid = uid;

    next();
  } catch (error) {
    const respuesta = funciones.responderError("Token expirado", 500, error);
    return res.status(respuesta.status).json(respuesta);
  }
};

module.exports = { validarJWT };
