/* path: api/login */

const { Router } = require("express");
const { check } = require("express-validator");

const userController = require("../controllers/auth_controller");
const { validarCampos } = require("../middlewares/validar_campos");
const { validarJWT } = require("../middlewares/validar-JWT");

const router = Router();

router.post(
  "/new",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    check("email", "El correo es obligatorio").not().isEmpty(),
    check("email", "El correo no es válido").isEmail(),
    validarCampos,
  ],
  userController.agregarUsuario
);

router.post(
  "/",
  [
    check("email", "El correo no es válido").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  userController.login
);

// Validar token = renovar
router.get("/renew", validarJWT, userController.renewToken);

module.exports = router;
