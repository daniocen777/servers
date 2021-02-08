/* path: api/usuarios */

const { Router } = require("express");

const { validarJWT } = require("../middlewares/validar-JWT");

const router = Router();

const userController = require("../controllers/usuarios_controller");

// Validar token = renovar
router.get("/", validarJWT, userController.getUsuarios);

module.exports = router;
