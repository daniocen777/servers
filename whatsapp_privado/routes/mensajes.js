/* path: api/mensajes */

const { Router } = require("express");

const { validarJWT } = require("../middlewares/validar-JWT");

const router = Router();

const mensajeController = require("../controllers/mensaje_controller");

// Validar token = renovar
router.get("/:de", validarJWT, mensajeController.obtenerChat);

module.exports = router;
