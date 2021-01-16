/* Path: api/login */

const { Router } = require("express");
const { check } = require("express-validator");

const router = Router();

// Controlador
const userController = require("../controller/auth_controller");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-JWT");

/* router.<method>("<ruta>", [middlewares], <controlador.method>) */
// Login
router.post(
  "/",
  [
    check("email", "El email no es válido").isEmail(),
    check("password", "La contraseña es obligatoio").not().isEmpty(),
    validarCampos,
  ],
  userController.login
);

// Validar token = renovar
router.get("/renew", validarJWT, userController.renewToken);

// Crear usuario
router.post(
  "/new",
  [
    check("nombre", "El nombre es obligatoio").not().isEmpty(),
    check("email", "El email no es válido").isEmail(),
    check("password", "La contraseña es obligatoio").not().isEmpty(),
    validarCampos,
  ],
  userController.addUser
);

// Usuarios
router.post("/get", userController.getUsers);

module.exports = router;
